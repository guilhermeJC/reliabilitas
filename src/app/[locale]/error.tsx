'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

// G1/DEV-051 — error boundary do segmento [locale]. Client Component por
// exigência do App Router (precisa de `reset()`) — por isso sem
// next-intl/server; texto bilíngue fixo em vez de nova chave em
// messages/*.json (escopo consciente: página de erro é caminho raro por
// definição — o que importa aqui é reportar ao Sentry, não a i18n completa).
export default function ErroLocale({
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
    <div className="px-6 py-16">
      <div
        className="mx-auto max-w-xl rounded-lg border bg-white p-8 text-center"
        style={{ borderColor: '#e3e8f0' }}
      >
        <p className="font-mono text-sm text-slate-400">500</p>
        <h1 className="mt-1 text-xl font-medium" style={{ color: 'var(--navy-700)' }}>
          Algo deu errado / Something went wrong
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          A equipe já foi notificada. Tente novamente em instantes.
          <br />
          Our team has been notified. Please try again shortly.
        </p>
        <button
          onClick={reset}
          className="mt-5 rounded border px-4 py-2 text-sm"
          style={{ borderColor: 'var(--wikilink)', color: 'var(--wikilink)' }}
        >
          Tentar novamente / Try again
        </button>
      </div>
    </div>
  );
}
