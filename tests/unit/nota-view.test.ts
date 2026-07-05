import { describe, expect, it } from 'vitest';
import { classificaNotaView } from '@/lib/content/nota-view';

// F15: archived ≠ inexistente (F01: aviso/redirect vs 404). Draft/review não vazam
// existência para o público — respondem como inexistentes (D11: rascunho é privado).
describe('classificaNotaView — visibilidade pública da nota (F15)', () => {
  it('published → visível', () => {
    expect(classificaNotaView({ status: 'published' })).toBe('published');
  });

  it('archived → estado próprio (aviso de arquivamento, não 404)', () => {
    expect(classificaNotaView({ status: 'archived' })).toBe('archived');
  });

  it('draft e review respondem como inexistentes (não vazam rascunho)', () => {
    expect(classificaNotaView({ status: 'draft' })).toBe('missing');
    expect(classificaNotaView({ status: 'review' })).toBe('missing');
  });

  it('nota ausente → inexistente', () => {
    expect(classificaNotaView(null)).toBe('missing');
  });
});
