import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getNotaView, getBacklinks, listPublicadas, type Nota } from '@/lib/db/notas';
import { renderNoteHtml } from '@/lib/markdown/render';
import { splitNiveis, extractH2 } from '@/lib/content/niveis';
import { NIVEIS_LEITURA, type Locale } from '@/lib/content/schema';
import { Breadcrumb } from '@/components/breadcrumb';
import { Backlinks } from '@/components/backlinks';
import { FwCards } from '@/components/fw-cards';
import { PlanoTable } from '@/components/plano-table';
import { NivelSelector, type NivelLabel } from '@/components/nivel-selector';

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

async function Rodape({ nota }: { nota: Nota }) {
  const t = await getTranslations('nota');
  const fontes = (nota.frontmatter.fontes as string[] | undefined) ?? [];
  return (
    <footer className="mt-8 border-t pt-4" style={{ borderColor: '#e3e8f0' }}>
      {fontes.length > 0 && (
        <>
          <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
            {t('fontes')}
          </h2>
          <ul className="mt-2 space-y-1 text-[13px] text-slate-600">
            {fontes.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </>
      )}
      {nota.revisado_em && (
        <p className="mt-3 font-mono text-xs text-slate-500">
          {t('revisado')} {nota.revisado_em}
        </p>
      )}
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
  const [acervo, backlinks] = await Promise.all([
    listPublicadas(locale as Locale),
    getBacklinks(slug, locale as Locale),
  ]);
  const titulos = new Map(acervo.map((n) => [n.slug, n.titulo]));

  const ehModoFalha = nota.tipo_nota === 'modo_falha';
  const ehHandbook = nota.tipo_nota === 'tipo';
  const niveis = ehModoFalha ? splitNiveis(nota.corpo_md) : null;
  const resumo = nota.frontmatter.resumo as string | undefined;

  return (
    <div className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb taxonomia={nota.taxonomia} titulos={titulos} locale={locale as Locale} />

        <h1 className="text-3xl font-medium" style={{ color: 'var(--navy-900)' }}>
          {nota.titulo}
        </h1>
        <Badges nota={nota} />

        {ehModoFalha && niveis ? (
          <>
            <NivelSelector
              paineis={{
                beginner: renderNoteHtml(niveis.beginner, locale as Locale),
                specialist: renderNoteHtml(niveis.specialist, locale as Locale),
                engineer: renderNoteHtml(niveis.engineer, locale as Locale),
              }}
              labels={
                Object.fromEntries(
                  NIVEIS_LEITURA.map((n) => [
                    n,
                    { label: tNiveis(n), sub: tNiveis(`${n}Sub`) } satisfies NivelLabel,
                  ]),
                ) as Record<(typeof NIVEIS_LEITURA)[number], NivelLabel>
              }
            />
            <FwCards
              fwA={nota.frontmatter.fw_a as never}
              fwB={nota.frontmatter.fw_b as never}
              pfTipico={nota.frontmatter.pf_tipico as string | undefined}
            />
            <PlanoTable plano={nota.frontmatter.plano_manutencao as never} />
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
            {ehHandbook && (
              <nav
                aria-label={t('secoes')}
                className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[13px]"
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                  {t('secoes')}:
                </span>
                {extractH2(nota.corpo_md).map((s) => (
                  <a key={s.id} href={`#${s.id}`} style={{ color: 'var(--wikilink)' }}>
                    {s.texto}
                  </a>
                ))}
              </nav>
            )}
            <article
              className="nota-corpo mt-6 rounded-lg border bg-white p-6 md:p-8"
              style={{ borderColor: '#e3e8f0' }}
              dangerouslySetInnerHTML={{ __html: renderNoteHtml(nota.corpo_md, locale as Locale) }}
            />
          </>
        )}

        <Rodape nota={nota} />
        <Backlinks notas={backlinks} locale={locale as Locale} />
      </div>
    </div>
  );
}
