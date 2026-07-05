-- RELIABILITAS — 0002: busca FTS de verdade (F13) + limpeza de índices especulativos (F19).
-- A coluna fts da 0001 era ingênua: titulo+corpo crus, sem pesos, sem unaccent e com
-- sintaxe markdown poluindo o índice. Aqui:
--   · configurações de busca com unaccent por locale (consulta sem acento casa com
--     documento acentuado; a exibição preserva acentos — ts_headline usa a MESMA config
--     sobre o texto original);
--   · pesos A/B/C: título > tags do frontmatter > corpo limpo de markdown;
--   · RPC busca_notas parametrizada (anti-SQLi por construção), limite 20 no SQL,
--     execução NEGADA a anon/authenticated (D11/BR-004 — só o service role consulta).

-- 1) unaccent + configurações por locale -------------------------------------------

create extension if not exists unaccent with schema public;

do $$
begin
  if not exists (select 1 from pg_ts_config where cfgname = 'pt_unaccent') then
    create text search configuration public.pt_unaccent (copy = pg_catalog.portuguese);
  end if;
  if not exists (select 1 from pg_ts_config where cfgname = 'en_unaccent') then
    create text search configuration public.en_unaccent (copy = pg_catalog.english);
  end if;
end $$;

alter text search configuration public.pt_unaccent
  alter mapping for hword, hword_part, word
  with public.unaccent, pg_catalog.portuguese_stem;

alter text search configuration public.en_unaccent
  alter mapping for hword, hword_part, word
  with public.unaccent, pg_catalog.english_stem;

-- 2) funções IMUTÁVEIS do índice (coluna gerada não aceita subquery nem STABLE) -----

-- tags do frontmatter (única extensão livre do contrato §E — insumo manual da busca)
create or replace function public.tags_texto(fm jsonb)
returns text
language sql immutable parallel safe
as $$
  select coalesce(
    (select string_agg(t.v, ' ')
       from jsonb_array_elements_text(coalesce(fm->'tags', '[]'::jsonb)) as t(v)),
    ''
  )
$$;

-- corpo markdown → texto indexável: code fences inteiros FORA (código não é prosa),
-- wikilink indexa o rótulo e descarta o alvo (slug é chave técnica, não termo de busca),
-- marcas estruturais removidas. Hífen fica: "P-F" e compostos são termos reais.
create or replace function public.md_para_texto(md text)
returns text
language sql immutable parallel safe
as $$
  select regexp_replace(
    regexp_replace(
      regexp_replace(
        regexp_replace(coalesce(md, ''), '```.*?```', ' ', 'g'),
        '\[\[([^\]|]+)\|([^\]]+)\]\]', '\2', 'g'),
      '\[\[([^\]|]+)\]\]', '\1', 'g'),
    '[#*_`>|]+', ' ', 'g')
$$;

-- 3) coluna fts recriada com pesos (expressão de coluna gerada não pode ser alterada:
--    drop + add; os valores recalculam sozinhos no rewrite) ------------------------

alter table public.notas drop column if exists fts;

alter table public.notas add column fts tsvector generated always as (
  setweight(to_tsvector(
    case when locale = 'pt' then 'public.pt_unaccent'::regconfig
         else 'public.en_unaccent'::regconfig end,
    coalesce(titulo, '')), 'A')
  || setweight(to_tsvector(
    case when locale = 'pt' then 'public.pt_unaccent'::regconfig
         else 'public.en_unaccent'::regconfig end,
    public.tags_texto(frontmatter)), 'B')
  || setweight(to_tsvector(
    case when locale = 'pt' then 'public.pt_unaccent'::regconfig
         else 'public.en_unaccent'::regconfig end,
    public.md_para_texto(coalesce(corpo_md, ''))), 'C')
) stored;

create index if not exists notas_fts_idx on public.notas using gin (fts);

-- 4) F19: índices especulativos sem consumidor --------------------------------------

drop index if exists public.notas_tipo_idx;
drop index if exists public.notas_status_idx;

-- 5) RPC de busca — parametrizada, só published, limite 20, ranking por peso ---------

create or replace function public.busca_notas(q text, loc text, deslocamento integer default 0)
returns table (slug text, tipo_nota text, titulo text, taxonomia text[], trecho text)
language sql stable parallel safe
as $$
  with cfg as (
    select case when loc = 'pt' then 'public.pt_unaccent'::regconfig
                else 'public.en_unaccent'::regconfig end as c
  ),
  consulta as (
    select websearch_to_tsquery((select c from cfg), q) as tsq
  )
  select n.slug, n.tipo_nota, n.titulo, n.taxonomia,
         ts_headline(
           (select c from cfg),
           public.md_para_texto(n.corpo_md),
           (select tsq from consulta),
           'StartSel=<mark>, StopSel=</mark>, MaxWords=32, MinWords=12, MaxFragments=1'
         ) as trecho
    from public.notas n
   where n.locale = loc
     and n.status = 'published'
     and n.fts @@ (select tsq from consulta)
   order by ts_rank(n.fts, (select tsq from consulta)) desc, n.titulo asc
   limit 20 offset greatest(coalesce(deslocamento, 0), 0);
$$;

-- D11: função nasce fechada — EXECUTE só para o service role (o default PUBLIC é revogado).
revoke execute on function public.busca_notas(text, text, integer)
  from public, anon, authenticated;
grant execute on function public.busca_notas(text, text, integer) to service_role;

-- PostgREST (Supabase) recarrega o schema para enxergar a RPC imediatamente.
notify pgrst, 'reload schema';
