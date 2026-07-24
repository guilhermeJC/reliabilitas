import { getTranslations } from 'next-intl/server';
import { normasPath, sobrePath, termosPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// G3 (Dia 5) — rodapé mínimo do site: dá acesso, em toda página, aos links
// institucionais (convenção padrão da web — não existia nenhum footer
// site-wide antes). Ganhou Sobre (T11) e Normas (T07) no resto do Dia 5
// (24/07) — continua deliberadamente enxuto, só 3 links.
export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations('termos');
  const tSobre = await getTranslations('sobre');
  const tNormas = await getTranslations('normas');
  return (
    <footer
      className="border-t px-4 py-4 text-center text-xs text-slate-500 print:hidden"
      style={{ borderColor: '#e3e8f0' }}
    >
      <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <a
          href={sobrePath(locale)}
          className="hover:underline"
          style={{ color: 'var(--wikilink)' }}
        >
          {tSobre('titulo')}
        </a>
        <a
          href={normasPath(locale)}
          className="hover:underline"
          style={{ color: 'var(--wikilink)' }}
        >
          {tNormas('titulo')}
        </a>
        <a
          href={termosPath(locale)}
          className="hover:underline"
          style={{ color: 'var(--wikilink)' }}
        >
          {t('titulo')}
        </a>
      </nav>
    </footer>
  );
}
