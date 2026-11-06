# PLAN V4 — ALMERÍAGA (spécification → implémentation)

Statut : **planification uniquement**. Aucun code exécutoire tant que le go n'est pas donné.
Production actuelle : charte « Rich Minimalist » (émeraude #0B3D2E / or #D4AF37 / off-white #F7F5EF),
déployée sur https://almeriaga.vercel.app (PR #4 mergée). La charte est conservée, aucune refonte visuelle.

## 0. Non-négociables
- Implémenter UNIQUEMENT les règles ci-dessous. Aucune fonctionnalité inventée.
- Copy client : professionnelle, orientée conversion. Jamais de meta-commentaire interne
  (banni : « Chaque produit possède sa propre page… Celle-ci est la fiche pilote… », TODO, pilote, placeholder).
- Pas de texte/UI en arabe. Identité locale = drapeau 🇩🇿 uniquement.
- Prix gros jamais affichés publiquement.

## 1. Terminologie & branding (remplacements globaux)
| Retirer | Remplacer par |
|---|---|
| CTA « Commander » | « Sign In » / « Commencer gratuitement » |
| « Catalogue » | « Produits » |
| « Espagne-Algérie » / « Espagne → Algérie » | « Europe-Algérie » (seulement) |
| Livraison limitée (Oran/Tlemcen/SBA) | Livraison **toutes wilayas** (68/69), jamais une seule région |
| Locale/contenu arabe | Supprimé ; locales = fr-DZ (défaut IP DZ), fr, es, en |

## 2. Routing / IA
```
/                    Hero animé/3D léger + offre
/produits            Grille produits
/produit/[slug]      Landing par produit — URL propre + Meta Pixel unique
                     ├ prix retail DZD + bouton « Prix Gros »
                     └ « Prix Gros » → modale (Nom, Prénom, Téléphone) → sheet leads_gros
/fournisseur-eu      Bannière pricing : 3 offres d'abonnement + lead form → leads_abonnement
/fournisseur-dz      Même architecture (fournisseurs DZ ; DB future, fournisseurs = clients possibles)
/anne-procedure      Tier gratuit : procédure ANAE A→Z + visa + documents obligatoires (Sheet 2)
/simulateur          Tier gratuit : simulateur de calcul
/cadre-legal         Référence produits légaux vs illégaux ANAE (Sheet 5)
```

## 3. Tiers d'accès
| Tier | Déclencheur | Accès |
|---|---|---|
| Gratuit | « Commencer gratuitement » / « Sign In » | Simulateur + procédure ANAE A→Z (Sheet 2 : étapes, CASNOS, DGI, documents obligatoires) |
| Payant | 3 offres sur /fournisseur-eu & /fournisseur-dz | Base fournisseurs EU (Sheet 3, filtres pays : ES, FR, DE…) + accompagnement ANAE / visa Espagne / documents |
| Comms paiement | WhatsApp ou e-mail uniquement | Lead form Nom, Prénom, Téléphone → leads_abonnement |

Décision ouverte (non spécifiée) : mécanisme d'auth du tier gratuit. Défaut proposé = accès lead-gated
(formulaire → Sheets). À confirmer avant build.

## 4. Schéma Google Sheets (MCP)
| Sheet | Onglet | Colonnes |
|---|---|---|
| 2 (ref) | anne_procedure | step, phase, organism, documents_required, notes, source_url |
| 3 (ref) | fournisseurs_eu | id, company, country, category, city, contact_channel, verified_status |
| 5 (ref) | produits_anae | product_category, status (legal/illegal), conditions, source |
| Leads | leads_gros | timestamp, nom, prenom, telephone, product_slug, source_page, statut |
| Leads | leads_detail | timestamp, nom, prenom, telephone, product_slug, source_page, statut |
| Leads | leads_abonnement | timestamp, nom, prenom, telephone, offer, source_page, statut |
| Future | fournisseurs_dz | comme fournisseurs_eu + flag is_client |

## 5. Produits & Meta Ads
- Aucun produit placeholder/pilote : retirer les fallbacks « produit-pilote ».
- Produits = Image 1 (en attente, pièce jointe perdue) + 3 produits micro-importation à forte conversion
  (recherche web + tendances communautés ANAE ; éligibilité filtrée par Sheet 5 status=legal).
- Chaque /produit/[slug] : URL indépendante + Pixel Meta propre (META_PIXELS = { slug: pixel_id }, env) —
  zéro chevauchement de tracking entre tests publicitaires.
- Par produit : prix retail DZD + bouton « Prix Gros » → form (Nom, Prénom, Téléphone) → leads_gros.

## 6. UI/UX & localisation par IP
| IP | Langue | Identité |
|---|---|---|
| DZ | Français ~80 % + tournures algériennes naturelles (conversion) | 🇩🇿 |
| FR | Français | — |
| ES | Espagnol | — |
| Autres | Anglais | — |

- Détection : geo Vercel (x-vercel-ip-country) en middleware ; fallback gracieux = français.
- Hero : effet animé/3D léger (patterns float/parallax existants ; aucune lib lourde).

## 7. Conformité
- Sheet 5 = source de vérité produits légaux/illégaux ANAE → (a) filtre de publication produits,
  (b) liste de référence dans le module ANAE gratuit + /cadre-legal, appuyée par recherche réglementaire
  (ANAE, CASNOS, DGI).
- Aucune langue de garantie/urgence/fausse claim.

## 8. Plan d'exécution
Phase 1 — preview local (npm run dev) :
1. Adapters lecture/écriture Sheets/MCP + schéma.
2. Remplacements terminologie/branding (§1) + middleware geo/i18n (§6).
3. Gating des tiers + lead forms (§3–4).
4. Produits + landings/pixels par produit (§5).
5. Pages fournisseurs + bannière pricing (§2–3).
6. Vérification DoD.

Phase 2 — Vercel : env MCP_*, META_PIXELS, NEXT_PUBLIC_SITE_URL ; deploy ; smoke tests
locales (DZ/FR/ES/autres) + écriture leads + fire pixel par landing.

## 9. Definition of Done
- 0 occurrence de « Commander », « Catalogue », « Espagne-Algérie », texte arabe, copy pilote/placeholder
- 68/69 wilayas dans copy livraison & listes wilayas
- « Prix Gros » ne fuite aucun prix public ; leads_gros reçoit une ligne de test
- leads_abonnement reçoit une ligne de test depuis la bannière pricing
- 4 produits réels (Image 1 + 3 sourcés), chacun URL unique + Pixel ID unique
- Matrice IP vérifiée : DZ→fr-DZ+🇩🇿, FR→fr, ES→es, autres→en
- Tier gratuit accessible via « Commencer gratuitement » ; tier payant gated
- npm run build + preview local OK → deploy Vercel

## 10. Produits candidats (recherche web, tendances COD/ANAE 2025-2026)
Filtre Sheet 5 appliqué : hors art. 9 (prohibés), hors licence spéciale (cosmétiques/parfums),
hors équipements sensibles (télécom/smartphones), hors alimentaire/pharma.

| # | Produit | Signal de demande | Éligibilité micro-import |
|---|---|---|---|
| 1 | Friteuse à air / petit électroménager cuisine compact (3,5–5,5 L) | Top 4 ventes DZ 2025 (« friteuse sans huile ») ; saisonnalité Ramadan/Aïd ; dzbuild cat. 3 #14 | Légal (électrique non médical, non télécom) |
| 2 | Pack gaming : casque + clavier mécanique RGB (+ niche consoles neuves rares) | Top 6 2025 (casques gaming, claviers RGB) ; « consoles PS5/Switch rares en neuf = niche florissante » ; cible 18-30 ans | Légal (électronique grand public) |
| 3 | Éclairage LED d'ambiance + charge USB-C (multi-ports, parasurtenseur) | dzbuild cat. 3 #16-#17 ; léger, forte marge, tendance Instagram/TikTok | Légal (non télécom au sens 09-410) |
| Alt | Home fitness (bandes de résistance, tapis) ; oreillers mémoire de forme | Top 8 2025 (tapis yoga) ; dzbuild #18, #29 | Légal |

+ Image 1 (en attente) = 4 landings, chacune URL propre + Pixel Meta unique.

## 11. Digest réglementaire (source Sheet 5 + module ANAE) — décret 25-170
- Plafond 1 800 000 DA / déplacement ; 2 déplacements/mois ; non cumulable, non reportable.
- 5 % droit de douane + 0,5 % IFU (base = valeur + droits + marge forfaitaire 30 % ; 2 lectures).
- Code activité ANAE 080101 ; CASNOS ; compte devises BEA + carte internationale ; NIF validé.
- Autorisation générale : 5 j ouvrables, 1 an renouvelable, personnelle, incessible (art. 12).
- Déclaration préalable plateforme avant arrivée des marchandises (art. 13).
- Durée de vie restante > 50 % à l'import (art. 6) ; exclusion allocation chômage (art. 5).
- Art. 9 — 6 exclusions : (1) prohibés (armes, munitions, drones, chimique, explosifs) ;
  (2) équipements sensibles (décret 09-410 : télécom, cryptographie, aviation, transport routier) ;
  (3) pharma & dispositifs médicaux ; (4) autorisation spéciale (licences — dont parfums/cosmétiques) ;
  (5) sécurité/ordre public/mœurs ; (6) autres : armes blanches, vêtements militaires, minage crypto,
  viandes/lait/aliments, alcool/tabac/e-cig, animaux (hors compagnie), plantes/semences, contrefaçon,
  pièces détachées, intrants industriels, déchets, friperie.
- Contacts officiels : ANAE anae.dz +213 23 50 50 38 · Douanes douane.gov.dz +213 23 50 11 80 · BEA bea.dz 021 428 428.
- Sources : algerie360 (30/08/2025), bizalgeria (règles vérifiées 28/10/2026), dzbuild (2026), onlineshopdz (2025).

## 12. Bloqués sur input utilisateur
Image 1 · mécanisme d'auth · prix/libellés des 3 offres · Pixel IDs Meta.
