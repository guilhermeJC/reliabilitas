import { describe, expect, it } from 'vitest';
import { montaGrafoLocal, GRAFO_RX, GRAFO_RY } from '@/lib/content/grafo';
import type { NotaResumo } from '@/lib/db/notas';

// Grafo local (Dia 3, AFC: SVG próprio radial): vizinhança de profundidade 1
// da nota atual — nós = notas publicadas conectadas; layout elíptico puro
// (determinístico e testável, sem física de força).

const notas: NotaResumo[] = [
  { slug: 'cavitacao', tipo_nota: 'modo_falha', titulo: 'Cavitação', taxonomia: [] },
  { slug: 'bomba-centrifuga', tipo_nota: 'tipo', titulo: 'Bomba Centrífuga', taxonomia: [] },
  { slug: 'bombas', tipo_nota: 'familia', titulo: 'Bombas', taxonomia: [] },
  { slug: 'dinamicas', tipo_nota: 'principio', titulo: 'Dinâmicas', taxonomia: [] },
];

const arestas = [
  { origem_slug: 'cavitacao', destino_slug: 'bomba-centrifuga', tipo: 'taxonomia' },
  { origem_slug: 'cavitacao', destino_slug: 'bomba-centrifuga', tipo: 'wikilink' }, // par duplicado
  { origem_slug: 'bomba-centrifuga', destino_slug: 'cavitacao', tipo: 'wikilink' }, // sentido inverso
  { origem_slug: 'cavitacao', destino_slug: 'bombas', tipo: 'taxonomia' },
  { origem_slug: 'cavitacao', destino_slug: 'nota-rascunho', tipo: 'wikilink' }, // não publicada
  { origem_slug: 'cavitacao', destino_slug: 'cavitacao', tipo: 'wikilink' }, // self-loop
];

describe('montaGrafoLocal — vizinhança 1 da nota atual', () => {
  it('centro em (0,0) e marcado como central', () => {
    const g = montaGrafoLocal('cavitacao', arestas, notas);
    const centro = g.nos.find((n) => n.central);
    expect(centro).toMatchObject({ slug: 'cavitacao', x: 0, y: 0 });
  });

  it('vizinhos deduplicados: par com 2 arestas (ida+volta, tipos diferentes) vira 1 nó e 1 ligação', () => {
    const g = montaGrafoLocal('cavitacao', arestas, notas);
    expect(g.nos.filter((n) => n.slug === 'bomba-centrifuga')).toHaveLength(1);
    expect(g.ligacoes.filter((l) => l.slug === 'bomba-centrifuga')).toHaveLength(1);
  });

  it('vizinho não publicado (fora do acervo) é excluído', () => {
    const g = montaGrafoLocal('cavitacao', arestas, notas);
    expect(g.nos.map((n) => n.slug)).not.toContain('nota-rascunho');
  });

  it('self-loop é descartado', () => {
    const g = montaGrafoLocal('cavitacao', arestas, notas);
    expect(g.ligacoes.map((l) => l.slug)).not.toContain('cavitacao');
  });

  it('vizinhos distribuem na elipse (x²/rx² + y²/ry² = 1) em posições distintas', () => {
    const g = montaGrafoLocal('cavitacao', arestas, notas);
    const vizinhos = g.nos.filter((n) => !n.central);
    expect(vizinhos.length).toBeGreaterThanOrEqual(2);
    const posicoes = new Set(vizinhos.map((n) => `${n.x.toFixed(1)},${n.y.toFixed(1)}`));
    expect(posicoes.size).toBe(vizinhos.length);
    for (const n of vizinhos) {
      const r = (n.x / GRAFO_RX) ** 2 + (n.y / GRAFO_RY) ** 2;
      expect(r).toBeCloseTo(1, 6);
    }
  });

  it('nó carrega titulo e tipo_nota do acervo (para rótulo e cor)', () => {
    const g = montaGrafoLocal('cavitacao', arestas, notas);
    const bomba = g.nos.find((n) => n.slug === 'bomba-centrifuga')!;
    expect(bomba.titulo).toBe('Bomba Centrífuga');
    expect(bomba.tipo_nota).toBe('tipo');
  });

  it('sem vizinhos publicados → grafo vazio (página decide não renderizar)', () => {
    const g = montaGrafoLocal('cavitacao', [], notas);
    expect(g.nos).toHaveLength(0);
    expect(g.ligacoes).toHaveLength(0);
  });
});
