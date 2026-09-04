import { NextRequest, NextResponse } from 'next/server';
import { estaAutenticado } from '@/lib/admin-session';
import { parseIdPositivo } from '@/lib/id-rota';
import { atualizaStatusContribuicao, CONTRIBUICAO_STATUS } from '@/lib/db/moderacao';

// Rota de MUTAÇÃO do painel — confere a sessão de novo (nunca confiar só no
// guard do layout, que só protege leitura de página, não POSTs diretos).
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await estaAutenticado())) {
    return NextResponse.json({ error: 'não autenticado' }, { status: 403 });
  }
  const { id } = await params;
  // DEV-129: era `Number(id)` cru — `Number('1e3')` é 1000 e `Number('abc')`
  // é NaN; nenhum dos dois é id de linha. Id inválido morre aqui, em 400.
  const idNum = parseIdPositivo(id);
  if (idNum === null) {
    return NextResponse.json({ error: 'id inválido' }, { status: 400 });
  }
  const form = await req.formData();
  const status = String(form.get('status') ?? '');
  if (!CONTRIBUICAO_STATUS.includes(status as never)) {
    return NextResponse.json({ error: 'status inválido' }, { status: 400 });
  }
  await atualizaStatusContribuicao(idNum, status as (typeof CONTRIBUICAO_STATUS)[number]);
  return NextResponse.redirect(new URL('/admin', req.url), 303);
}
