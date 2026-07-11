// T09 — toda nota oferece o canal curado de correção. Pedido do fundador
// (11/07): também no TOPO da página (antes só no rodapé) e um pouco mais
// chamativo — vira "botão" com borda em vez de link sublinhado discreto.
// Estático (sem 'use client'): é só uma âncora.

export function SugerirCorrecaoLink({ href, texto }: { href: string; texto: string }) {
  return (
    <a
      href={href}
      className="print:hidden inline-flex items-center gap-1 rounded border px-2.5 py-1.5 text-[12px] font-medium transition-colors hover:bg-slate-50"
      style={{ borderColor: '#d3dae6', color: 'var(--wikilink)' }}
    >
      ✎ {texto}
    </a>
  );
}
