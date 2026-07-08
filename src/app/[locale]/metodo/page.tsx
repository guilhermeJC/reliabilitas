import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { SeletorEstrategia } from '@/components/seletor-estrategia';
import { metodoPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// Revisão 4 do fundador: o método deixa de ser dois cards mortos na Home e vira
// destino navegável — o pipeline Fw A → Fw B clicável + o seletor de estratégia
// (o diagrama de decisão do RCM como ferramenta viva). INDEXÁVEL (SEO/GEO):
// conteúdo-ferramenta como as calculadoras; a decisão roda client-side (BR-004).

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'metodo' });
  return { title: t('titulo'), description: t('sub') };
}

export default async function MetodoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('metodo');
  const tHome = await getTranslations('home');

  return (
    <div className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-medium" style={{ color: 'var(--navy-900)' }}>
          {t('titulo')}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('sub')}</p>

        {/* Pipeline Fw A → Fw B (semântica fixa roxo → verde), clicável */}
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <a
            href={metodoPath(locale as Locale, 'framework-a')}
            className="group rounded-lg border-l-4 bg-white p-5 transition-shadow hover:shadow-md"
            style={{ borderColor: 'var(--fw-a)' }}
          >
            <h2 className="text-sm font-medium" style={{ color: 'var(--fw-a)' }}>
              {tHome('metodoATitulo')}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('aResumo')}</p>
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
            <h2 className="text-sm font-medium" style={{ color: 'var(--fw-b)' }}>
              {tHome('metodoBTitulo')}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('bResumo')}</p>
            <span
              className="mt-3 block text-sm group-hover:underline"
              style={{ color: 'var(--wikilink)' }}
            >
              →
            </span>
          </a>
        </div>

        <div className="mt-8">
          <SeletorEstrategia />
        </div>
      </div>
    </div>
  );
}
