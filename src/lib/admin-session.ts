import 'server-only';
import { cookies } from 'next/headers';
import { verificaTokenSessao } from '@/lib/admin-auth';

// Ponte entre o cookie do Next (next/headers) e a verificação pura testável
// de admin-auth.ts. Usado pelo layout do painel (redireciona pra /admin/login)
// e por CADA rota de mutação do admin (status de sugestão/contribuição) —
// nunca confiar só no guard do layout para uma rota de escrita.

// DEV-083 #4: nome do cookie repetido em 3 arquivos — fonte única aqui,
// admin/login e admin/logout importam em vez de redeclarar.
export const ADMIN_SESSION_COOKIE = 'admin_session';

export async function estaAutenticado(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(ADMIN_SESSION_COOKIE)?.value;
  const segredo = process.env.ADMIN_SESSION_SECRET;
  if (!token || !segredo) return false;
  return verificaTokenSessao(token, segredo);
}
