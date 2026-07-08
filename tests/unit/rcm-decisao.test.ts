import { describe, expect, it } from 'vitest';
import {
  decidirEstrategia,
  type ComportamentoFwA,
  type Consequencia,
  type EntradaSeletor,
} from '@/lib/rcm/decisao';

// Seletor de estratégia (revisão 4 do fundador): o diagrama de decisão do RCM
// como função pura — Moubray, RCM II (1997), cap. 10 (lógica de seleção de
// tarefas) + SAE JA1011 §5.7 + Nowlan & Heap (1978). A ordem de preferência é
// canônica: tarefa sob condição (CBM) → restauração/descarte programado (TBM,
// só com zona de desgaste definida) → busca de falha (proof test, só oculta) →
// RTF/redesenho conforme a consequência.

const base: EntradaSeletor = {
  evidente: true,
  temPf: false,
  comportamento: 'aleatoria',
  consequencia: 'operacional',
};

describe('decidirEstrategia — casos canônicos da literatura', () => {
  it('P-F detectável → CBM com inspeção ≤ P-F/2 (Moubray cap. 8), mesmo oculta', () => {
    const evidente = decidirEstrategia({ ...base, temPf: true });
    expect(evidente.decisao).toBe('cbm');
    expect(evidente.plano).toEqual({ tarefa: 'inspecao_condicao', periodicidade: 'pf_metade' });

    // tarefa proativa vence a busca de falha: oculta com P-F ainda é CBM
    const oculta = decidirEstrategia({ ...base, temPf: true, evidente: false });
    expect(oculta.decisao).toBe('cbm');
  });

  it('sem P-F, desgaste com idade definida (β>1) → TBM antes da zona de desgaste', () => {
    const r = decidirEstrategia({ ...base, comportamento: 'desgaste' });
    expect(r.decisao).toBe('tbm');
    expect(r.plano).toEqual({ tarefa: 'restauracao_descarte', periodicidade: 'fracao_vida' });
  });

  it('oculta, sem tarefa proativa aplicável → proof test com FFI pela disponibilidade alvo', () => {
    const r = decidirEstrategia({ ...base, evidente: false });
    expect(r.decisao).toBe('proof_test');
    expect(r.plano).toEqual({ tarefa: 'teste_funcional', periodicidade: 'ffi' });
  });

  it('oculta + segurança: proof test carrega o alerta de redesenho (JA1011 — se o FFI não bastar)', () => {
    const r = decidirEstrategia({ ...base, evidente: false, consequencia: 'seguranca' });
    expect(r.decisao).toBe('proof_test');
    expect(r.avisos).toContain('proof_test_seguranca_redesenho');
  });

  it('evidente + segurança sem tarefa aplicável → redesenho COMPULSÓRIO (SAE JA1011)', () => {
    const r = decidirEstrategia({ ...base, consequencia: 'seguranca' });
    expect(r.decisao).toBe('redesenho');
    expect(r.avisos).toContain('redesenho_compulsorio');
  });

  it('evidente + consequência econômica sem tarefa aplicável → RTF; operacional pede reavaliação', () => {
    const operacional = decidirEstrategia(base);
    expect(operacional.decisao).toBe('rtf');
    expect(operacional.avisos).toContain('rtf_operacional_reavaliar');

    const naoOperacional = decidirEstrategia({ ...base, consequencia: 'nao_operacional' });
    expect(naoOperacional.decisao).toBe('rtf');
    expect(naoOperacional.avisos).not.toContain('rtf_operacional_reavaliar');
  });

  it('mortalidade infantil (β<1): aviso de causa raiz em QUALQUER decisão (N&H — overhaul piora)', () => {
    const cbm = decidirEstrategia({ ...base, temPf: true, comportamento: 'infantil' });
    const rtf = decidirEstrategia({ ...base, comportamento: 'infantil' });
    expect(cbm.avisos).toContain('infantil_causa_raiz');
    expect(rtf.avisos).toContain('infantil_causa_raiz');
  });

  it('tarefa proativa com consequência de segurança carrega o aviso de redução de risco', () => {
    const cbm = decidirEstrategia({ ...base, temPf: true, consequencia: 'seguranca' });
    const tbm = decidirEstrategia({
      ...base,
      comportamento: 'desgaste',
      consequencia: 'seguranca',
    });
    expect(cbm.avisos).toContain('seguranca_reduzir_risco');
    expect(tbm.avisos).toContain('seguranca_reduzir_risco');
  });

  it('caso real do acervo — cavitação (evidente, P-F detectável) reproduz a nota: CBM', () => {
    const r = decidirEstrategia({
      evidente: true,
      temPf: true,
      comportamento: 'aleatoria',
      consequencia: 'operacional',
    });
    expect(r.decisao).toBe('cbm');
  });
});

describe('decidirEstrategia — invariantes de coerência Fw A→B (as MESMAS do schema/BR-006)', () => {
  const comportamentos: ComportamentoFwA[] = ['infantil', 'aleatoria', 'desgaste', 'desconhecido'];
  const consequencias: Consequencia[] = ['seguranca', 'operacional', 'nao_operacional'];

  it('toda combinação de entrada produz decisão coerente com o contrato do conteúdo', () => {
    for (const evidente of [true, false]) {
      for (const temPf of [true, false]) {
        for (const comportamento of comportamentos) {
          for (const consequencia of consequencias) {
            const r = decidirEstrategia({ evidente, temPf, comportamento, consequencia });
            // IT-MNT-001 §4.2: CBM exige condição monitorável
            if (r.decisao === 'cbm') expect(temPf).toBe(true);
            // IT-MNT-001 §4.3: proof test só para falha oculta
            if (r.decisao === 'proof_test') expect(evidente).toBe(false);
            // PRO-MNT-001 §4.3: RTF pressupõe ausência de P-F
            if (r.decisao === 'rtf') expect(temPf).toBe(false);
            // N&H: restauração programada exige zona de desgaste definida
            if (r.decisao === 'tbm') expect(comportamento).toBe('desgaste');
            // Redesenho compulsório é o beco da segurança (JA1011)
            if (r.decisao === 'redesenho') expect(consequencia).toBe('seguranca');
          }
        }
      }
    }
  });
});
