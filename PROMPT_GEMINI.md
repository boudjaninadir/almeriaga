# PROMPT POUR GEMINI (VS Code) — Finaliser ALMERÍAGA v2

Tu es un développeur Next.js senior. Je suis non-développeur : agis par étapes, explique en français simple, lance toi-même les commandes (`npm run typecheck`, `npm test`, `npm run build`) et corrige jusqu'à ce que tout passe. Ne lis que ce dossier. N'ajoute AUCUNE dépendance sans me demander.

## Contexte
ALMERÍAGA = micro-importateur algérien (auto-entrepreneur, ANAE). Premier produit : **PS5 Slim 1 To + GTA VI**, vendu sur réservation, **paiement à la livraison**, prix non affiché ("communiqué à l'appel"). Objectif immédiat : une landing prête pour tester des pubs Meta/TikTok. Français uniquement, quelques mots arabes sur les boutons clés (composant `components/Ar.tsx`, ex. « Demander un rappel / طلب اتصال »).

## Déjà fait (NE PAS réécrire, seulement utiliser)
`lib/` (site, catalog, validation, simulator, format, wilayas, rate-limit, analytics), `app/api/leads/route.ts`, `components/` (Logo, Navbar, Footer, LeadForm [kind: retail|wholesale|waitlist], Analytics, ui/*), `tailwind.config.ts`, `app/globals.css` (palette vert profond + or).
Lis d'abord `lib/catalog.ts` et `lib/site.ts` : tout le contenu commercial vient de là.

## À créer (dans cet ordre)
1. `app/layout.tsx` : police Geist, metadata depuis SITE, `<Analytics/>`, Navbar + Footer, lang="fr".
2. `components/Ps5Landing.tsx` + `app/page.tsx` : mobile-first. Sections : hero (badge « Disponible sur réservation », titre, CTA « Réserver » ancre `#reserver`) ; contenu du pack (PS5_SLIM.pack, id="pack") ; 3 étapes (réserver → appel → livraison + paiement) ; confiance (importation déclarée, facture + garantie, paiement à la livraison) ; FAQ honnête (délais confirmés à l'appel, jeu : édition/remise confirmées à l'appel, sortie GTA VI 19/11/2026) ; formulaire `<LeadForm kind="retail"/>` dans `id="reserver"` ; barre CTA fixe en bas sur mobile. JSON-LD Product avec availability PreOrder, sans prix.
3. `app/gros/page.tsx` : page revendeurs avec `<LeadForm kind="wholesale"/>` (bouton « Demander un rappel »).
4. `app/simulateur/page.tsx` + `components/SimulatorApp.tsx` ('use client') : formulaire des champs de `SimInputs` (valeurs par défaut `DEFAULT_INPUTS`), résultats de `simulate()` : coûts, plafond 1 800 000 DA/voyage, 3 scénarios, seuil de rentabilité, capacité véhicule. Format via `lib/format.ts`. Phase B : pas de compte pour l'instant.
5. `app/espace-fournisseurs/page.tsx` : page « bientôt disponible » (guides ANAE/CASNOS, annuaire fournisseurs vérifiés, modèles de messages, check-list visa) + `<LeadForm kind="waitlist"/>`. AUCUNE vente de rendez-vous visa, fausses invitations ou fausses proformas.
6. `app/mentions-legales/page.tsx` (données LEGAL), `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx` (fond vert, « ALMERÍAGA » doré).
7. `google-apps-script/Code.gs` : web app qui reçoit le webhook (voir `app/api/leads/route.ts` pour le format et le secret partagé), écrit dans l'onglet « Leads » (LockService, cellules en texte, comparaison du secret).
8. `tests/validation.test.ts` et `tests/simulator.test.ts` (node:test via tsx). Valeurs de référence : 25 consoles × 460 € à 151,67 → vérifier la cohérence avec `simulate()`.
9. `.env.example` + `LISEZ-MOI.md` en français très simple (lancer, configurer .env.local, déployer sur Vercel).

## Design 2026 (cohérent avec la marque)
Inspiration : Numidie Auto (cartes blanches arrondies, badges de disponibilité, gros titres gras, boutons larges sombres). Marque : vert profond `#0F5132`, or `#C9A227`, fond clair, accents or sur sections vertes. Typographie serrée, beaucoup d'espace, coins `rounded-2xl`, ombres douces, micro-animations discrètes (respecter `prefers-reduced-motion`). Contraste AA minimum. Pas de photos inventées : utilise des illustrations SVG simples tant que je n'ai pas de vraies photos.

## Règles absolues
- Aucune affirmation fausse : pas de faux stock, faux avis, faux compteur, fausse urgence, faux prix. Les chiffres/garanties marqués `TODO` dans `lib/catalog.ts` restent à confirmer par moi.
- Pixels Meta/TikTok optionnels via variables d'environnement, jamais d'ID en dur.
- Aucun secret dans le code. Données clients uniquement vers le webhook.
- À la fin : `npm run typecheck`, `npm test`, `npm run build` doivent passer ; donne-moi les étapes pour tester le formulaire en mode « dry-run » puis avec Google Sheets.
