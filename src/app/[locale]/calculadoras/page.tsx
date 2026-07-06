import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { WeibullCalc } from '@/components/calc/weibull-calc';
import { DisponibilidadeCalc } from '@/components/calc/disponibilidade-calc';
import { PFCalc } from '@/components/calc/pf-calc';

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
        <div className="mt-6 space-y-5">
          <WeibullCalc />
          <DisponibilidadeCalc />
          <PFCalc />
        </div>
      </div>
    </div>
  );
}
