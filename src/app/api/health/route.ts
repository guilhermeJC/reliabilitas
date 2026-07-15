import { admin } from '@/lib/db/client';
import { verificaSaude } from '@/lib/health';

// G1/DEV-051 — endpoint de STATUS, não de dados (BR-004): head:true não
// retorna nenhuma linha, só confirma que o Supabase responde. noindex
// implícito (rota /api já fora do matcher de locale/sitemap).
export const dynamic = 'force-dynamic';

export async function GET() {
  const resultado = await verificaSaude(async () => {
    const { error } = await admin()
      .from('notas')
      .select('slug', { count: 'exact', head: true })
      .limit(1);
    return !error;
  });

  return Response.json(resultado, { status: resultado.status === 'ok' ? 200 : 503 });
}
