---
slug: cavitacao
tipo_nota: modo_falha
locale: pt
titulo: 'Cavitação'
status: published
taxonomia:
  - transferencia-de-fluidos-liquidos
  - bombas
  - dinamicas
  - bomba-centrifuga
iso14224_code: 'ERO'
fontes:
  - 'Karassik et al., Pump Handbook, 4ª ed. (2008), cap. 2'
  - 'ANSI/HI 9.6.1 (2024) — Guideline for NPSH Margin'
  - 'Moubray, RCM II (1997), cap. 8 — intervalo P-F'
  - 'Nowlan & Heap (1978) — padrões de taxa de falha'
  - 'Pumps & Systems — Cavitation 101'
fw_a:
  categoria: mixed_complex
  beta: 'variável (gatilho operacional aleatório + erosão progressiva β>1)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'P-F/2 (inspeção mensal típica; contínuo via monitoramento online)'
pf_tipico: 'dias a semanas (erosão); minutos (colapso severo de desempenho)'
niveis:
  - beginner
  - specialist
  - engineer
plano_manutencao:
  - tarefa: 'Análise de vibração'
    metodo: 'Espectro + envelope; energia banda larga em alta frequência'
    periodicidade: 'Mensal (P-F/2)'
  - tarefa: 'Inspeção acústica'
    metodo: 'Ultrassom/estetoscópio na voluta e sucção (ruído de "cascalho")'
    periodicidade: 'Mensal, junto à rota de vibração'
  - tarefa: 'Monitoramento de processo'
    metodo: 'NPSHa calculado vs NPSHr; vazão vs BEP; tendência no PIMS'
    periodicidade: 'Contínuo (alarme de desvio)'
revisado_em: 2026-07-04
---

## Beginner

**O que é.** Dentro de uma [[bomba-centrifuga|bomba centrífuga]], a pressão na entrada do impelidor pode cair abaixo da **pressão de vapor** do líquido. Nesse instante o líquido ferve localmente — formam-se bolhas de vapor que, arrastadas para regiões de maior pressão, **colapsam violentamente** contra as superfícies metálicas.

**Como reconhecer em campo.** Ruído característico de "bombear cascalho", queda de vazão e pressão, vibração elevada, e — com o tempo — superfície do impelidor esburacada como casca de laranja.

**Consequências.** Erosão do impelidor, danos em selo mecânico e rolamentos pela vibração, perda de desempenho e, se ignorada, falha funcional da bomba.

## Specialist

**Mecanismo.** Colapso de microbolhas gera microjatos com pressões locais altíssimas que removem material por fadiga superficial. Causas dominantes: NPSH disponível insuficiente (nível baixo no tanque, filtro de sucção obstruído, temperatura alta), operação longe do BEP (recirculação de sucção) e entrada de ar (falsa cavitação — diagnóstico diferencial obrigatório).

**Framework A — diagnóstico.** `Mixed/Complex`: o gatilho é operacional e pode surgir a qualquer momento (componente aleatória), mas a erosão resultante progride com o tempo (componente de desgaste, β>1). Decompor por FMEA quando a causa raiz for recorrente.

**Framework B — prescrição.** Existe P-F detectável (vibração, ruído, tendência de desempenho) e a falha é evidente → **CBM com periodicidade P-F/2**. Tarefas no plano exportável abaixo da página. Correção definitiva é operacional/de projeto: restaurar margem de NPSH, reposicionar ponto de operação, trim anti-cavitação.

## Engineer

**Critério de margem (ANSI/HI 9.6.1; API 610):**

NPSHa > NPSHr + margem — razão NPSHa/NPSHr típica de 1,1 a 2,5 conforme energia de sucção; API 610 exige NPSHa ≥ NPSHr + 0,6 m no ponto nominal.

**NPSH disponível:**

NPSHa = (P_sucção − P_vapor)/(ρg) + z − h_f

**Detecção quantitativa.** Espectro de vibração: energia banda larga em alta frequência (sem raia discreta dominante), modulada pela passagem de pás (BPF = n_pás × N). Queda de head ≥ 3% no teste de NPSH define o NPSHr de catálogo (HI).

**Confiabilidade.** Tratando a erosão como desgaste: Weibull com β ≈ 1,5–3 sobre o tempo em condição cavitante; o intervalo P-F observado (dias a semanas entre vibração detectável e perda funcional) sustenta a periodicidade P-F/2 mensal (Moubray, cap. 8). _Calculadora Weibull ao vivo entra no Dia 3._

**Bibliografia primária.** Karassik cap. 2 (NPSH, comportamento fora do BEP) · ANSI/HI 9.6.1 (margens) · Moubray RCM II cap. 8 (P-F) · Nowlan & Heap (padrões de falha).
