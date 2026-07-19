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
    });
    expect(widget?.key).toBe('curva-hq');
    expect(widget?.apos).toBe('principio-de-funcionamento');
  });

  it('curva-hq também entra num slug DIFERENTE se for handbook com taxonomia dinamicas (critério é a família, não o slug)', () => {
    const widget = widgetExtraDaNota({
      slug: 'bomba-de-fluxo-misto', // hipotético — ainda não existe, mas o critério deve valer
      taxonomia: ['adicao-de-energia', 'bombas', 'dinamicas'],
      ehHandbook: true,
    });
    expect(widget?.key).toBe('curva-hq');
  });

  it('curva-hq NÃO entra em ficha de marca_modelo mesmo com taxonomia dinamicas (regressão real: goulds-3196 etc. carregam essa tag)', () => {
    const widget = widgetExtraDaNota({
      slug: 'goulds-3196',
      taxonomia: ['adicao-de-energia', 'bombas', 'dinamicas', 'bomba-centrifuga'],
      ehHandbook: false,
    });
    expect(widget).toBeNull();
  });

  it('curva-qp entra só no slug exato deslocamento-positivo, mesmo NÃO sendo handbook e fora da taxonomia dinamicas', () => {
    const widget = widgetExtraDaNota({
      slug: 'deslocamento-positivo',
      taxonomia: ['adicao-de-energia', 'bombas'],
      ehHandbook: false,
    });
    expect(widget?.key).toBe('curva-qp');
    expect(widget?.apos).toBeUndefined(); // sem apos = entra no fim da nota
  });

  it('nota sem widget registrado retorna null', () => {
    expect(
      widgetExtraDaNota({ slug: 'cavitacao', taxonomia: ['adicao-de-energia', 'bombas'], ehHandbook: false }),
    ).toBeNull();
  });

  it('primeira entrada que casar vence (ordem do registro importa)', () => {
    const widget = widgetExtraDaNota({ slug: 'bomba-centrifuga', taxonomia: ['dinamicas'], ehHandbook: true });
    expect(widget?.key).toBe('curva-hq');
  });
});
