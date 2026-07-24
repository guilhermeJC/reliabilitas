import { describe, expect, it } from 'vitest';
import { montaIndiceNormas } from '@/lib/content/normas-index';

// T07 — índice curado de normas técnicas citadas no acervo. Reaproveita a
// mesma classificação heurística do rodapé de cada nota (agrupaFontes,
// src/lib/content/fontes.ts) — aqui agregada em nível de site: cada norma
// aparece uma única vez, com a lista de notas que a citam.

describe('montaIndiceNormas — agregação de normas citadas no acervo (T07)', () => {
  it('acervo vazio produz índice vazio', () => {
    expect(montaIndiceNormas([])).toEqual([]);
  });

  it('extrai só as fontes classificadas como norma, ignorando literatura/artigos/outros', () => {
    const notas = [
      {
        slug: 'cavitacao',
        titulo: 'Cavitação',
        fontes: [
          'ISO 14224:2016 — Tabela B.2',
          'Karassik et al., Pump Handbook, 4ª ed. (2008)',
          'PRO-MNT-001 Rev02 — metodologia própria',
        ],
      },
    ];
    const indice = montaIndiceNormas(notas);
    expect(indice).toEqual([
      { fonte: 'ISO 14224:2016 — Tabela B.2', notas: [{ slug: 'cavitacao', titulo: 'Cavitação' }] },
    ]);
  });

  it('duas notas citando a MESMA norma (string idêntica) mergeiam num único item', () => {
    const notas = [
      { slug: 'cavitacao', titulo: 'Cavitação', fontes: ['ISO 14224:2016 — Tabela B.2'] },
      { slug: 'rolamento', titulo: 'Rolamento', fontes: ['ISO 14224:2016 — Tabela B.2'] },
    ];
    const indice = montaIndiceNormas(notas);
    expect(indice).toHaveLength(1);
    expect(indice[0].notas).toEqual([
      { slug: 'cavitacao', titulo: 'Cavitação' },
      { slug: 'rolamento', titulo: 'Rolamento' },
    ]);
  });

  it('a mesma nota citando a mesma norma 2x não duplica a nota na lista', () => {
    const notas = [
      {
        slug: 'cavitacao',
        titulo: 'Cavitação',
        fontes: ['ISO 14224:2016 — Tabela B.2', 'ISO 14224:2016 — Tabela B.2'],
      },
    ];
    const indice = montaIndiceNormas(notas);
    expect(indice).toHaveLength(1);
    expect(indice[0].notas).toHaveLength(1);
  });

  it('ordena o índice alfabeticamente por fonte, e as notas de cada item por título', () => {
    const notas = [
      { slug: 'selo', titulo: 'Selo Mecânico', fontes: ['SAE JA1011:2009 — critérios'] },
      { slug: 'zebra', titulo: 'Zebra', fontes: ['API 610, 12ª ed.'] },
      { slug: 'rolamento', titulo: 'Rolamento', fontes: ['API 610, 12ª ed.'] },
    ];
    const indice = montaIndiceNormas(notas);
    expect(indice.map((i) => i.fonte)).toEqual(['API 610, 12ª ed.', 'SAE JA1011:2009 — critérios']);
    expect(indice[0].notas.map((n) => n.slug)).toEqual(['rolamento', 'zebra']);
  });

  it('nota sem fontes ou com array vazio não quebra e não contribui pro índice', () => {
    const notas = [
      { slug: 'a', titulo: 'A', fontes: [] },
      { slug: 'b', titulo: 'B', fontes: ['ASTM G40 — Standard Terminology'] },
    ];
    const indice = montaIndiceNormas(notas);
    expect(indice).toEqual([
      { fonte: 'ASTM G40 — Standard Terminology', notas: [{ slug: 'b', titulo: 'B' }] },
    ]);
  });
});
