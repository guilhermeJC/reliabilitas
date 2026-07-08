import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { WeibullCalc } from '@/components/calc/weibull-calc';
import { DisponibilidadeCalc } from '@/components/calc/disponibilidade-calc';
import { PFCalc } from '@/components/calc/pf-calc';
import { calculadorasPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// F05/BR-012 — página das 3 calculadoras (AFC do Dia 3: página índice + embeds).
// INDEXÁVEL (SEO/GEO): é conteúdo-ferramenta, não resultado de busca. As contas
// são 100% client-side — nenhum dado navegável sai daqui (BR-004).

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'calc' });
  return { title: t('titulo'), description: t('intro') };
}

export default async function CalculadorasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('calc');

  return (
    <div className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-medium" style={{ color: 'var(--navy-900)' }}>
          {t('titulo')}
        </h1>
        <p className="mt-2 text-sm text-slate-600">{t('intro')}</p>
        {/* Banner do guia How to use no COMEÇO da página → página própria
            (revisão do fundador, 08/07 — não alongar a página das ferramentas) */}
        <div
          className="mt-6 flex flex-col gap-4 rounded-lg p-5 sm:flex-row sm:items-center sm:justify-between"
          style={{ background: 'var(--navy-700)' }}
        >
          <div>
            <h2 className="text-base font-medium text-white">{t('guia.titulo')}</h2>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-300">{t('guia.sub')}</p>
          </div>
          <a
            href={calculadorasPath(locale as Locale, 'guia')}
            className="shrink-0 rounded-md px-5 py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            {t('guia.abrir')}
          </a>
        </div>
        <div className="mt-6 space-y-5">
          <WeibullCalc />
          <DisponibilidadeCalc />
          <PFCalc />
        </div>
      </div>
    </div>
  );
}
