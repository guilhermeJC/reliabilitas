import { describe, expect, it } from 'vitest';
import { planoParaCsv, planoParaMd, nomeArquivoPlano } from '@/lib/export/plano';

// F02/BR-004 — export do plano de manutenção da PÁGINA ATUAL apenas: os dados
// já estão no preload SSR; a geração é client-side pura, sem endpoint novo.

const plano = [
  { tarefa: 'Análise de vibração', metodo: 'Espectro + envelope', periodicidade: 'Mensal (P-F/2)' },
  { tarefa: 'Inspeção acústica', metodo: 'Ultrassom na voluta', periodicidade: 'Mensal' },
];

const contexto = { equipamento: 'Bomba Centrífuga', modoFalha: 'Cavitação' };

const headers = {
  equipamento: 'Equipamento',
  modoFalha: 'Modo de falha',
  tarefa: 'Tarefa',
  metodo: 'Método',
  periodicidade: 'Periodicidade',
};

describe('planoParaCsv — colunas SAP-PM/Maximo, separador ; e BOM', () => {
  it('gera cabeçalho + uma linha por tarefa, com contexto do equipamento', () => {
    const csv = planoParaCsv(plano, contexto, headers);
    const linhas = csv.replace(/^﻿/, '').split('\r\n');
    expect(linhas[0]).toBe('Equipamento;Modo de falha;Tarefa;Método;Periodicidade');
    expect(linhas[1]).toBe(
      'Bomba Centrífuga;Cavitação;Análise de vibração;Espectro + envelope;Mensal (P-F/2)',
    );
    expect(linhas).toHaveLength(3);
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

  it('guarda anti CSV-injection: célula começando com = + - @ ganha apóstrofo', () => {
    const malicioso = [
      { tarefa: '=HYPERLINK("http://mal")', metodo: '+SOMA(A1)', periodicidade: '@cmd' },
    ];
    const csv = planoParaCsv(malicioso, contexto, headers);
    expect(csv).toContain("'=HYPERLINK");
    expect(csv).toContain("'+SOMA(A1)");
    expect(csv).toContain("'@cmd");
  });
});

describe('planoParaMd — tabela markdown para colar em CMMS/wiki', () => {
  it('gera tabela com cabeçalho e alinhamento', () => {
    const md = planoParaMd(plano, contexto, headers);
    const linhas = md.split('\n');
    expect(linhas[0]).toBe(`# ${headers.equipamento}: Bomba Centrífuga — Cavitação`);
    expect(linhas[2]).toBe('| Tarefa | Método | Periodicidade |');
    expect(linhas[3]).toBe('| --- | --- | --- |');
    expect(linhas[4]).toBe('| Análise de vibração | Espectro + envelope | Mensal (P-F/2) |');
  });

  it('pipe dentro de campo é escapado (não quebra a tabela)', () => {
    const comPipe = [{ tarefa: 'a | b', metodo: 'm', periodicidade: 'p' }];
    const md = planoParaMd(comPipe, contexto, headers);
    expect(md).toContain('| a \\| b | m | p |');
  });
});

describe('nomeArquivoPlano', () => {
  it('nome estável por slug e extensão', () => {
    expect(nomeArquivoPlano('cavitacao', 'csv')).toBe('plano-cavitacao.csv');
    expect(nomeArquivoPlano('cavitacao', 'md')).toBe('plano-cavitacao.md');
  });
});
