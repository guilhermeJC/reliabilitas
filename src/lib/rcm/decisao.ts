// Seletor de estratégia (revisão 4 do fundador): o diagrama de decisão do RCM
// como função pura, 100% client-side (BR-004 — nenhum dado sai da página).
// Lógica canônica: Moubray, RCM II (1997), cap. 10 + SAE JA1011 §5.7 +
// Nowlan & Heap (1978). Ordem de preferência das tarefas:
//   1. sob condição (CBM) — sempre que existir P-F praticável (vale p/ oculta);
//   2. restauração/descarte programado (TBM) — SÓ com zona de desgaste definida;
//   3. busca de falha (proof test) — só para função oculta;
//   4. sem tarefa aplicável: consequência decide — segurança ⇒ redesenho
//      compulsório; econômica ⇒ RTF.
// Invariantes idênticos à coerência Fw A→B do schema (BR-006) — provados em teste.

export type ComportamentoFwA = 'infantil' | 'aleatoria' | 'desgaste' | 'desconhecido';
export type Consequencia = 'seguranca' | 'operacional' | 'nao_operacional';
export type DecisaoSeletor = 'cbm' | 'tbm' | 'proof_test' | 'rtf' | 'redesenho';

export type AvisoSeletor =
  | 'seguranca_reduzir_risco' // tarefa proativa + segurança: precisa reduzir o risco a nível tolerável
  | 'proof_test_seguranca_redesenho' // oculta + segurança: FFI insuficiente ⇒ redesenho compulsório
  | 'redesenho_compulsorio' // evidente + segurança sem tarefa aplicável (JA1011)
  | 'rtf_operacional_reavaliar' // RTF com custo de indisponibilidade: reavaliar redesenho
  | 'infantil_causa_raiz'; // β<1: intervenção programada PIORA (N&H) — atacar causa raiz

export interface EntradaSeletor {
  evidente: boolean;
  temPf: boolean;
  comportamento: ComportamentoFwA;
  consequencia: Consequencia;
}

export interface PlanoBase {
  tarefa:
    | 'inspecao_condicao'
    | 'restauracao_descarte'
    | 'teste_funcional'
    | 'nenhuma'
    | 'mudanca_projeto';
  periodicidade: 'pf_metade' | 'fracao_vida' | 'ffi' | 'nao_aplica';
}

export interface ResultadoSeletor {
  decisao: DecisaoSeletor;
  plano: PlanoBase;
  avisos: AvisoSeletor[];
}

export function decidirEstrategia(e: EntradaSeletor): ResultadoSeletor {
  const avisos: AvisoSeletor[] = [];
  if (e.comportamento === 'infantil') avisos.push('infantil_causa_raiz');

  if (e.temPf) {
    if (e.consequencia === 'seguranca') avisos.push('seguranca_reduzir_risco');
    return {
      decisao: 'cbm',
      plano: { tarefa: 'inspecao_condicao', periodicidade: 'pf_metade' },
      avisos,
    };
  }

  if (e.comportamento === 'desgaste') {
    if (e.consequencia === 'seguranca') avisos.push('seguranca_reduzir_risco');
    return {
      decisao: 'tbm',
      plano: { tarefa: 'restauracao_descarte', periodicidade: 'fracao_vida' },
      avisos,
    };
  }

  if (!e.evidente) {
    if (e.consequencia === 'seguranca') avisos.push('proof_test_seguranca_redesenho');
    return {
      decisao: 'proof_test',
      plano: { tarefa: 'teste_funcional', periodicidade: 'ffi' },
      avisos,
    };
  }

  if (e.consequencia === 'seguranca') {
    avisos.push('redesenho_compulsorio');
    return {
      decisao: 'redesenho',
      plano: { tarefa: 'mudanca_projeto', periodicidade: 'nao_aplica' },
      avisos,
    };
  }

  if (e.consequencia === 'operacional') avisos.push('rtf_operacional_reavaliar');
  return { decisao: 'rtf', plano: { tarefa: 'nenhuma', periodicidade: 'nao_aplica' }, avisos };
}
