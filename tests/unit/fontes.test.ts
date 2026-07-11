import { describe, expect, it } from 'vitest';
import { agrupaFontes, GRUPOS_FONTES } from '@/lib/content/fontes';

// Melhoria 1 do fundador (10/07): a lista de fontes do rodapé fica recolhível
// e AGRUPADA — normas/institutos · literatura técnica · artigos · outros.
// A classificação é heurística sobre a string da fonte (função pura), na ordem:
// normas/institutos (prefixo/keyword) → literatura (editora/edição/Handbook/
// capítulo) → artigos (periódico ou ano entre parênteses) → outros.

describe('agrupaFontes — classificação heurística das strings de fonte', () => {
  it('normas e institutos: prefixos de norma e nomes de instituto', () => {
    const fontes = [
      'ISO 14224:2016 — Tabela B.2 (cavitação como mecanismo de falha próprio)',
      'ASTM G40 — Standard Terminology Relating to Wear and Erosion',
      'API 610, 12ª ed. — Centrifugal Pumps for Petroleum...',
      'ANSI/HI 9.6.1 (2024) — Guideline for NPSH Margin',
      'European Sealing Association — Mechanical Seal Reliability (2025)',
      'NR-13 (Portaria MTP 1.846/2022)',
      'SAE JA1011:2009 — critérios de aplicabilidade',
      'IEC 61511 — segurança funcional',
    ];
    const g = agrupaFontes(fontes);
    expect(g.normas).toEqual(fontes);
    expect(g.literatura).toEqual([]);
    expect(g.artigos).toEqual([]);
    expect(g.outros).toEqual([]);
  });

  it('literatura técnica: editora, edição, Handbook ou capítulo', () => {
    const fontes = [
      'Gülich — Centrifugal Pumps, 3ª ed. (2014, Springer), caps. 3–7 e 11',
      'Karassik et al., Pump Handbook, 4ª ed. (2008), caps. 2 e 12',
      'Moubray, RCM II (1997), caps. 6 e 7 — tarefas preventivas e preditivas',
      "Bloch — Pump User's Handbook: Life Extension (benchmarks de MTBF)",
      'Çengel & Boles — Thermodynamics: An Engineering Approach, 8ª ed., Tabela A-4',
      'Franc & Michel — Fundamentals of Cavitation (2004, Springer), cap. 8',
    ];
    const g = agrupaFontes(fontes);
    expect(g.literatura).toEqual(fontes);
    expect(g.normas).toEqual([]);
  });

  it('artigos e relatórios: periódico, título entre aspas ou ano entre parênteses', () => {
    const fontes = [
      'Rayleigh (1917) — On the pressure developed in a liquid..., Phil. Mag. 34',
      'Naude & Ellis (1961) — ASME J. Basic Engineering 83, p. 648–656 (microjato)',
      'Hattori, Maeda & Otobe (2004) — Wear 257 (dureza × resistência à cavitação)',
      '"A Review of Pump Cavitation Fault Detection Methods Based on Different Signals" — Processes (MDPI) 11(7):2007, 2023',
      'Suslick (1990) — Sonochemistry, Science 247 (temperaturas de colapso)',
      'Fraser (1981) — Recirculation in Centrifugal Pumps, ASME 81-WA/FE-6',
      'Nowlan & Heap (1978) — padrões de taxa de falha',
    ];
    const g = agrupaFontes(fontes);
    expect(g.artigos).toEqual(fontes);
    expect(g.literatura).toEqual([]);
  });

  it('outros: metodologia própria, fabricantes e o que não casa com as regras', () => {
    const fontes = [
      'PRO-MNT-001 Rev02 + IT-MNT-001 — metodologia própria dos dois frameworks',
      'ITT Goulds Pumps — página oficial do 3196 i-FRAME (gouldspumps.com/products/3196-i-frame)',
      'KSB Brasil — página oficial do produto Meganorm (ksb.com/pt-br)',
    ];
    const g = agrupaFontes(fontes);
    expect(g.outros).toEqual(fontes);
  });

  it('preserva a ordem original dentro de cada grupo e não perde nenhuma fonte', () => {
    const fontes = [
      'ISO 9906:2012 — Rotodynamic Pumps',
      'Gülich — Centrifugal Pumps, 3ª ed. (2014, Springer)',
      'Rayleigh (1917) — Phil. Mag. 34',
      'PRO-MNT-001 Rev02 — metodologia própria',
      'ASTM G32 — Cavitation Erosion Using Vibratory Apparatus',
    ];
    const g = agrupaFontes(fontes);
    const total = g.normas.length + g.literatura.length + g.artigos.length + g.outros.length;
    expect(total).toBe(fontes.length);
    expect(g.normas).toEqual([fontes[0], fontes[4]]);
  });

  it('GRUPOS_FONTES define a ordem canônica de exibição', () => {
    expect(GRUPOS_FONTES).toEqual(['normas', 'literatura', 'artigos', 'outros']);
  });
});
