import { getTranslations } from 'next-intl/server';
import { notaPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';
import type { NotaResumo } from '@/lib/db/notas';

// Mecânica Obsidian (D09): quem referencia esta nota (arestas reversas do grafo).
export async function Backlinks({ notas, locale }: { notas: NotaResumo[]; locale: Locale }) {
  if (notas.length === 0) return null;
  const t = await getTranslations('nota');
  return (
    <section className="mt-8">
      <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
        {t('backlinks')}
      </h2>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {notas.map((n) => (
          <li key={n.slug}>
            <a
              href={notaPath(locale, n.slug)}
              className="inline-block rounded border bg-white px-2.5 py-1 text-[13px] transition-colors hover:border-slate-400"
              style={{ color: 'var(--wikilink)', borderColor: '#e3e8f0' }}
            >
              {n.titulo}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
