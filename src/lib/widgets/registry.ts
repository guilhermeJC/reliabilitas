// Registro de widgets extras por nota (aprofundamento 18/07,
// /improve-codebase-architecture): generaliza o mesmo padrão de
// src/lib/anatomia/registry.ts (registry por slug, retornando DADO, não
// componente — o mesmo motivo pelo qual hotspotsPorSlug funciona bem: a
// lógica de SELEÇÃO é pura e testável em src/lib, o componente React em si
// é wiring trivial na página). Antes desta mudança, a seleção de widget
// vivia como 2 `if`s hardcoded dentro de notas/[slug]/page.tsx, cada um com
// um critério diferente (taxonomia×boolean, slug×boolean). Aqui os dois
// critérios continuam existindo — são intenções de produto genuinamente
// diferentes ("relevante pra toda a família hidráulica" × "relevante só
// para esta nota específica") — mas concentrados numa única lista, num
// único arquivo: widget novo = uma entrada aqui, não um novo `if` na página.
export type WidgetKey = 'curva-hq' | 'curva-qp';

export interface NotaParaWidget {
  slug: string;
  taxonomia: string[];
  ehHandbook: boolean;
}

export interface WidgetExtra {
  key: WidgetKey;
  // Heading (id kebab-case) após o qual o widget entra, dividindo o corpo da
  // nota nesse ponto. Ausente = o widget entra no fim da nota, sem split.
  apos?: string;
}

interface EntradaRegistro extends WidgetExtra {
  quando: (nota: NotaParaWidget) => boolean;
}

const REGISTRO: EntradaRegistro[] = [
  {
    // Curva H-Q viva (sessão 5): relevante para todo HANDBOOK de bomba
    // rotodinâmica, não só bomba-centrifuga — daí o critério ser a família
    // (taxonomia), não o slug. Restrito a handbooks (ehHandbook): fichas de
    // marca_modelo (goulds-3196, ksb-meganorm, ...) também carregam
    // 'dinamicas' na taxonomia mas nunca mostraram o widget.
    quando: (n) => n.ehHandbook && n.taxonomia.includes('dinamicas'),
    key: 'curva-hq',
    apos: 'principio-de-funcionamento',
  },
  {
    // Widget Q×P (sessão 8): comparativo específico desta nota de princípio,
    // não de uma família inteira — daí o critério ser o slug exato.
    quando: (n) => n.slug === 'deslocamento-positivo',
    key: 'curva-qp',
  },
];

export function widgetExtraDaNota(nota: NotaParaWidget): WidgetExtra | null {
  const entrada = REGISTRO.find((r) => r.quando(nota));
  return entrada ? { key: entrada.key, apos: entrada.apos } : null;
}
