import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { calculadorasPath, colaborarPath, metodoPath, notaPath, sugerirPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// T11 (resto do Dia 5, 24/07) — "Sobre": missão + "quem faz" + como o site
// funciona. Reescrito por pedido do fundador (24/07, rodada 2): pitch mais
// completo do produto, seção "quem faz" com foto/LinkedIn em destaque, e
// "como o site funciona" no lugar do resumo genérico de metodologia (que
// segue coberto em detalhe por /metodo, linkado daqui). LinkedIn do
// fundador: linkedin.com/in/guilherme-correia-gjc.
const LINKEDIN_URL = 'https://www.linkedin.com/in/guilherme-correia-gjc/';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'sobre' });
  return { title: t('titulo'), description: t('missaoP2') };
}

export default async function SobrePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('sobre');
  const tNota = await getTranslations('nota');
  const tColaborar = await getTranslations('colaborar');
  const l = locale as Locale;

  const linkCls = 'hover:underline';
  const linkStyle = { color: 'var(--wikilink)' };

  return (
    <div className="px-4 py-10 md:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-medium" style={{ color: 'var(--navy-900)' }}>
          {t('titulo')}
        </h1>

        <p className="mt-4 text-[15px] leading-relaxed text-slate-700">{t('missaoP1')}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{t('missaoP2')}</p>

        <div className="mt-6 rounded-lg border bg-white p-5" style={{ borderColor: '#e3e8f0' }}>
          <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
            {t('missaoListaTitulo')}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-700">
            <li>{t('missaoItem1')}</li>
            <li>{t('missaoItem2')}</li>
            <li>{t('missaoItem3')}</li>
            <li>{t('missaoItem4')}</li>
          </ul>
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-slate-700">{t('comunidade')}</p>

        {/* Destaque pedido pelo fundador: visão de comunidade + colaboração já
            disponível hoje — mesmo tratamento visual do callout de privacidade
            em /termos (borda de acento + fundo branco). */}
        <p
          className="mt-4 rounded-md border-l-4 bg-white py-3 pl-4 text-[15px] leading-relaxed text-slate-700"
          style={{ borderColor: 'var(--accent)' }}
        >
          {t('visaoDestaque')}
        </p>

        {/* Quem faz */}
        <h2 className="mt-10 text-lg font-medium" style={{ color: 'var(--navy-700)' }}>
          {t('quemFazTitulo')}
        </h2>

        <div
          className="mt-4 flex flex-col items-center rounded-lg border bg-white p-6 text-center"
          style={{ borderColor: '#e3e8f0' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- projeto não usa next/image (DEV-087) */}
          <img
            src="/sobre/guilherme.jpg"
            alt={t('fotoAlt')}
            width={140}
            height={140}
            className="h-[140px] w-[140px] rounded-full object-cover shadow-sm"
            style={{ border: '3px solid var(--accent)' }}
          />
          <p className="mt-4 text-[15px] font-medium text-slate-800">{t('quemFazBio')}</p>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 rounded-full px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            {t('linkedinTexto')}
          </a>
          <p className="mt-2 text-xs text-slate-500">{t('linkedinSub')}</p>
        </div>

        <p className="mt-5 text-[15px] leading-relaxed text-slate-700">{t('quemFazHistoriaP1')}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{t('quemFazHistoriaP2')}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{t('quemFazProcesso')}</p>

        <div className="mt-4 rounded-lg border bg-white p-5" style={{ borderColor: '#e3e8f0' }}>
          <p className="text-[15px] leading-relaxed text-slate-700">
            {t('quemFazContribuirTexto')}
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href={sugerirPath(l)}
              className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50"
              style={{ borderColor: '#d3dae6', color: 'var(--navy-700)' }}
            >
              ✏️ {tNota('sugerirCorrecao')}
            </a>
            <a
              href={colaborarPath(l)}
              className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50"
              style={{ borderColor: '#d3dae6', color: 'var(--navy-700)' }}
            >
              ✍️ {tColaborar('titulo')}
            </a>
          </div>
        </div>

        <p className="mt-5 text-[15px] font-medium leading-relaxed text-slate-700">
          {t('quemFazFechamento')}
        </p>

        {/* Como o site funciona */}
        <h2 className="mt-10 text-lg font-medium" style={{ color: 'var(--navy-700)' }}>
          {t('funcionaTitulo')}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{t('funcionaP1')}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
          {t('funcionaP2Antes')}
          <a href={notaPath(l, 'bomba-centrifuga')} className={linkCls} style={linkStyle}>
            {t('funcionaP2Link')}
          </a>
          {t('funcionaP2Depois')}
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{t('funcionaP3')}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
          {t('funcionaP4Antes')}
          <a href={metodoPath(l)} className={linkCls} style={linkStyle}>
            {t('funcionaP4Link')}
          </a>
          {t('funcionaP4Depois')}
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
          {t('funcionaP5Antes')}
          <a href={calculadorasPath(l)} className={linkCls} style={linkStyle}>
            {t('funcionaP5Link')}
          </a>
          {t('funcionaP5Depois')}
        </p>
      </div>
    </div>
  );
}
