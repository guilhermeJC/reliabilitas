# docs/ — documentos fundadores (LOCAL-ONLY)

> ⚠️ Esta pasta é **ignorada pelo Git** (exceto este README). Contém os documentos fundadores do projeto — informação estratégica sensível que NÃO vai para o GitHub (D28).

**Fonte canônica:** Obsidian Vault do fundador (`D - RELIABILITAS/`).
**Após clonar o repo**, copie os documentos manualmente do Vault ou de outra cópia local:

```
xcopy "C:\Users\Administrador\OneDrive - FEI\Documents\Obsidian Vault\2.1. PROJECTS\D - RELIABILITAS\.reliabilitas\docs" "C:\dev\reliabilitas\docs" /E /Y
```

## Estrutura (por categoria, em ordem de leitura)

| Pasta | Categoria | Arquivos |
|---|---|---|
| `01-spec/` | Especificação, decisões e regras | `PROJECT_SPEC.md` (v1.6) · `DECISOES_D01-D29.md` (registro-mestre) · `DOCS_regras.json` (13 regras hard BR-001–BR-013) |
| `02-base-tecnica/` | Base técnica: roadmap, SDD F01–F08, stack, arquitetura, schema de frontmatter (§E) | `DOCS_base.md` |
| `03-design/` | Design congelado: direção estética + 11 telas | `DESIGN_wireframe.md` |
| `04-negocio/` | Modelo de negócio (M03, D23–D27) | `DOCS_modelo_negocio.md` |
| `05-metodologia/` | Base metodológica dos dois frameworks (Fw A/B) | `PRO-MNT-001_Rev02_Dois_Frameworks.md` · `IT-MNT-001_Classificacao_Padroes_de_Falha.md` |
| `06-conteudo/` | Trilho de conteúdo: biblioteca de fontes + modos de falha candidatos por ativo | `FONTES_E_MODOS_por_ativo.md` |
| `07-desenvolvimento/` | Handoff do M04 | `M04_Kickoff_Handoff.md` |

A mesma estrutura é espelhada na cópia do Vault (`.reliabilitas/docs/`); em divergência, o Vault é o canônico (D28/D22).
