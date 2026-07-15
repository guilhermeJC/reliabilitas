import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { geraNonce, montaCabecalhoCsp } from './lib/csp';

// F12: negociação de locale + hreflang (alternate links) por padrão.
const intlMiddleware = createMiddleware(routing);

// DEV-051/G2 — CSP com nonce por requisição (script-src), composta com o
// next-intl. Padrão confirmado pela própria comunidade do next-intl
// (github.com/amannn/next-intl/discussions/682): gerar o nonce, construir um
// NOVO NextRequest com x-nonce + Content-Security-Policy já nos headers, e
// entregar ESSE request pro intlMiddleware — como ele não sobrescreve
// `request.headers` ao continuar (next()/rewrite()), os headers extras
// propagam pro Server Component (headers() em next/headers). O CSP também é
// setado direto no response, pro navegador de fato receber e aplicar.
// /admin fica fora do next-intl (PT-only, DEV-046) mas AGORA entra no
// matcher — também precisa do nonce, só não passa pelo roteamento de locale.
export default function middleware(request: NextRequest) {
  const nonce = geraNonce();
  const isDev = process.env.NODE_ENV === 'development';
  const csp = montaCabecalhoCsp(nonce, isDev);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);
  const requestComNonce = new NextRequest(request, { headers: requestHeaders });

  const isAdmin = request.nextUrl.pathname.startsWith('/admin');
  const response = isAdmin
    ? NextResponse.next({ request: { headers: requestHeaders } })
    : intlMiddleware(requestComNonce);

  response.headers.set('Content-Security-Policy', csp);
  return response;
}

export const config = {
  // /api segue fora (JSON não precisa de CSP de documento); /admin agora
  // entra (precisa do nonce, mesmo não passando pelo next-intl).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
