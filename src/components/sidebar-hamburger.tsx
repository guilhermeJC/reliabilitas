'use client';

// Hamburger no header (rodada 6 do fundador): dispara CustomEvent que a
// SidebarShell escuta — evita context/prop drilling. Padrão Obsidian/Notion.

export function SidebarHamburger({ label }: { label: string }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={() => document.dispatchEvent(new CustomEvent('sidebar-toggle'))}
      className="flex h-8 w-8 items-center justify-center rounded text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M3 6h14M3 10h14M3 14h14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
