import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { listFontesPublicadas } from '@/lib/db/notas';
import { montaIndiceNormas } from '@/lib/content/normas-index';
import { notaPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// T07 (resto do Dia 5, 24/07) — índice curado das normas técnicas citadas no
// acervo (DESIGN_wireframe §2). Reaproveita a mesma classificação heurística
// já usada no rodapé de cada nota (agrupaFontes/fontes.ts), agregada em nível
// de site por src/lib/content/normas-index.ts. Indexável (SEO/GEO).

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'normas' });
  return { title: t('titulo'), description: t('sub') };
}

export default async function NormasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('normas');
  const notas = await listFontesPublicadas(locale as Locale);
  const indice = montaIndiceNormas(notas);

  return (
    <div className="px-4 py-10 md:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-medium" style={{ color: 'var(--navy-900)' }}>
          {t('titulo')}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('sub')}</p>

        {indice.length === 0 ? (
          <p className="mt-8 text-sm text-slate-500">{t('vazio')}</p>
        ) : (
          <ul className="mt-8 space-y-4">
            {indice.map((item) => (
              <li
                key={item.fonte}
                className="rounded-lg border bg-white p-4"
                style={{ borderColor: '#e3e8f0' }}
              >
                <p className="text-[15px] leading-relaxed text-slate-800">{item.fonte}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.1em] text-slate-500">
                  {t('citadaEm', { n: item.notas.length })}
                </p>
                <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                  {item.notas.map((n) => (
                    <li key={n.slug}>
                      <a
                        href={notaPath(locale as Locale, n.slug)}
                        className="hover:underline"
                        style={{ color: 'var(--wikilink)' }}
                      >
                        {n.titulo}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
