import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buscar, type ResultadoBusca } from '@/lib/db/busca';
import { listPublicadas } from '@/lib/db/notas';
import { normalizaTermo, parsePagina, splitTrecho, RESULTADOS_POR_PAGINA } from '@/lib/busca';
import { buscaPath, notaPath } from '@/lib/routes';
import { Breadcrumb } from '@/components/breadcrumb';
import type { Locale } from '@/lib/content/schema';

// T05 — busca server-side (F04). Form GET puro: funciona sem JavaScript e a URL
// é compartilhável. Resultados noindex (BR-010: crawlers indexam o CONTEÚDO,
// nunca páginas de resultado). ISR não se aplica (query dinâmica).
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string | string[]; p?: string | string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'busca' });
  return { title: t('titulo'), robots: { index: false } };
}

function Trecho({ trecho }: { trecho: string }) {
  // Segmentos de texto React — o trecho do ts_headline NUNCA vira HTML cru.
  return (
    <p className="mt-1 text-sm leading-relaxed text-slate-600">
      {splitTrecho(trecho).map((s, i) =>
        s.marcado ? (
          <mark key={i} className="rounded-sm bg-amber-100 px-0.5 font-medium text-slate-800">
            {s.texto}
          </mark>
        ) : (
          <span key={i}>{s.texto}</span>
        ),
      )}
    </p>
  );
}

function Resultado({
  nota,
  titulos,
  locale,
}: {
  nota: ResultadoBusca;
  titulos: Map<string, string>;
  locale: Locale;
}) {
  return (
    <article className="rounded-lg border bg-white p-4" style={{ borderColor: '#e3e8f0' }}>
      <div className="flex items-baseline gap-2">
        <span
          className="rounded px-2 py-0.5 text-[11px] font-medium text-white"
          style={{ background: 'var(--navy-700)' }}
        >
          {nota.tipo_nota}
        </span>
        <a
          href={notaPath(locale, nota.slug)}
          className="text-base font-medium underline-offset-2 hover:underline"
          style={{ color: 'var(--wikilink)' }}
        >
          {nota.titulo}
        </a>
      </div>
      <Trecho trecho={nota.trecho} />
      <div className="mt-2">
        <Breadcrumb taxonomia={nota.taxonomia} titulos={titulos} locale={locale} />
      </div>
    </article>
  );
}

export default async function BuscaPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('busca');

  const sp = await searchParams;
  const termo = normalizaTermo(sp.q);
  const pagina = parsePagina(sp.p);

  const [resultados, acervo] = await Promise.all([
    termo ? buscar(termo, locale as Locale, pagina) : Promise.resolve([]),
    listPublicadas(locale as Locale),
  ]);
  const titulos = new Map(acervo.map((n) => [n.slug, n.titulo]));
  const handbooks = acervo.filter((n) => n.tipo_nota === 'tipo');

  return (
    <div className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-medium" style={{ color: 'var(--navy-900)' }}>
          {t('titulo')}
        </h1>

        <form action={buscaPath(locale as Locale)} method="get" className="mt-4 flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={termo ?? ''}
            placeholder={t('placeholder')}
            aria-label={t('titulo')}
            className="w-full rounded-md border bg-white px-3 py-2 text-sm"
            style={{ borderColor: '#d3dae6' }}
          />
          <button
            type="submit"
            className="shrink-0 rounded-md px-4 py-2 text-sm font-medium text-white"
            style={{ background: 'var(--navy-700)' }}
          >
            {t('botao')}
          </button>
        </form>

        {termo && resultados.length > 0 && (
          <>
            <p className="mt-6 text-sm text-slate-500">
              {t('resultadosPara', { termo })}
              {pagina > 1 && <> · {t('pagina', { n: pagina })}</>}
            </p>
            <div className="mt-3 space-y-3">
              {resultados.map((r) => (
                <Resultado key={r.slug} nota={r} titulos={titulos} locale={locale as Locale} />
              ))}
            </div>
            <nav className="mt-6 flex justify-between text-sm">
              <span>
                {pagina > 1 && (
                  <a
                    href={buscaPath(locale as Locale, termo, pagina - 1)}
                    style={{ color: 'var(--wikilink)' }}
                  >
                    {t('anterior')}
                  </a>
                )}
              </span>
              <span>
                {resultados.length === RESULTADOS_POR_PAGINA && (
                  <a
                    href={buscaPath(locale as Locale, termo, pagina + 1)}
                    style={{ color: 'var(--wikilink)' }}
                  >
                    {t('proxima')}
                  </a>
                )}
              </span>
            </nav>
          </>
        )}

        {termo && resultados.length === 0 && (
          <div
            className="mt-6 rounded-lg border bg-white p-6 text-sm text-slate-600"
            style={{ borderColor: '#e3e8f0' }}
          >
            <p className="font-medium" style={{ color: 'var(--navy-700)' }}>
              {t('nenhum', { termo })}
            </p>
            <p className="mt-2">{t('dica')}</p>
            {handbooks.length > 0 && (
              <p className="mt-3">
                {t('sugestoes')}{' '}
                {handbooks.map((h, i) => (
                  <span key={h.slug}>
                    {i > 0 && ' · '}
                    <a
                      href={notaPath(locale as Locale, h.slug)}
                      style={{ color: 'var(--wikilink)' }}
                    >
                      {h.titulo}
                    </a>
                  </span>
                ))}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
