import { describe, expect, it } from 'vitest';
import { metadadosBase, OG_IMAGE } from '@/lib/seo/metadados';
import { SITE_URL } from '@/lib/seo/site';

// DEV-133 — o site inteiro saía SEM Open Graph, exceto as notas. Medido em
// produção no dia do lançamento: `/pt`, `/en`, `/sobre`, `/apoiar`,
// `/calculadoras` e `/metodo` com `og:title` = 0, e og:image = 0 em TODAS as
// páginas, notas incluídas. Como o anúncio do projeto é um post no LinkedIn
// apontando para a home, o preview sairia sem imagem e com título genérico —
// justamente na única página que o lançamento ia divulgar.

describe('metadadosBase — Open Graph do site inteiro', () => {
  const pt = metadadosBase('pt');
  const en = metadadosBase('en');

  it('declara Open Graph com título, descrição, URL e nome do site', () => {
    expect(pt.openGraph?.title).toBeTruthy();
    expect(pt.openGraph?.description).toBeTruthy();
    expect(pt.openGraph?.url).toBe(`${SITE_URL}/pt`);
    expect(pt.openGraph?.siteName).toBe('RELIABILITAS');
  });

  it('declara imagem de preview no tamanho que as redes esperam (1200x630)', () => {
    const imgs = pt.openGraph?.images as { url: string; width: number; height: number }[];
    expect(imgs).toHaveLength(1);
    expect(imgs[0].url).toBe(`${SITE_URL}${OG_IMAGE}`);
    expect(imgs[0].width).toBe(1200);
    expect(imgs[0].height).toBe(630);
  });

  it('a URL da imagem é ABSOLUTA — rede social não resolve caminho relativo', () => {
    const imgs = pt.openGraph?.images as { url: string }[];
    expect(imgs[0].url.startsWith('https://')).toBe(true);
  });

  it('declara o locale correto em cada idioma, no formato do Open Graph', () => {
    expect(pt.openGraph?.locale).toBe('pt_BR');
    expect(en.openGraph?.locale).toBe('en_US');
  });

  it('o texto muda entre os idiomas — não é o mesmo em EN', () => {
    expect(en.openGraph?.description).not.toBe(pt.openGraph?.description);
  });

  it('declara card do X/Twitter com imagem grande', () => {
    const tw = pt.twitter as { card: string; images: unknown };
    expect(tw.card).toBe('summary_large_image');
    expect(tw.images).toBeTruthy();
  });

  it('define metadataBase, que é o que torna caminho relativo resolvível', () => {
    expect(pt.metadataBase?.toString()).toContain('reliabilitas.com');
  });

  it('mantém o título e a descrição já existentes do site', () => {
    expect(pt.title).toBeTruthy();
    expect(pt.description).toBeTruthy();
  });
});

describe('OG_IMAGE — a URL precisa ser versionada (DEV-134)', () => {
  // O fundador reportou que o Post Inspector do LinkedIn continuava mostrando a
  // arte antiga mesmo depois do deploy. A produção servia os bytes novos (hash
  // conferido com contorno de cache) — quem guardava a versão velha era o
  // LinkedIn, que indexa a imagem pela URL e a mantém por dias. Trocar bytes na
  // mesma URL não força rebusca; trocar a URL, sim.
  it('carrega um sufixo de versão, para que trocar a arte troque a URL', () => {
    expect(OG_IMAGE).toMatch(/-v\d+\.png$/);
  });

  it('aponta para um arquivo que existe em public/', async () => {
    const { existsSync } = await import('node:fs');
    expect(existsSync(`public${OG_IMAGE}`)).toBe(true);
  });
});
