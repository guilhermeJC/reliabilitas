import * as Sentry from '@sentry/nextjs';

// G1/DEV-051/DEV-052 — Sentry free tier, só error tracking (client). Sem
// session replay nem feedback widget: mesma razão da rejeição do PostHog
// (DEV-054) — o site é cookieless/sem coleta de comportamento, e replay
// gravaria tela do visitante. NEXT_PUBLIC_SENTRY_DSN é a ÚNICA env pública
// do projeto — exceção deliberada: DSN do Sentry não é segredo (é o endpoint
// de ingestão, já visível em qualquer request de rede do SDK client-side).
// Sem DSN configurado (.env do fundador ainda não tem — pendência dele criar
// o projeto no Sentry), Sentry.init() vira no-op silencioso.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
});
