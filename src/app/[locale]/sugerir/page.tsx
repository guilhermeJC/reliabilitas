import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { MENSAGEM_MAX, MENSAGEM_MIN, PAGINA_INTERNA_RE } from '@/lib/sugestao';
import { termosPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// T09 — Sugerir Correção (G4). Form HTML puro (POST → /api/sugestao, redirect
// de volta): funciona sem JS. Honeypot invisível para humanos. noindex: página
// utilitária, não conteúdo.

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ pagina?: string | string[]; st?: string | string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'sugerir' });
  return { title: t('titulo'), robots: { index: false } };
}

export default async function SugerirPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('sugerir');

  const sp = await searchParams;
  const pagina =
    typeof sp.pagina === 'string' && PAGINA_INTERNA_RE.test(sp.pagina) ? sp.pagina : `/${locale}`;
  const st = typeof sp.st === 'string' ? sp.st : null;

  return (
    <div className="px-4 py-10 md:px-8">
      <div className="mx-auto max-w-xl">
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
            {t('erro', { min: MENSAGEM_MIN, max: MENSAGEM_MAX })}
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

        <form action="/api/sugestao" method="post" className="mt-6 space-y-4">
          <input type="hidden" name="pagina" value={pagina} />
          <input type="hidden" name="locale" value={locale} />
          {/* Honeypot: invisível e fora do fluxo de tabulação — humano nunca preenche */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
            <label>
              website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
            </label>
          </div>

          <p className="text-xs text-slate-500">
            {t('paginaRotulo')}: <span className="font-mono">{pagina}</span>
          </p>

          <label className="block text-sm">
            <span className="text-slate-700">{t('mensagemRotulo')}</span>
            <textarea
              name="mensagem"
              required
              minLength={MENSAGEM_MIN}
              maxLength={MENSAGEM_MAX}
              rows={6}
              placeholder={t('mensagemPlaceholder')}
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

          {/* Pedido do fundador (25/07): mesmo bloco de identificação opcional
              do Colaborar (DEV-094), agora também em Sugerir correção. */}
          <div className="border-t pt-4" style={{ borderColor: '#e3e8f0' }}>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
              {t('sobreVoceTitulo')}
            </h2>
            <p className="mt-1 text-xs text-slate-500">{t('sobreVoceSub')}</p>
          </div>

          <label className="block text-sm">
            <span className="text-slate-700">{t('nomeRotulo')}</span>
            <input
              type="text"
              name="nome"
              maxLength={150}
              placeholder={t('nomePlaceholder')}
              className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
              style={{ borderColor: '#d3dae6' }}
            />
          </label>

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
            <span className="text-slate-700">{t('linkedinSiteRotulo')}</span>
            <input
              type="text"
              name="linkedinSite"
              maxLength={300}
              placeholder={t('linkedinSitePlaceholder')}
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

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="desejaContribuidor"
              className="mt-0.5"
              style={{ accentColor: 'var(--accent)' }}
            />
            <span className="text-slate-700">{t('desejaContribuidorRotulo')}</span>
          </label>

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="mostrarPublicamente"
              className="mt-0.5"
              style={{ accentColor: 'var(--accent)' }}
            />
            <span className="text-slate-700">{t('mostrarPublicamenteRotulo')}</span>
          </label>

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
