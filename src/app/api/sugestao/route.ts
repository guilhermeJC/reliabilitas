import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { admin } from '@/lib/db/client';
import { PAGINA_INTERNA_RE, validaSugestao } from '@/lib/sugestao';
import { criaRateLimiter } from '@/lib/rate-limit';
import { extraiIp } from '@/lib/request-ip';
import { erroSeguroParaTelemetria, extraiRequestId, log } from '@/lib/log';

// T09 — a ÚNICA rota de escrita do site (G4). Ordem das defesas:
// honeypot (bot recebe sucesso FALSO, nada é gravado) → rate limit por IP
// (defesa em profundidade; teto global é do Cloudflare) → zod estrito →
// INSERT server-side com service role (RLS nega anon na tabela).
// POST de form HTML puro: funciona sem JavaScript; resposta é redirect 303.

const permite = criaRateLimiter({ maxNaJanela: 5, janelaMs: 60 * 60 * 1000 });

export async function POST(req: NextRequest) {
  // DEV-129: o rate limit ficava DEPOIS de `req.formData()` e depois do
  // honeypot — ou seja, o corpo era parseado antes de qualquer defesa, e
  // um bot que preenchesse o honeypot nunca consumia quota (recebe sucesso
  // falso e volta). Agora a contagem por IP vem primeiro: gasta-se o mínimo
  // possível antes de decidir atender. O teto real continua sendo o do
  // Cloudflare — que só protege de verdade desde que o origin parou de
  // responder por fora da borda (ver host-canonico.ts).
  const ip = extraiIp(req.headers);
  const dentroDoLimite = permite(ip);
  const form = await req.formData();
  const raw: Record<string, unknown> = Object.fromEntries(form.entries());
  const locale = raw.locale === 'en' ? 'en' : 'pt';
  // Path interno já validado pelo zod; para o redirect de erro usa-se o mesmo
  // critério (nunca refletir URL externa — open redirect impossível).
  const paginaSegura =
    typeof raw.pagina === 'string' && PAGINA_INTERNA_RE.test(raw.pagina)
      ? raw.pagina
      : `/${locale}`;
  const volta = (st: 'ok' | 'erro' | 'limite') =>
    NextResponse.redirect(
      new URL(`/${locale}/sugerir?pagina=${encodeURIComponent(paginaSegura)}&st=${st}`, req.url),
      303,
    );

  const r = validaSugestao(raw);
  if (!r.ok && r.motivo === 'bot') return volta('ok'); // honeypot: finge sucesso
  if (!dentroDoLimite) return volta('limite');

  if (!r.ok) return volta('erro');

  const ins = await admin().from('sugestoes').insert({
    locale,
    pagina: r.data.pagina,
    mensagem: r.data.mensagem,
    contato: r.data.contato,
    nome: r.data.nome,
    formacao: r.data.formacao,
    funcao_empresa: r.data.funcaoEmpresa,
    linkedin_site: r.data.linkedinSite,
    deseja_contribuidor: r.data.desejaContribuidor,
    mostrar_publicamente: r.data.mostrarPublicamente,
  });
  if (ins.error) {
    // DEV-100 (25/07): um INSERT falho aqui ficava sem NENHUM rastro — nem
    // Sentry nem log — porque o erro nunca vira exceção, só um redirect
    // genérico. Foi assim que a migração 0007 ausente passou 1 dia sem ser
    // notada (Colaborar falhando em silêncio). Capturar aqui fecha esse gap.
    // DEV-108: além do Sentry, log estruturado — o `evento` abaixo é grep-ável
    // e leva direto a esta linha.
    log({
      nivel: 'error',
      evento: 'sugestao.insert_falhou',
      requestId: extraiRequestId(req.headers),
      rota: '/api/sugestao',
      detalhe: { ...erroSeguroParaTelemetria(ins.error), tabela: 'sugestoes' },
    });
    // DEV-116: NUNCA mandar `ins.error` cru — o campo `details` do Postgres
    // carrega a linha inteira que falhou (e-mail e texto do visitante).
    Sentry.captureException(new Error('Falha ao gravar sugestão em public.sugestoes'), {
      extra: { supabaseError: erroSeguroParaTelemetria(ins.error) },
    });
    return volta('erro');
  }
  return volta('ok');
}
