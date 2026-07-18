import { describe, expect, it } from 'vitest';
import { decideColapsadoInicial } from '@/lib/sidebar-preferencia';

// Achado do fundador (17/07, revisado no mesmo dia com prints do celular
// real): a 1ª correção só ajudava um visitante 100% novo — quem já tinha
// `sidebarOpen=1` salvo de ANTES da correção existir (o próprio fundador,
// testando de novo) continuava vendo a árvore abrir cheia, porque a regra
// "preferência salva sempre vence" derrotava a detecção de celular. No
// celular a árvore é uma gaveta full-screen, não uma coluna — não faz
// sentido "lembrar" de ficar aberta entre páginas. Regra final: no celular,
// SEMPRE começa recolhida, ignorando qualquer preferência salva (só abre
// pelo toque no ☰, e volta a recolher a cada navegação/página nova). No
// desktop nada muda — preferência salva continua valendo, default aberta.

describe('decideColapsadoInicial', () => {
  it('celular: SEMPRE começa recolhida, mesmo com preferência salva "1" (aberta)', () => {
    expect(decideColapsadoInicial('1', true)).toBe(true);
  });

  it('celular: SEMPRE começa recolhida, mesmo sem preferência salva', () => {
    expect(decideColapsadoInicial(null, true)).toBe(true);
  });

  it('celular: SEMPRE começa recolhida, mesmo com preferência salva "0" (já recolhida)', () => {
    expect(decideColapsadoInicial('0', true)).toBe(true);
  });

  it('desktop: preferência salva "0" (recolhida) é respeitada', () => {
    expect(decideColapsadoInicial('0', false)).toBe(true);
  });

  it('desktop: preferência salva "1" (aberta) é respeitada', () => {
    expect(decideColapsadoInicial('1', false)).toBe(false);
  });

  it('desktop: sem preferência salva -> começa aberta (comportamento de sempre)', () => {
    expect(decideColapsadoInicial(null, false)).toBe(false);
  });
});
