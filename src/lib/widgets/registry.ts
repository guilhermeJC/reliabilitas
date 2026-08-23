import type { Locale } from '@/lib/content/schema';
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
  // DEV-120: o locale entrou aqui porque a âncora `apos` é o ID de um heading,
  // e headings são TRADUZIDOS — ver AncoraPorLocale abaixo.
  locale: Locale;
}

// DEV-120 (adversarial review 25/07) — `apos` era uma string única com o slug
// PT ('principio-de-funcionamento'). Em inglês o heading é "Working principle"
// → id 'working-principle', então o findIndex da página não achava a âncora e o
// widget da curva H-Q simplesmente NÃO RENDERIZAVA em /en — em nenhum lugar,
// sem erro e sem aviso. Nenhum dos testes percebeu porque o registry era testado
// sem locale. A âncora agora é declarada por idioma.
export type AncoraPorLocale = Record<Locale, string>;

export interface WidgetExtra {
  key: WidgetKey;
  // Heading (id kebab-case) após o qual o widget entra, dividindo o corpo da
  // nota nesse ponto. Ausente = o widget entra no fim da nota, sem split.
  apos?: string;
}

interface EntradaRegistro {
  key: WidgetKey;
  quando: (nota: NotaParaWidget) => boolean;
  // Âncora por idioma — obrigatoriamente completa (Record<Locale, string>),
  // então um locale novo quebra o TYPECHECK em vez de sumir com o widget.
  ancora?: AncoraPorLocale;
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
    ancora: { pt: 'principio-de-funcionamento', en: 'working-principle' },
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
  if (!entrada) return null;
  return { key: entrada.key, apos: entrada.ancora?.[nota.locale] };
}
