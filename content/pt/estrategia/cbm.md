---
slug: cbm
tipo_nota: estrategia
locale: pt
titulo: 'CBM — Manutenção Baseada em Condição'
status: published
taxonomia: []
resumo: 'A saída preditiva do Framework B: monitorar a condição e intervir entre o ponto P e a falha funcional — periodicidade P-F/2.'
fontes:
  - 'Moubray, RCM II (1997), cap. 7 — Proactive Maintenance 2: Predictive Tasks'
  - 'SAE JA1011:2009 — critérios de aplicabilidade e eficácia de tarefas'
  - 'PRO-MNT-001 Rev02 + IT-MNT-001 — metodologia própria dos dois frameworks'
tags:
  - preditiva
  - P-F
  - monitoramento de condição
revisado_em: 2026-07-10
---

## O que é

**Manutenção Baseada em Condição** (*Condition-Based Maintenance* — a manutenção **preditiva**): em vez de intervir por calendário, monitora-se um **sinal que antecede a falha funcional** (vibração, temperatura, partículas no óleo, tendência de desempenho, emissão acústica) e a intervenção acontece quando a condição cruza o limiar — dentro da janela da [[curva-pf|curva P-F]].

## Quando é a decisão certa (Framework B)

Três condições **simultâneas** (Moubray, cap. 7; SAE JA1011):

1. **Existe P-F detectável** — o modo de falha emite um sinal mensurável antes de comprometer a função;
2. **O intervalo P-F é praticável** — dá tempo de detectar, planejar e agir (inspeção a cada **P-F/2** garante ao menos uma leitura dentro da janela);
3. **A detecção é confiável** — a técnica escolhida realmente enxerga o ponto P naquela máquina e condição de operação.

Vale tanto para falhas **Wear-out com P-F** quanto para **Random com P-F** (a categoria "Aleatória com P-F detectável" da IT-MNT-001): o que a CBM exige é o *aviso prévio*, não a idade previsível.

## Periodicidade e armadilhas

- **Periodicidade = P-F/2** — do intervalo P-F **da técnica utilizada**: ultrassom enxerga o ponto P antes da análise espectral, que enxerga antes da temperatura; trocar de técnica muda o P-F e, portanto, a rota.
- **Baseline primeiro**: sem a referência da máquina sã (assinatura de vibração, curva de desempenho de aceitação), o limiar de alarme é chute.
- **CBM não conserta causa**: detectar cedo compra tempo de planejamento — a recorrência pede análise de causa (o exemplo canônico é a [[cavitacao|cavitação]]: CBM detecta, mas a correção é operacional/de projeto).

## Na plataforma

O [seletor de estratégia](/pt/metodo) percorre estas perguntas para qualquer modo de falha; a [calculadora P-F](/pt/calculadoras) dimensiona a rota a partir do intervalo estimado.
