# ALMERÍAGA v3 — guide de démarrage

> Tous les fichiers de cette refonte sont livrés **non exécutés**. Les commandes ci-dessous
> sont à lancer par vous, après avoir relu `PLAN.md`.

## 1. Démarrage rapide

1. `npm install` (les dépendances n'ont pas changé).
2. Copier `.env.example` en `.env.local`, puis renseigner au minimum :
   - `NEXT_PUBLIC_CONTACT_WHATSAPP` (format international sans `+`, ex. `213XXXXXXXXX`) ;
   - `NEXT_PUBLIC_CONTACT_EMAIL` ;
   - `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` ;
   - `NEXT_PUBLIC_META_PIXEL_ID` (facultatif) ;
   - `ADMIN_USER` / `ADMIN_PASSWORD` (obligatoires pour `/simulateur` et `/admin/suivi`).
3. Exécuter les trois fichiers SQL dans le SQL Editor de Supabase, dans cet ordre :
   `lib/supabase-sql-products.sql`, `lib/supabase-sql-leads.sql`,
   `lib/supabase-sql-seed-sur-commande.sql`.
4. `npm run dev` puis http://localhost:3000

## 2. Commandes de vérification (à lancer par vous)

- `npm run typecheck`
- `npm test`
- `npm run build`
- `npm run lint`


## 3. Structure du site

| Route | Rôle |
| --- | --- |
| `/` | Landing consommateur (hero 3D, 3 étapes, confiance, FAQ) |
| `/catalogue` | Produits publiés + filtres par catégorie |
| `/produit/[slug]` | Fiche produit (lien stable pour Meta Ads) |
| `/sur-commande/[slug]` | Gabarit « sur devis » (noindex) |
| `/merci` | Confirmation + événement Meta Lead |
| `/gros` | Formulaire grossiste (aucun prix public) |
| `/revendeurs` | Formulaire revendeur |
| `/cadre-legal` | Démarche ANAE en 3 phases |
| `/contact` | WhatsApp + e-mail |
| `/mentions-legales` | Informations légales |
| `/simulateur` | **privé** (Basic Auth, noindex) |
| `/admin/suivi` | **privé** (Basic Auth, noindex) |

## 4. Ajouter un produit

1. Ouvrir la table `products` dans Supabase (Table Editor).
2. Créer une ligne : `slug` (minuscules et tirets), `name`, `description`, `category`,
   `price_dzd` (entier, en dinars, ou vide = « sur devis »), `status`
   (`disponible` ou `sur_commande`), `images` (tableau d'URL), `is_published = true`.
3. La fiche est disponible immédiatement sur `/produit/<slug>` (et `/sur-commande/<slug>`
   pour un devis). Aucune modification de code n'est nécessaire.

Les 12 fiches génériques livrées par `lib/supabase-sql-seed-sur-commande.sql` sont
`is_published = false` : complétez-les puis publiez-les une par une.

## 5. Produit pilote (lien publicitaire)

`PILOT_PRODUCT_SLUG` (dans `lib/site-config.ts`) vaut `produit-pilote`. Le bouton
« Commander » du site pointe vers `/produit/produit-pilote` tant qu'aucune autre fiche
n'est publiée. Dès que vous publiez un produit, il devient la fiche mise en avant :
adaptez le slug si vous voulez imposer un produit précis.

## 6. Données personnelles et sécurité

- Aucun nom, NIF, numéro ANAE ou RIB n'est codé en dur : complétez `/mentions-legales`
  avant publication.
- La table `leads` n'a **aucune** politique de lecture publique ; seule l'insertion est
  autorisée, avec un `WITH CHECK` strict.
- `/simulateur` et `/admin/suivi` répondent 404 tant que `ADMIN_USER` / `ADMIN_PASSWORD`
  ne sont pas définis.


