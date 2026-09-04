import { getTranslations } from 'next-intl/server';
import { autorDaNota, iniciais } from '@/lib/content/autor';
import { sobrePath } from '@/lib/routes';
import { LinkedInIcon } from '@/components/linkedin-icon';
import type { Locale } from '@/lib/content/schema';

// Byline do autor (pedido do fundador, 04/09 — DEV-127): quem escreveu, em
// destaque, ANTES do sumário e de novo no FIM do artigo (antes das Fontes).
// Async Server Component, mesmo padrão de Backlinks/RodapeNota. Visual na
// mesma linguagem do cartão de resumo (border-l-4 + painel branco), com a
// barra em navy-700 para dar o peso que o fundador pediu — sem token novo.
// DEV-128: QUEM aparece vem de autorDaNota — frontmatter.autor (contribuidor
// aprovado, com consentimento) ou, ausente, o autor padrão do acervo. Sem
// foto → avatar de iniciais; "Sobre o autor →" só pro autor padrão (/sobre).
export async function AutorNota({
  frontmatter,
  locale,
}: {
  frontmatter: Record<string, unknown>;
  locale: Locale;
}) {
  const t = await getTranslations('nota');
  const autor = autorDaNota(frontmatter, t('autorCargo'));
  return (
    <aside
      aria-label={t('autorRotulo')}
      className="mt-6 flex items-center gap-4 rounded-lg border border-l-4 bg-white p-4 shadow-sm md:gap-5 md:p-5"
      style={{ borderColor: '#e3e8f0', borderLeftColor: 'var(--navy-700)' }}
    >
      {autor.foto ? (
        // eslint-disable-next-line @next/next/no-img-element -- projeto não usa next/image (DEV-087)
        <img
          src={autor.foto}
          alt={t('autorFotoAlt', { nome: autor.nome })}
          width={72}
          height={72}
          className="h-16 w-16 shrink-0 rounded-md object-cover md:h-[72px] md:w-[72px]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md text-xl font-semibold text-white md:h-[72px] md:w-[72px]"
          style={{ background: 'var(--navy-700)' }}
        >
          {iniciais(autor.nome)}
        </div>
      )}
      <div className="min-w-0">
        <p
          className="text-[11px] font-medium uppercase tracking-[0.14em]"
          style={{ color: 'var(--navy-700)' }}
        >
          {t('autorRotulo')}
        </p>
        <p
          className="mt-0.5 text-[17px] font-semibold leading-tight"
          style={{ color: 'var(--navy-900)' }}
        >
          {autor.nome}
        </p>
        {autor.cargo && (
          <p className="mt-1 text-[13px] leading-snug text-slate-600">{autor.cargo}</p>
        )}
        {(autor.link || autor.padrao) && (
          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-medium">
            {autor.link && (
              <a
                href={autor.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                {autor.link.rotulo === 'LinkedIn' && <LinkedInIcon size={14} />}
                {autor.link.rotulo}
              </a>
            )}
            {autor.padrao && (
              <a
                href={sobrePath(locale)}
                className="hover:underline"
                style={{ color: 'var(--wikilink)' }}
              >
                {t('autorSobre')}
              </a>
            )}
          </p>
        )}
      </div>
    </aside>
  );
}
