'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

// G1/DEV-051 — error boundary do /admin (PT-only, fora do next-intl — DEV-046).
export default function ErroAdmin({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
      <h1>Algo deu errado no painel</h1>
      <p>A equipe já foi notificada.</p>
      <button
        onClick={reset}
        style={{
          marginTop: '1rem',
          border: '1px solid #ccc',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
        }}
      >
        Tentar novamente
      </button>
    </div>
  );
}
