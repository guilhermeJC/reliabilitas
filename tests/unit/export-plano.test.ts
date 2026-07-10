import { describe, expect, it } from 'vitest';
import { planoParaCsv, planoParaMd, nomeArquivoPlano } from '@/lib/export/plano';

// F02/BR-004 — export do plano de manutenção da PÁGINA ATUAL apenas: os dados
// já estão no preload SSR; a geração é client-side pura, sem endpoint novo.
// Sessão 5 (pedido do fundador 10/07): o plano exportado carrega a estrutura
// mínima do PRO-MNT-001 §8.1 — classificação Fw A/Fw B no contexto, condição
// de contorno (§8.2), critério de aceitação quantitativo (§8.3) e ação em
// desvio por tarefa.

const plano = [
  {
    tarefa: 'Análise de vibração',
    metodo: 'Espectro + envelope',
    periodicidade: 'Mensal (P-F/2)',
    condicao: 'Em operação, carga estável',
    criterio: 'RMS 10–25 kHz ≤ 2× baseline',
    acao: 'Confirmar com ultrassom; auditar NPSHa',
  },
  { tarefa: 'Inspeção acústica', metodo: 'Ultrassom na voluta', periodicidade: 'Mensal' },
];

const contexto = {
  equipamento: 'Bomba Centrífuga',
  modoFalha: 'Cavitação',
  fwA: 'Mixed/Complex · β variável (1,5–3)',
  fwB: 'CBM · P-F/2',
};

const headers = {
  equipamento: 'Equipamento',
  modoFalha: 'Modo de falha',
  fwA: 'Fw A (diagnóstico)',
  fwB: 'Fw B (prescrição)',
  tarefa: 'Tarefa',
  metodo: 'Método',
  condicao: 'Condição de contorno',
  criterio: 'Critério de aceitação',
  acao: 'Ação em desvio',
  periodicidade: 'Periodicidade',
};

describe('planoParaCsv — estrutura mínima PRO-MNT-001 §8, separador ; e BOM', () => {
  it('gera cabeçalho completo + uma linha por tarefa, com contexto e classificação Fw A/B', () => {
    const csv = planoParaCsv(plano, contexto, headers);
    const linhas = csv.replace(/^﻿/, '').split('\r\n');
    expect(linhas[0]).toBe(
      'Equipamento;Modo de falha;Fw A (diagnóstico);Fw B (prescrição);Tarefa;Método;Condição de contorno;Critério de aceitação;Ação em desvio;Periodicidade',
    );
    expect(linhas[1]).toBe(
      'Bomba Centrífuga;Cavitação;Mixed/Complex · β variável (1,5–3);CBM · P-F/2;Análise de vibração;Espectro + envelope;Em operação, carga estável;RMS 10–25 kHz ≤ 2× baseline;"Confirmar com ultrassom; auditar NPSHa";Mensal (P-F/2)',
    );
    expect(linhas).toHaveLength(3);
  });

  it('tarefa sem os campos opcionais exporta células vazias (colunas estáveis)', () => {
    const csv = planoParaCsv(plano, contexto, headers);
    const linhas = csv.replace(/^﻿/, '').split('\r\n');
    expect(linhas[2]).toBe(
      'Bomba Centrífuga;Cavitação;Mixed/Complex · β variável (1,5–3);CBM · P-F/2;Inspeção acústica;Ultrassom na voluta;;;;Mensal',
    );
  });

  it('contexto sem Fw A/B exporta células vazias nas colunas de classificação', () => {
    const csv = planoParaCsv(plano, { equipamento: 'X', modoFalha: 'Y' }, headers);
    const linhas = csv.replace(/^﻿/, '').split('\r\n');
    expect(linhas[2]).toBe('X;Y;;;Inspeção acústica;Ultrassom na voluta;;;;Mensal');
  });

  it('abre com BOM UTF-8 (Excel pt-BR lê acentos)', () => {
    expect(planoParaCsv(plano, contexto, headers).startsWith('﻿')).toBe(true);
  });

  it('campo com ; aspas ou quebra de linha é citado e aspas são dobradas', () => {
    const sujo = [{ tarefa: 'Medir; anotar "tudo"', metodo: 'linha1\nlinha2', periodicidade: 'x' }];
    const csv = planoParaCsv(sujo, contexto, headers);
    expect(csv).toContain('"Medir; anotar ""tudo"""');
    expect(csv).toContain('"linha1\nlinha2"');
  });

  it('guarda anti CSV-injection cobre também os campos novos', () => {
    const malicioso = [
      {
        tarefa: '=HYPERLINK("http://mal")',
        metodo: '+SOMA(A1)',
        periodicidade: '@cmd',
        condicao: '-2+3',
        criterio: '=1+1',
        acao: '@shell',
      },
    ];
    const csv = planoParaCsv(malicioso, contexto, headers);
    expect(csv).toContain("'=HYPERLINK");
    expect(csv).toContain("'+SOMA(A1)");
    expect(csv).toContain("'@cmd");
    expect(csv).toContain("'-2+3");
    expect(csv).toContain("'=1+1");
    expect(csv).toContain("'@shell");
  });
});

describe('planoParaMd — plano completo para colar em CMMS/wiki', () => {
  it('gera título, classificação Fw A/B e tabela com as 6 colunas de tarefa', () => {
    const md = planoParaMd(plano, contexto, headers);
    const linhas = md.split('\n');
    expect(linhas[0]).toBe(`# ${headers.equipamento}: Bomba Centrífuga — Cavitação`);
    expect(linhas[2]).toBe('**Fw A (diagnóstico):** Mixed/Complex · β variável (1,5–3)');
    expect(linhas[3]).toBe('**Fw B (prescrição):** CBM · P-F/2');
    expect(linhas[5]).toBe(
      '| Tarefa | Método | Condição de contorno | Critério de aceitação | Ação em desvio | Periodicidade |',
    );
    expect(linhas[6]).toBe('| --- | --- | --- | --- | --- | --- |');
    expect(linhas[7]).toBe(
      '| Análise de vibração | Espectro + envelope | Em operação, carga estável | RMS 10–25 kHz ≤ 2× baseline | Confirmar com ultrassom; auditar NPSHa | Mensal (P-F/2) |',
    );
    expect(linhas[8]).toBe('| Inspeção acústica | Ultrassom na voluta |  |  |  | Mensal |');
  });

  it('sem Fw A/B no contexto, as linhas de classificação não aparecem', () => {
    const md = planoParaMd(plano, { equipamento: 'X', modoFalha: 'Y' }, headers);
    const linhas = md.split('\n');
    expect(linhas[0]).toBe(`# ${headers.equipamento}: X — Y`);
    expect(linhas[2]).toContain('| Tarefa |');
  });

  it('pipe dentro de campo é escapado (não quebra a tabela)', () => {
    const comPipe = [{ tarefa: 'a | b', metodo: 'm', periodicidade: 'p' }];
    const md = planoParaMd(comPipe, contexto, headers);
    expect(md).toContain('| a \\| b | m |  |  |  | p |');
  });
});

describe('nomeArquivoPlano', () => {
  it('nome estável por slug e extensão', () => {
    expect(nomeArquivoPlano('cavitacao', 'csv')).toBe('plano-cavitacao.csv');
    expect(nomeArquivoPlano('cavitacao', 'md')).toBe('plano-cavitacao.md');
  });
});
