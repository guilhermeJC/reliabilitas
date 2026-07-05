import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Security by Design desde o Dia 01 (D13). CSP com 'unsafe-inline' em script-src é
// baseline temporária exigida pela hidratação do Next — endurecer com nonce no Dia 5.
// 'unsafe-eval' SOMENTE em dev (source maps do next dev); produção permanece estrita.
const isDev = process.env.NODE_ENV === 'development';
const scriptSrc = `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`;
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: `default-src 'self'; ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'`,
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
