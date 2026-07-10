---
slug: rtf
tipo_nota: estrategia
locale: pt
titulo: 'RTF — Run-to-Failure'
status: published
taxonomia: []
resumo: 'Operar até falhar — uma DECISÃO de engenharia, não uma omissão: válida para falha aleatória sem P-F e consequência tolerável, sempre com spares gerenciados.'
fontes:
  - 'Moubray, RCM II (1997), cap. 9 — Other Default Actions'
  - 'Nowlan & Heap (1978) — a preventiva não reduz falha aleatória'
  - 'PRO-MNT-001 Rev02 §5.2 — crivo de decisão'
tags:
  - corretiva planejada
  - spares
  - redesenho
revisado_em: 2026-07-10
---

## O que é

**Run-to-Failure**: a decisão deliberada de **operar o item até a falha funcional** e então corrigi-lo — com sobressalente na prateleira, procedimento de troca pronto e a consequência da falha aceita de antemão. É a **corretiva planejada**; o oposto da corretiva por surpresa.

## Quando é a decisão certa (Framework B)

Duas condições simultâneas:

1. **Falha aleatória sem P-F** — β ≈ 1 (nenhuma idade que justifique [[tbm|TBM]]) **e** nenhum sinal monitorável que antecipe a falha (nenhuma janela para [[cbm|CBM]]). O exemplo canônico: queima de placa eletrônica por surto.
2. **Consequência tolerável** — a falha é evidente e seu custo (parada, reparo, segurança) é aceitável frente ao custo de qualquer tentativa de prevenção que, por definição, não funcionaria.

**Se a consequência NÃO é tolerável** (segurança/meio ambiente, ou econômica intolerável), RTF é proibido e a saída compulsória é **redesenho** — redundância, seleção de componente melhor, eliminação do modo de falha (Moubray, cap. 9; é a última linha do diagrama de decisão).

## O que RTF exige (não é "não fazer nada")

- **Gestão de sobressalentes** dimensionada pelo λ e pelo lead time;
- **Procedimento de troca rápida** (o MTTR é a variável que resta ser gerenciada);
- **Registro da falha** no CMMS com código padronizado — o histórico é o que permitirá reclassificar se surgir padrão.

## Na plataforma

O [seletor de estratégia](/pt/metodo) chega ao RTF pelo caminho "sem P-F + evidente + consequência econômica" — e ao redesenho compulsório quando a consequência é de segurança.
