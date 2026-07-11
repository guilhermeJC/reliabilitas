// F02/BR-004 — export do plano de manutenção da PÁGINA ATUAL apenas. Os dados
// já chegaram no preload SSR; a geração roda no client e o arquivo nasce via
// Blob — NENHUM endpoint novo (dados navegáveis nunca abertos).
//
// Melhoria 3 do fundador (10/07): o export deixa de ser uma tabela magra e
// vira o DOCUMENTO de plano no template RELIABILITAS, moldado no exemplo
// industrial real fornecido por ele: logo em caracteres → título por decisão
// (CBM/TBM) → DISCLAIMER OBRIGATÓRIO de foco no modo de falha → classificação
// Fw A/B (o porquê do plano) → informações gerais com campos de preenchimento
// → escopo/segurança → tabela-resumo → UMA SEÇÃO POR TAREFA (condição,
// especialidade, duração, procedimento passo a passo, registros de medição,
// critério de aceitação, ação em desvio) → restabelecimento operacional →
// validação com assinaturas → rodapé com origem e revisão.

import type { TextosPlanoDoc } from '@/lib/export/plano-textos';

export interface TarefaPlano {
  tarefa: string;
  metodo: string;
  periodicidade: string;
  condicao?: string;
  criterio?: string;
  acao?: string;
  especialidade?: string;
  duracao?: string;
  passos?: string[];
  registros?: string[];
}

export interface ContextoPlano {
  equipamento: string;
  modoFalha: string;
  fwA?: string; // classificação Fw A formatada (categoria · β)
  fwB?: string; // prescrição Fw B formatada (decisão · periodicidade)
  decisao?: string; // valor cru da decisão (cbm|tbm|...) — escolhe o título
  pfTipico?: string;
  url?: string; // URL canônica da nota de origem
  revisadoEm?: string;
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

function celulaMd(valor: string): string {
  return valor.replaceAll('|', '\\|').replaceAll('\n', ' ');
}

function titulo(ctx: ContextoPlano, tx: TextosPlanoDoc): string {
  return (ctx.decisao && tx.tituloPorDecisao[ctx.decisao]) || tx.tituloGenerico;
}

function disclaimer(ctx: ContextoPlano, tx: TextosPlanoDoc): string {
  return tx.disclaimer
    .replaceAll('{modo}', ctx.modoFalha)
    .replaceAll('{equipamento}', ctx.equipamento);
}

const LOGO_LARGURA = 55;

export function planoParaMd(plano: TarefaPlano[], ctx: ContextoPlano, tx: TextosPlanoDoc): string {
  const linhas: string[] = [];
  const borda = '═'.repeat(LOGO_LARGURA);

  // Logotipo em caracteres (pedido do fundador: estilizado com letras)
  linhas.push(
    '```',
    borda,
    '   R E L I A B I L I T A S',
    `   ${tx.tagline}`,
    `   ${tx.site}`,
    borda,
    '```',
    '',
  );
  linhas.push(`# ${titulo(ctx, tx)}`, '', `## ${ctx.equipamento} — ${ctx.modoFalha}`, '');

  // Disclaimer OBRIGATÓRIO (regra do fundador: sempre presente)
  linhas.push(`> **⚠ ${tx.disclaimerTitulo}:** ${disclaimer(ctx, tx)}`, '');

  // 1. Classificação — o porquê do plano
  linhas.push(`## 1. ${tx.secClassificacao}`, '');
  linhas.push(`| ${tx.campo} | ${tx.valor} |`, '| --- | --- |');
  if (ctx.fwA) linhas.push(`| ${tx.fwA} | ${celulaMd(ctx.fwA)} |`);
  if (ctx.fwB) linhas.push(`| ${tx.fwB} | ${celulaMd(ctx.fwB)} |`);
  if (ctx.pfTipico) linhas.push(`| ${tx.pfTipico} | ${celulaMd(ctx.pfTipico)} |`);
  linhas.push('');

  // 2. Informações gerais e identificação (campos de preenchimento do template)
  linhas.push(`## 2. ${tx.secInfoGerais}`, '');
  linhas.push(`| ${tx.campo} | ${tx.valor} |`, '| --- | --- |');
  linhas.push(`| ${tx.equipamento} | ${celulaMd(ctx.equipamento)} |`);
  linhas.push(`| ${tx.modoFalha} | ${celulaMd(ctx.modoFalha)} |`);
  for (const campo of [tx.sistema, tx.local, tx.tag, tx.fabricanteModelo, tx.dataPrimeiraOrdem]) {
    linhas.push(`| ${campo} | ${tx.preenchimento} |`);
  }
  linhas.push('');

  // 3. Escopo técnico e segurança
  linhas.push(`## 3. ${tx.secEscopo}`, '');
  for (const item of tx.escopoItens) linhas.push(`- ${item}`);
  linhas.push('');

  // 4. Tabela-resumo (o fundador pediu que ela permaneça no início)
  linhas.push(`## 4. ${tx.secResumo}`, '');
  linhas.push(
    `| ${tx.tarefa} | ${tx.metodo} | ${tx.condicao} | ${tx.criterio} | ${tx.acao} | ${tx.periodicidade} |`,
    '| --- | --- | --- | --- | --- | --- |',
  );
  for (const l of plano) {
    linhas.push(
      `| ${celulaMd(l.tarefa)} | ${celulaMd(l.metodo)} | ${celulaMd(l.condicao ?? '')} | ${celulaMd(l.criterio ?? '')} | ${celulaMd(l.acao ?? '')} | ${celulaMd(l.periodicidade)} |`,
    );
  }
  linhas.push('');

  // 5..N — uma seção por tarefa
  let secao = 5;
  plano.forEach((l, i) => {
    linhas.push(`## ${secao}. ${tx.secTarefa} ${i + 1} — ${l.tarefa}`, '');
    linhas.push(`| ${tx.campo} | ${tx.valor} |`, '| --- | --- |');
    linhas.push(`| ${tx.periodicidade} | ${celulaMd(l.periodicidade)} |`);
    linhas.push(`| ${tx.metodo} | ${celulaMd(l.metodo)} |`);
    if (l.condicao) linhas.push(`| ${tx.condicao} | ${celulaMd(l.condicao)} |`);
    if (l.especialidade) linhas.push(`| ${tx.especialidade} | ${celulaMd(l.especialidade)} |`);
    if (l.duracao) linhas.push(`| ${tx.duracao} | ${celulaMd(l.duracao)} |`);
    linhas.push('');
    if (l.passos && l.passos.length > 0) {
      linhas.push(`**${tx.procedimento}:**`, '');
      l.passos.forEach((p, j) => linhas.push(`${j + 1}. ${p}`));
      linhas.push('');
    }
    if (l.registros && l.registros.length > 0) {
      linhas.push(`**${tx.registros}:**`, '');
      linhas.push(`| ${tx.parametro} | ${tx.valorMedido} |`, '| --- | --- |');
      for (const r of l.registros) linhas.push(`| ${celulaMd(r)} | ${tx.preenchimento} |`);
      linhas.push('');
    }
    if (l.criterio) linhas.push(`**${tx.criterio}:** ${l.criterio}`, '');
    if (l.acao) linhas.push(`**${tx.acao}:** ${l.acao}`, '');
    secao++;
  });

  // Restabelecimento operacional (checklist)
  linhas.push(`## ${secao}. ${tx.secRestabelecimento}`, '');
  for (const item of tx.restabelecimentoItens) linhas.push(`- ( ) ${item}`);
  linhas.push('');
  secao++;

  // Validação e assinaturas
  linhas.push(`## ${secao}. ${tx.secValidacao}`, '');
  linhas.push(`${tx.desvio}  ( ) ${tx.sim}   ( ) ${tx.nao}`, '');
  linhas.push(`${tx.desvioMotivo}: ________________________________________________`, '');
  for (const papel of [tx.executadoPor, tx.aprovadoPor, tx.auditadoPor]) {
    linhas.push(`**${papel}:** ______________________________`);
    linhas.push(`${tx.assinatura}: ______________________  ${tx.data}: ____ / ____ / ______`, '');
  }

  // Rodapé
  const rodape = [tx.geradoPor];
  if (ctx.url) rodape.push(ctx.url);
  if (ctx.revisadoEm) rodape.push(`${tx.revisado} ${ctx.revisadoEm}`);
  rodape.push(tx.metodologia);
  linhas.push('---', '', rodape.join(' · '));

  return linhas.join('\n');
}

export function planoParaCsv(plano: TarefaPlano[], ctx: ContextoPlano, tx: TextosPlanoDoc): string {
  const linhas: string[] = [];
  const row = (...cols: string[]) => linhas.push(cols.map(celula).join(SEP));

  // Logo + título
  row('R E L I A B I L I T A S', tx.tagline, tx.site);
  row(titulo(ctx, tx), `${ctx.equipamento} — ${ctx.modoFalha}`);
  linhas.push('');

  // Disclaimer obrigatório + classificação + identificação
  row(tx.disclaimerTitulo, disclaimer(ctx, tx));
  linhas.push('');
  row(tx.secClassificacao);
  if (ctx.fwA) row(tx.fwA, ctx.fwA);
  if (ctx.fwB) row(tx.fwB, ctx.fwB);
  if (ctx.pfTipico) row(tx.pfTipico, ctx.pfTipico);
  linhas.push('');
  row(tx.secInfoGerais);
  row(tx.equipamento, ctx.equipamento);
  row(tx.modoFalha, ctx.modoFalha);
  for (const campo of [tx.sistema, tx.local, tx.tag, tx.fabricanteModelo, tx.dataPrimeiraOrdem]) {
    row(campo, tx.preenchimento);
  }
  linhas.push('');

  // Escopo/segurança
  row(tx.secEscopo);
  for (const item of tx.escopoItens) row('★', item);
  linhas.push('');

  // Tabela-resumo (colunas estáveis — import em planilha/CMMS)
  row(tx.secResumo);
  row(
    tx.tarefa,
    tx.metodo,
    tx.condicao,
    tx.criterio,
    tx.acao,
    tx.periodicidade,
    tx.especialidade,
    tx.duracao,
  );
  for (const l of plano) {
    row(
      l.tarefa,
      l.metodo,
      l.condicao ?? '',
      l.criterio ?? '',
      l.acao ?? '',
      l.periodicidade,
      l.especialidade ?? '',
      l.duracao ?? '',
    );
  }
  linhas.push('');

  // Blocos por tarefa
  plano.forEach((l, i) => {
    row(`${tx.secTarefa} ${i + 1}`, l.tarefa);
    if (l.passos) l.passos.forEach((p, j) => row(`${tx.passo} ${j + 1}`, p));
    if (l.registros) for (const r of l.registros) row(tx.registro, r, tx.preenchimento);
    if (l.criterio) row(tx.criterio, l.criterio);
    if (l.acao) row(tx.acao, l.acao);
    linhas.push('');
  });

  // Restabelecimento + validação
  row(tx.secRestabelecimento);
  for (const item of tx.restabelecimentoItens) row('( )', item);
  linhas.push('');
  row(tx.secValidacao);
  row(tx.desvio, `( ) ${tx.sim}   ( ) ${tx.nao}`);
  row(tx.desvioMotivo, '');
  for (const papel of [tx.executadoPor, tx.aprovadoPor, tx.auditadoPor]) {
    row(papel, '', `${tx.data}: ____ / ____ / ______`);
  }
  linhas.push('');
  const rodape = [tx.geradoPor];
  if (ctx.url) rodape.push(ctx.url);
  if (ctx.revisadoEm) rodape.push(`${tx.revisado} ${ctx.revisadoEm}`);
  row(rodape.join(' · '), tx.metodologia);

  return BOM + linhas.join('\r\n');
}

export function nomeArquivoPlano(slug: string, ext: 'csv' | 'md'): string {
  return `plano-${slug}.${ext}`;
}
