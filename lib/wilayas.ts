export type Wilaya = { code: string; name: string };

/**
 * Les 58 wilayas en vigueur (découpage de 2021).
 * Source des 11 nouvelles wilayas ci-dessous : presse algérienne (TSA, Algérie360,
 * novembre 2025). Les numéros 59 à 69 ont été communiqués par un député et non par un
 * texte publié ; une source de mars 2026 indique que les nouvelles wilayas devraient
 * exercer leurs prérogatives à partir du 1er janvier 2027.
 */
export const WILAYAS: readonly Wilaya[] = [
  { code: '01', name: 'Adrar' },
  { code: '02', name: 'Chlef' },
  { code: '03', name: 'Laghouat' },
  { code: '04', name: 'Oum El Bouaghi' },
  { code: '05', name: 'Batna' },
  { code: '06', name: 'Béjaïa' },
  { code: '07', name: 'Biskra' },
  { code: '08', name: 'Béchar' },
  { code: '09', name: 'Blida' },
  { code: '10', name: 'Bouira' },
  { code: '11', name: 'Tamanrasset' },
  { code: '12', name: 'Tébessa' },
  { code: '13', name: 'Tlemcen' },
  { code: '14', name: 'Tiaret' },
  { code: '15', name: 'Tizi Ouzou' },
  { code: '16', name: 'Alger' },
  { code: '17', name: 'Djelfa' },
  { code: '18', name: 'Jijel' },
  { code: '19', name: 'Sétif' },
  { code: '20', name: 'Saïda' },
  { code: '21', name: 'Skikda' },
  { code: '22', name: 'Sidi Bel Abbès' },
  { code: '23', name: 'Annaba' },
  { code: '24', name: 'Guelma' },
  { code: '25', name: 'Constantine' },
  { code: '26', name: 'Médéa' },
  { code: '27', name: 'Mostaganem' },
  { code: '28', name: "M'Sila" },
  { code: '29', name: 'Mascara' },
  { code: '30', name: 'Ouargla' },
  { code: '31', name: 'Oran' },
  { code: '32', name: 'El Bayadh' },
  { code: '33', name: 'Illizi' },
  { code: '34', name: 'Bordj Bou Arréridj' },
  { code: '35', name: 'Boumerdès' },
  { code: '36', name: 'El Tarf' },
  { code: '37', name: 'Tindouf' },
  { code: '38', name: 'Tissemsilt' },
  { code: '39', name: 'El Oued' },
  { code: '40', name: 'Khenchela' },
  { code: '41', name: 'Souk Ahras' },
  { code: '42', name: 'Tipaza' },
  { code: '43', name: 'Mila' },
  { code: '44', name: 'Aïn Defla' },
  { code: '45', name: 'Naâma' },
  { code: '46', name: 'Aïn Témouchent' },
  { code: '47', name: 'Ghardaïa' },
  { code: '48', name: 'Relizane' },
  { code: '49', name: "El M'Ghair" },
  { code: '50', name: 'El Meniaa' },
  { code: '51', name: 'Ouled Djellal' },
  { code: '52', name: 'Bordj Badji Mokhtar' },
  { code: '53', name: 'Béni Abbès' },
  { code: '54', name: 'Timimoun' },
  { code: '55', name: 'Touggourt' },
  { code: '56', name: 'Djanet' },
  { code: '57', name: 'In Salah' },
  { code: '58', name: 'In Guezzam' },
] as const;

/**
 * 11 nouvelles wilayas annoncées. NON utilisées dans le formulaire tant qu'elles ne sont
 * pas opérationnelles chez vos transporteurs : un client de Bou Saâda choisit "M'Sila".
 * Pour les activer, ajoutez-les à WILAYAS après vérification avec votre transporteur.
 */
export const NEW_WILAYAS_PROVISIONAL: readonly Wilaya[] = [
  { code: '59', name: 'Aflou' },
  { code: '60', name: 'El Abiodh Sidi Cheikh' },
  { code: '61', name: 'El Aricha' },
  { code: '62', name: 'El Kantara' },
  { code: '63', name: 'Barika' },
  { code: '64', name: 'Bou Saâda' },
  { code: '65', name: 'Bir El Ater' },
  { code: '66', name: 'Ksar El Boukhari' },
  { code: '67', name: 'Ksar Chellala' },
  { code: '68', name: 'Aïn Oussara' },
  { code: '69', name: 'Messaad' },
] as const;

const BY_CODE = new Map(WILAYAS.map((w) => [w.code, w]));

export function findWilaya(code: string): Wilaya | undefined {
  return BY_CODE.get(code);
}
