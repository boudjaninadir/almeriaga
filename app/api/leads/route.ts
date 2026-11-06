import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { SITE_URL } from '@/lib/site-config';
import { validateLead } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 4096;
const RATE_LIMIT_MAX = 5; // requêtes
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // par 10 minutes et par IP
const MIN_FILL_TIME_MS = 1000;
const SUPABASE_TIMEOUT_MS = 8000;

/**
 * Insertion via l'API REST Supabase avec la clé anonyme.
 * La politique RLS de lib/supabase-sql-leads.sql n'autorise QUE l'insertion :
 * aucune lecture publique n'est possible.
 */
const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim().replace(/\/$/, '');
const SUPABASE_ANON_KEY = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '').trim();


type ApiBody = Record<string, unknown>;

function reply(body: ApiBody, status = 200, headers: Record<string, string> = {}) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

/** Protège contre les appels cross-site depuis un navigateur (CSRF). Ne remplace pas le rate limit. */
function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return false;

  let originHost: string;
  try {
    originHost = new URL(origin).host.toLowerCase();
  } catch {
    return false;
  }

  const allowed = new Set<string>();
  const host = req.headers.get('host');
  if (host) allowed.add(host.toLowerCase());
  try {
    allowed.add(new URL(SITE_URL).host.toLowerCase());
  } catch {
    /* SITE.url invalide : on ignore */
  }
  for (const entry of (process.env.ALLOWED_ORIGINS ?? '').split(',')) {
    const trimmed = entry.trim();
    if (!trimmed) continue;
    try {
      allowed.add(new URL(trimmed).host.toLowerCase());
    } catch {
      allowed.add(trimmed.toLowerCase());
    }
  }
  return allowed.has(originHost);
}

function maskedSummary(name: string, phone: string): string {
  return `${name.slice(0, 1)}*** / ***${phone.slice(-3)}`;
}

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) {
    return reply({ ok: false, code: 'forbidden', message: 'Origine non autorisée.' }, 403);
  }

  if (!(req.headers.get('content-type') ?? '').toLowerCase().includes('application/json')) {
    return reply({ ok: false, code: 'unsupported_media_type', message: 'Format de requête invalide.' }, 415);
  }

  const ip = clientIp(req);
  const limit = rateLimit(`ip:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!limit.allowed) {
    return reply(
      { ok: false, code: 'rate_limited', message: 'Trop de tentatives. Réessayez dans quelques minutes.' },
      429,
      { 'Retry-After': String(limit.retryAfterSec) },
    );
  }

  let text: string;
  try {
    text = await req.text();
  } catch {
    return reply({ ok: false, code: 'bad_request', message: 'Requête illisible.' }, 400);
  }
  if (Buffer.byteLength(text, 'utf8') > MAX_BODY_BYTES) {
    return reply({ ok: false, code: 'payload_too_large', message: 'Requête trop volumineuse.' }, 413);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return reply({ ok: false, code: 'bad_request', message: 'Requête invalide.' }, 400);
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return reply({ ok: false, code: 'bad_request', message: 'Requête invalide.' }, 400);
  }
  const body = parsed as ApiBody;

  // Piège à robots : champ invisible pour un humain. On répond "ok" pour ne rien révéler.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return reply({ ok: true });
  }

  // Un humain met plus d'une seconde à remplir le formulaire.
  const elapsedMs = Number(body.elapsedMs);
  if (!Number.isFinite(elapsedMs) || elapsedMs < MIN_FILL_TIME_MS) {
    return reply({ ok: false, code: 'too_fast', message: 'Merci de réessayer dans un instant.' }, 429);
  }

  const result = validateLead(body);
  if (!result.ok) {
    return reply(
      { ok: false, code: 'validation_error', message: 'Certains champs sont invalides.', fieldErrors: result.errors },
      422,
    );
  }
  const { lead } = result;

  if (process.env.LEADS_DRY_RUN === 'true') {
    console.info(
      '[leads:dry-run]',
      lead.type,
      maskedSummary(lead.name, lead.phone),
      `wilaya=${lead.wilaya}`,
      `produit=${lead.product_slug || '—'}`,
    );
    return reply({ ok: true, dryRun: true });
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('[leads] NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY manquant.');
    return reply(
      { ok: false, code: 'misconfigured', message: 'Service momentanément indisponible. Écrivez-nous sur WhatsApp.' },
      503,
    );
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'content-type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(SUPABASE_TIMEOUT_MS),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[leads] Supabase HTTP', response.status);
      return reply(
        { ok: false, code: 'upstream_error', message: 'Nous n’avons pas pu enregistrer votre demande. Écrivez-nous sur WhatsApp.' },
        502,
      );
    }
  } catch (error) {
    console.error('[leads] erreur Supabase:', error instanceof Error ? error.name : 'unknown');
    return reply(
      { ok: false, code: 'upstream_error', message: 'Nous n’avons pas pu enregistrer votre demande. Écrivez-nous sur WhatsApp.' },
      502,
    );
  }

  return reply({ ok: true });
}

