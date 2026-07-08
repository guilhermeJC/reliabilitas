import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { listPublicadas } from '@/lib/db/notas';
import { clusterAcervo } from '@/lib/content/ativos';
import { DOACAO_LINKS } from '@/lib/apoio';
import { buscaPath, calculadorasPath, metodoPath, notaPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// T01 v2 (revisão 4 do fundador): hero navy com busca central; acervo
// CLUSTERIZADO pelos grupos funcionais da taxonomia (escala para 100+ ativos);
// método com os dois frameworks CLICÁVEIS + CTA do seletor de estratégia.
// Render dinâmico herdado do layout [locale] (build hermético; ISR no Dia 5/G6).

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tBusca = await getTranslations('busca');

  const acervo = await listPublicadas(locale as Locale);
  const { clusters, demaisClasses } = clusterAcervo(acervo, locale as Locale);

  return (
    <div>
      {/* Hero — sala de controle: navy, busca no centro */}
      <section className="px-6 py-14" style={{ background: 'var(--navy-700)' }}>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-medium tracking-[0.14em] text-white">{t('titulo')}</h1>
          <p className="mt-3 text-base leading-relaxed text-slate-200">{t('sub')}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">{t('heroLinha')}</p>
          <form
            action={buscaPath(locale as Locale)}
            method="get"
            className="mx-auto mt-6 flex max-w-xl gap-2"
          >
            <input
              type="search"
              name="q"
              placeholder={tBusca('placeholder')}
              aria-label={tBusca('titulo')}
              className="w-full rounded-md border-0 bg-white px-4 py-2.5 text-sm text-slate-800"
            />
            <button
              type="submit"
              className="shrink-0 rounded-md px-5 py-2.5 text-sm font-medium text-white"
              style={{ background: 'var(--accent)' }}
            >
              {tBusca('botao')}
            </button>
          </form>
        </div>
      </section>

      <div className="px-4 py-10 md:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Acervo clusterizado por grupo funcional (revisão 4 — item 1) */}
          <h2
            className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500"
            id="ativos"
          >
            {t('ativosTitulo')}
          </h2>
          <p className="mt-2 text-sm text-slate-600">{t('ativosIntro')}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {clusters.map((cluster) => {
              const publicados = cluster.itens.filter((i) => i.slug).length;
              const titulo = cluster.titulo ?? t('componentesCluster');
              return (
                <section
                  key={cluster.slug}
                  className="rounded-lg border border-l-4 bg-white p-4"
                  style={{ borderColor: '#d3dae6', borderLeftColor: 'var(--navy-700)' }}
                >
                  <header className="flex items-baseline justify-between gap-2">
                    {cluster.titulo ? (
                      <a
                        href={notaPath(locale as Locale, cluster.slug)}
                        className="text-sm font-medium hover:underline"
                        style={{ color: 'var(--navy-700)' }}
                      >
                        {titulo}
                      </a>
                    ) : (
                      <span className="text-sm font-medium" style={{ color: 'var(--navy-700)' }}>
                        {titulo}
                      </span>
                    )}
                    <span className="shrink-0 font-mono text-[11px] text-slate-400">
                      {t('handbooks', { count: publicados })}
                    </span>
                  </header>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {cluster.itens.map((item) =>
                      item.slug ? (
                        <li key={item.titulo}>
                          <a
                            href={notaPath(locale as Locale, item.slug)}
                            className="block rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:border-slate-400"
                            style={{ borderColor: '#d3dae6', color: 'var(--navy-700)' }}
                          >
                            {item.titulo}
                          </a>
                        </li>
                      ) : (
                        <li key={item.titulo}>
                          <span
                            className="block rounded-md border border-dashed px-3 py-1.5 text-sm text-slate-400"
                            style={{ borderColor: '#d3dae6' }}
                          >
                            {item.titulo}
                            <span className="ml-1.5 text-[10px] uppercase tracking-wide">
                              {t('emBreve')}
                            </span>
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </section>
              );
            })}
          </div>
          {demaisClasses.length > 0 && (
            <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1.5 text-sm text-slate-500">
              <span>{t('demaisTitulo')}</span>
              {demaisClasses.map((c) => (
                <a
                  key={c.slug}
                  href={notaPath(locale as Locale, c.slug)}
                  className="rounded-md border px-2.5 py-0.5 text-[13px] transition-colors hover:border-slate-400"
                  style={{ borderColor: '#d3dae6', color: 'var(--navy-700)' }}
                >
                  {c.titulo}
                </a>
              ))}
            </p>
          )}

          {/* O método — Fw A → Fw B clicáveis (semântica fixa: roxo → verde) */}
          <h2 className="mt-12 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
            {t('metodoTitulo')}
          </h2>
          <p className="mt-2 text-sm text-slate-600">{t('metodoIntro')}</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <a
              href={metodoPath(locale as Locale, 'framework-a')}
              className="group rounded-lg border-l-4 bg-white p-5 transition-shadow hover:shadow-md"
              style={{ borderColor: 'var(--fw-a)' }}
            >
              <h3 className="text-sm font-medium" style={{ color: 'var(--fw-a)' }}>
                {t('metodoATitulo')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('metodoATexto')}</p>
              <span
                className="mt-3 block text-sm group-hover:underline"
                style={{ color: 'var(--wikilink)' }}
              >
                →
              </span>
            </a>
            <a
              href={metodoPath(locale as Locale, 'framework-b')}
              className="group rounded-lg border-l-4 bg-white p-5 transition-shadow hover:shadow-md"
              style={{ borderColor: 'var(--fw-b)' }}
            >
              <h3 className="text-sm font-medium" style={{ color: 'var(--fw-b)' }}>
                {t('metodoBTitulo')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('metodoBTexto')}</p>
              <span
                className="mt-3 block text-sm group-hover:underline"
                style={{ color: 'var(--wikilink)' }}
              >
                →
              </span>
            </a>
          </div>

          {/* CTA do seletor de estratégia — a saída viva dos dois frameworks */}
          <div
            className="mt-3 flex flex-col gap-4 rounded-lg p-6 sm:flex-row sm:items-center sm:justify-between"
            style={{ background: 'var(--navy-700)' }}
          >
            <div>
              <h3 className="text-base font-medium text-white">{t('seletorTitulo')}</h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-300">
                {t('seletorTexto')}
              </p>
            </div>
            <a
              href={`${metodoPath(locale as Locale)}#seletor`}
              className="shrink-0 rounded-md px-5 py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)' }}
            >
              {t('seletorBotao')}
            </a>
          </div>

          <p className="mt-3 text-sm text-slate-500">{t('niveisLinha')}</p>
          <p className="mt-2 text-sm">
            <a href={calculadorasPath(locale as Locale)} style={{ color: 'var(--wikilink)' }}>
              {t('calculadorasLink')}
            </a>
          </p>

          {/* Apoio (F07 parcial) — só renderiza quando o fundador configurar os links */}
          {DOACAO_LINKS.length > 0 && (
            <div
              className="mt-12 rounded-lg border bg-white p-5 text-sm"
              style={{ borderColor: '#e3e8f0' }}
            >
              <h2 className="font-medium" style={{ color: 'var(--navy-700)' }}>
                {t('apoieTitulo')}
              </h2>
              <p className="mt-1 text-slate-600">{t('apoieTexto')}</p>
              <p className="mt-2 flex gap-4">
                {DOACAO_LINKS.map((c) => (
                  <a
                    key={c.rotulo}
                    href={c.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ color: 'var(--wikilink)' }}
                  >
                    {c.rotulo}
                  </a>
                ))}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
