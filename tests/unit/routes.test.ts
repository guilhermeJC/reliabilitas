import { describe, expect, it } from 'vitest';
import { buscaPath, calculadorasPath, notaPath } from '@/lib/routes';

// F11: a rota de nota nasce em UM lugar — render, páginas e componentes consomem daqui.
describe('notaPath — fonte única da rota de nota (F11)', () => {
  it('monta a rota canônica por locale', () => {
    expect(notaPath('pt', 'cavitacao')).toBe('/pt/notas/cavitacao');
    expect(notaPath('en', 'bomba-centrifuga')).toBe('/en/notas/bomba-centrifuga');
  });
});

describe('calculadorasPath — rota das calculadoras (F05)', () => {
  it('monta a rota por locale', () => {
    expect(calculadorasPath('pt')).toBe('/pt/calculadoras');
    expect(calculadorasPath('en')).toBe('/en/calculadoras');
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
