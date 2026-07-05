# Changelog

Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) · Versionamento: [SemVer](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added

- Fundação M04: scaffold Next.js 15 + TypeScript + Tailwind, CI de 4 estágios a cada commit (lint → audit → semgrep → testes → build), `bin/setup` e `bin/deploy` (`.ps1`/`.sh`), estrutura de learning journal (XP).
- Pipeline endurecido pós-review da Fase 0: frontmatter estrito com allowlist de `tags` (F7), 3 níveis de leitura validados no corpo (F8), coerência da cadeia taxonômica e das gêmeas de locale (F2), warning de wikilink para nota não publicada (F5), testes de RLS contra a instância viva no CI (F6).

### Changed

- Ingest grava via Postgres em transação única com reconciliação de notas removidas (F4/F1); `revisado_em` gravada e `atualizado_em` renovada no upsert (F10); nomenclatura única de chaves Supabase (F17); CI dispara push apenas em `main` (F18).

### Security

- Alvo de wikilink só vira `href` se for slug canônico — elimina injeção de atributo no render SSR (F3).
- Asserções de RLS afirmam o código `42501` nos três caminhos anon (F16); suíte falha em glob vazio (F9).
