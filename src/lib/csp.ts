// DEV-051/G2 — CSP com nonce por requisição em script-src (padrão oficial Next.js:
// https://nextjs.org/docs/app/guides/content-security-policy). Substitui o
// 'unsafe-inline' que existia mesmo em produção. Escopo consciente: só script-src
// ganha nonce+strict-dynamic — style-src permanece 'unsafe-inline' porque nonce
// não cobre o atributo style="" (Recharts/Radix o usam), e endurecer isso exigiria
// auditoria maior fora do escopo desta rodada.
//
// O middleware roda no Edge Runtime — `import { randomBytes } from 'crypto'`
// derruba o dev server ("edge runtime does not support Node.js 'crypto' module",
// achado ao vivo contra o dev server do fundador na porta 3000). Usar só as
// globals Web-standard (`crypto.randomUUID`, `Buffer`), que o runtime do Next
// expõe em Edge — mesmo padrão do exemplo oficial da doc.

export function geraNonce(gerador: () => string = () => crypto.randomUUID()): string {
  return Buffer.from(gerador()).toString('base64');
}

export function montaCabecalhoCsp(nonce: string, isDev: boolean): string {
  const scriptSrc = `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`;
  const diretivas = [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    // DEV-107: 'self' puro bloqueava o POST do SDK do Sentry pro endpoint de
    // ingestão — os 3 error boundaries capturavam o erro e o browser matava o
    // envio na CSP, sem nenhum aviso. Resultado: observabilidade de CLIENTE
    // era zero (o server-side não passa por CSP e sempre funcionou). Wildcard
    // de subdomínio porque o host do DSN varia por org/região (oXXXX.ingest.
    // us.sentry.io); só o domínio da ingestão, nunca '*'.
    "connect-src 'self' https://*.ingest.sentry.io https://*.ingest.us.sentry.io",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ];
  return diretivas.join('; ');
}
