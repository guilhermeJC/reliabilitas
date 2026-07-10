---
slug: tbm
tipo_nota: estrategia
locale: pt
titulo: 'TBM — Manutenção Baseada no Tempo'
status: published
taxonomia: []
resumo: 'A saída preventiva clássica: substituição ou restauração programada — tecnicamente válida SÓ quando existe idade característica de falha (β > 1).'
fontes:
  - 'Moubray, RCM II (1997), cap. 6 — Proactive Maintenance 1: Preventive Tasks'
  - 'Nowlan & Heap (1978) — padrões de falha; p. 46 sobre mortalidade infantil induzida'
  - 'PRO-MNT-001 Rev02 + IT-MNT-001 — metodologia própria dos dois frameworks'
tags:
  - preventiva
  - Weibull
  - substituição programada
revisado_em: 2026-07-10
---

## O que é

**Manutenção Baseada no Tempo** (*Time-Based Maintenance* — a **preventiva** clássica): substituição ou restauração programada por idade ou uso (horas, ciclos, quilômetros), independentemente da condição aparente do item.

## Quando é a decisão certa (Framework B)

Duas condições **simultâneas** (Moubray, cap. 6):

1. **Idade característica de falha** — a probabilidade de falha cresce com o tempo/uso: **β > 1** na análise Weibull, com dispersão baixa o suficiente para o intervalo fazer sentido;
2. **A restauração devolve a resistência original** — trocar/reformar o item realmente "zera o relógio" (verdade para desgaste físico; falso para falhas induzidas por operação).

O intervalo sai da análise Weibull do histórico (ou da recomendação do fabricante enquanto não há dados — revisando após 2–3 ciclos).

## A armadilha que define a estratégia

**TBM em falha aleatória (β ≈ 1) é tecnicamente injustificável** — e pior que inócua: toda intervenção reintroduz risco de **mortalidade infantil** (erro de montagem, contaminação, peça infantil) num item que não estava caminhando para falhar (Nowlan & Heap, p. 46 — a descoberta que fundou o RCM: só ~11% dos modos de falha complexos têm zona de desgaste dominante). Antes de agendar qualquer troca periódica, a pergunta é sempre: *este modo de falha tem idade?* — se não tem, o caminho é [[cbm|CBM]] (se houver P-F) ou [[rtf|RTF]].

## Na plataforma

O [seletor de estratégia](/pt/metodo) faz essa triagem pergunta a pergunta; a [calculadora Weibull](/pt/calculadoras) estima β e η do seu histórico — o β é o voto decisivo entre TBM e as alternativas.
