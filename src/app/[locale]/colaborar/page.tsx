import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { listPublicadas } from '@/lib/db/notas';
import {
  CONTRIBUICAO_TIPOS,
  TITULO_MAX,
  TITULO_MIN,
  CORPO_MIN,
  CORPO_MAX,
} from '@/lib/contribuicao';
import { TIPOS_NOTA, type Locale } from '@/lib/content/schema';
import { termosPath } from '@/lib/routes';

// Colaborar (pedido do fundador, 11/07) — form HTML puro (POST → /api/contribuicao,
// redirect de volta): funciona sem JS. Honeypot invisível. noindex: página
// utilitária. Nada publica direto — vira fila de triagem no painel (T09-like).

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ st?: string | string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'colaborar' });
  return { title: t('titulo'), robots: { index: false } };
}

export default async function ColaborarPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('colaborar');

  const sp = await searchParams;
  const st = typeof sp.st === 'string' ? sp.st : null;

  // Nós que podem servir de PAI para a contribuição — todo o acervo publicado,
  // agrupado por tipo (o curador valida a coerência taxonômica na triagem).
  const acervo = await listPublicadas(locale as Locale);
  const grupos = TIPOS_NOTA.map((tipo) => ({
    tipo,
    itens: acervo
      .filter((n) => n.tipo_nota === tipo)
      .sort((a, b) => a.titulo.localeCompare(b.titulo)),
  })).filter((g) => g.itens.length > 0);

  return (
    <div className="px-4 py-10 md:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-medium" style={{ color: 'var(--navy-900)' }}>
          {t('titulo')}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('intro')}</p>

        {st === 'ok' && (
          <p
            className="mt-4 rounded-md border-l-4 bg-white p-3 text-sm"
            style={{ borderColor: 'var(--fw-b)', color: 'var(--fw-b)' }}
          >
            {t('sucesso')}
          </p>
        )}
        {st === 'erro' && (
          <p
            className="mt-4 rounded-md border-l-4 bg-white p-3 text-sm text-slate-700"
            style={{ borderColor: 'var(--accent)' }}
          >
            {t('erro')}
          </p>
        )}
        {st === 'limite' && (
          <p
            className="mt-4 rounded-md border-l-4 bg-white p-3 text-sm text-slate-700"
            style={{ borderColor: 'var(--accent)' }}
          >
            {t('limite')}
          </p>
        )}

        <form action="/api/contribuicao" method="post" className="mt-6 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          {/* Honeypot: invisível e fora do fluxo de tabulação — humano nunca preenche */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
            <label>
              website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
            </label>
          </div>

          <label className="block text-sm">
            <span className="text-slate-700">{t('tipoNotaRotulo')}</span>
            <select
              name="tipoNota"
              required
              defaultValue=""
              className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
              style={{ borderColor: '#d3dae6' }}
            >
              <option value="" disabled>
                —
              </option>
              {CONTRIBUICAO_TIPOS.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {t(`tipos.${tipo}`)}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="text-slate-700">{t('taxonomiaPaiRotulo')}</span>
            <select
              name="taxonomiaPai"
              required
              defaultValue=""
              className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
              style={{ borderColor: '#d3dae6' }}
            >
              <option value="" disabled>
                —
              </option>
              {grupos.map((g) => (
                <optgroup key={g.tipo} label={t(`tipos.${g.tipo}`)}>
                  {g.itens.map((n) => (
                    <option key={n.slug} value={n.slug}>
                      {n.titulo}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="text-slate-700">{t('tituloRotulo')}</span>
            <input
              type="text"
              name="tituloSugerido"
              required
              minLength={TITULO_MIN}
              maxLength={TITULO_MAX}
              placeholder={t('tituloPlaceholder')}
              className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
              style={{ borderColor: '#d3dae6' }}
            />
          </label>

          <label className="block text-sm">
            <span className="text-slate-700">{t('resumoRotulo')}</span>
            <textarea
              name="resumo"
              maxLength={500}
              rows={2}
              placeholder={t('resumoPlaceholder')}
              className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
              style={{ borderColor: '#d3dae6' }}
            />
          </label>

          <label className="block text-sm">
            <span className="text-slate-700">{t('corpoRotulo')}</span>
            <textarea
              name="corpoMd"
              required
              minLength={CORPO_MIN}
              maxLength={CORPO_MAX}
              rows={14}
              placeholder={t('corpoPlaceholder')}
              className="mt-1 w-full rounded-md border bg-white px-3 py-2 font-mono text-[13px] leading-relaxed"
              style={{ borderColor: '#d3dae6' }}
            />
          </label>

          {/* DEV-094 (24/07): identificação do autor, toda opcional (BR-011) —
              pivot pra projeto aberto de comunidade. A pessoa escolhe o que
              aparece no byline público da nota publicada (contatoVisibilidade). */}
          <div className="border-t pt-4" style={{ borderColor: '#e3e8f0' }}>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
              {t('sobreVoceTitulo')}
            </h2>
            <p className="mt-1 text-xs text-slate-500">{t('sobreVoceSub')}</p>
          </div>

          <label className="block text-sm">
            <span className="text-slate-700">{t('formacaoRotulo')}</span>
            <input
              type="text"
              name="formacao"
              maxLength={300}
              placeholder={t('formacaoPlaceholder')}
              className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
              style={{ borderColor: '#d3dae6' }}
            />
          </label>

          <label className="block text-sm">
            <span className="text-slate-700">{t('funcaoEmpresaRotulo')}</span>
            <input
              type="text"
              name="funcaoEmpresa"
              maxLength={200}
              placeholder={t('funcaoEmpresaPlaceholder')}
              className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
              style={{ borderColor: '#d3dae6' }}
            />
          </label>

          <label className="block text-sm">
            <span className="text-slate-700">{t('contatoVisibilidadeRotulo')}</span>
            <textarea
              name="contatoVisibilidade"
              maxLength={500}
              rows={2}
              placeholder={t('contatoVisibilidadePlaceholder')}
              className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
              style={{ borderColor: '#d3dae6' }}
            />
          </label>

          <label className="block text-sm">
            <span className="text-slate-700">{t('contatoRotulo')}</span>
            <input
              type="email"
              name="contato"
              maxLength={200}
              placeholder={t('contatoPlaceholder')}
              className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
              style={{ borderColor: '#d3dae6' }}
            />
          </label>
          <a
            href={termosPath(locale as Locale, 'privacidade')}
            className="-mt-2 inline-block text-xs"
            style={{ color: 'var(--wikilink)' }}
          >
            {t('contatoPrivacidadeLink')}
          </a>

          <button
            type="submit"
            className="rounded-md px-5 py-2 text-sm font-medium text-white"
            style={{ background: 'var(--navy-700)' }}
          >
            {t('enviar')}
          </button>
        </form>
      </div>
    </div>
  );
}
