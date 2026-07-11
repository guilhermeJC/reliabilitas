import { NextRequest, NextResponse } from 'next/server';
import { estaAutenticado } from '@/lib/admin-session';
import { atualizaStatusSugestao, SUGESTAO_STATUS } from '@/lib/db/moderacao';

// Rota de MUTAÇÃO do painel — confere a sessão de novo (nunca confiar só no
// guard do layout, que só protege leitura de página, não POSTs diretos).
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await estaAutenticado())) {
    return NextResponse.json({ error: 'não autenticado' }, { status: 403 });
  }
  const { id } = await params;
  const form = await req.formData();
  const status = String(form.get('status') ?? '');
  if (!SUGESTAO_STATUS.includes(status as never)) {
    return NextResponse.json({ error: 'status inválido' }, { status: 400 });
  }
  await atualizaStatusSugestao(Number(id), status as (typeof SUGESTAO_STATUS)[number]);
  return NextResponse.redirect(new URL('/admin', req.url), 303);
}
