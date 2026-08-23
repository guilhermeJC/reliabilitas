import { describe, expect, it } from 'vitest';
import { widgetExtraDaNota } from '@/lib/widgets/registry';

// Aprofundamento (18/07, /improve-codebase-architecture): generaliza o
// registry da anatomia para os demais widgets — antes 2 `if`s hardcoded
// dentro de notas/[slug]/page.tsx (taxonomia×boolean, slug×boolean).
describe('widgetExtraDaNota — registro único, critérios preservados', () => {
  it('curva-hq entra por TAXONOMIA (família dinamicas) em handbook, não por slug', () => {
    const widget = widgetExtraDaNota({
      slug: 'bomba-centrifuga',
      taxonomia: ['adicao-de-energia', 'bombas', 'dinamicas'],
      ehHandbook: true,
      locale: 'pt',
    });
    expect(widget?.key).toBe('curva-hq');
    expect(widget?.apos).toBe('principio-de-funcionamento');
  });

  it('curva-hq também entra num slug DIFERENTE se for handbook com taxonomia dinamicas (critério é a família, não o slug)', () => {
    const widget = widgetExtraDaNota({
      slug: 'bomba-de-fluxo-misto', // hipotético — ainda não existe, mas o critério deve valer
      taxonomia: ['adicao-de-energia', 'bombas', 'dinamicas'],
      ehHandbook: true,
      locale: 'pt',
    });
    expect(widget?.key).toBe('curva-hq');
  });

  it('curva-hq NÃO entra em ficha de marca_modelo mesmo com taxonomia dinamicas (regressão real: goulds-3196 etc. carregam essa tag)', () => {
    const widget = widgetExtraDaNota({
      slug: 'goulds-3196',
      taxonomia: ['adicao-de-energia', 'bombas', 'dinamicas', 'bomba-centrifuga'],
      ehHandbook: false,
      locale: 'pt',
    });
    expect(widget).toBeNull();
  });

  it('curva-qp entra só no slug exato deslocamento-positivo, mesmo NÃO sendo handbook e fora da taxonomia dinamicas', () => {
    const widget = widgetExtraDaNota({
      slug: 'deslocamento-positivo',
      taxonomia: ['adicao-de-energia', 'bombas'],
      ehHandbook: false,
      locale: 'pt',
    });
    expect(widget?.key).toBe('curva-qp');
    expect(widget?.apos).toBeUndefined(); // sem apos = entra no fim da nota
  });

  it('nota sem widget registrado retorna null', () => {
    expect(
      widgetExtraDaNota({
        slug: 'cavitacao',
        taxonomia: ['adicao-de-energia', 'bombas'],
        ehHandbook: false,
        locale: 'pt',
      }),
    ).toBeNull();
  });

  it('primeira entrada que casar vence (ordem do registro importa)', () => {
    const widget = widgetExtraDaNota({
      slug: 'bomba-centrifuga',
      taxonomia: ['dinamicas'],
      ehHandbook: true,
      locale: 'pt',
    });
    expect(widget?.key).toBe('curva-hq');
  });
});

// DEV-120 (adversarial review 25/07) — a âncora do widget era uma string única
// com o slug PT ('principio-de-funcionamento'). Em inglês o heading é "Working
// principle" → id 'working-principle', então a página não achava a âncora e o
// widget da curva H-Q NÃO RENDERIZAVA em /en, em lugar nenhum, sem erro nem
// aviso. Os testes existentes não pegaram porque o registry era testado sem
// locale — o tipo agora exige locale, e estes testes cobrem os dois idiomas.
describe('widgetExtraDaNota — âncora por idioma (DEV-120)', () => {
  const bombaEm = (locale: 'pt' | 'en') => ({
    slug: 'bomba-centrifuga',
    taxonomia: ['bombas', 'dinamicas'],
    ehHandbook: true,
    locale,
  });

  it('resolve a âncora PT para o heading português', () => {
    expect(widgetExtraDaNota(bombaEm('pt'))?.apos).toBe('principio-de-funcionamento');
  });

  it('resolve a âncora EN para o heading inglês — era o bug', () => {
    expect(widgetExtraDaNota(bombaEm('en'))?.apos).toBe('working-principle');
  });

  it('o widget é selecionado nos DOIS idiomas (não some em /en)', () => {
    expect(widgetExtraDaNota(bombaEm('pt'))?.key).toBe('curva-hq');
    expect(widgetExtraDaNota(bombaEm('en'))?.key).toBe('curva-hq');
  });

  it('a âncora nunca é um slug do outro idioma', () => {
    expect(widgetExtraDaNota(bombaEm('en'))?.apos).not.toBe('principio-de-funcionamento');
  });

  it('widget sem âncora (curva-qp) segue sem âncora nos 2 idiomas', () => {
    for (const locale of ['pt', 'en'] as const) {
      const w = widgetExtraDaNota({
        slug: 'deslocamento-positivo',
        taxonomia: ['bombas'],
        ehHandbook: false,
        locale,
      });
      expect(w?.key).toBe('curva-qp');
      expect(w?.apos).toBeUndefined();
    }
  });
});
