import type { NotaResumo } from '@/lib/db/notas';

// Grafo local (Dia 3, AFC: SVG próprio): vizinhança de profundidade 1 da nota
// atual, layout ELÍPTICO determinístico — puro, testável, zero dependência.
// Física de força só se a Fase 2 pedir (acervo MVP é pequeno).

export const GRAFO_RX = 170;
export const GRAFO_RY = 105;

export interface ArestaVizinhanca {
  origem_slug: string;
  destino_slug: string;
  tipo: string;
}

export interface NoGrafo {
  slug: string;
  titulo: string;
  tipo_nota: string;
  x: number;
  y: number;
  central: boolean;
}

export interface LigacaoGrafo {
  slug: string; // vizinho ligado ao centro
  x: number;
  y: number;
  hierarquico: boolean; // taxonomia/componente = hierarquia; wikilink = associação
}

// Taxonomia e componente exprimem a ÁRVORE (pai/filho, D10); wikilink é
// associação livre. Distinguir os dois impede que um link de prosa a um
// ancestral distante faça um Tipo parecer filho direto da Classe (Ponto 1).
const TIPOS_HIERARQUICOS = new Set(['taxonomia', 'componente']);

export interface GrafoLocal {
  nos: NoGrafo[];
  ligacoes: LigacaoGrafo[];
}

export function montaGrafoLocal(
  centro: string,
  arestas: ArestaVizinhanca[],
  publicadas: NotaResumo[],
): GrafoLocal {
  const acervo = new Map(publicadas.map((n) => [n.slug, n]));
  const centroNota = acervo.get(centro);

  // Vizinhos únicos: qualquer aresta tocando o centro; self-loops e
  // não-publicados ficam de fora. Ordem estável (inserção) → layout estável.
  // Um vizinho é hierárquico se QUALQUER aresta que o liga ao centro for de
  // taxonomia/componente (a hierarquia vence a mera associação por wikilink).
  const vizinhos = new Map<string, NotaResumo>();
  const hierarquicos = new Set<string>();
  for (const a of arestas) {
    const outro =
      a.origem_slug === centro ? a.destino_slug : a.destino_slug === centro ? a.origem_slug : null;
    if (!outro || outro === centro) continue;
    const nota = acervo.get(outro);
    if (!nota) continue;
    if (!vizinhos.has(outro)) vizinhos.set(outro, nota);
    if (TIPOS_HIERARQUICOS.has(a.tipo)) hierarquicos.add(outro);
  }

  if (!centroNota || vizinhos.size === 0) return { nos: [], ligacoes: [] };

  const nos: NoGrafo[] = [
    { slug: centroNota.slug, titulo: centroNota.titulo, tipo_nota: centroNota.tipo_nota, x: 0, y: 0, central: true },
  ];
  const ligacoes: LigacaoGrafo[] = [];

  const n = vizinhos.size;
  let i = 0;
  for (const nota of vizinhos.values()) {
    const angulo = (2 * Math.PI * i) / n - Math.PI / 2;
    const x = GRAFO_RX * Math.cos(angulo);
    const y = GRAFO_RY * Math.sin(angulo);
    nos.push({ slug: nota.slug, titulo: nota.titulo, tipo_nota: nota.tipo_nota, x, y, central: false });
    ligacoes.push({ slug: nota.slug, x, y, hierarquico: hierarquicos.has(nota.slug) });
    i++;
  }

  return { nos, ligacoes };
}
