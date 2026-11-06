# Prompt Cline — Plateforme Almeríaga

Nov 5, 2026 · @Mr BOUDJANI

## 1. Objectif

À coller dans Cline. Construire une plateforme web formelle et opérationnelle pour Almeríaga, activité de micro-importation depuis l'Espagne vers l'Algérie (Oran, Tlemcen, Sidi Bel Abbès).

La landing page convertit le consommateur final. Les grossistes et les revendeurs passent par des parcours séparés. Le catalogue se compose de pages produit dédiées, chacune avec un lien stable utilisable dans Meta Ads.

- Aucun produit vedette : PS5 et GTA 6 sortent de la structure. Un produit pilote générique sert de première page avec lien réel.
- Le site actuel est déjà testé et opérationnel : Cline modifie le code et ne le revalide pas.
- Stack existante : Next.js 14, App Router, projet sans dossier `src/`, Supabase. Routes actuelles : `/`, `/catalogue`, `/gros`, `/simulateur`, `/espace-fournisseurs`, `/mentions-legales`, `/api/leads`.

## 2. Règles de travail

Cline écrit le code sans rien exécuter : le site est déjà testé, donc aucune commande ni aucun test n'est lancé.

- Aucune commande shell : pas de `npm run build`, `typecheck`, `dev`, `lint`, `git` ni `npm install`. Cline utilise seulement les outils de lecture, de création et de modification de fichiers.
- Aucune nouvelle dépendance. Animations et effets 3D en CSS pur (`transform`, `perspective`, `keyframes`) et en SVG. Si une bibliothèque semble indispensable, Cline la note dans le rapport final sans l'installer.
- Aucun SQL exécuté. Les fichiers SQL sont fournis, l'utilisateur les lance dans le SQL Editor de Supabase.
- Prix affichés uniquement en dinars (DZD). Aucun montant en euros dans le rendu public.
- Aucune donnée personnelle en dur : ni nom, ni prénom, ni NIF, ni RIB, ni numéro ANAE, CASNOS ou d'autorisation. La marque et les contacts vivent dans `lib/site-config.ts` (`BRAND_NAME`, `CONTACT_WHATSAPP`, `CONTACT_EMAIL`), lus depuis des variables `NEXT_PUBLIC_*`.
- Information manquante : constante marquée `TODO`. Jamais de lien, de numéro ou de prix inventé.

## 3. Direction design

Thème clair et propre, avec de la profondeur 3D et du mouvement : une interface moderne et vivante, jamais terne, jamais sombre.

| Élément | Consigne |
| --- | --- |
| Couleurs | Fond blanc chaud, surfaces blanches, texte gris anthracite (pas de noir pur). Une couleur d'accent vive, une couleur secondaire douce. Aucun fond noir, aucun mode sombre. |
| Typographie | Deux polices maximum : une pour les titres, une pour le texte. Titres grands, texte aéré. |
| Profondeur 3D | Objet 3D décoratif flottant dans le hero (formes géométriques en CSS 3D ou SVG animé). Cartes produit qui s'inclinent au survol avec `perspective`. Ombres douces et légèrement colorées, jamais lourdes. |
| Animation d'entrée | Blocs qui apparaissent en fondu, glissement vertical et léger zoom, 500 à 700 ms, `ease-out`, décalage de 80 ms entre blocs. |
| Au scroll | Parallaxe légère sur les visuels, révélation des sections via `IntersectionObserver`, compteurs animés pour les chiffres de confiance. |
| Micro-interactions | Boutons qui se soulèvent au survol, retour visuel au clic, transitions de page fluides. |
| Performance | Animer seulement `transform` et `opacity`. Respecter `prefers-reduced-motion` en coupant les animations. Priorité mobile. |

À supprimer sans regret : dégradés criards, ombres lourdes, décors inutiles, sections redondantes. Cline liste ces suppressions dans `PLAN.md`.

## 4. Navigation

Chaque section a sa propre URL et son propre canal de contact. Aucun clic ne doit laisser le visiteur sur l'accueil : un bouton mène à une autre page ou déclenche une action visible.

| Route | Rôle | Canal |
| --- | --- | --- |
| `/` | Landing consommateur | Formulaire de commande + WhatsApp |
| `/catalogue` | Liste des produits | Lien vers chaque fiche |
| `/produit/[slug]` | Fiche produit, lien Meta Ads | Formulaire de commande pré-rempli |
| `/sur-commande/[slug]` | Produit sur devis | Formulaire de devis |
| `/merci` | Confirmation après envoi | Message + lien WhatsApp |
| `/gros` | Service grossiste | Formulaire gros + WhatsApp direct |
| `/revendeurs` | Programme revendeur | Formulaire revendeur |
| `/cadre-legal` | Étapes ANAE, rassurance | Information |
| `/contact` | Contact général | WhatsApp + email |
| `/mentions-legales` | Mentions légales | Information |

Règles : liens Next.js `Link` (pas d'ancre seule), menu avec état actif, logo qui ramène à `/`. La landing ne montre aucun lien vers `/gros` ni `/revendeurs`. Ces pages restent accessibles par lien direct et par un lien discret en pied de `/contact`.

## 5. Pages à construire

**Landing consommateur (`/`).** Une seule page, centrée sur le particulier et pensée pour la conversion.

- En-tête minimal : logo texte et bouton Commander.
- Hero avec objet 3D animé, promesse courte, bouton principal vers le produit pilote.
- Comment ça marche en trois étapes, puis une section confiance : cadre légal micro-importation, livraison, garantie.
- Foire aux questions courte, bouton WhatsApp flottant, aucun prix en euros.

**Produit pilote (`/produit/[slug]`).** Page réelle avec lien stable, utilisable tout de suite dans Meta Ads.

- Contenu générique marqué `TODO` tant que le produit n'est pas choisi. Nom, photos et prix en DZD viennent de la table `products`.
- Galerie avec effet 3D, statut (disponible ou sur commande), formulaire court : nom, téléphone, wilaya.
- Métadonnées Open Graph propres à chaque slug et URL canonique, pour un partage Meta propre.
- Pixel Meta branché sur `NEXT_PUBLIC_META_PIXEL_ID`, désactivé si la variable est vide. Événements `ViewContent` et `Lead`, la page `/merci` confirmant la conversion.

**Pages sur commande (`/sur-commande/[slug]`).** Un gabarit unique alimenté par la base : créer une page revient à ajouter une ligne, sans toucher au code. Chaque page a son formulaire de devis et son `product_slug` dans les leads, ce qui permet de comparer la demande produit par produit. Les entrées de départ sont en section 7.

**Catalogue (`/catalogue`).** Grille de cartes avec effet d'inclinaison 3D et filtres par catégorie. Chaque carte renvoie vers sa fiche.

**Gros (`/gros`).** Présentation courte, aucun prix public, aucun catalogue. Deux boutons : WhatsApp direct et formulaire gros (société, wilaya, volume, produits visés).

**Revendeurs (`/revendeurs`).** Formulaire distinct : nom du magasin, wilaya, type de commerce, volume estimé, téléphone. Enregistrement avec `type = 'revendeur'`.

**Contact et mentions légales.** Contact : WhatsApp et email, sans formulaire complexe. Mentions : statut d'auto-entrepreneur et activité déclarée, sans identifiant personnel.

## 6. Cadre légal ANAE restructuré

Cline reprend la feuille 2 du Google Sheets Master (Suivi administratif, Décret exécutif n° 25-170) comme source de structure : trois phases, une page publique et un suivi interne.

La page publique `/cadre-legal` explique la démarche en étapes génériques pour rassurer le consommateur. Elle ne contient ni dates, ni coûts, ni aucun numéro personnel (NIF, ANAE, CASNOS, RIB, autorisation). Aucun chiffre légal comme le plafond par voyage ou le taux de douane n'y figure : la page invite à vérifier auprès de l'ANAE et des Douanes.

| Phase | Étapes à présenter |
| --- | --- |
| 1. Cadre légal | Non-affiliation CNAS, inscription ANAE et carte auto-entrepreneur (code activité 080101, domaine micro-importation), NIF et attestation d'immatriculation fiscale, authentification du NIF, cachet professionnel, attestation C20, G12 bis (IFU), affiliation CASNOS, compte devises BEA, autorisation générale du Ministère du Commerce Extérieur |
| 2. Mobilité | Visa Schengen Espagne, assurance voyage, réservation du ferry, mise à jour du statut du véhicule |
| 3. Terrain | Prospection des fournisseurs en Espagne, négociation des lots, déclaration d'importation sur la plateforme ANAE avant chaque voyage |

Le suivi interne `/admin/suivi` reproduit les colonnes de la feuille : phase, tâche, statut, établissement, date de dépôt, terminé, durée, notes, coût. Les données sont dans `lib/admin-steps.ts`, sans numéro personnel. La route est privée (voir section 8).

## 7. Données et formulaires

Deux tables, avec le SQL fourni dans `lib/` et jamais exécuté par Cline.

**Table `products`**

| Colonne | Type | Remarque |
| --- | --- | --- |
| id | uuid | Clé primaire |
| slug | texte unique | Alimente l'URL de la fiche |
| name, description, category | texte |  |
| price\_dzd | entier, nullable | Vide = affichage « sur devis » |
| status | texte | `disponible` ou `sur_commande` |
| images | tableau de texte | URL des photos |
| is\_published | booléen, défaut faux | Lecture publique seulement si vrai |
| created\_at | horodatage |  |

**Table `leads`**

| Colonne | Type | Remarque |
| --- | --- | --- |
| id | uuid | Clé primaire |
| type | texte | `consommateur`, `devis`, `revendeur` ou `gros` |
| product\_slug | texte, nullable | Lien avec la fiche |
| name, phone, wilaya | texte |  |
| business\_name, volume | texte, nullable | Gros et revendeurs |
| message | texte, nullable |  |
| utm\_source, utm\_campaign | texte, nullable | Suivi Meta Ads |
| created\_at | horodatage |  |

Règles :

- Insertion publique limitée par une politique `WITH CHECK` stricte (type valide, longueurs bornées). Aucune lecture publique, aucune politique `USING (true)` en écriture.
- Téléphone algérien validé côté client et côté serveur avec `^(0|\+213|00213)[567]\d{8}$`. Champ piège anti-spam dans chaque formulaire.
- Fichiers : `lib/supabase-sql-products.sql` (mise à jour), `lib/supabase-sql-leads.sql`, `lib/supabase-sql-seed-sur-commande.sql`, plus une vue `leads_par_produit` pour compter les demandes par produit.
- Données de départ : une douzaine de fiches génériques `sur_commande`, `is_published = false`, sans prix. Elles viennent des catégories autorisées de la matrice légale : lisseurs, tondeuses, sèche-cheveux, mixeurs compacts, bouilloires, capsules café compatibles, soins visage et corps, maquillage, écouteurs et chargeurs, montres connectées, bijoux fantaisie, jouets aux normes CE. L'utilisateur les complète et les publie une par une.

## 8. Modules internes

Le simulateur de rentabilité (`/simulateur`) et le suivi administratif (`/admin/suivi`) restent privés. Les euros, les marges et le ROI vivent uniquement dans ces modules.

- Retirer ces routes du menu, de `sitemap.xml` et de `robots.txt`, et ajouter `noindex`.
- Protéger par un middleware d'authentification basique lisant `ADMIN_USER` et `ADMIN_PASSWORD` dans les variables d'environnement. Sans ces variables, les routes répondent 404.
- Cline vérifie par lecture et recherche dans les fichiers (sans commande shell) qu'aucun symbole € ni aucun nom personnel n'apparaît hors de ces modules et de `lib/site-config.ts`.
- La route `/espace-fournisseurs` est listée dans `PLAN.md` avec une proposition : conserver ou supprimer.

## 9. Livrables

Cline travaille en autonomie : il écrit `PLAN.md`, puis enchaîne sans attendre de validation.

1. `PLAN.md` court : fichiers créés, modifiés et supprimés (avec la raison), routes finales, risques (SEO, pages dupliquées, données sensibles).
2. Le code, dans l'ordre : configuration et design, landing et fiche produit pilote, catalogue et pages sur commande, formulaires et SQL, pages gros, revendeurs, légal et contact, modules internes.
3. Un rapport final qui ne prétend à aucune vérification : tout est marqué « non exécuté, à tester par l'utilisateur ».

Le rapport indique :

- les fichiers créés, modifiés et supprimés, et les routes obtenues ;
- les dépendances jugées utiles mais non installées ;
- les actions manuelles : exécuter les trois fichiers SQL, renseigner `NEXT_PUBLIC_CONTACT_WHATSAPP`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_META_PIXEL_ID`, `ADMIN_USER` et `ADMIN_PASSWORD`, choisir le produit pilote, puis lancer le build et les tests.

## 10. Interdits

- Lancer une commande, un build, un test ou un script, quelle qu'elle soit.
- Installer un paquet, exécuter du SQL, modifier le schéma ou les politiques RLS autrement que par les fichiers fournis.
- Supprimer un fichier ou une donnée sans l'avoir listé dans `PLAN.md`.
- Afficher un prix en euros, un nom personnel ou un identifiant fiscal ou bancaire dans le rendu public.
- Utiliser un fond noir, un thème sombre, des dégradés criards ou des ombres lourdes.
- Proposer des produits exclus ou à vérifier selon la matrice légale : friperie, pièces auto, médicaments, armes, drones, produits chimiques dangereux, smartphones, gros électroménager, alimentaire frais.
- Inventer un lien, un numéro, un prix ou un statut légal.
- Présenter comme validé un résultat qui n'a pas été vérifié.

Les informations légales (ANAE, Décret 25-170, taux, plafonds) ne constituent pas un conseil juridique. L'utilisateur ou un professionnel doit les confirmer avant publication.
