-- RELIABILITAS — 0001: schema inicial (notas + arestas do grafo) com RLS deny-anon.
-- D11/BR-004: dados navegáveis nunca abertos. Nenhuma policy para anon/authenticated:
-- leitura exclusivamente via service role no servidor (rotas server-only).

create table if not exists public.notas (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  tipo_nota text not null check (tipo_nota in
    ('classe','familia','principio','tipo','marca_modelo','componente','modo_falha','estrategia')),
  locale text not null check (locale in ('pt','en')),
  titulo text not null,
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  taxonomia text[] not null default '{}',
  frontmatter jsonb not null,
  corpo_md text not null default '',
  fts tsvector generated always as (
    to_tsvector(
      case when locale = 'pt' then 'portuguese'::regconfig else 'english'::regconfig end,
      coalesce(titulo, '') || ' ' || coalesce(corpo_md, '')
    )
  ) stored,
  revisado_em date,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (slug, locale)
);

create index if not exists notas_fts_idx on public.notas using gin (fts);
create index if not exists notas_tipo_idx on public.notas (tipo_nota);
create index if not exists notas_status_idx on public.notas (status);
create index if not exists notas_taxonomia_idx on public.notas using gin (taxonomia);

create table if not exists public.arestas (
  id bigint generated always as identity primary key,
  origem_slug text not null,
  destino_slug text not null,
  locale text not null check (locale in ('pt','en')),
  tipo text not null check (tipo in ('wikilink','taxonomia','componente')),
  unique (origem_slug, destino_slug, locale, tipo)
);

create index if not exists arestas_destino_idx on public.arestas (destino_slug, locale);

-- RLS: habilitada SEM policies para anon/authenticated = negação total (D11).
alter table public.notas enable row level security;
alter table public.arestas enable row level security;

revoke all on table public.notas from anon, authenticated;
revoke all on table public.arestas from anon, authenticated;
