# ALMERÍAGA — Guide de démarrage

Plateforme de micro-importation Espagne → Algérie. Design aligné sur la maquette Figma `zMqPU7ibdVFIy0Lt80nWeP` (22 écrans desktop/mobile).

## 1. Démarrage

```bash
npm install
cp .env.example .env.local   # renseigner les variables
npm run dev                  # http://localhost:3000
```

Variables utiles :
- `NEXT_PUBLIC_SITE_URL` (production : `https://almeriaga.vercel.app` ou domaine définitif)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` (format international sans `+`)
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_SELLER_*` (mentions légales)
- `LEADS_WEBHOOK_URL`, `LEADS_WEBHOOK_SECRET`, `LEADS_DRY_RUN`
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (connexion Google)

## 2. Vérifications

```bash
npm run typecheck
npm test
npm run lint
npm run build
```

## 3. Destinations (11 pages, desktop + mobile)

| Route | Écran |
|---|---|
| `/` | Accueil |
| `/catalogue` | Catalogue |
| `/produit/lisseur` | Fiche lisseur |
| `/produit/pack-ecouteurs` | Fiche pack écouteurs (même gabarit) |
| `/sur-commande/produit-exemple` | Produit sur commande / devis |
| `/gros` | Professionnels — gros |
| `/revendeurs` | Professionnels — revendeurs |
| `/cadre-legal` | Cadre légal |
| `/contact` | Contact |
| `/mentions-legales` | Mentions légales |
| `/merci` | Confirmation de demande |
| `/connexion` | Connexion / inscription |

Les anciennes routes `/simulateur` et `/espace-fournisseurs` redirigent vers `/gros` et `/revendeurs` : elles ne font pas partie des 22 écrans.

## 4. Identité et composants

- Tokens : `app/globals.css` — papier `#FAF8F4`, encre `#141414`, pierre `#8A8680`, craie `#E7E4DE`, accent `#E88923`.
- Typographies : Manrope ExtraBold (titres), Inter (texte), via `next/font/google` (auto-hébergées).
- Primitives : `components/ui/` — boutons, champs, badges, accordéon.
- Header/footer : `components/Navbar.tsx`, `components/Footer.tsx`.
- Carte : `components/RouteMap.tsx` (SVG original, étincelles 6,2 s, `prefers-reduced-motion`).
- Photos produits : `public/images/` (extraites de la maquette).

## 5. Formulaires et Google Sheets

Tous les formulaires utilisent `components/forms/RequestForm.tsx` et le contrat exact
`leads` : `type, product_slug, nom, telephone, wilaya, message, utm_source, utm_campaign`.
Le détail (colonnes, valeurs, revendeur sérialisé) est dans `docs/ARCHITECTURE_SHEETS.md`.

## 6. Langues

FR / AR / ES / EN + mode DZ (90 % FR, 10 % AR). Sélecteur de drapeaux dans le header,
cookie `almeriaga_locale`, HTML rendu côté serveur, RTL en arabe.
Documentation : `docs/I18N.md`.

## 7. Déploiement

1. Pousser le dépôt sur GitHub.
2. Importer sur Vercel, renseigner les variables d'environnement.
3. Déployer. Vérifier `/api/leads` en dry-run puis réel.
4. Contrôler les mentions légales et les justificatifs avant mise en ligne.
