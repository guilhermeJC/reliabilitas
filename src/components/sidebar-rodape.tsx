import { getTranslations } from 'next-intl/server';
import { normasPath, sobrePath } from '@/lib/routes';
import type { Locale } from '@/lib/content/schema';

// Pedido do fundador (24/07): "Sobre" e "Normas técnicas" saem do rodapé
// site-wide (que agora só tem Termos, centralizado — SiteFooter) e ganham
// destaque PRÓPRIO no fim da sidebar — fixo, fora da área de scroll da
// árvore (SidebarShell reserva esse espaço não-scrollável). "Sobre" leva o
// destaque maior: é a página que carrega a missão pós-pivot (comunidade
// aberta, "quem faz") — mesmo tratamento visual do CTA "Apoiar" no header
// (pill sólida na cor de acento), não um link discreto a mais na árvore.
export async function SidebarRodape({ locale }: { locale: Locale }) {
  const tSobre = await getTranslations('sobre');
  const tNormas = await getTranslations('normas');
  return (
    <div className="shrink-0 border-t px-3 py-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <a
        href={sobrePath(locale)}
        className="block rounded-md px-3 py-2 text-center text-[13px] font-medium text-white shadow-sm transition-opacity hover:opacity-90"
        style={{ background: 'var(--accent)' }}
      >
        {tSobre('titulo')}
      </a>
      <a
        href={normasPath(locale)}
        className="mt-2 block rounded px-2 py-1.5 text-center text-[12px] font-medium uppercase tracking-[0.08em] text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
      >
        {tNormas('titulo')}
      </a>
    </div>
  );
}
