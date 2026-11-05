# PROMPT 2 POUR GEMINI — Refonte design + sections de confiance (ALMERÍAGA v2)

Tu continues le projet existant (il compile : typecheck, tests et build passent). NE CASSE RIEN : après chaque grande étape, lance `npm run typecheck` puis `npm run build` (je te colle le résultat si Cline ne le voit pas). Ne lance jamais `dir /s`. Modifie les fichiers existants plutôt que de tout réécrire. Aucune nouvelle dépendance.

## 1. Couleurs (minimaliste, pas de vert uni plat)
Le vert actuel (#0F5132 en aplat) est trop lourd. Dans `app/globals.css` + `tailwind.config.ts` :
- Fond principal : blanc cassé très clair (#FAFAF7). Texte : anthracite (#1B1F1D).
- Vert de marque plus profond et plus sobre, utilisé en petites touches (boutons, liens, icônes) : #0B3D2E ; vert doux pour badges : #E8F1EC.
- Or discret (#B8962E, clair #E3C766) pour détails fins (filets, étincelle, petits titres).
- Les grands blocs sombres (offre, pied de page, bandeaux) n'utilisent PAS un aplat : dégradé très subtil vert très sombre (#06241B → #0B3D2E) + fine texture de vagues SVG en CSS à 6-8 % d'opacité (rappel de la carte de visite), + liseré or 1px. Jamais de gros bloc vert clair uni.
- Garde un contraste AA. Respecte `prefers-reduced-motion`.

## 2. Visuels (propres, authentiques, sans copier de marques)
- Remplace l'icône console abstraite par une **illustration SVG propre d'une PS5 Slim** (silhouette blanche + noire, vue de face, dessin original, ni logo Sony ni logo PlayStation) dans `components/Ps5Art.tsx`, avec ombre douce et halo. Prévois une prop `src` pour afficher plus tard une VRAIE photo (`public/images/ps5-slim.webp`) quand j'en aurai une ; si le fichier existe, il remplace le SVG.
- Fond "ambiance GTA VI" SANS utiliser d'images, logos ni polices de Rockstar : dégradé coucher de soleil néon (rose/orange/violet très sombre) en CSS, flou, derrière la section jeu, avec grain léger et effet parallaxe/glow discret (CSS pur). Texte "GTA VI — sortie annoncée le 19/11/2026" en simple typographie.
- Même principe pour les autres produits : illustrations SVG simples et cohérentes (manette, casque VR, lunettes VR, PC), faites par toi, de style trait fin + aplats doux.
- N'utilise AUCUNE image téléchargée sur internet.

## 3. Nouvelle structure de la page d'accueil (ordre)
Hero → Produits → Le pack PS5 + GTA VI → Simulateur (aperçu) → Comment ça marche → Fournisseurs (démo) → Suivi de dossier → À propos → FAQ → Réservation. Navbar : Produits, Simulateur, Fournisseurs, Suivi, À propos, Réserver.

## 4. Sections (créer des composants serveur, ancres `#produits`, `#simulateur`, `#fournisseurs`, `#suivi`, `#a-propos`)
a) **Produits** (`lib/catalog.ts` à étendre, sans toucher au type existant, on garde la scalabilité) — au moins 6 cartes, chacune avec badge de disponibilité honnête :
 1. Pack PS5 Slim 1 To + GTA VI — « Disponible sur réservation » (produit principal)
 2. PS5 Édition spéciale — « Sur commande »
 3. Manette DualSense — « Sur commande »
 4. Casque VR (Meta Quest) — « Sur commande »
 5. Lunettes VR / réalité mixte — « Sur commande »
 6. PC gaming — « Sur devis »
 7. GTA VI seul — « Disponible à la sortie »
 Prix : « Prix sur demande ». Bouton « Demander un rappel » (ancre vers formulaire, en précisant le produit via un paramètre ou un champ). Ne jamais écrire "en stock" ni inventer de caractéristiques ou de prix.
b) **Simulateur** : page `/simulateur` existe déjà (`lib/simulator.ts`). Améliore `SimulatorApp.tsx` : curseurs + champs (nombre de consoles, prix unitaire €, taux bancaire et taux réel, prix de vente par scénario), résultats en cartes (coût total, marge nette, marge %, seuil de rentabilité, plafond 1 800 000 DA par voyage avec alerte rouge/orange/verte), graphique en barres SVG simple (coûts vs recettes) fait main, sans librairie. Ajoute une note : "Estimation indicative, non contractuelle". Sur la page d'accueil : un aperçu avec 3 chiffres + bouton vers /simulateur.
c) **Fournisseurs** (données de TEST) : `lib/suppliers-demo.ts` avec 4 fiches clairement marquées « EXEMPLE — données de démonstration » (nom fictif générique, ville d'Espagne, catégorie, statut « à vérifier »). Filtres simples par catégorie. Aucun vrai nom, aucun faux contact. Bandeau : « L'annuaire réel de fournisseurs vérifiés arrive prochainement ». Bouton liste d'attente (`LeadForm kind="waitlist"`).
d) **Suivi de dossier** : section informative en 5 étapes visuelles (ANAE → CASNOS → NIF/registre → préparation du dossier → orientation visa). Chaque étape : ce que c'est, documents habituels, « à vérifier auprès de l'organisme officiel ». Ajoute en bas : "Aucune garantie d'obtention d'un visa ou d'un rendez-vous. ALMERÍAGA n'est pas un organisme officiel." PAS de faux suivi en temps réel, PAS de faux pourcentages ni de faux dossiers clients. Option : champ « Numéro de suivi » désactivé avec la mention « Bientôt disponible ».
e) **À propos** : présentation de ALMERÍAGA (sourcing et micro-importation, inspiré d'Almería), valeurs (transparence, importation déclarée, paiement à la livraison), fondateur Nadir Boudjani, auto-entrepreneur micro-importateur, n° ANAE et NIF depuis `LEGAL`. Ton de petite société sérieuse ("nous"), SANS inventer d'équipe, de chiffres de ventes, de clients, ni de bureaux.
f) **Contact par pôle** (pied de page + page À propos) avec ces adresses (toutes @almeriaga.com, variables dans `lib/site.ts` via .env) : hello@ (général), commandes@ (réservations), gros@ (revendeurs), fournisseurs@ (partenaires), support@ (après-vente). Affiche-les comme mailto, sans prétendre à une équipe distincte.

## 5. Règles absolues (honnêteté)
Pas de faux avis, faux compteur, faux stock, fausse urgence, faux logos de partenaires, faux chiffres. Tout texte non confirmé reste « à confirmer lors de l'appel ». Pas de logo Sony/PlayStation/Rockstar/Meta/Nintendo : mentionner seulement les noms en texte avec la mention de marque déjà présente dans le pied de page.

## 6. Fin de travail
`npm run typecheck`, `npm test`, `npm run build` doivent passer. Mets à jour `LISEZ-MOI.md` avec : comment remplacer l'illustration par une vraie photo, comment ajouter un produit dans `lib/catalog.ts`, comment ajouter un vrai fournisseur.
