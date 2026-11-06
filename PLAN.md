# PLAN — Plateforme Almeríaga (v3)

Document de travail. **Aucune commande n'a été exécutée** : ni `npm install`, ni `build`, ni `typecheck`, ni `lint`, ni test, ni `git`, ni SQL.
Tout ce qui suit est écrit puis laissé à la validation de l'utilisateur.

## 1. Objectif

- Landing consommateur qui convertit, sans produit vedette (PS5 et GTA VI sortent de la structure).
- Une fiche produit dédiée par produit, avec un lien stable utilisable dans Meta Ads (`/produit/[slug]`).
- Parcours séparés pour les gros et les revendeurs.
- Page publique de réassurance légale (ANAE) + suivi interne privé.
- Thème clair, profondeur 3D et animations en CSS/SVG purs (aucune dépendance ajoutée).
- Prix publics en dinars uniquement.

## 2. Routes finales

| Route | Rôle | Canal | Indexation |
| --- | --- | --- | --- |
| `/` | Landing consommateur | Formulaire de commande + WhatsApp | index |
| `/catalogue` | Grille produits + filtres catégorie | Liens vers les fiches | index |
| `/produit/[slug]` | Fiche produit (lien Meta Ads) | Formulaire pré-rempli | index |
| `/sur-commande/[slug]` | Produit sur devis | Formulaire de devis | `noindex, follow` |
| `/merci` | Confirmation après envoi | Message + WhatsApp | `noindex` |
| `/gros` | Service grossiste | Formulaire gros + WhatsApp | index, non lié depuis la landing |
| `/revendeurs` | Programme revendeur | Formulaire revendeur | index, non lié depuis la landing |
| `/cadre-legal` | Étapes ANAE, réassurance | Information | index |
| `/contact` | Contact général | WhatsApp + e-mail (+ liens discrets gros/revendeurs) | index |
| `/mentions-legales` | Mentions légales | Information | index |
| `/simulateur` | Simulateur de rentabilité | **privé** | `noindex` + hors sitemap/robots + middleware |
| `/admin/suivi` | Suivi administratif ANAE | **privé** | `noindex` + hors sitemap/robots + middleware |
| `/api/leads` | Enregistrement des demandes | — | `Disallow` |
| `/espace-fournisseurs` | **supprimée** | — | — |

Règles de navigation : liens `next/link`, état actif dans le menu, logo qui ramène à `/`.
La landing ne contient aucun lien vers `/gros` ni `/revendeurs` ; ces deux pages ne sont
accessibles que par lien direct et par un bloc discret en bas de `/contact`.

## 3. Fichiers créés

**Configuration / design**
- `lib/site-config.ts` — `BRAND_NAME`, `CONTACT_WHATSAPP`, `CONTACT_EMAIL`, `PILOT_PRODUCT_SLUG`, helpers WhatsApp. Toutes les valeurs viennent de `NEXT_PUBLIC_*` ; aucune donnée personnelle.
- `lib/cadre-legal.ts` — étapes publiques ANAE (3 phases, aucun numéro, aucune date, aucun coût).
- `lib/admin-steps.ts` — colonnes de la feuille « Suivi administratif » (phase, tâche, statut, établissement, date de dépôt, terminé, durée, notes, coût), sans identifiant personnel.
- `lib/format-private.ts` — `formatEur`, `formatPct`, `parseNumber` déplacés ici : le symbole `€` ne reste que dans les modules privés.

**Données**
- `lib/products.ts` — lecture Supabase REST (`is_published = true`), fiche par slug, produit pilote, repli de démonstration.
- `lib/product-fallback.ts` — 12 fiches génériques `sur_commande` + 1 fiche pilote (contenu marqué TODO, sans prix, sans image inventée).
- `lib/product-display.ts` — libellés de statut et prix (`Sur devis` si `price_dzd` est vide).

**Composants**
- `components/Navbar.tsx` (réécrit), `components/Footer.tsx` (réécrit), `components/Logo.tsx` (réécrit)
- `components/ui/Reveal.tsx`, `components/ui/Parallax.tsx`, `components/ui/Counter.tsx`, `components/ui/TiltCard.tsx`, `components/ui/WhatsAppFab.tsx`
- `components/landing/Hero.tsx`, `HowItWorks.tsx`, `Trust.tsx`, `Faq.tsx`
- `components/catalogue/CatalogueGrid.tsx`
- `components/produit/ProductGallery.tsx`, `components/produit/ProductBuyPanel.tsx`
- `components/lead/LeadCaptureForm.tsx` (formulaire unique piloté par `type` : `consommateur`, `devis`, `revendeur`, `gros`)
- `components/MetaViewContent.tsx`, `components/ThankYouTracker.tsx`
- `middleware.ts`

**SQL (jamais exécuté par Cline)**
- `lib/supabase-sql-leads.sql` (contient aussi la vue `public.leads_par_produit`)
- `lib/supabase-sql-seed-sur-commande.sql`
- `lib/supabase-sql-products.sql` (mis à jour)

## 4. Fichiers modifiés

| Fichier | Raison |
| --- | --- |
| `tailwind.config.ts` | Palette claire (blanc chaud, anthracite, accent vif, secondaire douce), ombres douces, keyframes 3D/révélation |
| `app/globals.css` | Tokens CSS, utilitaires 3D (`perspective`, `preserve-3d`), révélation, `prefers-reduced-motion` |
| `app/layout.tsx` | Métadonnées neutres, une seule police, header/footer globaux, bouton WhatsApp flottant |
| `app/page.tsx` | Landing consommateur (hero 3D, 3 étapes, confiance, FAQ, CTA vers la fiche pilote) |
| `app/catalogue/page.tsx` | Grille + filtres, liens vers les fiches |
| `app/gros/page.tsx` | Aucun prix, aucun catalogue, WhatsApp + formulaire gros |
| `app/mentions-legales/page.tsx` | Statut d'auto-entrepreneur et activité déclarée, **sans** NIF/ANAE/CASNOS/RIB |
| `app/simulateur/page.tsx` | `noindex` (module privé) |
| `app/sitemap.ts` | Routes publiques seules, produits publiés, plus de `/simulateur` ni `/espace-fournisseurs` |
| `app/robots.ts` | `Disallow` `/admin`, `/simulateur`, `/api`, `/merci` |
| `app/opengraph-image.tsx` | Visuel clair, plus de fond vert sombre ni de mention PS5 |
| `lib/site.ts` | Compatibilité (`SITE`, `CONTACT`) sans donnée personnelle |
| `lib/validation.ts` | Validation par `type`, téléphone `^(0|\+213|00213)[567]\d{8}$` côté client et serveur |
| `app/api/leads/route.ts` | Insertion Supabase REST + anti-spam conservé (origine, débit, piège, délai minimal) |
| `lib/analytics.ts` | `Lead` et `ViewContent`, Meta uniquement (TikTok retiré) |
| `components/Analytics.tsx` | Pixel Meta seul, désactivé si `NEXT_PUBLIC_META_PIXEL_ID` est vide |
| `components/ui/Button.tsx`, `Badge.tsx`, `Card.tsx`, `Input.tsx`, `Icons.tsx` | Variantes et couleurs du thème clair, quelques icônes ajoutées |
| `types/product.ts` | Nouveau schéma `products` (`slug`, `status`, `price_dzd`, `images`, `is_published`) |
| `lib/supabase.ts` | Lecture REST remplacée par `lib/products.ts` (même rôle) |
| `lib/format.ts` | Le symbole `€` sort du fichier (déplacé dans `format-private.ts`) |
| `.env.example`, `LISEZ-MOI.md` | Variables réelles, plus aucune donnée personnelle par défaut |
| `tests/validation.test.ts` | Aligné sur la nouvelle validation (`type` au lieu de `kind`) |

## 5. Fichiers supprimés (et raison)

| Fichier | Raison |
| --- | --- |
| `components/sections/*` (10 fichiers) | Sections PS5/GTA, simulateur en vitrine, annuaire fournisseurs : hors périmètre de la nouvelle landing |
| `components/Ps5Art.tsx`, `components/ProductArt.tsx`, `components/RouteMap.tsx` | Illustrations et carte du pack PS5 |
| `components/FlipCard.tsx` | Carte de visite 3D de l'ancienne section « À propos » |
| `components/MobileCtaBar.tsx` | Barre mobile liée au produit vedette (remplacée par le bouton WhatsApp flottant) |
| `components/LeadForm.tsx` | Remplacé par `components/lead/LeadCaptureForm.tsx` |
| `components/catalog/CatalogGrid.tsx`, `components/catalog/ProfitModal.tsx` | Ancienne grille + calcul de marge public (les euros ne doivent pas être publics) |
| `components/auth/AuthModal.tsx`, `app/auth/callback/route.ts`, `lib/supabase/client.ts` | Connexion client inutilisée dans le nouveau parcours |
| `lib/catalog.ts` | Données PS5/GTA codées en dur |
| `lib/mock-products.ts` | Ancien schéma `products` ; remplacé par `lib/product-fallback.ts` |
| `lib/suppliers-demo.ts`, `lib/margin.ts` | Alimentaient des sections supprimées |
| `app/espace-fournisseurs/page.tsx` | **Proposition : supprimer.** Route hors parcours, sans formulaire propre ni données réelles ; le besoin « fournisseurs » ne figure plus dans la navigation. Restauration possible depuis l'historique Git si l'utilisateur préfère la conserver. |

> **Note d'exécution — aucune suppression physique.** Les consignes interdisent toute commande shell
> (donc `git rm`). Les fichiers listés ci-dessus ont été **vidés** (contenu remplacé par un en-tête
> `@deprecated` + `export {}`) ou neutralisés (`/espace-fournisseurs` renvoie `notFound()`,
> `GtaViAmbianceBanner`/`Ps5Art` renvoient `null`). Deux fichiers restent en place car des composants
> hérités les importent encore : `lib/catalog.ts` (réduit à une fiche neutre, plus aucun PS5/GTA) et
> `components/LeadForm.tsx` (non routé). Ils sont à retirer avec :
>
> `git rm components/sections/*.tsx components/MobileCtaBar.tsx components/LeadForm.tsx components/Ps5Art.tsx components/ProductArt.tsx components/RouteMap.tsx components/FlipCard.tsx components/catalog/*.tsx components/auth/AuthModal.tsx lib/catalog.ts lib/mock-products.ts lib/suppliers-demo.ts lib/margin.ts lib/supabase.ts lib/supabase/client.ts app/auth/callback/route.ts app/espace-fournisseurs/page.tsx`


## 6. Éléments de design supprimés

- Fonds sombres et dégradés vert profond (`bg-dark-block`), carte de visite 3D, bannière GTA VI.
- Ombres lourdes (`shadow-2xl`, `shadow-lift` vert) et `backdrop-blur` sur le pied de page.
- Sections redondantes : aperçu simulateur, annuaire fournisseurs, suivi de dossier en vitrine, « Pack », « Réservation » — fusionnées en une seule landing.
- Couleurs or/vert de l'ancienne charte remplacées par un accent vif et un secondaire doux.
- Le doré `#B8962E` disparaît ; l'identité repose sur le nom, la typographie et la profondeur 3D.

## 7. Risques

- **SEO** : `/simulateur` et `/admin/suivi` passent en `noindex` + middleware ; les anciennes URL indexées (`/espace-fournisseurs`) renverront 404. Prévoir une redirection si le trafic existant compte.
- **Pages dupliquées** : `/sur-commande/[slug]` est un gabarit ; les pages sont en `noindex, follow` et exclues du sitemap pour éviter du contenu presque identique.
- **Données sensibles** : la table `leads` n'a aucune politique de lecture publique ; la vue `leads_par_produit` est en `security_invoker` (RLS appliquée) et révoquée pour `anon`. Les modules privés sont protégés par un middleware Basic Auth ; sans `ADMIN_USER`/`ADMIN_PASSWORD`, ils répondent 404.
- **Contenus** : les 12 fiches génériques et la fiche pilote sont marquées TODO. Aucun prix, aucune image, aucun identifiant n'est inventé.
- **Légal** : la page `/cadre-legal` ne cite ni date, ni coût, ni plafond, ni taux ; elle renvoie vers l'ANAE et les Douanes. Ce n'est pas un conseil juridique.
- **Vérification** : aucun fichier n'a été compilé ni exécuté. Les erreurs de typage éventuelles doivent être levées par `npm run typecheck` côté utilisateur.



