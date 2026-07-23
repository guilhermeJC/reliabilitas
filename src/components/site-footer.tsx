import { getTranslations } from 'next-intl/server';
import { termosPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// G3 (Dia 5) — rodapé mínimo do site: só existe pra dar acesso, em toda
// página, ao link de Termos/Privacidade (convenção padrão da web — não
// existia nenhum footer site-wide antes). Deliberadamente enxuto.
export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations('termos');
  return (
    <footer
      className="mt-auto border-t px-4 py-4 text-center text-xs text-slate-500 print:hidden"
      style={{ borderColor: '#e3e8f0' }}
    >
      <a href={termosPath(locale)} className="hover:underline" style={{ color: 'var(--wikilink)' }}>
        {t('titulo')}
      </a>
    </footer>
  );
}
