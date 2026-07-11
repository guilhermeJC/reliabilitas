import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// F12: negociação de locale + hreflang (alternate links) por padrão.
// Matcher exclui /api (health check futuro — G1), /admin (painel do fundador,
// PT-only e fora do next-intl — DEV-046), assets e internals do Next.
export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
