-- RELIABILITAS — 0003: sugestões de correção (T09/G4 — a ÚNICA superfície de
-- escrita do MVP). RLS deny-anon como nas demais tabelas: o INSERT acontece
-- exclusivamente na rota server-side com service role, depois de zod + honeypot
-- + rate limit. Sem dados pessoais obrigatórios (BR-011): contato é opcional.

create table if not exists public.sugestoes (
  id bigint generated always as identity primary key,
  criado_em timestamptz not null default now(),
  locale text not null check (locale in ('pt', 'en')),
  pagina text not null check (char_length(pagina) <= 300),
  mensagem text not null check (char_length(mensagem) between 10 and 2000),
  contato text check (contato is null or char_length(contato) <= 200),
  status text not null default 'nova' check (status in ('nova', 'lida', 'resolvida'))
);

alter table public.sugestoes enable row level security;
revoke all on table public.sugestoes from anon, authenticated;

notify pgrst, 'reload schema';
