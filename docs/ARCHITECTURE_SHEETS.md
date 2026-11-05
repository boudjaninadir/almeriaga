# ARCHITECTURE GOOGLE SHEETS — ALMERÍAGA (à respecter par le code)

Principe de sécurité : le site n'écrit QUE dans l'onglet `LEADS` (ajout de lignes, jamais de lecture ni de modification). Tout le reste est géré à la main par le propriétaire.

## Onglet LEADS (écrit par le site via Google Apps Script `google-apps-script/Code.gs`)
Ligne 1 = en-têtes, dans cet ordre exact :
| Col | En-tête | Source / règle |
|---|---|---|
| A | lead_id | généré par le script : `L-` + date AAAAMMJJ + numéro (ex: L-20261104-007) |
| B | recu_le | date-heure serveur (fuseau Africa/Algiers) |
| C | type | retail / wholesale / waitlist |
| D | produit | slug produit (ex: ps5-slim-1to-gta6) ; vide si non précisé |
| E | nom | |
| F | telephone | format +213XXXXXXXXX, cellule en TEXTE |
| G | wilaya_code | |
| H | wilaya | |
| I | quantite | retail uniquement |
| J | volume | wholesale uniquement (5-9, 10-24, 25-49, 50+) |
| K | boutique | wholesale, facultatif |
| L | statut | valeur initiale `Nouveau` (liste déroulante : Nouveau, À rappeler, Confirmé, Expédié, Livré, Retour, Annulé, Doublon) |
| M | notes | vide, rempli à la main |
| N | utm_source | |
| O | utm_medium | |
| P | utm_campaign | |
| Q | utm_content | |
| R | utm_term | |
| S | fbclid | |
| T | ttclid | |
| U | event_id | pour dédupliquer avec le pixel Meta |

Règles du script : verrou (LockService), toutes les cellules texte (anti-injection de formules : préfixer par `'` toute valeur commençant par = + - @), comparaison du secret partagé en temps constant, réponse JSON {ok:true}.

## Onglets gérés à la main (le site ne les touche pas)
- `PRODUITS` : slug, nom, categorie, disponibilite (Réservation / Sur commande / En stock), prix_dzd, cout_eur, stock, actif (OUI/NON).
- `COMMANDES` : commande_id, lead_id, date, produit, quantite, prix_unitaire_dzd, frais_livraison, transporteur (ZR/Ecom…), suivi, paiement (À la livraison/Encaissé), livre_le, retour_motif.
- `ARRIVAGES` (voyages) : voyage_id, date, fournisseur, nb_unites, prix_unitaire_eur, total_eur, taux_reel, douane_5pct, ifu, plafond_1800000_ok (formule).
- `FOURNISSEURS` : nom, ville, categorie, contact, statut (À vérifier / Vérifié), derniere_verification. Ne mettre que des fournisseurs réels vérifiés par le propriétaire.
- `TABLEAU_DE_BORD` : formules uniquement : leads par jour, par type, par wilaya, par utm_campaign (pour coût par lead), taux Confirmé/Livré/Retour.
- `CONFIG` : liste des statuts, wilayas, transporteurs.

## Variables d'environnement (.env.local, jamais dans le code)
`LEADS_WEBHOOK_URL` (adresse du déploiement Apps Script), `LEADS_WEBHOOK_SECRET`, + dry-run si la variable existe déjà dans route.ts.

## À faire côté code (petit)
1. Ajouter le champ optionnel `product` (slug) dans `lib/validation.ts` (ValidatedLead + validateLead, cleanText 60) et dans `LeadForm.tsx` (prop `product?: string`).
2. `app/api/leads/route.ts` envoie le lead + `product`.
3. `google-apps-script/Code.gs` écrit les colonnes A→U dans l'ordre ci-dessus.
4. Test : un lead retail, un wholesale, un waitlist en dry-run puis réel.
