-- RELIABILITAS — 0008: campos de identificação do autor unificados entre
-- Sugerir correção (public.sugestoes) e Colaborar (public.contribuicoes) —
-- pedido do fundador, 25/07/2026. Antes, só contribuicoes tinha
-- formacao/funcao_empresa (0007) e um campo de texto livre
-- (contato_visibilidade) descrevendo o que mostrar publicamente. Agora as
-- duas tabelas têm o MESMO conjunto: nome, formacao, funcao_empresa,
-- linkedin_site — todos opcionais (BR-011) — mais 2 booleans explícitos:
-- deseja_contribuidor (quer ser registrado como contribuidor — crédito
-- interno pro curador) e mostrar_publicamente (autoriza esses dados
-- aparecerem no byline público da nota, se publicada). `contato_visibilidade`
-- é removida: sem dado real de produção até aqui (site recém lançado), sem
-- necessidade de preservação histórica de um campo de texto livre substituído
-- por um mecanismo mais explícito.

alter table public.sugestoes
  add column if not exists nome text check (nome is null or char_length(nome) <= 150),
  add column if not exists formacao text check (formacao is null or char_length(formacao) <= 300),
  add column if not exists funcao_empresa text check (funcao_empresa is null or char_length(funcao_empresa) <= 200),
  add column if not exists linkedin_site text check (linkedin_site is null or char_length(linkedin_site) <= 300),
  add column if not exists deseja_contribuidor boolean not null default false,
  add column if not exists mostrar_publicamente boolean not null default false;

alter table public.contribuicoes
  add column if not exists nome text check (nome is null or char_length(nome) <= 150),
  add column if not exists linkedin_site text check (linkedin_site is null or char_length(linkedin_site) <= 300),
  add column if not exists deseja_contribuidor boolean not null default false,
  add column if not exists mostrar_publicamente boolean not null default false;

alter table public.contribuicoes
  drop column if exists contato_visibilidade;

notify pgrst, 'reload schema';
