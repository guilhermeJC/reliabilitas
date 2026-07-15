import * as Sentry from '@sentry/nextjs';

// G1/DEV-051/DEV-052 — mesmo DSN público do client (não é segredo, ver
// instrumentation-client.ts). Sem session replay (server não tem tela pra
// gravar); tracesSampleRate baixo por padrão.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
});
