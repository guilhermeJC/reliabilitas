-- RELIABILITAS — 0005: contribuições de conteúdo novo ("Colaborar", pedido do
-- fundador 11/07). 2ª superfície de escrita do MVP, mesmo padrão de RLS do
-- T09 (0003_sugestoes.sql): deny-anon total, INSERT só server-side com service
-- role, depois de honeypot + rate limit + zod. Aprovar NÃO publica direto
-- (AFC do fundador): o conteúdo aceito ainda passa pelo fluxo editorial
-- Git→CI→ingest de sempre (DEV-024) — 'aceita' é só triagem.

create table if not exists public.contribuicoes (
  id bigint generated always as identity primary key,
  criado_em timestamptz not null default now(),
  locale text not null check (locale in ('pt', 'en')),
  tipo_nota text not null check (
    tipo_nota in ('tipo', 'marca_modelo', 'componente', 'modo_falha', 'estrategia')
  ),
  taxonomia_pai text not null check (char_length(taxonomia_pai) <= 100),
  titulo_sugerido text not null check (char_length(titulo_sugerido) between 3 and 200),
  resumo text check (resumo is null or char_length(resumo) <= 500),
  corpo_md text not null check (char_length(corpo_md) between 50 and 20000),
  contato text check (contato is null or char_length(contato) <= 200),
  status text not null default 'nova' check (status in ('nova', 'lida', 'aceita', 'rejeitada'))
);

alter table public.contribuicoes enable row level security;
revoke all on table public.contribuicoes from anon, authenticated;

notify pgrst, 'reload schema';
