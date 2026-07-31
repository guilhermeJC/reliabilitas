import { describe, expect, it } from 'vitest';
import { montaBeaconCloudflare } from '@/lib/analytics';

// DEV-109 (auditoria 25/07) — não havia NENHUMA forma de saber se alguém usa
// o site. Escolha: Cloudflare Web Analytics (já na conta do fundador, sem
// cookie — respeita BR-011/cookieless — e sem limite de eventos, ao contrário
// do Vercel Analytics no plano Hobby).
//
// Restrição crítica: a CSP do projeto usa 'strict-dynamic', que faz o browser
// IGNORAR allowlist por host em script-src. A auto-injeção do beacon pela
// borda da Cloudflare seria BLOQUEADA (mesma classe do bug DEV-107) — por
// isso o script é inserido por nós, com o nonce da requisição.

describe('montaBeaconCloudflare', () => {
  it('devolve null sem token — degradação graciosa, nunca script quebrado', () => {
    expect(montaBeaconCloudflare(undefined, 'nonce123')).toBeNull();
    expect(montaBeaconCloudflare('', 'nonce123')).toBeNull();
  });

  it('devolve null sem nonce — sem nonce a CSP bloquearia, não adianta emitir', () => {
    expect(montaBeaconCloudflare('token-abc', undefined)).toBeNull();
    expect(montaBeaconCloudflare('token-abc', '')).toBeNull();
  });

  it('com token e nonce, devolve src, nonce e o data-cf-beacon com o token', () => {
    const b = montaBeaconCloudflare('token-abc', 'nonce123');
    expect(b).not.toBeNull();
    expect(b!.src).toBe('https://static.cloudflareinsights.com/beacon.min.js');
    expect(b!.nonce).toBe('nonce123');
    expect(JSON.parse(b!.dataCfBeacon)).toEqual({ token: 'token-abc' });
  });

  it('serializa o token via JSON.stringify — aspas no token não quebram o atributo', () => {
    const b = montaBeaconCloudflare('to"ken', 'nonce123');
    expect(() => JSON.parse(b!.dataCfBeacon)).not.toThrow();
    expect(JSON.parse(b!.dataCfBeacon).token).toBe('to"ken');
  });

  it('o beacon é defer (nunca bloqueia o render da página)', () => {
    expect(montaBeaconCloudflare('token-abc', 'nonce123')!.defer).toBe(true);
  });

  // O snippet oficial do painel da Cloudflare usa type='module'. O arquivo em
  // si é um IIFE clássico (verificado: 31 KB, sem export/import de topo), então
  // funcionaria como script clássico — mas seguir o contrato do fornecedor
  // protege contra ele passar a servir um bundle ESM de verdade no futuro.
  it('usa type=module, igual ao snippet oficial da Cloudflare', () => {
    expect(montaBeaconCloudflare('token-abc', 'nonce123')!.type).toBe('module');
  });
});
