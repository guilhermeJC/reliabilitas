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
anatomia:
  svg: /anatomia/bomba-centrifuga.svg
  alt: 'Corte esquemático meridional de bomba centrífuga horizontal (OH1) com componentes numerados de 1 a 8'
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

![Corte esquemático meridional de bomba centrífuga horizontal (OH1) com componentes numerados](/anatomia/bomba-centrifuga.svg)

1. **Voluta (carcaça espiral)** — coleta o fluido do impelidor e converte velocidade em pressão pela expansão progressiva de seção.
2. **Impelidor** — o coração da máquina: pás curvadas para trás transferem energia ao fluido (equação de Euler).
3. **Eixo** — transmite o torque do acionador ao impelidor; dimensionado por rigidez (deflexão no selo) tanto quanto por resistência.
4. **[[selo-mecanico|Selo mecânico]]** — vedação dinâmica entre eixo e carcaça; principal item de custo recorrente junto com os rolamentos.
5. **[[rolamento|Rolamentos]]** — suportam as cargas radiais e axiais; origem de 45–55% das falhas do conjunto.
6. **Bocal de sucção** — entrada axial; a região de menor pressão de todo o sistema — onde nasce a [[cavitacao|cavitação]].
7. **Bocal de recalque** — saída tangencial da voluta, na pressão de descarga.
8. **Caixa de mancais** — abriga os rolamentos e o sistema de lubrificação (banho de óleo, névoa ou graxa).

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
