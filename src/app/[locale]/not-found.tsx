import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import { buscaPath, calculadorasPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// T10 — 404 bilíngue no shell navy: nunca beco sem saída (sempre 3 saídas úteis).
export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('erro404');

  return (
    <div className="px-6 py-16">
      <div
        className="mx-auto max-w-xl rounded-lg border bg-white p-8 text-center"
        style={{ borderColor: '#e3e8f0' }}
      >
        <p className="font-mono text-sm text-slate-400">404</p>
        <h1 className="mt-1 text-xl font-medium" style={{ color: 'var(--navy-700)' }}>
          {t('titulo')}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{t('texto')}</p>
        <p className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
          <a href={`/${locale}`} style={{ color: 'var(--wikilink)' }}>
            {t('home')}
          </a>
          <a href={buscaPath(locale)} style={{ color: 'var(--wikilink)' }}>
            {t('busca')}
          </a>
          <a href={calculadorasPath(locale)} style={{ color: 'var(--wikilink)' }}>
            {t('calculadoras')}
          </a>
        </p>
      </div>
    </div>
  );
}
