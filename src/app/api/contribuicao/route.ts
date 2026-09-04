import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { admin } from '@/lib/db/client';
import { validaContribuicao } from '@/lib/contribuicao';
import { criaRateLimiter } from '@/lib/rate-limit';
import { extraiIp } from '@/lib/request-ip';
import { erroSeguroParaTelemetria, extraiRequestId, log } from '@/lib/log';

// Colaborar — 2ª (e última planejada no MVP) rota de escrita pública do site.
// Mesma ordem de defesas do T09 (/api/sugestao): honeypot (bot recebe sucesso
// FALSO) → rate limit por IP → zod estrito → INSERT server-side com service
// role (RLS nega anon na tabela). Form HTML puro: funciona sem JavaScript.

const permite = criaRateLimiter({ maxNaJanela: 3, janelaMs: 60 * 60 * 1000 });

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
  const volta = (st: 'ok' | 'erro' | 'limite') =>
    NextResponse.redirect(new URL(`/${locale}/colaborar?st=${st}`, req.url), 303);

  const r = validaContribuicao(raw);
  if (!r.ok && r.motivo === 'bot') return volta('ok'); // honeypot: finge sucesso
  if (!dentroDoLimite) return volta('limite');

  if (!r.ok) return volta('erro');

  const ins = await admin().from('contribuicoes').insert({
    locale: r.data.locale,
    tipo_nota: r.data.tipoNota,
    taxonomia_pai: r.data.taxonomiaPai,
    titulo_sugerido: r.data.tituloSugerido,
    resumo: r.data.resumo,
    corpo_md: r.data.corpoMd,
    contato: r.data.contato,
    nome: r.data.nome,
    formacao: r.data.formacao,
    funcao_empresa: r.data.funcaoEmpresa,
    linkedin_site: r.data.linkedinSite,
    deseja_contribuidor: r.data.desejaContribuidor,
    mostrar_publicamente: r.data.mostrarPublicamente,
  });
  if (ins.error) {
    // DEV-100 (25/07): mesmo gap do /api/sugestao — um INSERT falho aqui não
    // deixava rastro nenhum (nem Sentry, nem log), só um redirect genérico.
    // Foi assim que a migração 0007 ausente passou 1 dia sem ser notada.
    // DEV-108: log estruturado + Sentry (o `evento` é grep-ável até aqui).
    log({
      nivel: 'error',
      evento: 'contribuicao.insert_falhou',
      requestId: extraiRequestId(req.headers),
      rota: '/api/contribuicao',
      detalhe: { ...erroSeguroParaTelemetria(ins.error), tabela: 'contribuicoes' },
    });
    // DEV-116: NUNCA mandar `ins.error` cru — o campo `details` do Postgres
    // carrega a linha inteira que falhou (e-mail e texto do visitante).
    Sentry.captureException(new Error('Falha ao gravar contribuição em public.contribuicoes'), {
      extra: { supabaseError: erroSeguroParaTelemetria(ins.error) },
    });
    return volta('erro');
  }
  return volta('ok');
}
