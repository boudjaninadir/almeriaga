/**
 * Adaptateur Google Sheets (spec V4 §4) : ajout de lignes via l'API REST v4,
 * authentification compte de service (JWT RS256, aucune dépendance npm).
 *
 * Env :
 *  - GOOGLE_SHEET_ID            : identifiant du classeur.
 *  - GOOGLE_SERVICE_ACCOUNT_B64 : JSON du compte de service encodé en base64.
 * Sans configuration, appendRow() retourne false (repli Supabase côté API leads).
 *
 * Onglets attendus : leads_gros, leads_detail, leads_abonnement,
 * anne_procedure, fournisseurs_eu, produits_anae, fournisseurs_dz.
 */
const SHEET_ID = (process.env.GOOGLE_SHEET_ID ?? '').trim();
const SERVICE_B64 = (process.env.GOOGLE_SERVICE_ACCOUNT_B64 ?? '').trim();
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

export const LEAD_SHEETS = {
  gros: 'leads_gros',
  gros_price: 'leads_gros',
  revendeur: 'leads_gros',
  consommateur: 'leads_detail',
  devis: 'leads_detail',
  abonnement: 'leads_abonnement',
} as const;

export function isSheetsConfigured(): boolean {
  return Boolean(SHEET_ID && SERVICE_B64);
}

function b64url(buf: Buffer): string {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function getAccessToken(): Promise<string | null> {
  if (!isSheetsConfigured()) return null;
  try {
    const sa = JSON.parse(Buffer.from(SERVICE_B64, 'base64').toString('utf8')) as {
      client_email?: string;
      private_key?: string;
      token_uri?: string;
    };
    if (!sa.client_email || !sa.private_key) return null;
    const crypto = await import('node:crypto');
    const now = Math.floor(Date.now() / 1000);
    const claims = { iss: sa.client_email, scope: SCOPE, aud: sa.token_uri ?? 'https://oauth2.googleapis.com/token', exp: now + 3600, iat: now };
    const head = b64url(Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })));
    const payload = b64url(Buffer.from(JSON.stringify(claims)));
    const signature = crypto.sign('RSA-SHA256', Buffer.from(`${head}.${payload}`), sa.private_key);
    const jwt = `${head}.${payload}.${b64url(signature)}`;
    const res = await fetch(sa.token_uri ?? 'https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { access_token?: string };
    return data.access_token ?? null;
  } catch {
    return null;
  }
}

/** Ajoute une ligne (tableau de valeurs) à l'onglet donné. */
export async function appendRow(tab: string, values: readonly (string | number)[]): Promise<boolean> {
  const token = await getAccessToken();
  if (!token) return false;
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(tab)}!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify({ values: [values] }),
      cache: 'no-store',
    });
    return res.ok;
  } catch {
    return false;
  }
}
