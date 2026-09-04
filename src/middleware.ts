import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { geraNonce, montaCabecalhoCsp } from './lib/csp';
import { destinoCanonico } from './lib/host-canonico';

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
  // DEV-129 (achado de segurança, 04/09) — PRIMEIRA coisa do middleware: o
  // origin da Vercel atendia por fora da Cloudflare, tornando WAF, rate limit
  // de borda e allowlist de crawlers contornáveis por quem soubesse a URL.
  // Redirecionar para o domínio canônico força todo o tráfego de produção a
  // atravessar a borda. Vem antes de tudo para não gastar trabalho (nonce,
  // roteamento de locale) numa requisição que será redirigida.
  const canonico = destinoCanonico(
    request.url,
    request.headers.get('host'),
    process.env.VERCEL_ENV,
  );
  if (canonico) return NextResponse.redirect(canonico, 308);

  const nonce = geraNonce();
  const isDev = process.env.NODE_ENV === 'development';
  const csp = montaCabecalhoCsp(nonce, isDev);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);
  const requestComNonce = new NextRequest(request, { headers: requestHeaders });

  // /admin (PT-only) e /api (JSON) não passam pelo roteamento de locale; ambos
  // seguem recebendo o nonce. /api entrou no matcher em DEV-129 — sem isso, a
  // rota mais sensível a força bruta (/api/admin/login) continuaria alcançável
  // pelo origin, que é exatamente o buraco que este middleware fecha.
  const { pathname } = request.nextUrl;
  const foraDoIntl = pathname.startsWith('/admin') || pathname.startsWith('/api');
  const response = foraDoIntl
    ? NextResponse.next({ request: { headers: requestHeaders } })
    : intlMiddleware(requestComNonce);

  response.headers.set('Content-Security-Policy', csp);
  return response;
}

export const config = {
  // DEV-129: /api ENTROU no matcher. Antes ficava de fora ("JSON não precisa de
  // CSP de documento"), o que era verdade para CSP mas deixava as rotas de API
  // fora da checagem de host canônico — justamente as mais sensíveis.
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
