import { describe, expect, it } from 'vitest';
import { gridAtivos, ATIVOS_MVP } from '@/lib/content/ativos';
import type { NotaResumo } from '@/lib/db/notas';

// T01 — grid dos 5 ativos do MVP (ordem D07: Bomba → Rolamento → Selo → Motor →
// Válvula). Handbook publicado vira card linkado com título real; ausente vira
// card "em breve" (honestidade editorial — nunca link morto).

const acervo: NotaResumo[] = [
  { slug: 'bomba-centrifuga', tipo_nota: 'tipo', titulo: 'Bomba Centrífuga', taxonomia: ['a'] },
  { slug: 'cavitacao', tipo_nota: 'modo_falha', titulo: 'Cavitação', taxonomia: ['a'] },
];

describe('gridAtivos — os 5 ativos do MVP na ordem D07', () => {
  it('publicado: card linkado com o título real do acervo', () => {
    const grid = gridAtivos(acervo, 'pt');
    expect(grid[0]).toEqual({ titulo: 'Bomba Centrífuga', slug: 'bomba-centrifuga' });
  });

  it('não publicado: card "em breve" sem slug (nunca link morto)', () => {
    const grid = gridAtivos(acervo, 'pt');
    for (const card of grid.slice(1)) {
      expect(card.slug).toBeNull();
      expect(card.titulo.length).toBeGreaterThan(0);
    }
  });

  it('sempre os 5 REAIS do MVP (M01.4/D01/D10), na ordem D07', () => {
    const grid = gridAtivos([], 'pt');
    expect(grid).toHaveLength(ATIVOS_MVP.length);
    expect(grid.map((c) => c.titulo)).toEqual([
      'Bomba Centrífuga',
      'Rolamento',
      'Selo Mecânico',
      'Motor de Indução Trifásico',
      'Válvula de Controle',
    ]);
  });

  it('nomes seguem o locale quando o handbook ainda não existe', () => {
    const grid = gridAtivos([], 'en');
    expect(grid.map((c) => c.titulo)).toEqual([
      'Centrifugal Pump',
      'Rolling Bearing',
      'Mechanical Seal',
      'Three-Phase Induction Motor',
      'Control Valve',
    ]);
  });

  it('COMPONENTE publicado (D10: rolamento/selo) também vira card linkado', () => {
    const comComponente: NotaResumo[] = [
      { slug: 'rolamento', tipo_nota: 'componente', titulo: 'Rolamento', taxonomia: ['a'] },
    ];
    const grid = gridAtivos(comComponente, 'pt');
    expect(grid[1]).toEqual({ titulo: 'Rolamento', slug: 'rolamento' });
  });

  it('modo de falha nunca vira card (só tipo e componente)', () => {
    const soModoFalha: NotaResumo[] = [
      { slug: 'rolamento', tipo_nota: 'modo_falha', titulo: 'Rolamento (falha)', taxonomia: [] },
    ];
    const grid = gridAtivos(soModoFalha, 'pt');
    expect(grid[1]).toEqual({ titulo: 'Rolamento', slug: null });
  });

  it('handbook publicado fora da lista MVP entra no fim (acervo cresce sem mexer aqui)', () => {
    const comExtra: NotaResumo[] = [
      ...acervo,
      {
        slug: 'compressor-alternativo',
        tipo_nota: 'tipo',
        titulo: 'Compressor Alternativo',
        taxonomia: ['a'],
      },
    ];
    const grid = gridAtivos(comExtra, 'pt');
    expect(grid).toHaveLength(ATIVOS_MVP.length + 1);
    expect(grid.at(-1)).toEqual({
      titulo: 'Compressor Alternativo',
      slug: 'compressor-alternativo',
    });
  });
});
