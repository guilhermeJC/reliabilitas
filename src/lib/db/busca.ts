import 'server-only';
import { admin } from '@/lib/db/client';
import type { Locale } from '@/lib/content/schema';
import { RESULTADOS_POR_PAGINA } from '@/lib/busca';

// F04/T05 — busca server-only via RPC busca_notas (migration 0002): parametrizada
// por construção, só published, LIMIT 20 no SQL, EXECUTE negado a anon (D11).

export interface ResultadoBusca {
  slug: string;
  tipo_nota: string;
  titulo: string;
  taxonomia: string[];
  trecho: string;
}

export async function buscar(
  termo: string,
  locale: Locale,
  pagina: number,
): Promise<ResultadoBusca[]> {
  const { data, error } = await admin().rpc('busca_notas', {
    q: termo,
    loc: locale,
    deslocamento: (pagina - 1) * RESULTADOS_POR_PAGINA,
  });
  if (error) throw new Error(`buscar(${termo}, ${locale}): ${error.message}`);
  return (data ?? []) as ResultadoBusca[];
}
