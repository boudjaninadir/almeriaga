# ARCHITECTURE GOOGLE SHEETS — ALMERÍAGA

Source de vérité : handoff Figma `5:39731` (« Contrat exact · table leads »).
Le site n'écrit **que** dans l'onglet `Leads`, en ajout de lignes. Aucune lecture, aucune modification.

## Onglet LEADS — 8 colonnes, dans cet ordre

| Col | Clé exacte | Source | Valeur / règle |
|---|---|---|---|
| A | `type` | métadonnée cachée | `consommateur` · `devis` · `gros` · `revendeur` |
| B | `product_slug` | métadonnée cachée | slug de la fiche (`lisseur`, `produit-exemple`) ; chaîne vide sinon |
| C | `nom` | saisie visible | nom de la personne, distinct du magasin |
| D | `telephone` | saisie visible | format `+213XXXXXXXXX`, cellule en TEXTE |
| E | `wilaya` | saisie visible | code `13` (Tlemcen), `22` (Sidi Bel Abbès) ou `31` (Oran) |
| F | `message` | saisie visible / composée | message libre ; données revendeur sérialisées ici |
| G | `utm_source` | métadonnée cachée | chaîne vide si absente |
| H | `utm_campaign` | métadonnée cachée | chaîne vide si absente |

> **Ne pas ajouter** de clé `magasin`, `commerce`, `volume`, `consentement`, `panier` ou `authentification` : le handoff les exclut explicitement.

## Correspondance des formulaires

| Écran | `type` | `product_slug` |
|---|---|---|
| Fiche lisseur | `consommateur` | `lisseur` |
| Fiche pack écouteurs | `consommateur` | `pack-ecouteurs` |
| Sur commande | `devis` | `produit-exemple` |
| Gros | `gros` | `""` |
| Revendeurs | `revendeur` | `""` |

## Revendeurs — UI distincte, schéma identique

Trois saisies visibles (nom du magasin, type de commerce, volume envisagé) sont
**sérialisées dans `message`**, avec l'éventuel message libre :

```
Nom du magasin : Ma boutique
Type de commerce : Boutique de jeux vidéo
Volume envisagé : 20/mois
```

`nom`, `telephone` et `wilaya` restent leurs propres colonnes. Aucun champ métier
supplémentaire n'est ajouté à `leads`.

## Sécurité et robustesse (Apps Script)

- `LockService` pour éviter les écritures concurrentes.
- Secret partagé comparé à `LEADS_WEBHOOK_SECRET`.
- `formulaSafe` : préfixe `'` toute valeur commençant par `= + - @` (anti-injection de formules).
- Colonnes `telephone` et `wilaya` forcées en texte.
- Réponse JSON `{ ok: true }` ; le site considère l'envoi réussi uniquement si `ok === true`.

## Variables d'environnement

`LEADS_WEBHOOK_URL` (déploiement Apps Script en HTTPS), `LEADS_WEBHOOK_SECRET`,
`LEADS_DRY_RUN=true` pour tester sans écrire.

## Test

1. `LEADS_DRY_RUN=true npm run dev`, soumettre un formulaire, vérifier le log serveur.
2. Passer en réel, soumettre, vérifier la ligne A→H dans `Leads`.
3. Tester un lead par type : consommateur, devis, gros, revendeur.
