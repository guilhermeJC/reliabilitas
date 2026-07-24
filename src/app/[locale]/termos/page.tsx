import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

// G3 (Dia 5) — Termos de Uso + Política de Privacidade, página única com
// 2 seções ancoradas (#uso / #privacidade). Atualizado no pivot pra projeto
// aberto de comunidade (DEV-094, 24/07): conteúdo sob CC BY-SA 4.0, código
// sob MIT (BR-004 reescrita). Cobre explicitamente a retenção dos 4 campos
// opcionais de identificação do autor em Colaborar (DEV-083 #6 + DEV-094),
// incl. o aviso de que parte disso pode virar público (byline da nota).
// Rascunho: aviso visível até o fundador confirmar a versão final (mesmo
// padrão de gate editorial do resto do conteúdo).

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'termos' });
  return { title: t('titulo') };
}

export default async function TermosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('termos');

  return (
    <div className="px-4 py-10 md:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-medium" style={{ color: 'var(--navy-900)' }}>
          {t('titulo')}
        </h1>
        <p className="mt-1 text-xs text-slate-500">{t('atualizadoEm')}</p>
        <p
          className="mt-4 rounded-md border px-3 py-2 text-xs font-medium"
          style={{ borderColor: '#f0c36d', background: '#fdf6e3', color: '#92660a' }}
        >
          {t('rascunhoAviso')}
        </p>

        <nav className="mt-6 flex flex-wrap gap-2 text-xs">
          <a
            href="#uso"
            className="rounded-full border px-3 py-1 transition-colors hover:bg-white"
            style={{ color: 'var(--wikilink)', borderColor: '#d3dae6' }}
          >
            {t('sumarioUso')}
          </a>
          <a
            href="#privacidade"
            className="rounded-full border px-3 py-1 transition-colors hover:bg-white"
            style={{ color: 'var(--wikilink)', borderColor: '#d3dae6' }}
          >
            {t('sumarioPrivacidade')}
          </a>
        </nav>

        <section id="uso" className="mt-8 scroll-mt-20">
          <h2 className="text-lg font-medium" style={{ color: 'var(--navy-700)' }}>
            {t('usoTitulo')}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{t('usoAcesso')}</p>

          <h3 className="mt-5 text-sm font-medium text-slate-800">{t('usoLicencaTitulo')}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{t('usoLicenca')}</p>

          <h3 className="mt-5 text-sm font-medium text-slate-800">{t('usoLicencaCodigoTitulo')}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{t('usoLicencaCodigo')}</p>

          <h3 className="mt-5 text-sm font-medium text-slate-800">{t('usoConteudoTitulo')}</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-slate-700">
            <li>{t('usoConteudoItem1')}</li>
            <li>{t('usoConteudoItem2')}</li>
          </ul>

          <h3 className="mt-5 text-sm font-medium text-slate-800">{t('usoConteudoTitulo2')}</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-slate-700">
            <li>{t('usoConteudoItem3')}</li>
            <li>{t('usoConteudoItem4')}</li>
          </ul>

          <h3 className="mt-5 text-sm font-medium text-slate-800">
            {t('usoResponsabilidadeTitulo')}
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
            {t('usoResponsabilidade')}
          </p>

          <p className="mt-5 text-[15px] leading-relaxed text-slate-700">{t('usoFormularios')}</p>
        </section>

        <section id="privacidade" className="mt-10 scroll-mt-20">
          <h2 className="text-lg font-medium" style={{ color: 'var(--navy-700)' }}>
            {t('privacidadeTitulo')}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
            {t('privacidadeResumo')}
          </p>

          <h3 className="mt-5 text-sm font-medium text-slate-800">{t('privacidadeNaoColeta')}</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-slate-700">
            <li>{t('privacidadeNaoColetaItem1')}</li>
            <li>{t('privacidadeNaoColetaItem2')}</li>
            <li>{t('privacidadeNaoColetaItem3')}</li>
          </ul>

          <h3 className="mt-5 text-sm font-medium text-slate-800">{t('privacidadeColeta')}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
            {t('privacidadeColetaSugerir')}
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
            {t('privacidadeColetaAutor')}
          </p>
          <p
            className="mt-3 rounded-md border-l-4 bg-white py-2 pl-3 text-[15px] leading-relaxed text-slate-700"
            style={{ borderColor: 'var(--accent)' }}
          >
            {t('privacidadeColetaAutorPublico')}
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
            {t('privacidadeColetaIp')}
          </p>

          <h3 className="mt-5 text-sm font-medium text-slate-800">{t('privacidadeTerceiros')}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
            {t('privacidadeTerceirosTexto')}
          </p>

          <h3 className="mt-5 text-sm font-medium text-slate-800">{t('privacidadeDireitos')}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
            {t('privacidadeDireitosTexto')}
          </p>

          <p className="mt-5 text-[15px] leading-relaxed text-slate-700">
            {t('privacidadeContato')}
          </p>
        </section>
      </div>
    </div>
  );
}
