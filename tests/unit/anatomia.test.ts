import { describe, expect, it } from 'vitest';
import { validateFrontmatter, type NotaFrontmatter } from '@/lib/content/schema';
import { validateBatch, type NotaParsed } from '@/lib/content/validate-batch';

// BR-009 vira HARD (Dia 4/DEV-005 encerra a exceção): handbook de Tipo só
// publica com anatomia ilustrada — SVG próprio obrigatório; foto é opcional e,
// quando existe, exige fonte + licença + crédito (DEV-025: nunca rehosting).

const handbookBase = {
  slug: 'bomba-centrifuga',
  tipo_nota: 'tipo',
  locale: 'pt',
  titulo: 'Bomba Centrífuga',
  status: 'published',
  taxonomia: ['transferencia-de-fluidos-liquidos', 'bombas', 'dinamicas'],
  fontes: ['Karassik, Pump Handbook'],
  secoes: [
    'classificacao',
    'principio',
    'anatomia',
    'tipos',
    'marcas',
    'industria',
    'componentes',
    'modos_falha',
  ],
  componentes: [],
  revisado_em: '2026-07-06',
};

const anatomiaValida = {
  svg: '/anatomia/bomba-centrifuga.svg',
  alt: 'Corte meridional de bomba centrífuga com componentes numerados',
};

describe('BR-009 hard — anatomia obrigatória no handbook de Tipo', () => {
  it('handbook SEM anatomia é rejeitado', () => {
    const r = validateFrontmatter(handbookBase);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.issues.some((i) => i.path.includes('anatomia'))).toBe(true);
  });

  it('handbook com anatomia (SVG próprio + alt) passa', () => {
    expect(validateFrontmatter({ ...handbookBase, anatomia: anatomiaValida }).ok).toBe(true);
  });

  it('svg fora do padrão /anatomia/<slug>.svg é rejeitado', () => {
    const r = validateFrontmatter({
      ...handbookBase,
      anatomia: { ...anatomiaValida, svg: 'https://cdn.example/x.svg' },
    });
    expect(r.ok).toBe(false);
  });

  it('foto sem licença/fonte/crédito é rejeitada (DEV-025 — nunca rehosting)', () => {
    const r = validateFrontmatter({
      ...handbookBase,
      anatomia: {
        ...anatomiaValida,
        foto: { arquivo: '/anatomia/bomba-centrifuga.webp' },
      },
    });
    expect(r.ok).toBe(false);
  });

  it('foto completa (arquivo + fonte + licença + crédito) passa', () => {
    const r = validateFrontmatter({
      ...handbookBase,
      anatomia: {
        ...anatomiaValida,
        foto: {
          arquivo: '/anatomia/bomba-centrifuga.webp',
          fonte: 'https://commons.wikimedia.org/wiki/File:Exemplo.jpg',
          licenca: 'CC BY-SA 4.0',
          credito: 'Fulano de Tal, Wikimedia Commons',
        },
      },
    });
    expect(r.ok).toBe(true);
  });

  it('lote: SVG de anatomia referenciado precisa EXISTIR em public/ (predicado injetado)', () => {
    const fm = validateFrontmatter({ ...handbookBase, anatomia: anatomiaValida, locale: 'pt' });
    const fmEn = validateFrontmatter({
      ...handbookBase,
      anatomia: anatomiaValida,
      locale: 'en',
      titulo: 'Centrifugal Pump',
    });
    expect(fm.ok && fmEn.ok).toBe(true);
    if (!fm.ok || !fmEn.ok) return;
    const notas: NotaParsed[] = [
      { fm: fm.data as NotaFrontmatter, corpo: 'x', file: 'pt/tipo/bomba.md', wikilinks: [] },
      { fm: fmEn.data as NotaFrontmatter, corpo: 'x', file: 'en/tipo/bomba.md', wikilinks: [] },
    ];
    // cadeia-pai omitida de propósito: só interessa o erro de asset aqui
    const semAsset = validateBatch(notas, { existeAsset: () => false });
    expect(semAsset.errors.some((e) => e.message.includes('/anatomia/bomba-centrifuga.svg'))).toBe(
      true,
    );
    const comAsset = validateBatch(notas, { existeAsset: () => true });
    expect(comAsset.errors.some((e) => e.message.includes('.svg'))).toBe(false);
  });

  it('modo de falha e nota-semente NÃO exigem anatomia (é regra de handbook)', () => {
    const semente = {
      slug: 'bombas',
      tipo_nota: 'familia',
      locale: 'pt',
      titulo: 'Bombas',
      status: 'published',
      taxonomia: ['transferencia-de-fluidos-liquidos'],
      fontes: ['ISO 14224'],
      resumo: 'Família de máquinas de fluxo.',
      revisado_em: '2026-07-06',
    };
    expect(validateFrontmatter(semente).ok).toBe(true);
  });
});
