import { NextResponse, type NextRequest } from 'next/server';

/**
 * Protection des modules internes (/simulateur et /admin/suivi).
 *
 * - Sans ADMIN_USER ou ADMIN_PASSWORD, les routes répondent 404 (elles n'existent pas).
 * - Sinon, authentification HTTP Basic (le navigateur affiche une demande de connexion).
 * - Toutes les réponses de ces routes portent `X-Robots-Tag: noindex, nofollow`.
 */
const PROTECTED_PREFIXES = ['/simulateur', '/admin'] as const;

function notFound(): NextResponse {
  return new NextResponse('Not Found', {
    status: 404,
    headers: { 'X-Robots-Tag': 'noindex, nofollow' },
  });
}

function unauthorized(): NextResponse {
  return new NextResponse('Authentification requise.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Almeriaga - espace prive", charset="UTF-8"',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    },
  });
}

/** Comparaison à durée constante, sans dépendance Node (compatible Edge). */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) {
    difference |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return difference === 0;
}

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (!isProtected) return NextResponse.next();

  const expectedUser = (process.env.ADMIN_USER ?? '').trim();
  const expectedPassword = (process.env.ADMIN_PASSWORD ?? '').trim();
  if (!expectedUser || !expectedPassword) return notFound();

  const header = request.headers.get('authorization') ?? '';
  if (!header.toLowerCase().startsWith('basic ')) return unauthorized();

  let decoded = '';
  try {
    decoded = atob(header.slice(6).trim());
  } catch {
    return unauthorized();
  }

  const separator = decoded.indexOf(':');
  if (separator < 0) return unauthorized();

  const user = decoded.slice(0, separator);
  const password = decoded.slice(separator + 1);

  if (!safeEqual(user, expectedUser) || !safeEqual(password, expectedPassword)) return unauthorized();

  const response = NextResponse.next();
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

export const config = {
  matcher: ['/simulateur', '/simulateur/:path*', '/admin', '/admin/:path*'],
};
