import { agrupaFontes } from './fontes';

// T07 — índice curado de normas técnicas citadas no acervo. Reaproveita a
// mesma classificação heurística já usada no rodapé de cada nota
// (agrupaFontes) — aqui agregada em nível de SITE: cada string de norma
// aparece uma única vez, com a lista de notas que a citam (dedupe exato por
// string; citações da mesma norma com texto diferente ficam em itens
// separados — não há merge fuzzy por família de norma nesta 1ª versão).

export interface NotaComFontes {
  slug: string;
  titulo: string;
  fontes: string[];
}

export interface NormaCitada {
  fonte: string;
  notas: Array<{ slug: string; titulo: string }>;
}

export function montaIndiceNormas(notas: NotaComFontes[]): NormaCitada[] {
  const porFonte = new Map<string, Map<string, string>>();
  for (const nota of notas) {
    const { normas } = agrupaFontes(nota.fontes);
    for (const fonte of normas) {
      if (!porFonte.has(fonte)) porFonte.set(fonte, new Map());
      porFonte.get(fonte)!.set(nota.slug, nota.titulo);
    }
  }
  return [...porFonte.entries()]
    .map(([fonte, notasMap]) => ({
      fonte,
      notas: [...notasMap.entries()]
        .map(([slug, titulo]) => ({ slug, titulo }))
        .sort((a, b) => a.titulo.localeCompare(b.titulo)),
    }))
    .sort((a, b) => a.fonte.localeCompare(b.fonte));
}
