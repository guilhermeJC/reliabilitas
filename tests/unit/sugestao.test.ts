import { describe, expect, it } from 'vitest';
import { PAGINA_INTERNA_RE, validaSugestao } from '@/lib/sugestao';
import { criaRateLimiter } from '@/lib/rate-limit';

// T09 — a ÚNICA rota de escrita do site (G4/DEV-014). Todo input é hostil por
// padrão: zod estrito, honeypot silencioso e rate limit por rota. Testes de
// abuso ANTES da rota existir.

const valida = {
  mensagem: 'O valor do NPSH citado na seção Engineer parece divergir da HI 9.6.1.',
  pagina: '/pt/notas/cavitacao',
  contato: 'leitor@exemplo.com',
  website: '', // honeypot vazio = humano
};

describe('validaSugestao — contrato estrito da rota de escrita', () => {
  it('sugestão válida passa e sai normalizada (trim)', () => {
    const r = validaSugestao({ ...valida, mensagem: `  ${valida.mensagem}  ` });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.mensagem).toBe(valida.mensagem);
      expect(r.data.pagina).toBe('/pt/notas/cavitacao');
    }
  });

  it('contato é opcional (vazio vira null)', () => {
    const r = validaSugestao({ ...valida, contato: '' });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.contato).toBeNull();
  });

  it('honeypot preenchido → resultado "bot" (a rota FINGE sucesso, nunca grava)', () => {
    const r = validaSugestao({ ...valida, website: 'http://spam.example' });
    expect(r).toEqual({ ok: false, motivo: 'bot' });
  });

  it('mensagem curta demais (<10) ou gigante (>2000) é rejeitada', () => {
    expect(validaSugestao({ ...valida, mensagem: 'curta' }).ok).toBe(false);
    expect(validaSugestao({ ...valida, mensagem: 'x'.repeat(2001) }).ok).toBe(false);
  });

  it('pagina precisa ser rota INTERNA (path relativo) — nunca URL externa', () => {
    expect(validaSugestao({ ...valida, pagina: 'https://evil.example/phish' }).ok).toBe(false);
    expect(validaSugestao({ ...valida, pagina: '//evil.example' }).ok).toBe(false);
    expect(validaSugestao({ ...valida, pagina: '/en/notas/bomba-centrifuga' }).ok).toBe(true);
  });

  it('contato inválido (não-email) é rejeitado', () => {
    expect(validaSugestao({ ...valida, contato: 'não é email' }).ok).toBe(false);
  });

  it('payload não-string (arrays de searchParam, objetos) é rejeitado sem lançar', () => {
    expect(validaSugestao({ mensagem: ['a', 'b'], pagina: 1, website: null }).ok).toBe(false);
  });
});

describe('PAGINA_INTERNA_RE — fonte única usada pelo zod E pela rota (DEV-083 #4)', () => {
  it('aceita path interno', () => {
    expect(PAGINA_INTERNA_RE.test('/pt/notas/cavitacao')).toBe(true);
  });

  it('rejeita URL externa e protocol-relative', () => {
    expect(PAGINA_INTERNA_RE.test('https://evil.example/phish')).toBe(false);
    expect(PAGINA_INTERNA_RE.test('//evil.example')).toBe(false);
  });
});

describe('rate limit por rota — janela deslizante em memória', () => {
  it('permite até o teto e bloqueia o excedente', () => {
    let agora = 1_000_000;
    const permite = criaRateLimiter({ maxNaJanela: 3, janelaMs: 60_000, relogio: () => agora });
    expect(permite('ip-1')).toBe(true);
    expect(permite('ip-1')).toBe(true);
    expect(permite('ip-1')).toBe(true);
    expect(permite('ip-1')).toBe(false); // 4ª na janela → bloqueada
    agora += 1; // continua dentro da janela
    expect(permite('ip-1')).toBe(false);
  });

  it('chaves diferentes não se contaminam', () => {
    const permite = criaRateLimiter({ maxNaJanela: 1, janelaMs: 60_000, relogio: () => 0 });
    expect(permite('ip-a')).toBe(true);
    expect(permite('ip-b')).toBe(true);
    expect(permite('ip-a')).toBe(false);
  });

  it('janela desliza: tentativas antigas expiram', () => {
    let agora = 0;
    const permite = criaRateLimiter({ maxNaJanela: 2, janelaMs: 1_000, relogio: () => agora });
    expect(permite('ip')).toBe(true);
    expect(permite('ip')).toBe(true);
    expect(permite('ip')).toBe(false);
    agora = 1_001; // as duas primeiras saíram da janela
    expect(permite('ip')).toBe(true);
  });
});
