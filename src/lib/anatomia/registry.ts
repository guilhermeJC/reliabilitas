// Registro de anatomias interativas por handbook (melhoria 2, 10/07): o
// handbook que tiver hotspots definidos ganha o componente interativo no
// lugar da imagem estática, injetado dentro da própria seção Anatomia.
// Handbooks futuros (Dia 4b) adicionam o próprio módulo de dados aqui.

import { HOTSPOTS_BOMBA_CENTRIFUGA, type Hotspot } from '@/lib/anatomia/bomba-centrifuga';

const REGISTRO: Record<string, Hotspot[]> = {
  'bomba-centrifuga': HOTSPOTS_BOMBA_CENTRIFUGA,
};

export function hotspotsPorSlug(slug: string): Hotspot[] | null {
  return REGISTRO[slug] ?? null;
}
