'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

// G1/DEV-051 — último recurso: só dispara se o ROOT layout em si quebrar
// (extremamente raro). Substitui a árvore inteira — precisa do próprio
// <html>/<body> — de propósito sem depender de globals.css/fontes/Tailwind
// (se a causa da quebra foi algo no layout raiz, reimportar as mesmas
// dependências aqui poderia repetir a falha).
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="pt">
      <body
        style={{ fontFamily: 'system-ui, sans-serif', padding: '4rem 1.5rem', textAlign: 'center' }}
      >
        <h1>Algo deu muito errado / Something went very wrong</h1>
        <p>A equipe já foi notificada. / Our team has been notified.</p>
      </body>
    </html>
  );
}
