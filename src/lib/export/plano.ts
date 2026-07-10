// F02/BR-004 — export do plano de manutenção da PÁGINA ATUAL apenas. Os dados
// já chegaram no preload SSR; a geração roda no client e o arquivo nasce via
// Blob — NENHUM endpoint novo (dados navegáveis nunca abertos).
//
// Sessão 5 (pedido do fundador 10/07): o arquivo carrega a estrutura mínima do
// PRO-MNT-001 §8.1 — classificação Fw A/Fw B no contexto, e por tarefa a
// condição de contorno (§8.2), o critério de aceitação quantitativo (§8.3) e a
// ação em desvio. Campos opcionais exportam vazios: as colunas são estáveis
// para importação em planilha/CMMS.

export interface TarefaPlano {
  tarefa: string;
  metodo: string;
  periodicidade: string;
  condicao?: string; // estado do ativo na medição (em carga / parado / partida)
  criterio?: string; // critério de aceitação quantitativo
  acao?: string; // ação prescrita quando o critério é violado
}

export interface ContextoPlano {
  equipamento: string; // título do pai imediato na cadeia (ou do ativo)
  modoFalha: string; // título da nota atual
  fwA?: string; // classificação Fw A formatada (categoria · β)
  fwB?: string; // prescrição Fw B formatada (decisão · periodicidade)
}

export interface HeadersPlano {
  equipamento: string;
  modoFalha: string;
  fwA: string;
  fwB: string;
  tarefa: string;
  metodo: string;
  condicao: string;
  criterio: string;
  acao: string;
  periodicidade: string;
}

const BOM = '﻿'; // Excel pt-BR só lê UTF-8 com BOM
const SEP = ';'; // padrão Excel pt-BR / import SAP-PM-Maximo via planilha

// Guarda anti CSV-injection: célula iniciando com = + - @ executaria fórmula
// ao abrir no Excel/Sheets — apóstrofo neutraliza sem alterar o texto visível.
function celula(valor: string): string {
  let v = /^[=+\-@]/.test(valor) ? `'${valor}` : valor;
  if (v.includes(SEP) || v.includes('"') || v.includes('\n')) {
    v = `"${v.replaceAll('"', '""')}"`;
  }
  return v;
}

export function planoParaCsv(
  plano: TarefaPlano[],
  ctx: ContextoPlano,
  headers: HeadersPlano,
): string {
  const cab = [
    headers.equipamento,
    headers.modoFalha,
    headers.fwA,
    headers.fwB,
    headers.tarefa,
    headers.metodo,
    headers.condicao,
    headers.criterio,
    headers.acao,
    headers.periodicidade,
  ];
  const linhas = plano.map((l) =>
    [
      ctx.equipamento,
      ctx.modoFalha,
      ctx.fwA ?? '',
      ctx.fwB ?? '',
      l.tarefa,
      l.metodo,
      l.condicao ?? '',
      l.criterio ?? '',
      l.acao ?? '',
      l.periodicidade,
    ]
      .map(celula)
      .join(SEP),
  );
  return BOM + [cab.join(SEP), ...linhas].join('\r\n');
}

function celulaMd(valor: string): string {
  return valor.replaceAll('|', '\\|').replaceAll('\n', ' ');
}

export function planoParaMd(
  plano: TarefaPlano[],
  ctx: ContextoPlano,
  headers: HeadersPlano,
): string {
  const classificacao =
    ctx.fwA || ctx.fwB
      ? [
          ...(ctx.fwA ? [`**${headers.fwA}:** ${ctx.fwA}`] : []),
          ...(ctx.fwB ? [`**${headers.fwB}:** ${ctx.fwB}`] : []),
          '',
        ]
      : [];

  const linhas = [
    `# ${headers.equipamento}: ${ctx.equipamento} — ${ctx.modoFalha}`,
    '',
    ...classificacao,
    `| ${headers.tarefa} | ${headers.metodo} | ${headers.condicao} | ${headers.criterio} | ${headers.acao} | ${headers.periodicidade} |`,
    '| --- | --- | --- | --- | --- | --- |',
    ...plano.map(
      (l) =>
        `| ${celulaMd(l.tarefa)} | ${celulaMd(l.metodo)} | ${celulaMd(l.condicao ?? '')} | ${celulaMd(l.criterio ?? '')} | ${celulaMd(l.acao ?? '')} | ${celulaMd(l.periodicidade)} |`,
    ),
  ];
  return linhas.join('\n');
}

export function nomeArquivoPlano(slug: string, ext: 'csv' | 'md'): string {
  return `plano-${slug}.${ext}`;
}
