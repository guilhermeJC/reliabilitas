import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { DOACAO_LINKS, DOACAO_QRCODES } from '@/lib/apoio';
import { BotaoCopiar } from '@/components/botao-copiar';

// T08 — Apoiar (G4/DEV-026). Free para sempre para pessoas (D23); doações são o
// funding principal (D24). Canais renderizam quando o fundador fornecer as
// credenciais públicas de recebimento (degradação graciosa até lá).

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'apoio' });
  return { title: t('titulo'), description: t('missao') };
}

export default async function ApoiarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('apoio');

  return (
    <div className="px-4 py-10 md:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-medium" style={{ color: 'var(--navy-900)' }}>
          ♥ {t('titulo')}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-700">{t('missao')}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{t('promessa')}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{t('promessaDoacoes')}</p>

        <div className="mt-8 rounded-lg border bg-white p-6" style={{ borderColor: '#e3e8f0' }}>
          <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
            {t('canaisTitulo')}
          </h2>
          {DOACAO_QRCODES.length > 0 && (
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {DOACAO_QRCODES.map((c) => (
                <div key={c.rotulo} className="flex flex-col items-center text-center">
                  <p className="text-sm font-medium" style={{ color: 'var(--navy-700)' }}>
                    {c.rotulo}
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element -- projeto não usa next/image (DEV-087) */}
                  <img
                    src={c.imagem}
                    alt={`QR Code ${c.rotulo}`}
                    width={c.largura}
                    height={c.altura}
                    className="mt-2 rounded-md border"
                    style={{ borderColor: '#e3e8f0' }}
                  />
                  {(c.copiavel ?? c.href) && (
                    <p className="mt-2 text-xs text-slate-500">{t('escanearOuCopiar')}</p>
                  )}
                  {c.copiavel && (
                    <div className="mt-2">
                      <BotaoCopiar
                        texto={c.copiavel}
                        labelCopiar={t('copiarCodigo')}
                        labelCopiado={t('codigoCopiado')}
                      />
                    </div>
                  )}
                  {c.href && (
                    <a
                      href={c.href}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="mt-2 text-xs"
                      style={{ color: 'var(--wikilink)' }}
                    >
                      {c.href}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {DOACAO_LINKS.length > 0 && (
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {DOACAO_LINKS.map((c) => (
                <a
                  key={c.rotulo}
                  href={c.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="rounded-md border px-4 py-3 text-center text-sm font-medium transition-colors hover:bg-slate-50"
                  style={{ borderColor: '#d3dae6', color: 'var(--navy-700)' }}
                >
                  {c.rotulo}
                </a>
              ))}
            </div>
          )}

          {DOACAO_QRCODES.length === 0 && DOACAO_LINKS.length === 0 && (
            <p className="mt-3 text-sm text-slate-500">{t('canaisEmBreve')}</p>
          )}
        </div>

        <div className="mt-6 rounded-lg border bg-white p-6" style={{ borderColor: '#e3e8f0' }}>
          <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
            {t('destinoTitulo')}
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-600">
            <li>{t('destinoItem1')}</li>
            <li>{t('destinoItem2')}</li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{t('destinoExpansao')}</p>
        </div>
      </div>
    </div>
  );
}
