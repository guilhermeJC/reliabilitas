import '../globals.css';

// Painel de aprovação (11/07) — ferramenta interna do fundador, fora do
// next-intl (PT-only, sem hreflang/SEO — noindex). Casca HTML compartilhada
// por /admin/login (público) e /admin/(protected)/* (guardado). A guarda de
// sessão fica no layout de (protected) — nunca aqui, ou /admin/login entraria
// em loop de redirect.
export const dynamic = 'force-dynamic';

export const metadata = { robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body style={{ background: 'var(--canvas)' }}>{children}</body>
    </html>
  );
}
