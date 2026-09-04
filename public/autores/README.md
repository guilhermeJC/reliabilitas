# Fotos de autores contribuidores

Destino dos assets referenciados por `autor.foto` no frontmatter das notas
(DEV-128). O schema (`src/lib/content/schema.ts`) só aceita o padrão
`/autores/<slug>.jpg|jpeg|png|webp` — nunca hotlink de terceiros (BR-003).

Regras:

- A foto do CURADOR não vive aqui: é `/sobre/guilherme.jpg`, referenciada por
  `FOTO_FUNDADOR` em `src/lib/contato.ts` (autor padrão do acervo).
- Só publique a foto de um contribuidor que marcou `mostrarPublicamente`
  no formulário de contribuição (BR-011 — consentimento explícito).
- Sem foto o byline não quebra: cai no avatar de iniciais.
- Otimize antes de commitar (a foto do curador tem 26 KB; ver DEV-112, que
  cortou os QR Codes de 920 KB para 35 KB).
