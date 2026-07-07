import { describe, expect, it } from 'vitest';
import { validateFrontmatter, validateNiveisCorpo } from '@/lib/content/schema';

// Fixtures mínimas válidas por tipo de nota (contrato: DOCS_base §E + DOCS_regras BR-005/BR-006)
const modoFalhaValido = {
  slug: 'cavitacao',
  tipo_nota: 'modo_falha',
  locale: 'pt',
  titulo: 'Cavitação',
  status: 'published',
  taxonomia: ['transferencia-de-fluidos-liquidos', 'bombas', 'dinamicas', 'bomba-centrifuga'],
  iso14224_code: 'OTH/ERO',
  fontes: ['Karassik (2008), cap. 2'],
  revisado_em: '2026-07-04',
  fw_a: { categoria: 'mixed_complex', beta: 'variável' },
  fw_b: { tem_pf: true, evidente: true, decisao: 'cbm', periodicidade: 'P-F/2' },
  pf_tipico: 'dias–semanas',
  plano_manutencao: [
    {
      tarefa: 'Análise de vibração',
      metodo: 'Espectro + envelope',
      periodicidade: 'Mensal (P-F/2)',
    },
  ],
};

const handbookValido = {
  slug: 'bomba-centrifuga',
  tipo_nota: 'tipo',
  locale: 'pt',
  titulo: 'Bomba Centrífuga',
  status: 'published',
  taxonomia: ['transferencia-de-fluidos-liquidos', 'bombas', 'dinamicas'],
  iso14224_code: 'PU',
  fontes: ['Karassik (2008)'],
  revisado_em: '2026-07-04',
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
  componentes: ['rolamento', 'selo-mecanico'],
  // BR-009 hard (Dia 4): anatomia é obrigatória em handbook — ver anatomia.test.ts
  anatomia: {
    svg: '/anatomia/bomba-centrifuga.svg',
    alt: 'Corte meridional de bomba centrífuga com componentes numerados',
  },
};

const sementeValida = {
  slug: 'bombas',
  tipo_nota: 'familia',
  locale: 'pt',
  titulo: 'Bombas',
  status: 'published',
  taxonomia: ['transferencia-de-fluidos-liquidos'],
  fontes: ['ISO 14224:2016'],
  revisado_em: '2026-07-04',
  resumo: 'Família de equipamentos que transferem líquidos por adição de energia.',
};

describe('validateFrontmatter — BR-006 (frontmatter inválido derruba o build)', () => {
  it('aceita modo_falha completo e válido', () => {
    const r = validateFrontmatter(modoFalhaValido);
    expect(r.ok).toBe(true);
  });

  it('aceita handbook de tipo com as seções essenciais (D17)', () => {
    const r = validateFrontmatter(handbookValido);
    expect(r.ok).toBe(true);
  });

  it('aceita nota-semente (família) com resumo', () => {
    const r = validateFrontmatter(sementeValida);
    expect(r.ok).toBe(true);
  });

  it('rejeita nota-semente sem resumo (D17)', () => {
    const semResumo: Record<string, unknown> = { ...sementeValida };
    delete semResumo.resumo;
    const r = validateFrontmatter(semResumo);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.issues.map((i) => i.path).join()).toContain('resumo');
  });

  it('rejeita modo_falha sem fw_a.categoria, apontando o campo', () => {
    const invalido = { ...modoFalhaValido, fw_a: { beta: 2.1 } };
    const r = validateFrontmatter(invalido);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.issues.map((i) => i.path).join()).toContain('fw_a.categoria');
  });

  it('rejeita enum inválido em fw_b.decisao', () => {
    const invalido = {
      ...modoFalhaValido,
      fw_b: { ...modoFalhaValido.fw_b, decisao: 'preditiva' },
    };
    const r = validateFrontmatter(invalido);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.issues.map((i) => i.path).join()).toContain('fw_b.decisao');
  });

  it('F7: rejeita campo desconhecido — typo não some em silêncio (BR-006 estrito)', () => {
    const invalido = { ...modoFalhaValido, pf_typico: 'dias' }; // typo de pf_tipico
    const r = validateFrontmatter(invalido);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.issues.map((i) => `${i.path} ${i.message}`).join()).toContain('pf_typico');
  });

  it('F7: aceita tags (allowlist — insumo manual da busca FTS em PT)', () => {
    const r = validateFrontmatter({ ...sementeValida, tags: ['npsh', 'cavitacao'] });
    expect(r.ok).toBe(true);
  });

  it('F8: rejeita o campo niveis — os 3 níveis vivem no corpo, não no frontmatter', () => {
    const invalido = { ...modoFalhaValido, niveis: ['beginner', 'specialist', 'engineer'] };
    const r = validateFrontmatter(invalido);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.issues.map((i) => `${i.path} ${i.message}`).join()).toContain('niveis');
  });

  it('F10: rejeita nota published sem revisado_em (sitemap/SEO leem data real)', () => {
    const invalido: Record<string, unknown> = { ...sementeValida };
    delete invalido.revisado_em;
    const r = validateFrontmatter(invalido);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.issues.map((i) => i.path).join()).toContain('revisado_em');
  });

  it('F10: draft sem revisado_em segue aceito (obrigatória só na publicação)', () => {
    const draft: Record<string, unknown> = { ...sementeValida, status: 'draft' };
    delete draft.revisado_em;
    const r = validateFrontmatter(draft);
    expect(r.ok).toBe(true);
  });

  it('F20: rejeita o stub anatomia — o schema real nasce no Dia 4 com BR-009 hard', () => {
    const invalido = { ...handbookValido, anatomia: { foto: null, corte_svg: 'x.svg' } };
    const r = validateFrontmatter(invalido);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.issues.map((i) => `${i.path} ${i.message}`).join()).toContain('anatomia');
  });

  it('rejeita fontes vazias (BR-002 — citação obrigatória)', () => {
    const invalido = { ...modoFalhaValido, fontes: [] };
    const r = validateFrontmatter(invalido);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.issues.map((i) => i.path).join()).toContain('fontes');
  });

  it('rejeita slug fora do padrão kebab-case', () => {
    const invalido = { ...modoFalhaValido, slug: 'Cavitação em Bombas' };
    const r = validateFrontmatter(invalido);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.issues.map((i) => i.path).join()).toContain('slug');
  });

  it('rejeita modo_falha com taxonomia vazia (precisa de cadeia-pai, BR-001)', () => {
    const invalido = { ...modoFalhaValido, taxonomia: [] };
    const r = validateFrontmatter(invalido);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.issues.map((i) => i.path).join()).toContain('taxonomia');
  });

  it('F2: rejeita handbook com taxonomia vazia (handbook nunca é raiz da árvore)', () => {
    const invalido = { ...handbookValido, taxonomia: [] };
    const r = validateFrontmatter(invalido);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.issues.map((i) => i.path).join()).toContain('taxonomia');
  });

  it('rejeita handbook sem seção essencial (modos_falha ausente)', () => {
    const invalido = {
      ...handbookValido,
      secoes: handbookValido.secoes.filter((s) => s !== 'modos_falha'),
    };
    const r = validateFrontmatter(invalido);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.issues.map((i) => i.path).join()).toContain('secoes');
  });

  describe('coerência entre Fw A e Fw B (PRO-MNT-001 §4.4 / IT-MNT-001 §5)', () => {
    it('rejeita CBM sem P-F detectável (CBM exige tem_pf=true)', () => {
      const invalido = {
        ...modoFalhaValido,
        fw_b: { tem_pf: false, evidente: true, decisao: 'cbm', periodicidade: 'P-F/2' },
      };
      const r = validateFrontmatter(invalido);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.issues.map((i) => i.message).join()).toContain('CBM');
    });

    it('rejeita proof_test com falha evidente (proof test é só para falha oculta)', () => {
      const invalido = {
        ...modoFalhaValido,
        fw_b: { tem_pf: false, evidente: true, decisao: 'proof_test', periodicidade: '12m' },
      };
      const r = validateFrontmatter(invalido);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.issues.map((i) => i.message).join()).toContain('oculta');
    });

    it('rejeita RTF com P-F detectável (com P-F, a decisão correta é CBM)', () => {
      const invalido = {
        ...modoFalhaValido,
        fw_b: { tem_pf: true, evidente: true, decisao: 'rtf', periodicidade: 'N/A' },
      };
      const r = validateFrontmatter(invalido);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.issues.map((i) => i.message).join()).toContain('RTF');
    });
  });
});

describe('validateNiveisCorpo — F8: os 3 níveis são seções reais do corpo (DEV-006/Spec §5)', () => {
  const corpoCompleto = [
    '## Beginner',
    'O que é e por que acontece.',
    '## Specialist',
    'Fw A → Fw B, P-F e plano.',
    '## Engineer',
    'Weibull, equações e bibliografia.',
  ].join('\n\n');

  it('aceita corpo com os 3 headings preenchidos', () => {
    expect(validateNiveisCorpo(corpoCompleto)).toEqual([]);
  });

  it('acusa heading ausente apontando o nível que falta', () => {
    const semEngineer = corpoCompleto.replace(/## Engineer[\s\S]*$/, '');
    const issues = validateNiveisCorpo(semEngineer);
    expect(issues.length).toBeGreaterThan(0);
    expect(issues.map((i) => i.message).join()).toContain('Engineer');
  });

  it('acusa seção vazia — heading presente sem conteúdo real não entrega profundidade', () => {
    const beginnerVazio = corpoCompleto.replace('O que é e por que acontece.', '');
    const issues = validateNiveisCorpo(beginnerVazio);
    expect(issues.length).toBeGreaterThan(0);
    expect(issues.map((i) => i.message).join()).toContain('Beginner');
  });

  it('não exige headings de outros tipos de corpo (só valida o que recebe)', () => {
    const issues = validateNiveisCorpo(
      '## Beginner\n\nx\n\n## Specialist\n\ny\n\n## Engineer\n\nz',
    );
    expect(issues).toEqual([]);
  });
});
