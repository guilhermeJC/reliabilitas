import { describe, expect, it } from 'vitest';
import { planoParaCsv, planoParaMd, nomeArquivoPlano } from '@/lib/export/plano';
import { textosPlanoDoc } from '@/lib/export/plano-textos';

// F02/BR-004 — export do plano da PÁGINA ATUAL apenas, client-side puro.
// Melhoria 3 do fundador (10/07): o export deixa de ser uma tabela magra e
// vira o DOCUMENTO de plano no template RELIABILITAS (moldado no exemplo
// industrial real): logo em caracteres → título por decisão → DISCLAIMER
// OBRIGATÓRIO de foco no modo de falha → classificação Fw A/B → informações
// gerais → escopo/segurança → tabela-resumo → uma seção por tarefa
// (procedimento passo a passo + registros de medição + critério + ação) →
// restabelecimento → validação/assinaturas → rodapé.

const tx = textosPlanoDoc('pt');

const plano = [
  {
    tarefa: 'Análise de vibração',
    metodo: 'Espectro + envelope',
    periodicidade: 'Mensal (P-F/2)',
    condicao: 'Em operação, carga estável',
    criterio: 'RMS 10–25 kHz ≤ 2× baseline',
    acao: 'Confirmar com ultrassom',
    especialidade: 'Preditiva / vibração',
    duracao: '0,5 h',
    passos: ['Confirmar carga estável e registrar o ponto', 'Medir espectro nos mancais LA e LOA'],
    registros: ['RMS banda 10–25 kHz — mancal LA [g]', 'Vazão na medição [m³/h]'],
  },
  { tarefa: 'Inspeção acústica', metodo: 'Ultrassom na voluta', periodicidade: 'Mensal' },
];

const contexto = {
  equipamento: 'Bomba Centrífuga',
  modoFalha: 'Cavitação',
  fwA: 'Mixed/Complex · β: variável (1,5–3)',
  fwB: 'CBM · P-F/2',
  decisao: 'cbm',
  pfTipico: '~1 semana a ~6 meses',
  url: 'https://reliabilitas.io/pt/notas/cavitacao',
  revisadoEm: '2026-07-10',
};

describe('planoParaMd — o documento completo no template RELIABILITAS', () => {
  const md = planoParaMd(plano, contexto, tx);

  it('abre com o logotipo em caracteres e o título da decisão (CBM)', () => {
    expect(md).toContain('R E L I A B I L I T A S');
    expect(md).toContain('reliabilitas.io');
    expect(md).toContain('# PLANO DE MANUTENÇÃO PREDITIVA (CBM)');
    expect(md).toContain('## Bomba Centrífuga — Cavitação');
  });

  it('carrega o DISCLAIMER de foco no modo de falha com o modo e o equipamento nomeados', () => {
    expect(md).toContain('FOCO NO MODO DE FALHA');
    expect(md).toContain(
      'combater especificamente o modo de falha "Cavitação" em "Bomba Centrífuga"',
    );
    expect(md).toContain('TBM ou CBM');
  });

  it('seção 1 = classificação Fw A/B + P-F típico (o porquê do plano)', () => {
    expect(md).toContain('## 1. CLASSIFICAÇÃO DO MODO DE FALHA');
    expect(md).toContain('| Fw A (diagnóstico) | Mixed/Complex · β: variável (1,5–3) |');
    expect(md).toContain('| Fw B (prescrição) | CBM · P-F/2 |');
    expect(md).toContain('| Intervalo P-F típico | ~1 semana a ~6 meses |');
  });

  it('informações gerais trazem campos de preenchimento (TAG, local, fabricante)', () => {
    expect(md).toContain('## 2. INFORMAÇÕES GERAIS E IDENTIFICAÇÃO');
    expect(md).toContain('| TAG do equipamento | [ __________ ] |');
    expect(md).toContain('| Local de instalação | [ __________ ] |');
  });

  it('escopo de segurança e tabela-resumo presentes', () => {
    expect(md).toContain('## 3. ESCOPO TÉCNICO E SEGURANÇA');
    expect(md).toContain('LOTO');
    expect(md).toContain('## 4. RESUMO DAS TAREFAS');
    expect(md).toContain(
      '| Tarefa | Método | Condição de contorno | Critério de aceitação | Ação em desvio | Periodicidade |',
    );
  });

  it('cada tarefa vira uma seção numerada com procedimento e registros', () => {
    expect(md).toContain('## 5. TAREFA 1 — Análise de vibração');
    expect(md).toContain('1. Confirmar carga estável e registrar o ponto');
    expect(md).toContain('2. Medir espectro nos mancais LA e LOA');
    expect(md).toContain('| RMS banda 10–25 kHz — mancal LA [g] | [ __________ ] |');
    expect(md).toContain('**Critério de aceitação:** RMS 10–25 kHz ≤ 2× baseline');
    expect(md).toContain('**Ação em desvio:** Confirmar com ultrassom');
    expect(md).toContain('| Especialidade | Preditiva / vibração |');
    expect(md).toContain('## 6. TAREFA 2 — Inspeção acústica');
  });

  it('fecha com restabelecimento (checklist), validação com assinaturas e rodapé', () => {
    expect(md).toContain('## 7. RESTABELECIMENTO OPERACIONAL');
    expect(md).toContain('- ( ) ');
    expect(md).toContain('## 8. VALIDAÇÃO E ASSINATURAS');
    expect(md).toContain('EXECUTADO POR (nome/matrícula)');
    expect(md).toContain('HOUVE DESVIO DE PLANEJAMENTO?');
    expect(md).toContain('Gerado por RELIABILITAS');
    expect(md).toContain('https://reliabilitas.io/pt/notas/cavitacao');
    expect(md).toContain('2026-07-10');
  });

  it('o disclaimer aparece MESMO com contexto mínimo (regra do fundador: sempre)', () => {
    const min = planoParaMd(plano, { equipamento: 'X', modoFalha: 'Y' }, tx);
    expect(min).toContain('FOCO NO MODO DE FALHA');
    expect(min).toContain('"Y"');
    expect(min).toContain('# PLANO DE MANUTENÇÃO');
  });

  it('tarefa sem passos/registros não gera as sub-seções vazias', () => {
    const idx = md.indexOf('## 6. TAREFA 2');
    const secao2 = md.slice(idx, md.indexOf('## 7.'));
    expect(secao2).not.toContain('Procedimento');
    expect(secao2).not.toContain('Registros');
  });
});

describe('planoParaCsv — documento em blocos, separador ; e BOM', () => {
  const csv = planoParaCsv(plano, contexto, tx);
  const linhas = csv.replace(/^﻿/, '').split('\r\n');

  it('abre com BOM + logo e título', () => {
    expect(csv.startsWith('﻿')).toBe(true);
    expect(linhas[0]).toContain('R E L I A B I L I T A S');
    expect(csv).toContain('PLANO DE MANUTENÇÃO PREDITIVA (CBM)');
  });

  it('carrega o disclaimer e a classificação', () => {
    expect(csv).toContain('FOCO NO MODO DE FALHA');
    expect(csv).toContain('Fw A (diagnóstico);Mixed/Complex · β: variável (1,5–3)');
  });

  it('tabela-resumo com colunas estáveis (8) e células vazias quando ausentes', () => {
    expect(csv).toContain(
      'Tarefa;Método;Condição de contorno;Critério de aceitação;Ação em desvio;Periodicidade;Especialidade;Tempo estimado',
    );
    expect(csv).toContain('Inspeção acústica;Ultrassom na voluta;;;;Mensal;;');
  });

  it('blocos por tarefa: passos numerados e registros com campo de preenchimento', () => {
    expect(csv).toContain('TAREFA 1;Análise de vibração');
    expect(csv).toContain('Passo 1;Confirmar carga estável e registrar o ponto');
    expect(csv).toContain('Registro;RMS banda 10–25 kHz — mancal LA [g];[ __________ ]');
  });

  it('restabelecimento e validação presentes', () => {
    expect(csv).toContain('RESTABELECIMENTO OPERACIONAL');
    expect(csv).toContain('EXECUTADO POR (nome/matrícula)');
  });

  it('guarda anti CSV-injection cobre passos e registros', () => {
    const malicioso = [
      {
        tarefa: '=HYPERLINK("http://mal")',
        metodo: 'm',
        periodicidade: 'p',
        passos: ['+SOMA(A1)'],
        registros: ['@cmd [un]'],
      },
    ];
    const c = planoParaCsv(malicioso, contexto, tx);
    expect(c).toContain("'=HYPERLINK");
    expect(c).toContain("'+SOMA(A1)");
    expect(c).toContain("'@cmd [un]");
  });

  it('campo com ; ou aspas é citado com aspas dobradas', () => {
    const sujo = [{ tarefa: 'Medir; anotar "tudo"', metodo: 'm', periodicidade: 'p' }];
    const c = planoParaCsv(sujo, contexto, tx);
    expect(c).toContain('"Medir; anotar ""tudo"""');
  });
});

describe('nomeArquivoPlano', () => {
  it('nome estável por slug e extensão', () => {
    expect(nomeArquivoPlano('cavitacao', 'csv')).toBe('plano-cavitacao.csv');
    expect(nomeArquivoPlano('cavitacao', 'md')).toBe('plano-cavitacao.md');
  });
});
