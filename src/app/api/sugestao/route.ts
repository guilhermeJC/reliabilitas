import { NextRequest, NextResponse } from 'next/server';
import { admin } from '@/lib/db/client';
import { validaSugestao } from '@/lib/sugestao';
import { criaRateLimiter } from '@/lib/rate-limit';

// T09 — a ÚNICA rota de escrita do site (G4). Ordem das defesas:
// honeypot (bot recebe sucesso FALSO, nada é gravado) → rate limit por IP
// (defesa em profundidade; teto global é do Cloudflare) → zod estrito →
// INSERT server-side com service role (RLS nega anon na tabela).
// POST de form HTML puro: funciona sem JavaScript; resposta é redirect 303.

const permite = criaRateLimiter({ maxNaJanela: 5, janelaMs: 60 * 60 * 1000 });

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const raw: Record<string, unknown> = Object.fromEntries(form.entries());
  const locale = raw.locale === 'en' ? 'en' : 'pt';
  // Path interno já validado pelo zod; para o redirect de erro usa-se o mesmo
  // critério (nunca refletir URL externa — open redirect impossível).
  const paginaSegura =
    typeof raw.pagina === 'string' && /^\/(?!\/)[\w\-/?=%.]*$/.test(raw.pagina)
      ? raw.pagina
      : `/${locale}`;
  const volta = (st: 'ok' | 'erro' | 'limite') =>
    NextResponse.redirect(
      new URL(`/${locale}/sugerir?pagina=${encodeURIComponent(paginaSegura)}&st=${st}`, req.url),
      303,
    );

  const r = validaSugestao(raw);
  if (!r.ok && r.motivo === 'bot') return volta('ok'); // honeypot: finge sucesso

  const ip = (req.headers.get('x-forwarded-for') ?? 'local').split(',')[0].trim();
  if (!permite(ip)) return volta('limite');

  if (!r.ok) return volta('erro');

  const ins = await admin().from('sugestoes').insert({
    locale,
    pagina: r.data.pagina,
    mensagem: r.data.mensagem,
    contato: r.data.contato,
  });
  if (ins.error) return volta('erro');
  return volta('ok');
}
