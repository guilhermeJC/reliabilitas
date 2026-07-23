import { describe, expect, it } from 'vitest';
import { extraiIp } from '@/lib/request-ip';

// DEV-083 #4: a mesma extração de IP (x-forwarded-for → primeiro da lista,
// fallback 'local') estava repetida em admin/login, api/sugestao e
// api/contribuicao. Fonte única testável.

describe('extraiIp — fonte única usada por admin/login, sugestao e contribuicao', () => {
  it('sem header: "local"', () => {
    expect(extraiIp(new Headers())).toBe('local');
  });

  it('extrai o primeiro IP quando há vários (proxy chain)', () => {
    const headers = new Headers({ 'x-forwarded-for': '1.2.3.4, 5.6.7.8' });
    expect(extraiIp(headers)).toBe('1.2.3.4');
  });

  it('remove espaços em volta do IP', () => {
    const headers = new Headers({ 'x-forwarded-for': '  1.2.3.4  ' });
    expect(extraiIp(headers)).toBe('1.2.3.4');
  });

  it('IP único sem vírgula', () => {
    const headers = new Headers({ 'x-forwarded-for': '9.9.9.9' });
    expect(extraiIp(headers)).toBe('9.9.9.9');
  });
});
