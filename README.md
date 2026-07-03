# .reliabilitas — repositório do produto RELIABILITAS

> Única pasta do Vault versionada em Git/GitHub. Todo o restante do Vault é documentação pessoal do projeto e permanece offline (D19).

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `docs/` | Artefatos machine-readable do projeto (JSON, schemas, contratos). Espelhos legíveis em Markdown vivem no Vault (ex.: `DOCS_regras.json` ↔ `M02/DOCS_regras.md`) |
| `content/` | Conteúdo-semente do site: notas MD + frontmatter YAML, ingeridas no Postgres a cada build (D19). Estrutura por locale: `content/pt/...`, `content/en/...` |
| `assets/svg/` | Diagramas originais (anatomia em corte D18, curvas, grafos) |
| `assets/img/` | Fotos licenciadas e demais imagens (com registro de licença) |
| `learning/` | M04: JOURNAL.md, PROGRESS.md, DECISIONS.md, RETROSPECTIVES.md (documentação viva XP) |
| *(M04)* | Código da aplicação (Next.js) nasce na raiz no Módulo 04, com `CLAUDE.md` vivo, `bin/setup`, `bin/deploy` |

## Convenção (D22)

1. **Markdown sempre que possível** — qualquer artefato não-código nasce em MD.
2. Quando o formato precisar ser não-MD (JSON, CSV, SVG...), o arquivo canônico vive **aqui** e, se relevante para leitura, ganha **espelho Markdown no Vault**.
3. Em divergência, o arquivo canônico daqui prevalece; o espelho é regenerado.

*Criado em 2026-07-03 · M02*
