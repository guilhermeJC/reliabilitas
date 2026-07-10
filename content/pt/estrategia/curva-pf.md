---
slug: curva-pf
tipo_nota: estrategia
locale: pt
titulo: 'Curva P-F e Intervalo P-F'
status: published
taxonomia: []
resumo: 'O conceito que fundamenta toda a manutenção preditiva: o tempo entre a falha detectável (P) e a falha funcional (F) — e a regra de rota P-F/2.'
fontes:
  - 'Moubray, RCM II (1997), cap. 7 — o intervalo P-F e as tarefas sob condição'
  - 'Bloch & Geitner — Machinery Failure Analysis and Troubleshooting, cap. 7 (P-F de campo)'
  - 'PRO-MNT-001 Rev02 §4.5 — definição operacional'
tags:
  - P-F
  - preditiva
  - periodicidade
revisado_em: 2026-07-10
---

## O que é

A **curva P-F** descreve a trajetória de um modo de falha com degradação progressiva: no ponto **P** (*potential failure*) o defeito se torna **detectável** por alguma técnica; no ponto **F** (*functional failure*) a função é comprometida. O **intervalo P-F** é o tempo entre os dois — a **janela de oportunidade** de toda a manutenção preditiva: é dentro dela que a [[cbm|CBM]] detecta, planeja e age.

## As três propriedades que decidem tudo

1. **O P-F é da TÉCNICA, não só da máquina** — na mesma falha de rolamento, o ultrassom enxerga P meses antes da análise espectral, que enxerga antes da temperatura, que enxerga antes do ruído audível. Trocar a técnica move o ponto P e estica ou encurta a janela.
2. **O P-F varia com material e severidade** — na [[cavitacao|cavitação]], de ~1 semana (ferro fundido, condição severa) a ~6 meses (inox, moderada — Bloch & Geitner): a rota se calibra pelo **pior P-F plausível** do par material×serviço.
3. **A regra de rota: periodicidade = P-F/2** — inspecionar na metade do intervalo garante ao menos uma leitura dentro da janela mesmo no pior alinhamento entre rota e início da degradação (Moubray, cap. 7). Quando P-F/2 fica menor que o ciclo praticável de rota, o caminho é monitoramento **contínuo**.

## Armadilha clássica

Confundir P-F com "tempo de vida": o intervalo P-F **não começa na instalação** — começa quando a degradação se instala (que em modos Mixed/Complex depende de gatilho operacional). Por isso P-F **não dimensiona [[tbm|TBM]]** — ele dimensiona a **frequência de inspeção**.

## Na plataforma

A [calculadora P-F](/pt/calculadoras) aplica a regra com os seus números; o [guia das calculadoras](/pt/calculadoras/guia) ensina a estimar o intervalo por técnica.
