import { describe, expect, it } from 'vitest';
import { montaEntradasSitemap, ROTAS_ESTATICAS_INDEXAVEIS } from '@/lib/seo/sitemap';

// DEV-111 (auditoria 25/07) — /sitemap.xml devolvia 404 e o robots.txt servido
// era um boilerplate da Cloudflare SEM NENHUMA diretiva (só comentários de
// content-signals). Como TODO o modelo de aquisição do projeto é SEO/GEO
// (D26: sem ads pagos), um domínio novo com 124 páginas sem sitemap é o pior
// cenário possível de descoberta.
//
// Aqui só a lógica pura (quais URLs, com quais alternates); a leitura do banco
// fica no app/sitemap.ts — mesmo padrão de normas-index.ts.

const BASE = 'https://reliabilitas.com';

describe('montaEntradasSitemap', () => {
  it('inclui as rotas estáticas nos DOIS locales', () => {
    const urls = montaEntradasSitemap(BASE, [], []).map((e) => e.url);
    expect(urls).toContain(`${BASE}/pt`);
    expect(urls).toContain(`${BASE}/en`);
    expect(urls).toContain(`${BASE}/pt/metodo`);
    expect(urls).toContain(`${BASE}/en/metodo`);
  });

  it('inclui as notas publicadas de cada locale', () => {
    const e = montaEntradasSitemap(BASE, ['cavitacao', 'rolamento'], ['cavitation']);
    const urls = e.map((x) => x.url);
    expect(urls).toContain(`${BASE}/pt/notas/cavitacao`);
    expect(urls).toContain(`${BASE}/pt/notas/rolamento`);
    expect(urls).toContain(`${BASE}/en/notas/cavitation`);
  });

  it('NUNCA inclui rota noindex (busca/sugerir/colaborar) nem /admin nem /api', () => {
    const urls = montaEntradasSitemap(BASE, ['x'], ['x']).map((e) => e.url);
    for (const proibida of ['/busca', '/sugerir', '/colaborar', '/admin', '/api']) {
      expect(urls.some((u) => u.includes(proibida))).toBe(false);
    }
  });

  it('declara hreflang alternate PT↔EN nas rotas estáticas (i18n SEO)', () => {
    const home = montaEntradasSitemap(BASE, [], []).find((e) => e.url === `${BASE}/pt`);
    expect(home?.alternates?.languages).toEqual({
      pt: `${BASE}/pt`,
      en: `${BASE}/en`,
    });
  });

  it('NÃO inventa alternate de nota: slug PT e EN diferem, só declara o que existe', () => {
    // 'cavitacao' existe em PT; o par em EN é 'cavitation' — slugs distintos.
    // Sem um mapa real PT↔EN, declarar alternate seria apontar pra 404.
    const nota = montaEntradasSitemap(BASE, ['cavitacao'], ['cavitation']).find(
      (e) => e.url === `${BASE}/pt/notas/cavitacao`,
    );
    expect(nota?.alternates).toBeUndefined();
  });

  it('todas as URLs são absolutas e sem barra dupla', () => {
    for (const e of montaEntradasSitemap(BASE, ['a'], ['b'])) {
      expect(e.url.startsWith('https://')).toBe(true);
      expect(e.url.slice(8)).not.toContain('//');
    }
  });

  it('toda entrada carrega lastModified (o crawler usa pra priorizar recrawl)', () => {
    for (const e of montaEntradasSitemap(BASE, ['a'], ['b'])) {
      expect(e.lastModified).toBeInstanceOf(Date);
    }
  });

  it('nota tem prioridade maior que rota utilitária — conteúdo é o produto', () => {
    const e = montaEntradasSitemap(BASE, ['cavitacao'], []);
    const nota = e.find((x) => x.url.includes('/notas/cavitacao'))!;
    const termos = e.find((x) => x.url === `${BASE}/pt/termos`)!;
    expect(nota.priority).toBeGreaterThan(termos.priority!);
  });

  it('a home é a de maior prioridade', () => {
    const e = montaEntradasSitemap(BASE, ['x'], []);
    const home = e.find((x) => x.url === `${BASE}/pt`)!;
    expect(Math.max(...e.map((x) => x.priority ?? 0))).toBe(home.priority);
  });

  it('não duplica URL mesmo se o mesmo slug vier repetido do banco', () => {
    const urls = montaEntradasSitemap(BASE, ['a', 'a'], []).map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('base com barra final não gera barra dupla', () => {
    const urls = montaEntradasSitemap('https://reliabilitas.com/', ['a'], []).map((e) => e.url);
    expect(urls.every((u) => !u.slice(8).includes('//'))).toBe(true);
  });

  it('ROTAS_ESTATICAS_INDEXAVEIS não contém nenhuma rota com noindex', () => {
    for (const r of ROTAS_ESTATICAS_INDEXAVEIS) {
      expect(['/busca', '/sugerir', '/colaborar']).not.toContain(r.caminho);
    }
  });
});
