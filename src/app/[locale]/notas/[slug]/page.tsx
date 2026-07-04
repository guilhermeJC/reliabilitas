import { notFound } from 'next/navigation';
import { getNota } from '@/lib/db/notas';
import { renderNoteHtml } from '@/lib/markdown/render';
import { LOCALES, type Locale } from '@/lib/content/schema';

// Página de nota da Fase 0 — prova ponta a ponta (MD → banco → SSR).
// O layout definitivo (T02/T03, shell navy + árvore + seletor de níveis) nasce no Dia 2.
export const dynamic = 'force-dynamic';

interface FwA {
  categoria?: string;
}
interface FwB {
  decisao?: string;
  periodicidade?: string;
}

export default async function NotaPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();

  const nota = await getNota(slug, locale as Locale);
  if (!nota) notFound();

  const fwA = nota.frontmatter.fw_a as FwA | undefined;
  const fwB = nota.frontmatter.fw_b as FwB | undefined;
  const iso = nota.frontmatter.iso14224_code as string | undefined;
  // Conteúdo autoral do curador (repo → ingest validado); ver nota de segurança em render.ts
  const html = renderNoteHtml(nota.corpo_md, nota.locale as Locale);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <nav className="mb-4 flex flex-wrap gap-1 text-xs">
        {nota.taxonomia.map((pai) => (
          <a
            key={pai}
            href={`/${nota.locale}/notas/${pai}`}
            className="rounded-full border px-2 py-0.5"
            style={{ color: 'var(--wikilink)', borderColor: '#d3dae6' }}
          >
            {pai}
          </a>
        ))}
      </nav>

      <h1 className="text-3xl font-medium" style={{ color: 'var(--navy-900)' }}>
        {nota.titulo}
      </h1>

      <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
        <span className="rounded px-2 py-1 text-white" style={{ background: 'var(--navy-700)' }}>
          {nota.tipo_nota}
        </span>
        {iso && (
          <span className="rounded border px-2 py-1" style={{ borderColor: '#d3dae6' }}>
            ISO 14224: {iso}
          </span>
        )}
        {fwA?.categoria && (
          <span className="rounded px-2 py-1 text-white" style={{ background: 'var(--fw-a)' }}>
            Fw A · {fwA.categoria}
          </span>
        )}
        {fwB?.decisao && (
          <span className="rounded px-2 py-1 text-white" style={{ background: 'var(--fw-b)' }}>
            Fw B · {fwB.decisao} {fwB.periodicidade ? `(${fwB.periodicidade})` : ''}
          </span>
        )}
      </div>

      <article
        className="nota-corpo mt-8 rounded-lg border bg-white p-8"
        style={{ borderColor: '#e3e8f0' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
