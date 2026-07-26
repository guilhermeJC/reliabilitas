// DEV-108 (auditoria técnica, 25/07/2026) — o projeto não tinha NENHUM log:
// `grep console. src/` devolvia zero. Isso significava que um erro em BRANCH
// DE CONTROLE (não exceção) não deixava rastro nenhum — foi exatamente assim
// que o `if (ins.error)` do Colaborar falhou em silêncio por um dia inteiro
// (DEV-100). O Sentry cobre exceção não tratada; este módulo cobre o resto.
//
// Contrato: uma linha = um JSON. O campo `evento` é um identificador ESTÁVEL
// no formato `dominio.acao` — é ele que responde "onde eu investigo isso?":
// `grep -rn "sugestao.insert_falhou" src/` leva direto à linha que emitiu.
// Por isso o evento nunca deve ser texto livre nem interpolado.
//
// Emite em console.error/warn/log de propósito: na Vercel, stdout/stderr da
// função JÁ é coletado e associado ao `x-vercel-id` da requisição — não é
// preciso (nem barato) adicionar um coletor externo pra isso.

export type NivelLog = 'info' | 'warn' | 'error';

export interface EntradaLog {
  nivel: NivelLog;
  /** Identificador estável `dominio.acao` — grep-ável até a linha de origem. */
  evento: string;
  /** Correlaciona com o log da própria Vercel. Ver extraiRequestId. */
  requestId?: string;
  rota?: string;
  detalhe?: Record<string, unknown>;
}

/**
 * Monta a linha de log. Puro e com relógio injetável (testável) — mesmo padrão
 * de rate-limit.ts e admin-auth.ts.
 */
export function formataLinhaLog(
  e: EntradaLog,
  agora: () => string = () => new Date().toISOString(),
): string {
  const base: Record<string, unknown> = { ts: agora(), nivel: e.nivel, evento: e.evento };
  if (e.requestId) base.requestId = e.requestId;
  if (e.rota) base.rota = e.rota;

  if (e.detalhe) {
    try {
      // Valida a serialização ANTES de montar a linha final: um objeto de erro
      // com referência circular (acontece com clientes HTTP) não pode derrubar
      // a rota que só queria registrar um aviso.
      JSON.stringify(e.detalhe);
      base.detalhe = e.detalhe;
    } catch {
      base.detalhe_erro_serializacao = true;
    }
  }
  return JSON.stringify(base);
}

/**
 * Correlation id da requisição. Prefere `x-vercel-id` — a plataforma já o
 * injeta e o usa nos próprios logs de função, então a mesma string cruza o
 * log da aplicação com o log da infraestrutura sem trabalho extra.
 * Nunca inventa um id: em dev local simplesmente não há, e um id sintético
 * só criaria a ilusão de rastreabilidade.
 */
export function extraiRequestId(headers: Headers): string | undefined {
  return headers.get('x-vercel-id') ?? headers.get('x-request-id') ?? undefined;
}

export function log(e: EntradaLog): void {
  const linha = formataLinhaLog(e);
  if (e.nivel === 'error') console.error(linha);
  else if (e.nivel === 'warn') console.warn(linha);
  else console.log(linha);
}
