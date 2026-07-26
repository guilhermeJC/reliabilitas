import { describe, expect, it } from 'vitest';
import { geraNonce, montaCabecalhoCsp } from '@/lib/csp';

// G2/DEV-051: script-src trocou 'unsafe-inline' por nonce por-requisicao +
// 'strict-dynamic' (padrao oficial Next.js). style-src permanece 'unsafe-inline'
// de proposito: nonce cobre <style>/<script>, nao o atributo style="" que
// Recharts/Radix usam — decisao de escopo registrada em DECISIONS.md.

describe('geraNonce', () => {
  it('gera uma string base64 não vazia', () => {
    const nonce = geraNonce(() => 'valor-fixo-de-teste');
    expect(nonce).toBe(Buffer.from('valor-fixo-de-teste').toString('base64'));
  });

  it('duas chamadas com fontes de aleatoriedade diferentes geram nonces diferentes', () => {
    let contador = 0;
    const gerador = () => `uuid-${contador++}`;
    const a = geraNonce(gerador);
    const b = geraNonce(gerador);
    expect(a).not.toBe(b);
  });

  it('sem argumento, usa crypto.randomUUID() (edge-safe — não usa o módulo Node crypto)', () => {
    const nonce = geraNonce();
    expect(typeof nonce).toBe('string');
    expect(nonce.length).toBeGreaterThan(0);
  });
});

// DEV-107 (auditoria 25/07): connect-src era 'self' puro, o que BLOQUEAVA no
// browser o POST do SDK do Sentry pro endpoint de ingestao — todo erro de
// cliente (os 3 error boundaries) morria silenciosamente na CSP. Provado ao
// vivo contra producao com fetch() no console: "BLOQUEADO pela CSP".
describe('montaCabecalhoCsp — connect-src permite a ingestao do Sentry (DEV-107)', () => {
  it('inclui o host de ingestao do Sentry em connect-src', () => {
    const csp = montaCabecalhoCsp('nonce123', false);
    const connectSrc = csp.split('; ').find((d) => d.startsWith('connect-src'));
    expect(connectSrc).toContain('https://*.ingest.sentry.io');
    expect(connectSrc).toContain('https://*.ingest.us.sentry.io');
  });

  it('mantem self em connect-src (nao abre a diretiva pra qualquer origem)', () => {
    const csp = montaCabecalhoCsp('nonce123', false);
    const connectSrc = csp.split('; ').find((d) => d.startsWith('connect-src'));
    expect(connectSrc).toContain("'self'");
    expect(connectSrc).not.toContain('*;');
    expect(connectSrc).not.toMatch(/connect-src[^;]*\s\*\s*$/);
  });
});

describe('montaCabecalhoCsp', () => {
  it('inclui o nonce em script-src com strict-dynamic e self', () => {
    const csp = montaCabecalhoCsp('abc123', false);
    expect(csp).toContain("script-src 'self' 'nonce-abc123' 'strict-dynamic'");
  });

  it('produção não inclui unsafe-eval', () => {
    const csp = montaCabecalhoCsp('abc123', false);
    expect(csp).not.toContain('unsafe-eval');
  });

  it('dev inclui unsafe-eval (source maps do next dev, hurdle §7)', () => {
    const csp = montaCabecalhoCsp('abc123', true);
    expect(csp).toContain("'unsafe-eval'");
  });

  it('script-src produção não carrega mais unsafe-inline (era o gap do DEV-051)', () => {
    const csp = montaCabecalhoCsp('abc123', false);
    const scriptSrcDirective = csp.split(';').find((d) => d.trim().startsWith('script-src'));
    expect(scriptSrcDirective).not.toContain('unsafe-inline');
  });

  it('style-src permanece unsafe-inline (decisão de escopo — não cobre atributo style="")', () => {
    const csp = montaCabecalhoCsp('abc123', false);
    expect(csp).toContain("style-src 'self' 'unsafe-inline'");
  });

  it('inclui hardening adicional: object-src none, base-uri self, form-action self', () => {
    const csp = montaCabecalhoCsp('abc123', false);
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("form-action 'self'");
  });

  it('preserva as diretivas herdadas do next.config original', () => {
    const csp = montaCabecalhoCsp('abc123', false);
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("img-src 'self' data: https:");
    expect(csp).toContain("font-src 'self'");
    expect(csp).toContain("connect-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
  });

  it('não tem quebras de linha nem espaços duplicados (header HTTP precisa ser 1 linha)', () => {
    const csp = montaCabecalhoCsp('abc123', false);
    expect(csp).not.toContain('\n');
    expect(csp).not.toMatch(/\s{2,}/);
  });
});
