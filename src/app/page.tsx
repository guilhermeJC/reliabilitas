import Link from 'next/link';

// Placeholder da Fase 0 — a Home real (T01) nasce no Dia 2 com o shell UI.
export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-medium" style={{ color: 'var(--navy-700)' }}>
        RELIABILITAS
      </h1>
      <p className="mt-4 text-base leading-relaxed">
        O conhecimento de confiabilidade que a indústria precisa — acessível a todos.
      </p>
      <p className="mt-8 text-sm">
        Fase 0 (fundação). Prova do pipeline:{' '}
        <Link href="/pt/notas/cavitacao" className="underline" style={{ color: 'var(--wikilink)' }}>
          Bomba Centrífuga → Cavitação
        </Link>
      </p>
    </main>
  );
}
