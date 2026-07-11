// Agrupamento das fontes do rodapé (melhoria 1 do fundador, 10/07): a lista
// crua ficou extensa com o conteúdo padrão-ouro — o rodapé passa a exibi-la
// recolhível e agrupada. Classificação heurística sobre a string, em ordem de
// precedência: normas/institutos → literatura técnica → artigos/relatórios →
// outros (metodologia própria, fabricantes). Função pura, testada.

export const GRUPOS_FONTES = ['normas', 'literatura', 'artigos', 'outros'] as const;
export type GrupoFonte = (typeof GRUPOS_FONTES)[number];

export interface FontesAgrupadas {
  normas: string[];
  literatura: string[];
  artigos: string[];
  outros: string[];
}

// Normas por prefixo (a sigla ABRE a citação) + institutos por nome em
// qualquer posição. "API 610, 12ª ed." é norma, não literatura — por isso
// normas vence a regra de edição.
const NORMA_PREFIXO =
  /^(ISO|ASTM|API|ANSI|IEC|SAE|NEMA|NBR|ABNT|NR-13|ASME|IEEE|EASA|HI)\b|^ANSI\/HI/i;
const INSTITUTO =
  /European Sealing Association|Hydraulic Institute|OREDA|DNV|EPRI|ABRAMAN|Fluid Sealing Association/i;

// Literatura: editora conhecida, marca de edição (8ª ed. / 8th ed.), Handbook
// ou citação de capítulo (livros citam caps.; artigos citam páginas/volumes).
const LITERATURA =
  /Springer|Wiley|Elsevier|McGraw|Oxford|Cambridge|Butterworth|Industrial Press|Handbook|\d+ª ed\.|\d+(st|nd|rd|th) ed\.|caps?\.\s|ch\.\s/i;

// Artigos: periódico conhecido, título entre aspas, ou ano entre parênteses
// (fallback — relatórios como Nowlan & Heap 1978 caem aqui).
const PERIODICO =
  /\bJ\.\s|Journal|Annual Review|Phil\. Mag|Wear \d|Processes|Science \d|MDPI|Proceedings|ASME \d|Mech\. Systems/i;
const ANO_PARENTESES = /\((19|20)\d{2}\)/;

function classifica(fonte: string): GrupoFonte {
  if (NORMA_PREFIXO.test(fonte) || INSTITUTO.test(fonte)) return 'normas';
  if (LITERATURA.test(fonte)) return 'literatura';
  if (PERIODICO.test(fonte) || /^"/.test(fonte) || ANO_PARENTESES.test(fonte)) return 'artigos';
  return 'outros';
}

export function agrupaFontes(fontes: string[]): FontesAgrupadas {
  const grupos: FontesAgrupadas = { normas: [], literatura: [], artigos: [], outros: [] };
  for (const f of fontes) grupos[classifica(f)].push(f);
  return grupos;
}
