import { redirect } from 'next/navigation';
import { estaAutenticado } from '@/lib/admin-session';

// Guarda de sessão real do painel — cada página dentro deste route group
// (URL continua /admin, o grupo não entra na rota) exige cookie assinado
// válido. Rotas de MUTAÇÃO (status) conferem de novo — nunca confiar só aqui.
export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const autenticado = await estaAutenticado();
  if (!autenticado) redirect('/admin/login');

  return (
    <>
      <header
        className="flex h-14 items-center justify-between px-6"
        style={{ background: 'var(--navy-900)' }}
      >
        <span className="text-sm font-medium tracking-[0.14em] text-white">
          RELIABILITAS · Painel de aprovação
        </span>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="text-xs text-slate-300 hover:text-white">
            Sair
          </button>
        </form>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
    </>
  );
}
