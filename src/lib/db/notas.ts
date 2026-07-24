import 'server-only';
import type { Locale } from '@/lib/content/schema';
import { classificaNotaView } from '@/lib/content/nota-view';
import type { NotaComFontes } from '@/lib/content/normas-index';
import { admin } from '@/lib/db/client';

// D11/BR-004 — invariante do acesso a dados: ver src/lib/db/client.ts.

export interface Nota {
  slug: string;
  tipo_nota: string;
  locale: string;
  titulo: string;
  status: string;
  taxonomia: string[];
  frontmatter: Record<string, unknown>;
  corpo_md: string;
  revisado_em: string | null;
}

export interface NotaResumo {
  slug: string;
  tipo_nota: string;
  titulo: string;
  taxonomia: string[];
  ordem?: number | null;
}

export type NotaView =
  | { estado: 'published'; nota: Nota }
  | { estado: 'archived'; nota: null }
  | { estado: 'missing'; nota: null };

// F15: archived é distinguido de inexistente; draft/review respondem como missing.
export async function getNotaView(slug: string, locale: Locale): Promise<NotaView> {
  const { data, error } = await admin()
    .from('notas')
    .select('slug,tipo_nota,locale,titulo,status,taxonomia,frontmatter,corpo_md,revisado_em')
    .eq('slug', slug)
    .eq('locale', locale)
    .maybeSingle();
  if (error) throw new Error(`getNotaView(${slug}, ${locale}): ${error.message}`);
  const estado = classificaNotaView(data);
  if (estado === 'published') return { estado, nota: data as Nota };
  return { estado, nota: null };
}

// Acervo publicado do locale — insumo da árvore taxonômica, breadcrumb e índices.
export async function listPublicadas(locale: Locale): Promise<NotaResumo[]> {
  const { data, error } = await admin()
    .from('notas')
    .select('slug,tipo_nota,titulo,taxonomia,ordem')
    .eq('locale', locale)
    .eq('status', 'published')
    .order('titulo');
  if (error) throw new Error(`listPublicadas(${locale}): ${error.message}`);
  return (data ?? []) as NotaResumo[];
}

// T07 (resto do Dia 5): insumo do índice de normas — só slug/titulo/fontes,
// direto do frontmatter (JSONB). A classificação/agregação é lógica pura em
// src/lib/content/normas-index.ts (montaIndiceNormas), testada lá.
export async function listFontesPublicadas(locale: Locale): Promise<NotaComFontes[]> {
  const { data, error } = await admin()
    .from('notas')
    .select('slug,titulo,frontmatter')
    .eq('locale', locale)
    .eq('status', 'published');
  if (error) throw new Error(`listFontesPublicadas(${locale}): ${error.message}`);
  return (data ?? []).map((n) => ({
    slug: n.slug as string,
    titulo: n.titulo as string,
    fontes:
      ((n.frontmatter as Record<string, unknown> | null)?.fontes as string[] | undefined) ?? [],
  }));
}

// Grafo local (Dia 3): TODAS as arestas tocando a nota, nos dois sentidos.
// Duas queries .eq parametrizadas (nunca montar filtro .or com string do URL).
export interface ArestaNota {
  origem_slug: string;
  destino_slug: string;
  tipo: string;
}

export async function getArestasDaNota(slug: string, locale: Locale): Promise<ArestaNota[]> {
  const db = admin();
  const [saida, entrada] = await Promise.all([
    db
      .from('arestas')
      .select('origem_slug,destino_slug,tipo')
      .eq('origem_slug', slug)
      .eq('locale', locale),
    db
      .from('arestas')
      .select('origem_slug,destino_slug,tipo')
      .eq('destino_slug', slug)
      .eq('locale', locale),
  ]);
  if (saida.error) throw new Error(`getArestasDaNota(${slug}): ${saida.error.message}`);
  if (entrada.error) throw new Error(`getArestasDaNota(${slug}): ${entrada.error.message}`);
  return [...(saida.data ?? []), ...(entrada.data ?? [])] as ArestaNota[];
}

// Backlinks: quem aponta para esta nota (arestas de wikilink/componente — D16).
export async function getBacklinks(slug: string, locale: Locale): Promise<NotaResumo[]> {
  const db = admin();
  const arestas = await db
    .from('arestas')
    .select('origem_slug')
    .eq('destino_slug', slug)
    .eq('locale', locale);
  if (arestas.error) throw new Error(`getBacklinks(${slug}): ${arestas.error.message}`);
  const origens = [...new Set((arestas.data ?? []).map((a) => a.origem_slug))];
  if (origens.length === 0) return [];
  const notas = await db
    .from('notas')
    .select('slug,tipo_nota,titulo,taxonomia')
    .in('slug', origens)
    .eq('locale', locale)
    .eq('status', 'published')
    .order('titulo');
  if (notas.error) throw new Error(`getBacklinks(${slug}): ${notas.error.message}`);
  return (notas.data ?? []) as NotaResumo[];
}
