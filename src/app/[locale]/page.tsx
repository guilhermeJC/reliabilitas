import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { listPublicadas } from '@/lib/db/notas';
import { gridAtivos } from '@/lib/content/ativos';
import { DOACAO_LINKS } from '@/lib/apoio';
import { buscaPath, notaPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// T01 — Home real (Dia 3): hero navy com busca central, grid dos 5 ativos (D07),
// o método Fw A→B e apoio discreto (F07 parcial — links do fundador).
// Render dinâmico herdado do layout [locale] (build hermético; ISR no Dia 5/G6).

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tBusca = await getTranslations('busca');

  const acervo = await listPublicadas(locale as Locale);
  const ativos = gridAtivos(acervo, locale as Locale);

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
          {/* Grid dos 5 ativos (D07) */}
          <h2
            className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500"
            id="ativos"
          >
            {t('ativosTitulo')}
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {ativos.map((a) =>
              a.slug ? (
                <a
                  key={a.titulo}
                  href={notaPath(locale as Locale, a.slug)}
                  className="rounded-lg border bg-white p-4 text-sm font-medium transition-colors hover:border-slate-400"
                  style={{ borderColor: '#d3dae6', color: 'var(--navy-700)' }}
                >
                  {a.titulo}
                </a>
              ) : (
                <div
                  key={a.titulo}
                  className="rounded-lg border border-dashed p-4 text-sm text-slate-400"
                  style={{ borderColor: '#d3dae6' }}
                >
                  {a.titulo}
                  <span className="mt-1 block text-[11px] uppercase tracking-wide">
                    {t('emBreve')}
                  </span>
                </div>
              ),
            )}
          </div>

          {/* O método — Fw A → Fw B (semântica fixa: roxo → verde) */}
          <h2 className="mt-12 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
            {t('metodoTitulo')}
          </h2>
          <p className="mt-2 text-sm text-slate-600">{t('metodoIntro')}</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div
              className="rounded-lg border-l-4 bg-white p-5"
              style={{ borderColor: 'var(--fw-a)' }}
            >
              <h3 className="text-sm font-medium" style={{ color: 'var(--fw-a)' }}>
                {t('metodoATitulo')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('metodoATexto')}</p>
            </div>
            <div
              className="rounded-lg border-l-4 bg-white p-5"
              style={{ borderColor: 'var(--fw-b)' }}
            >
              <h3 className="text-sm font-medium" style={{ color: 'var(--fw-b)' }}>
                {t('metodoBTitulo')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('metodoBTexto')}</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500">{t('niveisLinha')}</p>

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
