import { describe, expect, it } from 'vitest';
import { montaRobots, CAMINHOS_BLOQUEADOS } from '@/lib/seo/robots';

// `rules` no tipo do Next é união (objeto único OU array); montaRobots sempre
// devolve array. Forma local explícita mantém os testes legíveis sem lutar
// com a inferência da união.
interface RegraRobots {
  userAgent?: string | string[];
  allow?: string | string[];
  disallow?: string | string[];
}
const regras = (base: string): RegraRobots[] => {
  const r = montaRobots(base).rules;
  return (Array.isArray(r) ? r : [r]) as RegraRobots[];
};
const listaDisallow = (r: RegraRobots | undefined): string[] =>
  Array.isArray(r?.disallow) ? r.disallow : r?.disallow ? [r.disallow] : [];

// DEV-111 — BR-010 é invariante do projeto: crawlers de busca E DE IA sempre
// passam, porque SEO/GEO é o único motor de aquisição (D26 — sem ads pagos).
// Estes testes existem pra que um "Disallow" bem-intencionado no futuro quebre
// o CI em vez de matar a descoberta do site em silêncio.

const BASE = 'https://reliabilitas.com';

describe('montaRobots — BR-010 (crawlers de IA nunca bloqueados)', () => {
  it('permite TODOS os user-agents na raiz', () => {
    const geral = regras(BASE).find((x) => x.userAgent === '*');
    expect(geral?.allow).toBe('/');
  });

  it('NÃO bloqueia nenhum crawler de IA conhecido', () => {
    for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) {
      const regra = regras(BASE).find((x) => {
        const ua = Array.isArray(x.userAgent) ? x.userAgent : [x.userAgent ?? ''];
        return ua.includes(bot);
      });
      // Ou o bot não é citado (e cai no '*', que permite tudo), ou é citado
      // EXPLICITAMENTE permitido — nunca com disallow de raiz.
      expect(regra?.allow ?? '/').toBe('/');
      expect(listaDisallow(regra)).not.toContain('/');
    }
  });

  it('nenhuma regra bloqueia a raiz inteira (mataria o site nos buscadores)', () => {
    for (const regra of regras(BASE)) {
      expect(listaDisallow(regra)).not.toContain('/');
    }
  });
});

describe('montaRobots — superfícies que devem ficar fora do índice', () => {
  it('bloqueia /admin e /api', () => {
    const dis = listaDisallow(regras(BASE).find((x) => x.userAgent === '*'));
    expect(dis).toContain('/admin');
    expect(dis).toContain('/api');
  });

  it('bloqueia as rotas utilitárias que já são noindex (sinal coerente)', () => {
    const dis = listaDisallow(regras(BASE).find((x) => x.userAgent === '*'));
    for (const c of ['/pt/busca', '/en/busca', '/pt/sugerir', '/en/sugerir']) {
      expect(dis).toContain(c);
    }
  });

  it('CAMINHOS_BLOQUEADOS nunca inclui /notas (é o produto)', () => {
    expect(CAMINHOS_BLOQUEADOS.some((c) => c.includes('/notas'))).toBe(false);
  });
});

describe('montaRobots — sitemap', () => {
  it('aponta o sitemap absoluto (é assim que o crawler o encontra)', () => {
    expect(montaRobots(BASE).sitemap).toBe(`${BASE}/sitemap.xml`);
  });

  it('não gera barra dupla se a base vier com barra final', () => {
    expect(montaRobots('https://reliabilitas.com/').sitemap).toBe(
      'https://reliabilitas.com/sitemap.xml',
    );
  });
});
