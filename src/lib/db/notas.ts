import 'server-only';
import { createClient } from '@supabase/supabase-js';
import type { Locale } from '@/lib/content/schema';

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
}

function admin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error('Supabase não configurado — defina SUPABASE_URL e SUPABASE_SECRET_KEY no .env');
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function getNota(slug: string, locale: Locale): Promise<Nota | null> {
  const { data, error } = await admin()
    .from('notas')
    .select('slug,tipo_nota,locale,titulo,status,taxonomia,frontmatter,corpo_md')
    .eq('slug', slug)
    .eq('locale', locale)
    .eq('status', 'published')
    .maybeSingle();
  if (error) throw new Error(`getNota(${slug}, ${locale}): ${error.message}`);
  return data as Nota | null;
}
