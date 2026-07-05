import 'server-only';
import { createClient } from '@supabase/supabase-js';
import type { Locale } from '@/lib/content/schema';
import { classificaNotaView } from '@/lib/content/nota-view';

// D11/BR-004 — invariante: o banco só é tocado AQUI, com service key, em código
// server-only. Jamais criar endpoint público que exponha estas funções; o visitante
// recebe exclusivamente o preload SSR da página.

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
}

export type NotaView =
  | { estado: 'published'; nota: Nota }
  | { estado: 'archived'; nota: null }
  | { estado: 'missing'; nota: null };

function admin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error('Supabase não configurado — defina SUPABASE_URL e SUPABASE_SECRET_KEY no .env');
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

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
    .select('slug,tipo_nota,titulo,taxonomia')
    .eq('locale', locale)
    .eq('status', 'published')
    .order('titulo');
  if (error) throw new Error(`listPublicadas(${locale}): ${error.message}`);
  return (data ?? []) as NotaResumo[];
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
