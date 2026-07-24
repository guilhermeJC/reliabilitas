-- RELIABILITAS — 0007: 3 campos opcionais de identificação do autor no form
-- Colaborar (pedido do fundador, 24/07 — DEV-094, pivot pra projeto aberto
-- de comunidade). Nenhum é obrigatório (BR-011 continua valendo — só cresceu
-- o conjunto de campos pessoais OPCIONAIS). `contato_visibilidade` bundla
-- LinkedIn/site/o que a pessoa quer que apareça no byline público da nota —
-- é a própria pessoa quem escolhe o que fica visível, não é armazenamento
-- silencioso (ver Política de Privacidade, G3).

alter table public.contribuicoes
  add column if not exists formacao text check (formacao is null or char_length(formacao) <= 300),
  add column if not exists funcao_empresa text check (funcao_empresa is null or char_length(funcao_empresa) <= 200),
  add column if not exists contato_visibilidade text check (contato_visibilidade is null or char_length(contato_visibilidade) <= 500);
