-- RELIABILITAS — 0004: FECHA a tabela public.schema_migrations (achado do
-- Supabase Advisor em 06/07/2026 — 'rls_disabled_in_public').
--
-- A schema_migrations é criada pelo próprio scripts/db-apply.ts (não por
-- migração) para levantar o histórico antes da 1ª migração — e nasceu SEM
-- RLS, virando a única brecha do MVP contra D11/BR-004. Esta migração
-- aplica o mesmo padrão das demais tabelas (deny-anon total): RLS habilitada
-- sem policies para anon/authenticated + REVOKE explícito.

alter table public.schema_migrations enable row level security;
revoke all on table public.schema_migrations from anon, authenticated;

notify pgrst, 'reload schema';
