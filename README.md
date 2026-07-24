# RELIABILITAS

**Profissionais de manutenção e confiabilidade não têm onde consultar — de graça, em PT e EN, com rigor citado — o que é uma falha, como detectá-la, que estratégia de manutenção usar e qual a matemática por trás, equipamento por equipamento.** O conhecimento existe, mas está preso em livros caros, normas pagas e plataformas enterprise fechadas.

O RELIABILITAS é esse lugar: um handbook digital de engenharia de confiabilidade — navegável como um grafo (wikilinks, backlinks, taxonomia ISO 14224), em três profundidades de leitura (Entender / Aplicar / Dominar) e com o método visível: todo modo de falha carrega o diagnóstico (Framework A — padrão de taxa de falha, Nowlan & Heap) e a prescrição (Framework B — lógica de decisão RCM, SAE JA1011/Moubray), com calculadoras ao vivo validadas contra a literatura.

**Gratuito para pessoas, para sempre.** Projeto aberto, mantido por doações — sem plano de monetização via API paga ou dados fechados. Código sob MIT (`LICENSE`), conteúdo editorial sob CC BY-SA 4.0 (`LICENSE-CONTENT.md`): qualquer pessoa pode ler, reusar e adaptar, desde que credite e mantenha a mesma licença aberta.

## O que é / o que não é

| É                                                        | Não é                               |
| -------------------------------------------------------- | ----------------------------------- |
| Referência técnica curada, com fontes primárias citadas  | CMMS, software de FMEA ou preditivo |
| Handbook por equipamento + modos de falha + planos       | Fórum ou comunidade (isso é Fase 3) |
| Calculadoras de confiabilidade (Weibull, MTBF/MTTR, P-F) | Repositório de PDFs de terceiros    |
| Conteúdo aberto, com contribuição da comunidade (curada) | Produto fechado ou proprietário     |

## Rodando localmente

```powershell
# Windows
.\bin\setup.ps1
```

```bash
# Linux/macOS
./bin/setup.sh
```

Um comando: instala dependências, cria `.env` a partir do exemplo (preencha as credenciais Supabase) e roda a suíte de verificação. Depois: `npm run dev`.

## Como funciona (arquitetura em uma linha)

Curador escreve notas Markdown + frontmatter YAML em `content/` → CI valida frontmatter, cadeia taxonômica e wikilinks (build falha se inválido) → ingest grava no Supabase Postgres (JSONB + FTS + RLS) → Next.js SSR/ISR serve página a página. Detalhes de engenharia: `CLAUDE.md` (spec viva).

## Estrutura

| Pasta       | Conteúdo                                                                                                         |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| `src/`      | Aplicação Next.js 15 (App Router) + bibliotecas de conteúdo/ingest                                               |
| `content/`  | Notas-semente MD+YAML por locale (`content/pt/...`, `content/en/...`)                                            |
| `data/`     | Migrations SQL do Postgres (schema, RLS)                                                                         |
| `tests/`    | Suíte Vitest (unit + integração)                                                                                 |
| `scripts/`  | Pipeline de ingest e utilitários de banco                                                                        |
| `bin/`      | `setup` e `deploy` — um comando cada, `.ps1` + `.sh`                                                             |
| `assets/`   | SVGs originais (anatomia D18) e imagens licenciadas                                                              |
| `learning/` | Journal de desenvolvimento (XP) — **local-only, gitignored** (anotações internas, não faz parte do repo público) |
| `docs/`     | Documentos fundadores — **local-only, gitignored** (ver `docs/README.md`)                                        |

## Princípios de engenharia

TDD sempre (test-first, ratio teste/código ≥ 1.0) · CI a cada commit (lint → audit → security scan → testes → build) · cada commit em `main` é production-ready · calculadoras validadas contra exemplos da literatura (Smith, Moubray) · segurança desde o commit #0 (RLS, headers, rate limit).

Desenvolvido com o auxílio do [Claude Code](https://claude.com/claude-code) (Anthropic) como ferramenta de par de programação — as decisões técnicas e de produto são do mantenedor.

## Licença

Código: MIT (`LICENSE`). Conteúdo em `content/`: CC BY-SA 4.0 (`LICENSE-CONTENT.md`).

## Contribuindo

Toda contribuição de conteúdo é curada — veja "Colaborar" no site. Correções técnicas: "Sugerir correção" em qualquer página. Termos completos: `/termos` no site publicado.

---

_Deploy alvo: 27/07/2026 em reliabilitas.io._
