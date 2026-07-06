# Changelog

Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) · Versionamento: [SemVer](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added

- Busca FTS ponderada (Dia 3): coluna `fts` com pesos título > tags > corpo, configurações `pt/en_unaccent` (consulta sem acento), strip de markdown do índice e RPC `busca_notas` parametrizada com EXECUTE negado a anon; página `/busca` (T05) com form GET puro, trecho destacado e empty state; campo de busca no header.
- Home real (T01): hero navy com busca central, grid dos 5 ativos do MVP (ordem D07 — publicado linka, ausente "em breve"), bloco do método Fw A→B e apoio condicionado aos links de doação.
- 3 calculadoras de confiabilidade (BR-012), validadas contra a literatura em teste antes da UI: Weibull 2P (R(t), h(t), MTTF via Γ-Lanczos, B10, leitura Fw A ao vivo pelo β), MTBF/MTTR/Disponibilidade e intervalo P-F; página `/calculadoras` indexável e Weibull embutida no nível Engineer do T03; slider shadcn vendorizado sobre Radix + curvas Recharts, 100% client-side.
- Export do plano de manutenção da página atual (F02/BR-004): CSV (separador `;`, BOM UTF-8, guarda anti CSV-injection) e Markdown, gerados no client via Blob — nenhum endpoint novo.
- Grafo local da nota em SVG próprio (layout radial determinístico), nós clicáveis com paleta própria.
- KaTeX server-side no corpo da nota: `$...$` inline (cifrão sem espaço encostado — moeda imune) e `$$...$$` bloco, `trust:false`/`throwOnError:false`; fórmula NPSH da nota-semente convertida como exemplo canônico da convenção.
- Fundação M04: scaffold Next.js 15 + TypeScript + Tailwind, CI de 4 estágios a cada commit (lint → audit → semgrep → testes → build), `bin/setup` e `bin/deploy` (`.ps1`/`.sh`), estrutura de learning journal (XP).
- Pipeline endurecido pós-review da Fase 0: frontmatter estrito com allowlist de `tags` (F7), 3 níveis de leitura validados no corpo (F8), coerência da cadeia taxonômica e das gêmeas de locale (F2), warning de wikilink para nota não publicada (F5), testes de RLS contra a instância viva no CI (F6).

### Changed

- Ingest grava via Postgres em transação única com reconciliação de notas removidas (F4/F1); `revisado_em` gravada e `atualizado_em` renovada no upsert (F10); nomenclatura única de chaves Supabase (F17); CI dispara push apenas em `main` (F18).

### Security

- Alvo de wikilink só vira `href` se for slug canônico — elimina injeção de atributo no render SSR (F3).
- Asserções de RLS afirmam o código `42501` nos três caminhos anon (F16); suíte falha em glob vazio (F9).
