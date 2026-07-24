'use client';

import { useEffect, useState } from 'react';
import { decideColapsadoInicial } from '@/lib/sidebar-preferencia';

// Rodada 6 do fundador (09/07): a árvore lateral vira toggle. Antes era sticky
// fixa (rodada 4); agora o visitante pode recolher para ler o conteúdo em tela
// cheia e reabrir a qualquer momento.
//
// SSR renderiza SEMPRE aberta — crawlers (BR-010) e a primeira visita veem toda
// a árvore no HTML. Só após mount o useEffect decide o estado visível real
// (`decideColapsadoInicial`, achado do fundador 17/07, revisado no mesmo dia
// com prints do celular real): no CELULAR, sempre recolhida, mesmo com
// preferência salva de uma sessão anterior — é uma gaveta full-screen, não
// uma coluna, e "lembrar" de ficar aberta entre páginas é o próprio bug (o
// usuário abre pra escolher 1 destino, e a próxima página nascia aberta de
// novo). No DESKTOP, a preferência salva continua valendo como sempre. O
// hamburger do header dispara um CustomEvent que este componente escuta —
// evita passar contexto React por toda a hierarquia.

const CHEVRON_D = 'M3.5 1.5 L6.5 5 L3.5 8.5';

function Chevron({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width="12" height="12" viewBox="0 0 10 10" aria-hidden="true" style={style}>
      <path
        d={CHEVRON_D}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SidebarShell({
  sidebar,
  children,
  footer,
  rodapeSidebar,
  labels,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  rodapeSidebar?: React.ReactNode;
  labels: { nav: string; collapse: string; expand: string };
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hidratação: lê a preferência SALVA; sem ela, o padrão depende do tamanho
  // de tela (recolhida no celular, aberta no desktop — decideColapsadoInicial).
  // DEV-083 #1: sessionStorage, não localStorage — o site é 100% cookieless
  // via sessionStorage (CLAUDE.md §9); localStorage era a única violação
  // dessa invariante. Efeito colateral aceito: a preferência não sobrevive
  // mais entre abas/sessões, só dentro da mesma aba (era o próprio achado).
  useEffect(() => {
    try {
      const salvo = window.sessionStorage.getItem('sidebarOpen');
      const ehMobile = window.matchMedia('(max-width: 767px)').matches;
      setCollapsed(decideColapsadoInicial(salvo, ehMobile));
    } catch {
      // sessão privada bloqueia sessionStorage/matchMedia — segue com o default (aberta)
    }
    setMounted(true);
  }, []);

  // Persiste depois de hidratar (evita apagar o valor no 1º render).
  useEffect(() => {
    if (!mounted) return;
    try {
      window.sessionStorage.setItem('sidebarOpen', collapsed ? '0' : '1');
    } catch {
      /* noop */
    }
  }, [collapsed, mounted]);

  // Escuta o hamburger do header e outros disparos no mesmo documento.
  useEffect(() => {
    const onToggle = () => setCollapsed((c) => !c);
    document.addEventListener('sidebar-toggle', onToggle);
    return () => document.removeEventListener('sidebar-toggle', onToggle);
  }, []);

  return (
    <div className="flex w-full">
      <aside
        aria-label={labels.nav}
        data-collapsed={collapsed ? 'true' : undefined}
        className={
          // A transição só entra depois do mount (evita flash na hidratação
          // quando o sessionStorage difere do default). print:hidden — a árvore
          // não deve aparecer no PDF gerado por window.print() (botão "Baixar PDF").
          // overflow-y-auto saiu daqui: agora só a árvore (bloco do meio) rola;
          // o cabeçalho e o rodapé da sidebar (Sobre/Normas) ficam fixos.
          `print:hidden shrink-0 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:self-start md:overflow-hidden ${mounted ? 'transition-[width] duration-200 ease-out' : ''} ` +
          (collapsed ? 'hidden w-8 md:block' : 'w-full md:w-[280px]')
        }
        style={{ background: 'var(--navy-900)' }}
      >
        {collapsed ? (
          <button
            type="button"
            title={labels.expand}
            aria-label={labels.expand}
            onClick={() => setCollapsed(false)}
            className="hidden h-full w-full items-center justify-center text-slate-400 transition-colors hover:bg-white/5 hover:text-white md:flex"
          >
            <Chevron />
          </button>
        ) : (
          <div className="flex h-full flex-col">
            <div className="hidden shrink-0 items-center justify-between border-b border-white/5 px-2 py-1.5 md:flex">
              <span className="pl-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
                {labels.nav}
              </span>
              <button
                type="button"
                title={labels.collapse}
                aria-label={labels.collapse}
                onClick={() => setCollapsed(true)}
                className="rounded p-1 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Chevron style={{ transform: 'rotate(180deg)' }} />
              </button>
            </div>
            <div className="min-h-0 flex-1 md:overflow-y-auto">{sidebar}</div>
            {rodapeSidebar}
          </div>
        )}
      </aside>
      {/* footer DENTRO do <main>, não como irmão da linha inteira (G3): o
          <aside> tem altura fixa de viewport (md:h-[calc(100vh-3.5rem)]) pra
          habilitar o scroll interno da árvore — isso força a LINHA a ter no
          mínimo 1 viewport de altura, sempre. Um footer fora dela, em página
          curta (ex.: /termos), sobrava um vão enorme antes dele aparecer.
          Como flex column com o conteúdo em flex-1, o footer gruda no fim da
          coluna esticada (padrão "sticky footer") em vez de flutuar solto. */}
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="min-w-0 flex-1">{children}</div>
        {footer}
      </main>
    </div>
  );
}
