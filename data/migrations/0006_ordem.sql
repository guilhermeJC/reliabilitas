-- RELIABILITAS — 0006: campo `ordem` opcional para posicionamento manual de
-- irmãos na árvore lateral (pedido do fundador, 18/07 — ex.: Bombas
-- Rotodinâmicas antes de Deslocamento Positivo antes de Efeito Especial).
-- Ausente = fallback alfabético por título (tree.ts). Não precisa de índice:
-- só é lido em memória para ordenar filhos já filtrados pelo slug do pai.

alter table public.notas add column if not exists ordem integer;
