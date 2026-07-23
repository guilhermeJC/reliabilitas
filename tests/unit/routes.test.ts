import { describe, expect, it } from 'vitest';
import {
  apoioPath,
  buscaPath,
  calculadorasPath,
  construirUrlLocale,
  metodoPath,
  notaPath,
  sugerirPath,
  termosPath,
} from '@/lib/routes';

// F11: a rota de nota nasce em UM lugar — render, páginas e componentes consomem daqui.
describe('notaPath — fonte única da rota de nota (F11)', () => {
  it('monta a rota canônica por locale', () => {
    expect(notaPath('pt', 'cavitacao')).toBe('/pt/notas/cavitacao');
    expect(notaPath('en', 'bomba-centrifuga')).toBe('/en/notas/bomba-centrifuga');
  });
});

describe('apoioPath / sugerirPath — apoio (T08/DEV-026) e correção (T09)', () => {
  it('monta as rotas por locale', () => {
    expect(apoioPath('pt')).toBe('/pt/apoiar');
    expect(apoioPath('en')).toBe('/en/apoiar');
    expect(sugerirPath('pt')).toBe('/pt/sugerir');
  });

  it('sugerirPath carrega a página de origem codificada', () => {
    expect(sugerirPath('pt', '/pt/notas/cavitacao')).toBe(
      '/pt/sugerir?pagina=%2Fpt%2Fnotas%2Fcavitacao',
    );
  });
});

describe('calculadorasPath — rota das calculadoras (F05)', () => {
  it('monta a rota por locale', () => {
    expect(calculadorasPath('pt')).toBe('/pt/calculadoras');
    expect(calculadorasPath('en')).toBe('/en/calculadoras');
  });

  it('subpágina do guia How to use (revisão do fundador 08/07)', () => {
    expect(calculadorasPath('pt', 'guia')).toBe('/pt/calculadoras/guia');
    expect(calculadorasPath('en', 'guia')).toBe('/en/calculadoras/guia');
  });
});

describe('metodoPath — método e frameworks clicáveis (revisão 4 do fundador)', () => {
  it('monta a rota do método por locale', () => {
    expect(metodoPath('pt')).toBe('/pt/metodo');
    expect(metodoPath('en')).toBe('/en/metodo');
  });

  it('subpáginas dos frameworks', () => {
    expect(metodoPath('pt', 'framework-a')).toBe('/pt/metodo/framework-a');
    expect(metodoPath('en', 'framework-b')).toBe('/en/metodo/framework-b');
  });
});

describe('buscaPath — rota da busca com query codificada (T05)', () => {
  it('sem termo: rota limpa da página de busca', () => {
    expect(buscaPath('pt')).toBe('/pt/busca');
    expect(buscaPath('en')).toBe('/en/busca');
  });

  it('com termo: q= codificado para URL', () => {
    expect(buscaPath('pt', 'cavitação bomba')).toBe('/pt/busca?q=cavita%C3%A7%C3%A3o%20bomba');
  });

  it('página > 1 entra como p=; página 1 é omitida (URL canônica)', () => {
    expect(buscaPath('pt', 'npsh', 2)).toBe('/pt/busca?q=npsh&p=2');
    expect(buscaPath('pt', 'npsh', 1)).toBe('/pt/busca?q=npsh');
  });
});

describe('termosPath — Termos de Uso + Privacidade (G3)', () => {
  it('monta a rota por locale', () => {
    expect(termosPath('pt')).toBe('/pt/termos');
    expect(termosPath('en')).toBe('/en/termos');
  });

  it('âncora opcional para a seção de privacidade (link direto do formulário)', () => {
    expect(termosPath('pt', 'privacidade')).toBe('/pt/termos#privacidade');
    expect(termosPath('en', 'privacidade')).toBe('/en/termos#privacidade');
  });
});

describe('construirUrlLocale — troca de idioma preserva a query atual (DEV-083 #3, G5)', () => {
  it('sem query: pathname com objeto de query vazio', () => {
    expect(construirUrlLocale('/busca', new URLSearchParams())).toEqual({
      pathname: '/busca',
      query: {},
    });
  });

  it('preserva termo e página da busca como objeto — forma exigida pelo <Link> do next-intl com `locale` (string com query embutida perde a query na navegação real, achado via Playwright/G5)', () => {
    expect(construirUrlLocale('/busca', new URLSearchParams('q=cavitacao&p=2'))).toEqual({
      pathname: '/busca',
      query: { q: 'cavitacao', p: '2' },
    });
  });

  it('funciona para qualquer rota com query, não só busca', () => {
    expect(construirUrlLocale('/notas/cavitacao', new URLSearchParams('foo=bar'))).toEqual({
      pathname: '/notas/cavitacao',
      query: { foo: 'bar' },
    });
  });
});
