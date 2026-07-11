import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { listPublicadas } from '@/lib/db/notas';
import { handbooksPublicados } from '@/lib/content/ativos';
import { DOACAO_LINKS } from '@/lib/apoio';
import { buscaPath, calculadorasPath, colaborarPath, metodoPath, notaPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// T01 v3 (revisão 6 do fundador — 09/07): a Home passa a começar pelo MÉTODO
// (o "por quê" do projeto). Os handbooks vão para o FINAL — só os publicados,
// agrupados por classe funcional, sem "em breve" e sem "estrutura pronta". A
// árvore lateral já expõe toda a taxonomia; a Home foca em conteúdo entregue.

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tBusca = await getTranslations('busca');

  const acervo = await listPublicadas(locale as Locale);
  const grupos = handbooksPublicados(acervo, locale as Locale);

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
        <div className="content-col mx-auto">
          {/* O método — Fw A → Fw B clicáveis (semântica fixa: roxo → verde) */}
          <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
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

          {/* Colaborar (pedido do fundador, 11/07): visitante propõe conteúdo novo — nada publica direto (fila de triagem). */}
          <div
            className="mt-10 flex flex-col gap-4 rounded-lg border bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: '#e3e8f0' }}
          >
            <div>
              <h2 className="font-medium" style={{ color: 'var(--navy-700)' }}>
                {t('colaborarTitulo')}
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-600">
                {t('colaborarTexto')}
              </p>
            </div>
            <a
              href={colaborarPath(locale as Locale)}
              className="shrink-0 rounded-md border px-5 py-2.5 text-center text-sm font-medium transition-colors hover:bg-slate-50"
              style={{ borderColor: 'var(--navy-700)', color: 'var(--navy-700)' }}
            >
              {t('colaborarBotao')}
            </a>
          </div>

          {/* Apoio (F07 parcial) — só renderiza quando o fundador configurar os links */}
          {DOACAO_LINKS.length > 0 && (
            <div
              className="mt-10 rounded-lg border bg-white p-5 text-sm"
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

          {/* Handbooks publicados — no FIM da Home (rodada 6), agrupados por
              classe. Painel branco definido (rodada 7): separa o "acervo
              entregue" do bloco de método/ferramentas acima, em vez de um
              salto de espaço em branco. */}
          {grupos.length > 0 && (
            <section
              className="mt-12 rounded-xl border bg-white p-6 md:p-8"
              style={{ borderColor: '#e3e8f0' }}
            >
              <h2
                className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500"
                id="handbooks-publicados"
              >
                {t('handbooksPublicadosTitulo')}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                {t('handbooksPublicadosIntro')}
              </p>
              <div className="mt-5 space-y-4">
                {grupos.map((g) => (
                  <div key={g.classe}>
                    {g.classeTitulo ? (
                      <a
                        href={notaPath(locale as Locale, g.classe)}
                        className="text-[13px] font-medium hover:underline"
                        style={{ color: 'var(--navy-700)' }}
                      >
                        {g.classeTitulo}
                      </a>
                    ) : (
                      <span
                        className="text-[13px] font-medium"
                        style={{ color: 'var(--navy-700)' }}
                      >
                        {t('componentesGrupo')}
                      </span>
                    )}
                    <ul className="mt-1.5 flex flex-wrap gap-2">
                      {g.itens.map((it) => (
                        <li key={it.slug}>
                          <a
                            href={notaPath(locale as Locale, it.slug)}
                            className="inline-block rounded-md border px-3 py-1 text-sm transition-colors hover:border-slate-400"
                            style={{ borderColor: '#d3dae6', color: 'var(--navy-700)' }}
                          >
                            {it.titulo}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
