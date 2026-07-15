import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

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

export default withNextIntl(nextConfig);
