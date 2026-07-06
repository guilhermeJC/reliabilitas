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

export const ATIVOS_MVP: AtivoPlanejado[] = [
  { slug: 'bomba-centrifuga', titulo: { pt: 'Bomba Centrífuga', en: 'Centrifugal Pump' } },
  { slug: 'rolamento', titulo: { pt: 'Rolamento', en: 'Rolling Bearing' } },
  { slug: 'selo-mecanico', titulo: { pt: 'Selo Mecânico', en: 'Mechanical Seal' } },
  { slug: 'motor-eletrico', titulo: { pt: 'Motor Elétrico', en: 'Electric Motor' } },
  { slug: 'valvula', titulo: { pt: 'Válvula', en: 'Valve' } },
];

export interface CardAtivo {
  titulo: string;
  slug: string | null; // null = ainda não publicado ("em breve")
}

export function gridAtivos(acervo: NotaResumo[], locale: Locale): CardAtivo[] {
  const handbooks = new Map(
    acervo.filter((n) => n.tipo_nota === 'tipo').map((n) => [n.slug, n]),
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
