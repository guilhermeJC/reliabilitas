import { getTranslations } from 'next-intl/server';
import { termosPath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// G3 (Dia 5) — rodapé mínimo do site: só o link de Termos/Privacidade,
// centralizado. Sobre (T11) e Normas (T07) saíram daqui (pedido do fundador,
// 24/07) — ganharam destaque próprio no fim da sidebar (SidebarRodape),
// fora da área de scroll da árvore, sempre visível.
export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations('termos');
  return (
    <footer
      className="border-t px-4 py-4 text-center text-xs text-slate-500 print:hidden"
      style={{ borderColor: '#e3e8f0' }}
    >
      <a href={termosPath(locale)} className="hover:underline" style={{ color: 'var(--wikilink)' }}>
        {t('titulo')}
      </a>
    </footer>
  );
}
