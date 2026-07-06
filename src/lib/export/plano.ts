// F02/BR-004 — export do plano de manutenção da PÁGINA ATUAL apenas. Os dados
// já chegaram no preload SSR; a geração roda no client e o arquivo nasce via
// Blob — NENHUM endpoint novo (dados navegáveis nunca abertos).

export interface TarefaPlano {
  tarefa: string;
  metodo: string;
  periodicidade: string;
}

export interface ContextoPlano {
  equipamento: string; // título do pai imediato na cadeia (ou do ativo)
  modoFalha: string; // título da nota atual
}

export interface HeadersPlano {
  equipamento: string;
  modoFalha: string;
  tarefa: string;
  metodo: string;
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
    headers.tarefa,
    headers.metodo,
    headers.periodicidade,
  ];
  const linhas = plano.map((l) =>
    [ctx.equipamento, ctx.modoFalha, l.tarefa, l.metodo, l.periodicidade].map(celula).join(SEP),
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
  const linhas = [
    `# ${headers.equipamento}: ${ctx.equipamento} — ${ctx.modoFalha}`,
    '',
    `| ${headers.tarefa} | ${headers.metodo} | ${headers.periodicidade} |`,
    '| --- | --- | --- |',
    ...plano.map(
      (l) => `| ${celulaMd(l.tarefa)} | ${celulaMd(l.metodo)} | ${celulaMd(l.periodicidade)} |`,
    ),
  ];
  return linhas.join('\n');
}

export function nomeArquivoPlano(slug: string, ext: 'csv' | 'md'): string {
  return `plano-${slug}.${ext}`;
}
