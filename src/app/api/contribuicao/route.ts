import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { admin } from '@/lib/db/client';
import { validaContribuicao } from '@/lib/contribuicao';
import { criaRateLimiter } from '@/lib/rate-limit';
import { extraiIp } from '@/lib/request-ip';

// Colaborar — 2ª (e última planejada no MVP) rota de escrita pública do site.
// Mesma ordem de defesas do T09 (/api/sugestao): honeypot (bot recebe sucesso
// FALSO) → rate limit por IP → zod estrito → INSERT server-side com service
// role (RLS nega anon na tabela). Form HTML puro: funciona sem JavaScript.

const permite = criaRateLimiter({ maxNaJanela: 3, janelaMs: 60 * 60 * 1000 });

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const raw: Record<string, unknown> = Object.fromEntries(form.entries());
  const locale = raw.locale === 'en' ? 'en' : 'pt';
  const volta = (st: 'ok' | 'erro' | 'limite') =>
    NextResponse.redirect(new URL(`/${locale}/colaborar?st=${st}`, req.url), 303);

  const r = validaContribuicao(raw);
  if (!r.ok && r.motivo === 'bot') return volta('ok'); // honeypot: finge sucesso

  const ip = extraiIp(req.headers);
  if (!permite(ip)) return volta('limite');

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
    Sentry.captureException(new Error('Falha ao gravar contribuição em public.contribuicoes'), {
      extra: { supabaseError: ins.error },
    });
    return volta('erro');
  }
  return volta('ok');
}
