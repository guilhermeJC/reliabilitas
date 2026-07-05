---
slug: bomba-centrifuga
tipo_nota: tipo
locale: pt
titulo: 'Bomba Centrífuga'
status: published
taxonomia:
  - transferencia-de-fluidos-liquidos
  - bombas
  - dinamicas
iso14224_code: 'PU'
fontes:
  - 'Karassik et al., Pump Handbook, 4ª ed. (2008)'
  - 'API 610, 12ª ed. — Centrifugal Pumps for Petroleum, Petrochemical and Natural Gas Industries'
  - 'ASME B73.1 — Horizontal End Suction Centrifugal Pumps for Chemical Process'
  - 'ANSI/HI 9.6.1 (2024) — Guideline for NPSH Margin'
secoes:
  - classificacao
  - principio
  - anatomia
  - tipos
  - marcas
  - industria
  - componentes
  - modos_falha
componentes: []
tags:
  - cavitação
  - NPSH
  - curva da bomba
revisado_em: 2026-07-04
---

## Classificação

Máquina rotodinâmica da cadeia [[transferencia-de-fluidos-liquidos|Transferência de Fluidos — Líquidos]] → [[bombas|Bombas]] → [[dinamicas|Dinâmicas]]. É o equipamento rotativo mais numeroso da indústria de processo: tipicamente mais de 80% do parque rotativo de uma refinaria ou planta química.

## Princípio de funcionamento

O impelidor acelera o líquido radialmente; a voluta (ou difusor) converte energia cinética em pressão. A energia transferida por unidade de peso segue a equação de Euler das turbomáquinas — na prática, o desempenho é lido na **curva H-Q** fornecida pelo fabricante, com três marcos: shutoff (Q=0), **BEP** (ponto de melhor eficiência) e runout (vazão máxima).

Regras físicas que regem operação confiável:

- **Leis de afinidade:** Q ∝ N · H ∝ N² · P ∝ N³
- **NPSHa > NPSHr + margem** (ANSI/HI 9.6.1; API 610 exige ≥ 0,6 m no ponto nominal) — margem insuficiente leva à [[cavitacao|cavitação]]
- **Janela de operação preferida (POR):** 70–120% do BEP; fora dela crescem recirculação, vibração e cargas radiais

## Anatomia

_Trio visual (D18): foto real + diagrama em corte SVG entram no Dia 4 do desenvolvimento; render 3D progressivo._

Elementos principais: impelidor (fechado/semiaberto/aberto), voluta, eixo, rolamentos, selo mecânico (ou gaxeta), caixa de selagem, anéis de desgaste, acoplamento.

## Tipos e diferenças

| Configuração | Norma típica | Aplicação |
| --- | --- | --- |
| Overhung (OH1/OH2) | API 610 / ASME B73.1 | Processo geral, química (ANSI), refino (OH2) |
| Between-bearings (BB) | API 610 | Alta vazão/pressão, multiestágio |
| Vertical (VS) | API 610 | Sumps, poços, criogenia |

Monoestágio vs multiestágio: o número de impelidores multiplica o head. Sucção simples vs dupla: equilíbrio de empuxo axial em vazões altas.

## Marcas e modelos

Linhas de referência do mercado (fichas próprias na Fase 1): KSB Meganorm/Megabloc · Goulds 3196 (ITT) · Sulzer · Grundfos · Imbil (BR).

## Uso na indústria

Transferência, recirculação, carga de colunas, água de resfriamento, combate a incêndio. Criticidade usual alta: 30–40% do custo de manutenção de rotativos de uma planta típica origina-se em bombas centrífugas.

## Componentes

Rolamentos e selo mecânico são componentes transversais (ISO 14224 *maintainable items*) — notas próprias entram no Dia 4 e serão referenciadas aqui.

## Modos de falha

- [[cavitacao|Cavitação]]
- _Falha de selo mecânico, falha de rolamento, desalinhamento, erosão de impelidor — Dia 4._
