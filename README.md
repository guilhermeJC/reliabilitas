# RELIABILITAS

**Profissionais de manutenção e confiabilidade não têm onde consultar — de graça, em PT e EN, com rigor citado — o que é uma falha, como detectá-la, que estratégia de manutenção usar e qual a matemática por trás, equipamento por equipamento.** O conhecimento existe, mas está preso em livros caros, normas pagas e plataformas enterprise fechadas.

O RELIABILITAS é esse lugar: um handbook digital de engenharia de confiabilidade — navegável como um grafo (wikilinks, backlinks, taxonomia ISO 14224), em três profundidades de leitura (Entender / Aplicar / Dominar) e com o método visível: todo modo de falha carrega o diagnóstico (Framework A — padrão de taxa de falha, Nowlan & Heap) e a prescrição (Framework B — lógica de decisão RCM, SAE JA1011/Moubray), com calculadoras ao vivo validadas contra a literatura.

**Gratuito para pessoas, para sempre.** Projeto aberto, mantido por doações — sem plano de monetização via API paga ou dados fechados. Código sob MIT (`LICENSE`), conteúdo editorial sob CC BY-SA 4.0 (`LICENSE-CONTENT.md`): qualquer pessoa pode ler, reusar e adaptar, desde que credite e mantenha a mesma licença aberta.

🌐 **[reliabilitas.com](https://reliabilitas.com)**

## O que é / o que não é

| É                                                        | Não é                               |
| -------------------------------------------------------- | ----------------------------------- |
| Referência técnica curada, com fontes primárias citadas  | CMMS, software de FMEA ou preditivo |
| Handbook por equipamento + modos de falha + planos       | Fórum ou comunidade (isso é Fase 3) |
| Calculadoras de confiabilidade (Weibull, MTBF/MTTR, P-F) | Repositório de PDFs de terceiros    |
| Conteúdo aberto, com contribuição da comunidade (curada) | Produto fechado ou proprietário     |

## Estado atual

|         |                                                     |
| ------- | --------------------------------------------------- |
| Acervo  | 124 notas (62 PT + 62 EN) · 324 arestas de grafo    |
| Suíte   | 486 testes (unit + integração) · 5 cenários E2E     |
| Banco   | Postgres com RLS negando `anon` em todas as tabelas |
| Idiomas | PT e EN, com URLs próprias por locale               |

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

Notas Markdown + frontmatter YAML em `content/` → CI valida frontmatter, cadeia taxonômica e wikilinks (o build falha se algo estiver inválido) → `npm run ingest` grava no Supabase Postgres (JSONB + FTS + RLS) → Next.js App Router serve a página no servidor.

Duas consequências dessa arquitetura que valem saber: **publicar conteúdo e publicar código são canais independentes** (o ingest não passa pelo deploy), e **nenhuma credencial de banco chega ao navegador** — o acesso ao Postgres vive em módulos `server-only`, e o visitante recebe apenas o HTML renderizado.

## Estrutura

| Pasta       | Conteúdo                                                                      |
| ----------- | ----------------------------------------------------------------------------- |
| `src/`      | Aplicação Next.js 15 (App Router) + bibliotecas de conteúdo, cálculo e ingest |
| `content/`  | Notas em Markdown + YAML por locale (`content/pt/…`, `content/en/…`)          |
| `data/`     | Migrations SQL do Postgres (schema, RLS, busca)                               |
| `tests/`    | Suíte Vitest (unit + integração) e cenários Playwright em `tests/e2e/`        |
| `scripts/`  | Pipeline de ingest e utilitários de banco                                     |
| `bin/`      | `setup` e `deploy` — um comando cada, `.ps1` + `.sh`                          |
| `public/`   | SVGs de anatomia, imagens licenciadas e demais assets estáticos               |
| `messages/` | Strings de interface por idioma (next-intl)                                   |

Documentos internos de trabalho (especificação, decisões e journal de desenvolvimento) ficam fora do repositório público — ver `docs/README.md`.

## Princípios de engenharia

Test-first sempre (a suíte cresce junto com o código) · CI a cada commit, com o deploy travado atrás dele: build vermelho não publica · calculadoras validadas contra exemplos da literatura (Smith, Moubray) antes de virarem interface · segurança desde o primeiro commit — RLS negando acesso anônimo, headers de segurança, CSP com nonce por requisição, rate limit nas rotas de escrita.

## Licença

Código: MIT (`LICENSE`). Conteúdo em `content/`: CC BY-SA 4.0 (`LICENSE-CONTENT.md`).

## Contribuindo

Toda contribuição de conteúdo é curada — veja "Colaborar" no site. Correções técnicas: "Sugerir correção" em qualquer página. Termos completos em [reliabilitas.com/pt/termos](https://reliabilitas.com/pt/termos).

---

_Mantido por Guilherme Joaquim Correia — engenheiro mecânico (CREA-SP). No ar desde 04/09/2026._
