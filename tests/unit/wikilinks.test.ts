import { describe, expect, it } from 'vitest';
import { extractWikilinks, uniqueTargets } from '@/lib/content/wikilinks';

describe('extractWikilinks — wikilinks são as chaves estrangeiras do grafo (D16)', () => {
  it('extrai alvo simples', () => {
    const links = extractWikilinks('A falha ocorre em [[bomba-centrifuga]] sob baixa NPSH.');
    expect(links).toEqual([{ target: 'bomba-centrifuga', label: null }]);
  });

  it('extrai alvo com rótulo ([[slug|Rótulo]])', () => {
    const links = extractWikilinks('Veja [[rolamento|os rolamentos]] do conjunto.');
    expect(links).toEqual([{ target: 'rolamento', label: 'os rolamentos' }]);
  });

  it('extrai múltiplos links na ordem em que aparecem', () => {
    const md = '[[bombas]] contém [[bomba-centrifuga]] que sofre [[cavitacao|Cavitação]].';
    expect(extractWikilinks(md).map((l) => l.target)).toEqual([
      'bombas',
      'bomba-centrifuga',
      'cavitacao',
    ]);
  });

  it('retorna vazio quando não há links', () => {
    expect(extractWikilinks('Texto sem links [colchete simples] e [outro](url).')).toEqual([]);
  });

  it('ignora espaços ao redor do alvo e do rótulo', () => {
    const links = extractWikilinks('Uso de [[ selo-mecanico | Selo Mecânico ]].');
    expect(links).toEqual([{ target: 'selo-mecanico', label: 'Selo Mecânico' }]);
  });

  it('uniqueTargets deduplica preservando a primeira ocorrência', () => {
    const md = '[[cavitacao]] e de novo [[cavitacao|a cavitação]] e [[bombas]].';
    expect(uniqueTargets(extractWikilinks(md))).toEqual(['cavitacao', 'bombas']);
  });
});
