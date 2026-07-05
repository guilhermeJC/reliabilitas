import { describe, expect, it } from 'vitest';
import { notaPath } from '@/lib/routes';

// F11: a rota de nota nasce em UM lugar — render, páginas e componentes consomem daqui.
describe('notaPath — fonte única da rota de nota (F11)', () => {
  it('monta a rota canônica por locale', () => {
    expect(notaPath('pt', 'cavitacao')).toBe('/pt/notas/cavitacao');
    expect(notaPath('en', 'bomba-centrifuga')).toBe('/en/notas/bomba-centrifuga');
  });
});
