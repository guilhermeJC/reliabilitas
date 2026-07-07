import type { Locale } from '@/lib/content/schema';
import type { NotaResumo } from '@/lib/db/notas';

// T01 — os 5 ativos do MVP na ordem de produção D07 (Bomba → Rolamento → Selo →
// Motor → Válvula). O slug planejado só vira link quando o handbook correspondente
// estiver PUBLICADO no acervo; até lá o card é "em breve" (nunca link morto).
// Handbooks publicados fora desta lista entram no fim — o acervo cresce sem
// mexer aqui.

export interface AtivoPlanejado {
  slug: string;
  titulo: Record<Locale, string>;
}

// Os 5 REAIS do M01.4 §3 (D01/D10): 3 equipamentos (tipo) + 2 componentes
// transversais — rolamento e selo são modelados UMA vez e referenciados pelos
// equipamentos-pai via wikilink (DRY taxonômico).
export const ATIVOS_MVP: AtivoPlanejado[] = [
  { slug: 'bomba-centrifuga', titulo: { pt: 'Bomba Centrífuga', en: 'Centrifugal Pump' } },
  { slug: 'rolamento', titulo: { pt: 'Rolamento', en: 'Rolling Bearing' } },
  { slug: 'selo-mecanico', titulo: { pt: 'Selo Mecânico', en: 'Mechanical Seal' } },
  {
    slug: 'motor-inducao-trifasico',
    titulo: { pt: 'Motor de Indução Trifásico', en: 'Three-Phase Induction Motor' },
  },
  { slug: 'valvula-de-controle', titulo: { pt: 'Válvula de Controle', en: 'Control Valve' } },
];

export interface CardAtivo {
  titulo: string;
  slug: string | null; // null = ainda não publicado ("em breve")
}

export function gridAtivos(acervo: NotaResumo[], locale: Locale): CardAtivo[] {
  const handbooks = new Map(
    // tipo (equipamento) E componente (D10) são "casas" de ativo; modo de falha não.
    acervo
      .filter((n) => n.tipo_nota === 'tipo' || n.tipo_nota === 'componente')
      .map((n) => [n.slug, n]),
  );

  const cards: CardAtivo[] = ATIVOS_MVP.map((ativo) => {
    const publicado = handbooks.get(ativo.slug);
    handbooks.delete(ativo.slug);
    return publicado
      ? { titulo: publicado.titulo, slug: publicado.slug }
      : { titulo: ativo.titulo[locale], slug: null };
  });

  for (const extra of handbooks.values()) {
    cards.push({ titulo: extra.titulo, slug: extra.slug });
  }
  return cards;
}
