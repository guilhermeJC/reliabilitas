import { describe, expect, it } from 'vitest';
import { HOST_CANONICO, destinoCanonico } from '@/lib/host-canonico';

// DEV-129 — ACHADO DE SEGURANÇA (04/09): o origin da Vercel respondia direto,
// por fora da Cloudflare. Medido em produção: 15/15 requisições passaram em
// reliabilitas.vercel.app enquanto reliabilitas.com bloqueava na 10ª, e o WAF
// que devolve 403 em /wp-admin no domínio canônico devolvia 307 no origin.
// Efeito: WAF, rate limit de borda e allowlist de crawlers eram todos
// contornáveis por quem soubesse a URL do origin — incluindo força bruta no
// /admin/login. Esta é a lógica pura da decisão; o middleware só a aplica.

const URL_ORIGIN = 'https://reliabilitas.vercel.app/pt/notas/cavitacao';

describe('destinoCanonico — fecha o bypass do origin', () => {
  it('em produção, host do origin é redirigido para o domínio canônico', () => {
    const d = destinoCanonico(URL_ORIGIN, 'reliabilitas.vercel.app', 'production');
    expect(d).toBe('https://reliabilitas.com/pt/notas/cavitacao');
  });

  it('preserva path E query — o redirect não pode perder a busca do visitante', () => {
    const d = destinoCanonico(
      'https://reliabilitas.vercel.app/pt/busca?q=bomba&p=2',
      'reliabilitas.vercel.app',
      'production',
    );
    expect(d).toBe('https://reliabilitas.com/pt/busca?q=bomba&p=2');
  });

  it('vale também para /api — é lá que mora a força bruta do login', () => {
    const d = destinoCanonico(
      'https://reliabilitas.vercel.app/api/admin/login',
      'reliabilitas.vercel.app',
      'production',
    );
    expect(d).toBe('https://reliabilitas.com/api/admin/login');
  });

  it('host canônico não é redirigido (sem laço de redirect)', () => {
    expect(destinoCanonico('https://reliabilitas.com/pt', HOST_CANONICO, 'production')).toBeNull();
  });

  it('host canônico com porta explícita também não entra em laço', () => {
    expect(
      destinoCanonico('https://reliabilitas.com/pt', `${HOST_CANONICO}:443`, 'production'),
    ).toBeNull();
  });

  it('comparação de host é case-insensitive (Host é case-insensitive por RFC)', () => {
    expect(
      destinoCanonico('https://reliabilitas.com/pt', 'RELIABILITAS.COM', 'production'),
    ).toBeNull();
  });

  it('PREVIEW da Vercel continua funcionando — senão eu quebraria o fluxo de review', () => {
    expect(
      destinoCanonico(
        'https://reliabilitas-git-branch.vercel.app/pt',
        'reliabilitas-git-branch.vercel.app',
        'preview',
      ),
    ).toBeNull();
  });

  it('desenvolvimento local não redireciona (VERCEL_ENV ausente)', () => {
    expect(destinoCanonico('http://localhost:3000/pt', 'localhost:3000', undefined)).toBeNull();
  });

  it('host ausente não redireciona — nunca adivinhar destino', () => {
    expect(destinoCanonico(URL_ORIGIN, null, 'production')).toBeNull();
  });

  it('força https no destino mesmo se a origem chegar em http', () => {
    const d = destinoCanonico(
      'http://reliabilitas.vercel.app/pt',
      'reliabilitas.vercel.app',
      'production',
    );
    expect(d).toBe('https://reliabilitas.com/pt');
  });

  it('URL inválida não lança — degrada para não-redirecionar', () => {
    expect(destinoCanonico('nao-e-url', 'reliabilitas.vercel.app', 'production')).toBeNull();
  });

  it('host hostil no header não vira destino do redirect (anti host-header injection)', () => {
    // O destino é SEMPRE a constante do código, nunca o valor recebido.
    const d = destinoCanonico(URL_ORIGIN, 'evil.com', 'production');
    expect(d).toBe('https://reliabilitas.com/pt/notas/cavitacao');
    expect(d).not.toContain('evil.com');
  });
});
