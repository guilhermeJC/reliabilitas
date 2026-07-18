import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import {
  getNotaView,
  getBacklinks,
  getArestasDaNota,
  listPublicadas,
  type Nota,
} from '@/lib/db/notas';
import { GrafoLocal } from '@/components/grafo-local';
import { notaPath, sugerirPath } from '@/lib/routes';
import { renderNoteHtml } from '@/lib/markdown/render';
import { splitNiveis, extractH2, extractH3, montaSumarioHtml } from '@/lib/content/niveis';
import { agrupaFontes, GRUPOS_FONTES, type GrupoFonte } from '@/lib/content/fontes';
import { separaHtmlNoHeading } from '@/lib/content/split-html';
import { hotspotsPorSlug } from '@/lib/anatomia/registry';
import { AnatomiaInterativa } from '@/components/anatomia-interativa';
import { NIVEIS_LEITURA, type Locale } from '@/lib/content/schema';
import { Breadcrumb } from '@/components/breadcrumb';
import { Backlinks } from '@/components/backlinks';
import { FwCards } from '@/components/fw-cards';
import { PlanoTable } from '@/components/plano-table';
import { CurvaHq } from '@/components/calc/curva-hq';
import { NivelSelector, type NivelLabel } from '@/components/nivel-selector';
import { WeibullCalc } from '@/components/calc/weibull-calc';
import { ExportNotaBotoes } from '@/components/export-nota-botoes';
import { SugerirCorrecaoLink } from '@/components/sugerir-correcao-link';
// CSS do KaTeX só onde há fórmula (corpo de nota) — fora do bundle global.
import 'katex/dist/katex.min.css';

// Página de nota — T03 (modo de falha, seletor de 3 níveis), T02 (handbook,
// seções ancoradas) e nota-semente (layout curto). Conteúdo autoral do curador
// (repo → ingest validado); ver nota de segurança em render.ts. ISR entra no Dia 5 (G6).
export const dynamic = 'force-dynamic';

interface PageParams {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const view = await getNotaView(slug, locale);
  if (view.estado === 'archived') return { robots: { index: false } };
  if (view.estado !== 'published') return {};
  const resumo = view.nota.frontmatter.resumo as string | undefined;
  return { title: view.nota.titulo, description: resumo };
}

function Badges({ nota }: { nota: Nota }) {
  const fwA = nota.frontmatter.fw_a as { categoria?: string } | undefined;
  const fwB = nota.frontmatter.fw_b as { decisao?: string; periodicidade?: string } | undefined;
  const iso = nota.frontmatter.iso14224_code as string | undefined;
  return (
    <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
      <span className="rounded px-2 py-1 text-white" style={{ background: 'var(--navy-700)' }}>
        {nota.tipo_nota}
      </span>
      {iso && (
        <span
          className="rounded border bg-white px-2 py-1 font-mono"
          style={{ borderColor: '#d3dae6' }}
        >
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
          Fw B · {fwB.decisao}
          {fwB.periodicidade ? ` (${fwB.periodicidade})` : ''}
        </span>
      )}
    </div>
  );
}

async function Rodape({ nota, locale }: { nota: Nota; locale: Locale }) {
  const t = await getTranslations('nota');
  const fontes = (nota.frontmatter.fontes as string[] | undefined) ?? [];
  // Melhoria 1 do fundador (10/07): fontes recolhíveis (details nativo — o
  // conteúdo permanece no HTML do SSR, BR-010) e agrupadas por natureza.
  const grupos = agrupaFontes(fontes);
  const rotulos: Record<GrupoFonte, string> = {
    normas: t('fontesNormas'),
    literatura: t('fontesLiteratura'),
    artigos: t('fontesArtigos'),
    outros: t('fontesOutros'),
  };
  return (
    <footer className="mt-8 border-t pt-4" style={{ borderColor: '#e3e8f0' }}>
      {fontes.length > 0 && (
        <details>
          <summary className="flex cursor-pointer list-none items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 transition-colors hover:text-slate-700 [&::-webkit-details-marker]:hidden">
            <svg
              className="tree-chevron shrink-0"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              aria-hidden="true"
            >
              <path
                d="M3.5 1.5 L6.5 5 L3.5 8.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t('fontes')}
            <span className="font-mono text-[11px] normal-case tracking-normal text-slate-400">
              {fontes.length}
            </span>
          </summary>
          <div className="mt-2 space-y-3">
            {GRUPOS_FONTES.map((g) =>
              grupos[g].length > 0 ? (
                <div key={g}>
                  <h3 className="text-[11px] font-medium text-slate-400">{rotulos[g]}</h3>
                  <ul className="mt-1 space-y-1 text-[13px] text-slate-600">
                    {grupos[g].map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              ) : null,
            )}
          </div>
        </details>
      )}
      <p className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        {nota.revisado_em && (
          <span className="font-mono text-xs text-slate-500">
            {t('revisado')} {nota.revisado_em}
          </span>
        )}
      </p>
      {/* T09: toda nota oferece o canal curado de correção (também no topo — melhoria do fundador, 11/07) */}
      <div className="mt-3">
        <SugerirCorrecaoLink
          href={sugerirPath(locale, notaPath(locale, nota.slug))}
          texto={t('sugerirCorrecao')}
        />
      </div>
    </footer>
  );
}

export default async function NotaPage({ params }: PageParams) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('nota');
  const tNiveis = await getTranslations('niveis');

  const view = await getNotaView(slug, locale);
  if (view.estado === 'missing') notFound();

  if (view.estado === 'archived') {
    return (
      <div className="px-6 py-16">
        <div
          className="mx-auto max-w-xl rounded-lg border bg-white p-8 text-center"
          style={{ borderColor: '#e3e8f0' }}
        >
          <h1 className="text-xl font-medium" style={{ color: 'var(--navy-700)' }}>
            {t('arquivadaTitulo')}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{t('arquivadaTexto')}</p>
        </div>
      </div>
    );
  }

  const nota = view.nota;
  const [acervo, backlinks, arestas] = await Promise.all([
    listPublicadas(locale as Locale),
    getBacklinks(slug, locale as Locale),
    getArestasDaNota(slug, locale as Locale),
  ]);
  const titulos = new Map(acervo.map((n) => [n.slug, n.titulo]));

  const ehModoFalha = nota.tipo_nota === 'modo_falha';
  const ehHandbook = nota.tipo_nota === 'tipo';
  const niveis = ehModoFalha ? splitNiveis(nota.corpo_md) : null;
  // F05: β editorial do frontmatter semeia a calculadora quando for numérico
  // (string descritiva como "variável (…β>1)" cai no default didático).
  const betaEditorial = Number((nota.frontmatter.fw_a as { beta?: unknown } | undefined)?.beta);
  const resumo = nota.frontmatter.resumo as string | undefined;
  // HTML server-side de conteúdo autoral validado (BR-006/F3/F8 — ver render.ts).
  // Sanitização client (DOMPurify) vira requisito no gate da Fase 3 (conteúdo de terceiros).
  const corpoHtml = niveis ? '' : renderNoteHtml(nota.corpo_md, locale as Locale);
  const sumarioHandbook = niveis ? '' : montaSumarioHtml(extractH2(nota.corpo_md), t('secoes'));

  return (
    <div className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb taxonomia={nota.taxonomia} titulos={titulos} locale={locale as Locale} />

        <h1 className="text-3xl font-medium" style={{ color: 'var(--navy-900)' }}>
          {nota.titulo}
        </h1>
        <Badges nota={nota} />

        {/* Ações do topo (pedido do fundador, 11/07): baixar o conteúdo e
            sugerir correção ficam visíveis ANTES de ler, não só no rodapé. */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <ExportNotaBotoes
            titulo={nota.titulo}
            corpoMd={nota.corpo_md}
            url={`https://reliabilitas.io${notaPath(locale, nota.slug)}`}
            slug={nota.slug}
            revisadoEm={nota.revisado_em ?? undefined}
            labelRevisado={t('revisado')}
            labels={{ md: t('baixarMd'), pdf: t('baixarPdf') }}
          />
          <SugerirCorrecaoLink
            href={sugerirPath(locale, notaPath(locale, nota.slug))}
            texto={t('sugerirCorrecao')}
          />
        </div>

        {ehModoFalha && niveis ? (
          <>
            <NivelSelector
              paineis={{
                // Sumário por texto (pedido do fundador, 18/07): dentro de um nível,
                // os H3 são a subseção real (o nível em si não tem H2 fora do nome
                // Beginner/Specialist/Engineer) — só aparece com >=3 subseções.
                beginner:
                  montaSumarioHtml(extractH3(niveis.beginner), t('nestaSecao')) +
                  renderNoteHtml(niveis.beginner, locale as Locale),
                specialist:
                  montaSumarioHtml(extractH3(niveis.specialist), t('nestaSecao')) +
                  renderNoteHtml(niveis.specialist, locale as Locale),
                engineer:
                  montaSumarioHtml(extractH3(niveis.engineer), t('nestaSecao')) +
                  renderNoteHtml(niveis.engineer, locale as Locale),
              }}
              labels={
                Object.fromEntries(
                  NIVEIS_LEITURA.map((n) => [
                    n,
                    { label: tNiveis(n), sub: tNiveis(`${n}Sub`) } satisfies NivelLabel,
                  ]),
                ) as Record<(typeof NIVEIS_LEITURA)[number], NivelLabel>
              }
              extras={{
                engineer: (
                  <WeibullCalc
                    betaInicial={Number.isFinite(betaEditorial) ? betaEditorial : undefined}
                  />
                ),
              }}
            />
            <FwCards
              fwA={nota.frontmatter.fw_a as never}
              fwB={nota.frontmatter.fw_b as never}
              pfTipico={nota.frontmatter.pf_tipico as string | undefined}
            />
            <PlanoTable
              plano={nota.frontmatter.plano_manutencao as never}
              contexto={{
                equipamento: titulos.get(nota.taxonomia.at(-1) ?? '') ?? '',
                modoFalha: nota.titulo,
              }}
              fwA={nota.frontmatter.fw_a as never}
              fwB={nota.frontmatter.fw_b as never}
              pfTipico={nota.frontmatter.pf_tipico as string | undefined}
              revisadoEm={nota.revisado_em ?? undefined}
              slug={nota.slug}
            />
          </>
        ) : (
          <>
            {!ehHandbook && resumo && (
              <p
                className="mt-6 rounded-lg border-l-4 bg-white py-3 pl-4 pr-4 text-sm italic text-slate-600"
                style={{ borderColor: '#d3dae6' }}
              >
                {t('semente')} — {resumo}
              </p>
            )}
            {/* Sumário visual (pedido do fundador, 18/07): antes só existia pra
                handbooks (ehHandbook) — agora vale pra QUALQUER nota não-nivelada
                com corpo próprio (marca_modelo, estrategia etc. também têm H2 de
                sobra); a própria função decide não renderizar com <3 seções. */}
            {sumarioHandbook && (
              <div
                // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml -- montaSumarioHtml (niveis.ts) escapa o texto do heading; ids vêm de slugifyHeading (mesmo mecanismo do render.ts)
                dangerouslySetInnerHTML={{ __html: sumarioHandbook }}
              />
            )}
            {(() => {
              // Anatomia interativa (melhoria 2, 10/07): quando o handbook tem
              // hotspots registrados, o corpo é dividido no heading SEGUINTE à
              // seção Anatomia e o componente entra dentro da própria seção.
              const hotspots = ehHandbook ? hotspotsPorSlug(nota.slug) : null;
              const anatomia = nota.frontmatter.anatomia as
                { svg: string; alt: string } | undefined;
              let divisao: { antes: string; depois: string } | null = null;
              if (hotspots && anatomia) {
                const h2s = extractH2(nota.corpo_md);
                const idxAnat = h2s.findIndex((s) => s.id === 'anatomia' || s.id === 'anatomy');
                const proximo = idxAnat >= 0 ? h2s[idxAnat + 1] : undefined;
                divisao = proximo ? separaHtmlNoHeading(corpoHtml, proximo.id) : null;
              }
              return (
                <>
                  <article
                    className="nota-corpo mt-6 rounded-lg border bg-white p-6 md:p-8"
                    style={{ borderColor: '#e3e8f0' }}
                    // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml -- falso positivo documentado (DEV-017): HTML gerado server-side de conteúdo autoral validado no ingest (BR-006/F3/F8); DOMPurify é requisito do gate da Fase 3 (BR-013)
                    dangerouslySetInnerHTML={{ __html: divisao ? divisao.antes : corpoHtml }}
                  />
                  {hotspots && anatomia && (
                    <AnatomiaInterativa
                      src={anatomia.svg}
                      alt={anatomia.alt}
                      hotspots={hotspots}
                      locale={locale as Locale}
                      textos={{
                        dica: t('anatDica'),
                        fluxo: t('anatFluxo'),
                        aprofundar: t('anatAprofundar'),
                      }}
                    />
                  )}
                  {divisao && (
                    <article
                      className="nota-corpo mt-6 rounded-lg border bg-white p-6 md:p-8"
                      style={{ borderColor: '#e3e8f0' }}
                      // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml -- falso positivo documentado (DEV-017): HTML gerado server-side de conteúdo autoral validado no ingest (BR-006/F3/F8); DOMPurify é requisito do gate da Fase 3 (BR-013)
                      dangerouslySetInnerHTML={{ __html: divisao.depois }}
                    />
                  )}
                </>
              );
            })()}
            {/* Curva H-Q viva (sessão 5): handbooks de máquinas ROTODINÂMICAS —
                a curva e as leis de afinidade valem para o princípio inteiro. */}
            {ehHandbook && nota.taxonomia.includes('dinamicas') && (
              <div className="mt-6">
                <CurvaHq />
              </div>
            )}
          </>
        )}

        <div className="print:hidden">
          <GrafoLocal
            slug={nota.slug}
            arestas={arestas}
            acervo={acervo}
            locale={locale as Locale}
            titulo={t('grafo')}
          />
          <Rodape nota={nota} locale={locale as Locale} />
          <Backlinks notas={backlinks} locale={locale as Locale} />
        </div>
      </div>
    </div>
  );
}
