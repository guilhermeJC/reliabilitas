import * as Sentry from '@sentry/nextjs';

// G1/DEV-051 — registra o Sentry por runtime (Next 15 App Router). Requer
// @sentry/nextjs >= 8.28 (instalado: ver package.json) + Next >= 15.
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
