import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { GuiaCalculadoras } from '@/components/calc/guia-calculadoras';
import { calculadorasPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// Guia How to use das calculadoras em página própria (revisão do fundador,
// 08/07). INDEXÁVEL (SEO/GEO): conteúdo educacional puro, servido no SSR.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'calc.guia' });
  return { title: t('titulo'), description: t('sub') };
}

export default async function GuiaCalculadorasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('calc.guia');
  const l = locale as Locale;

  return (
    <div className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm">
          <a href={calculadorasPath(l)} style={{ color: 'var(--wikilink)' }}>
            {t('voltar')}
          </a>
        </p>
        <h1 className="mt-3 text-2xl font-medium" style={{ color: 'var(--navy-900)' }}>
          {t('titulo')}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('sub')}</p>

        <GuiaCalculadoras locale={l} />

        <p className="mt-8 border-t pt-4 text-sm" style={{ borderColor: '#e3e8f0' }}>
          <a href={calculadorasPath(l)} style={{ color: 'var(--wikilink)' }}>
            {t('voltar')}
          </a>
        </p>
      </div>
    </div>
  );
}
