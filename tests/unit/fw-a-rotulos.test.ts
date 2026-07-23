import { describe, expect, it } from 'vitest';
import { CATEGORIA_ROTULOS } from '@/lib/content/fw-a-rotulos';
import { FW_A_CATEGORIAS } from '@/lib/content/schema';

// DEV-083 #5: vocabulário de exibição da categoria Fw A estava só em
// fw-cards.tsx (componente), importado por plano-table.tsx como Middle Man.
// Fonte única testável aqui.

describe('CATEGORIA_ROTULOS — fonte única do vocabulário de exibição Fw A', () => {
  it('tem rótulo não vazio para toda categoria do schema (FW_A_CATEGORIAS)', () => {
    for (const cat of FW_A_CATEGORIAS) {
      expect(typeof CATEGORIA_ROTULOS[cat]).toBe('string');
      expect(CATEGORIA_ROTULOS[cat].length).toBeGreaterThan(0);
    }
  });

  it('rótulos canônicos (IT-MNT-001 §3–4)', () => {
    expect(CATEGORIA_ROTULOS.infant).toBe('Infant Mortality');
    expect(CATEGORIA_ROTULOS.random).toBe('Random');
    expect(CATEGORIA_ROTULOS.wear_out).toBe('Wear-out');
    expect(CATEGORIA_ROTULOS.mixed_complex).toBe('Mixed/Complex');
    expect(CATEGORIA_ROTULOS.unknown).toBe('Unknown');
  });
});
