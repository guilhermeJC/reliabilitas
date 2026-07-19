import { describe, expect, it } from 'vitest';
import { extractWikilinks, matchWikilinkAt, uniqueTargets } from '@/lib/content/wikilinks';

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

// Aprofundamento (18/07, /improve-codebase-architecture): matchWikilinkAt é o
// segundo adapter real da MESMA gramática — reconhecimento ANCORADO no início
// de `src`, contrato exigido pelo tokenizer inline do marked (F14). Antes desta
// mudança, render.ts mantinha sua própria cópia da regex (WIKILINK_TOKEN_RE);
// as duas convergem para a mesma fonte de padrão agora, fechando a classe de
// bug do DEV-060 (uma terceira cópia divergente já quebrou tabela em produção).
describe('matchWikilinkAt — casamento ancorado (contrato do tokenizer inline do marked)', () => {
  it('casa um wikilink simples no início da string', () => {
    expect(matchWikilinkAt('[[bomba-centrifuga]] resto do texto')).toEqual({
      raw: '[[bomba-centrifuga]]',
      target: 'bomba-centrifuga',
      label: null,
    });
  });

  it('casa um wikilink com rótulo no início da string', () => {
    expect(matchWikilinkAt('[[cavitacao|a cavitação]] resto')).toEqual({
      raw: '[[cavitacao|a cavitação]]',
      target: 'cavitacao',
      label: 'a cavitação',
    });
  });

  it('retorna null quando o wikilink não está no início (ancorado)', () => {
    expect(matchWikilinkAt('texto antes [[bomba-centrifuga]]')).toBeNull();
  });

  it('retorna null quando não há wikilink nenhum', () => {
    expect(matchWikilinkAt('texto qualquer')).toBeNull();
  });

  it('ignora espaços ao redor do alvo e do rótulo, igual extractWikilinks', () => {
    expect(matchWikilinkAt('[[ selo-mecanico | Selo Mecânico ]] resto')).toEqual({
      raw: '[[ selo-mecanico | Selo Mecânico ]]',
      target: 'selo-mecanico',
      label: 'Selo Mecânico',
    });
  });

  it('mesma gramática que extractWikilinks — não diverge em nenhum caso do conjunto de testes acima', () => {
    const casos = [
      '[[bomba-centrifuga]]',
      '[[rolamento|os rolamentos]]',
      '[[ selo-mecanico | Selo Mecânico ]]',
    ];
    for (const caso of casos) {
      const viaExtract = extractWikilinks(caso)[0];
      const viaAnchored = matchWikilinkAt(caso);
      expect(viaAnchored?.target).toBe(viaExtract.target);
      expect(viaAnchored?.label).toBe(viaExtract.label);
    }
  });
});
