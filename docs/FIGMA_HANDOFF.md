# HANDOFF FIGMA — implémentation

Fichier source : `zMqPU7ibdVFIy0Lt80nWeP` (Figma, accès propriétaire `Outlife Nadir`).
22 écrans = 11 destinations × desktop 1440 / mobile 390.

## Frames de référence

| Destination | Desktop | Mobile |
|---|---|---|
| Accueil `/` | `5:37063` | `5:37229` |
| Catalogue `/catalogue` | `5:37384` | `5:37512` |
| Fiche lisseur `/produit/lisseur` | `5:37629` | `5:37744` |
| Sur commande `/sur-commande/produit-exemple` | `5:37848` | `5:37956` |
| Gros `/gros` | `5:38053` | `5:38152` |
| Revendeurs `/revendeurs` | `5:38241` | `5:38352` |
| Cadre légal `/cadre-legal` | `5:38453` | `5:38566` |
| Contact `/contact` | `5:38668` | `5:38746` |
| Mentions légales `/mentions-legales` | `5:38813` | `5:38934` |
| Merci `/merci` | `5:39045` | `5:39113` |
| Connexion `/connexion` | `5:39171` | `5:39260` |
| Identité | `5:39339` | — |
| Kit UI | `5:39446` | — |
| Handoff leads & motion | `5:39731` | — |

## Tokens (identité `5:39339`)

- Papier `#FAF8F4` · Encre `#141414` · Pierre `#8A8680` · Craie `#E7E4DE` · Accent `#E88923` (`#E8B923` pour les puces).
- Manrope ExtraBold (800) pour les titres, Inter 400/500/600 pour le texte.
- Desktop : 80/48/26 px ; mobile : 44/34/26 px ; interligne 108 % ; marges 80 px desktop / 24 px mobile.
- Filets 1 px craie ; rayons 2 px ; aucune ombre décorative.

## Contrat leads (handoff `5:39731`)

Huit clés exactes : `type`, `product_slug`, `nom`, `telephone`, `wilaya`, `message`, `utm_source`, `utm_campaign`.
`type` ∈ `consommateur | devis | gros | revendeur`. Les champs revendeur (magasin, type de commerce, volume) sont sérialisés dans `message`.

## Motion

- Étincelles du hero uniquement, séquence de 6,2 s, désactivées en `prefers-reduced-motion`.
- Tilt des cartes uniquement `@media (hover:hover) and (pointer:fine)` ; pas de tilt mobile.
- Cibles tactiles ≥ 48 px ; FAQ `aria-expanded` ; menu mobile dépliable.

## Assets

Photos produit extraites des image-fills Figma et optimisées dans `public/images/`
(`catalogue-*.jpg`, `lisseur-*.jpg`). La carte du hero est redessinée en SVG original
(`components/RouteMap.tsx`).
