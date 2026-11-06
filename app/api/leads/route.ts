import { NextResponse } from 'next/server';
import { getDictionary } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n/config';
import { SITE } from '@/lib/site';
import { rateLimit, rememberPhone, wasPhoneSeenRecently } from '@/lib/rate-limit';
import { validateLead } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 8192;
const RATE_LIMIT_MAX = 5; // requêtes
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // par 10 minutes et par IP
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const MIN_FILL_TIME_MS = 1000;
const WEBHOOK_TIMEOUT_MS = 8000;

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
    allowed.add(new URL(SITE.url).host.toLowerCase());
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
  const defaultApi = getDictionary('fr').api;

  if (!isAllowedOrigin(req)) {
    return reply({ ok: false, code: 'forbidden', message: defaultApi.forbidden }, 403);
  }

  if (!(req.headers.get('content-type') ?? '').toLowerCase().includes('application/json')) {
    return reply({ ok: false, code: 'unsupported_media_type', message: defaultApi.invalidFormat }, 415);
  }

  const ip = clientIp(req);
  const limit = rateLimit(`ip:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!limit.allowed) {
    return reply(
      { ok: false, code: 'rate_limited', message: defaultApi.rateLimited },
      429,
      { 'Retry-After': String(limit.retryAfterSec) },
    );
  }

  let text: string;
  try {
    text = await req.text();
  } catch {
    return reply({ ok: false, code: 'bad_request', message: defaultApi.unreadable }, 400);
  }
  if (Buffer.byteLength(text, 'utf8') > MAX_BODY_BYTES) {
    return reply({ ok: false, code: 'payload_too_large', message: defaultApi.tooLarge }, 413);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return reply({ ok: false, code: 'bad_request', message: defaultApi.invalidRequest }, 400);
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return reply({ ok: false, code: 'bad_request', message: defaultApi.invalidRequest }, 400);
  }
  const body = parsed as ApiBody;

  // Langue de la demande : pilote les messages d'erreur renvoyés au formulaire.
  const locale = isLocale(body.locale) ? body.locale : 'fr';
  const t = getDictionary(locale);

  // Piège à robots : champ invisible pour un humain. On répond "ok" pour ne rien révéler.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return reply({ ok: true });
  }

  // Un humain met plus d'une seconde à remplir le formulaire.
  const elapsedMs = Number(body.elapsedMs);
  if (!Number.isFinite(elapsedMs) || elapsedMs < MIN_FILL_TIME_MS) {
    return reply({ ok: false, code: 'too_fast', message: t.api.tooFast }, 429);
  }

  const result = validateLead(body, t.request.errors);
  if (!result.ok) {
    return reply(
      { ok: false, code: 'validation_error', message: t.api.validationSummary, fieldErrors: result.errors },
      422,
    );
  }
  const { lead } = result;

  // Double envoi (double clic, rafraîchissement) : on confirme sans créer de doublon.
  if (wasPhoneSeenRecently(`${lead.type}:${lead.telephone}`, DUPLICATE_WINDOW_MS)) {
    return reply({ ok: true, duplicate: true });
  }

  if (process.env.LEADS_DRY_RUN === 'true') {
    console.info(
      '[leads:dry-run]',
      lead.type,
      maskedSummary(lead.nom, lead.telephone),
      `wilaya=${lead.wilaya}`,
      `slug=${lead.product_slug || '-'}`,
      `locale=${locale}`,
    );
    rememberPhone(`${lead.type}:${lead.telephone}`);
    return reply({ ok: true, dryRun: true });
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  const webhookSecret = process.env.LEADS_WEBHOOK_SECRET;
  let webhookIsHttps = false;
  try {
    webhookIsHttps = Boolean(webhookUrl) && new URL(webhookUrl as string).protocol === 'https:';
  } catch {
    webhookIsHttps = false;
  }
  if (!webhookUrl || !webhookSecret || !webhookIsHttps) {
    console.error('[leads] LEADS_WEBHOOK_URL (https) ou LEADS_WEBHOOK_SECRET manquant ou invalide.');
    return reply({ ok: false, code: 'misconfigured', message: t.api.misconfigured }, 503);
  }

  let stored = false;
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        secret: webhookSecret,
        // Contrat exact : 8 clés, aucune transformation côté Apps Script.
        lead,
      }),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      cache: 'no-store',
    });
    if (response.ok) {
      const data = (await response.json().catch(() => null)) as { ok?: boolean } | null;
      stored = data?.ok === true;
    } else {
      console.error('[leads] webhook HTTP', response.status);
    }
  } catch (error) {
    console.error('[leads] webhook error:', error instanceof Error ? error.name : 'unknown');
  }

  if (!stored) {
    return reply(
      { ok: false, code: 'upstream_error', message: t.api.upstream },
      502,
    );
  }

  rememberPhone(`${lead.type}:${lead.telephone}`);
  return reply({ ok: true });
}
