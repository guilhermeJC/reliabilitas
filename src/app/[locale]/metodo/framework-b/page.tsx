import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { metodoPath, notaPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// Framework B — Prescrição (revisão 4 do fundador): a hierarquia de tarefas do
// RCM (SAE JA1011; Moubray) na ordem de preferência — a mesma lógica do seletor.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'metodo.fwB' });
  return { title: t('titulo'), description: t('p1') };
}

export default async function FrameworkBPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('metodo.fwB');
  const tFw = await getTranslations('fw');
  const l = locale as Locale;

  const hierarquia = [
    { decisao: 'cbm', texto: t('hierCbm') },
    { decisao: 'tbm', texto: t('hierTbm') },
    { decisao: 'proof_test', texto: t('hierProof') },
    { decisao: 'rtf', texto: t('hierRtf') },
    { decisao: 'redesenho', texto: t('hierRedesenho') },
  ] as const;

  return (
    <div className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="border-l-4 pl-4" style={{ borderColor: 'var(--fw-b)' }}>
          <h1 className="text-2xl font-medium" style={{ color: 'var(--fw-b)' }}>
            {t('titulo')}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{t('sub')}</p>
        </header>

        <p className="mt-6 text-[15px] leading-relaxed text-slate-700">{t('p1')}</p>

        <h2 className="mt-8 text-lg font-medium" style={{ color: 'var(--navy-900)' }}>
          {t('hierTitulo')}
        </h2>
        <ol className="mt-3 space-y-2">
          {hierarquia.map((h, i) => (
            <li
              key={h.decisao}
              className="flex items-baseline gap-3 rounded-lg border bg-white p-4"
              style={{ borderColor: '#e3e8f0' }}
            >
              <span className="font-mono text-sm text-slate-400">{i + 1}</span>
              <div>
                <span className="text-sm font-medium" style={{ color: 'var(--fw-b)' }}>
                  {tFw(`decisoes.${h.decisao}`)}
                </span>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{h.texto}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="mt-8 text-lg font-medium" style={{ color: 'var(--navy-900)' }}>
          {t('consTitulo')}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{t('consP1')}</p>

        <h2 className="mt-8 text-lg font-medium" style={{ color: 'var(--navy-900)' }}>
          {t('acervoTitulo')}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{t('acervoP1')}</p>

        <nav
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t pt-4 text-sm"
          style={{ borderColor: '#e3e8f0' }}
        >
          <a href={metodoPath(l, 'framework-a')} style={{ color: 'var(--wikilink)' }}>
            {t('irA')}
          </a>
          <a href={notaPath(l, 'cavitacao')} style={{ color: 'var(--wikilink)' }}>
            {t('exemplo')}
          </a>
          <a href={`${metodoPath(l)}#seletor`} style={{ color: 'var(--wikilink)' }}>
            {t('irSeletor')}
          </a>
        </nav>
      </div>
    </div>
  );
}
