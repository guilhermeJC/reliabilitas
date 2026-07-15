import { describe, expect, it } from 'vitest';
import { verificaSaude } from '@/lib/health';

// G1/DEV-051 — /api/health é endpoint de STATUS (BR-004: nunca de dados) —
// só diz se o banco responde, não retorna nenhuma linha. Ping injetável pra
// testar sem bater no Supabase real (mesmo padrão de rate-limit.ts/admin-auth.ts).

describe('verificaSaude', () => {
  it('banco respondendo -> status ok', async () => {
    const resultado = await verificaSaude(
      async () => true,
      () => new Date('2026-07-13T12:00:00.000Z'),
    );
    expect(resultado).toEqual({
      status: 'ok',
      banco: true,
      timestamp: '2026-07-13T12:00:00.000Z',
    });
  });

  it('banco não respondendo -> status degradado', async () => {
    const resultado = await verificaSaude(
      async () => false,
      () => new Date('2026-07-13T12:00:00.000Z'),
    );
    expect(resultado.status).toBe('degradado');
    expect(resultado.banco).toBe(false);
  });

  it('ping que lança exceção também vira degradado (nunca propaga erro)', async () => {
    const resultado = await verificaSaude(
      async () => {
        throw new Error('timeout de conexão');
      },
      () => new Date('2026-07-13T12:00:00.000Z'),
    );
    expect(resultado.status).toBe('degradado');
    expect(resultado.banco).toBe(false);
  });
});
