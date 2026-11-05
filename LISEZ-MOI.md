# ALMERÍAGA v2 — Guide de démarrage et d'administration

## 1. Démarrage rapide (Windows)
1. Ouvrir le dossier du projet dans VS Code.
2. Installer les dépendances : `npm install`
3. Configurer les variables d'environnement : copiez `.env.example` en `.env.local` et remplissez vos clés (`LEADS_WEBHOOK_URL`, `LEADS_WEBHOOK_SECRET`, etc.).
4. Lancer le serveur de développement : `npm run dev` (http://localhost:3000)

## 2. Commandes de vérification
- Typecheck : `npm run typecheck`
- Tests : `npm test`
- Build de production : `npm run build`

## 3. Comment ajouter un produit (`lib/catalog.ts`)
Ouvrez `lib/catalog.ts` et ajoutez un nouvel objet dans le tableau `PRODUCTS` :
```ts
{
  slug: 'mon-nouveau-produit',
  name: 'Nom complet du produit',
  shortName: 'Nom court',
  priceFromDzd: null, // ou nombre en DZD si fixe
  availability: 'OnDemand', // 'PreOrder' | 'OnDemand' | 'OnQuote' | 'AtRelease' | 'InStock'
  warrantyMonths: 12,
  pack: [
    { icon: 'console', title: 'Élément 1', body: 'Description...' }
  ]
}
```

## 4. Comment remplacer les illustrations par de vraies photos (`public/images/`)
Placez vos fichiers au format WebP ou PNG dans le dossier `public/images/` :
- `ps5-slim.webp` (remplace l'illustration PS5 Slim)
- `dualsense.webp` (manette)
- `quest.webp` (casque VR)
- `gta6-fond.webp` (fond ambiance GTA VI)
- `carte-recto.png` et `carte-verso.png` (pour la carte de visite interactive 3D dans "À propos")
Si le fichier existe, le composant l'affiche automatiquement à la place du SVG de secours.

## 5. Comment ajouter un vrai fournisseur vérifié (`lib/suppliers-demo.ts` ou tableur)
Mettez à jour `lib/suppliers-demo.ts` avec vos fournisseurs réels vérifiés par le propriétaire, en passant le statut à `Vérifié`.

## 6. Brancher Google Sheets (Google Apps Script)
1. Créez un Google Sheet avec un onglet nommé `Leads`.
2. Ouvrez Extensions > Apps Script, collez le code de `google-apps-script/Code.gs`.
3. Définissez la propriété du script `LEADS_WEBHOOK_SECRET` avec le même secret que dans votre `.env.local` (`LEADS_WEBHOOK_SECRET`).
4. Déployez en tant que Web App (accès : « Tout le monde »). Copiez l'URL de déploiement dans `LEADS_WEBHOOK_URL`.

## 7. Déploiement sur Vercel
1. Poussez votre code sur GitHub.
2. Importez le projet sur Vercel.
3. Renseignez les variables d'environnement dans les paramètres du projet Vercel (`LEADS_WEBHOOK_URL`, `LEADS_WEBHOOK_SECRET`, etc.).
4. Lancez le déploiement.

