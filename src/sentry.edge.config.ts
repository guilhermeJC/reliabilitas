import * as Sentry from '@sentry/nextjs';

// G1/DEV-051/DEV-052 — cobre o middleware.ts (roda em Edge Runtime).
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
});
