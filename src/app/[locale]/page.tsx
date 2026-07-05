import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notaPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// Placeholder da Fase 0/Dia 2 — a Home real (T01) nasce no Dia 3 junto com a busca.
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  return (
    <div className="px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-medium" style={{ color: 'var(--navy-700)' }}>
          {t('titulo')}
        </h1>
        <p className="mt-4 text-base leading-relaxed">{t('sub')}</p>
        <p className="mt-8 text-sm">
          {t('prova')}{' '}
          <a
            href={notaPath(locale as Locale, 'cavitacao')}
            className="underline"
            style={{ color: 'var(--wikilink)' }}
          >
            Bomba Centrífuga → Cavitação
          </a>
        </p>
      </div>
    </div>
  );
}
