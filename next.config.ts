import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { withSentryConfig } from '@sentry/nextjs';

// Security by Design desde o Dia 01 (D13). Content-Security-Policy saiu daqui
// (DEV-051/G2): agora é montada por requisição no middleware.ts, com nonce em
// script-src no lugar do 'unsafe-inline' fixo que existia até aqui — ver
// src/lib/csp.ts. Os headers abaixo são estáticos e continuam valendo pra
// toda rota, incluindo /api (onde CSP de documento não se aplica).
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// G1/DEV-051 — org/project/authToken ficam undefined até o fundador criar o
// projeto no Sentry (pendência dele) e cadastrar SENTRY_ORG/SENTRY_PROJECT/
// SENTRY_AUTH_TOKEN. Sem eles, o plugin só pula o upload de source maps —
// não falha o build (silent:true evita log de aviso repetitivo até então).
export default withSentryConfig(withNextIntl(nextConfig), {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true,
  widenClientFileUpload: true,
  disableLogger: true,
});
