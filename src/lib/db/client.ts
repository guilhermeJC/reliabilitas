import 'server-only';
import { createClient } from '@supabase/supabase-js';

// D11/BR-004 — invariante: o banco só é tocado pelos módulos de src/lib/db, com
// service key, em código server-only. Jamais criar endpoint público que exponha
// estas funções; o visitante recebe exclusivamente o preload SSR da página.

export function admin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error('Supabase não configurado — defina SUPABASE_URL e SUPABASE_SECRET_KEY no .env');
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
