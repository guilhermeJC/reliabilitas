---
slug: redesenho
tipo_nota: estrategia
locale: pt
titulo: 'Redesenho — Mudança de Projeto'
status: published
taxonomia: []
resumo: 'A 5ª saída do Framework B: quando nenhuma tarefa proativa é aplicável e a consequência não é tolerável, o RCM não admite conviver com o risco — reavaliar a condição atual contra o projeto original e reprojetar.'
fontes:
  - 'Moubray, RCM II (1997), cap. 9-10 — Default Actions e o diagrama de decisão'
  - 'SAE JA1011 §5.7 — critérios de aplicabilidade e eficácia'
  - 'PRO-MNT-001 Rev02 — metodologia própria dos dois frameworks'
tags:
  - redesenho
  - modificação de projeto
  - consequência de segurança
revisado_em: 2026-07-11
---

## O que é

**Redesenho** é a 5ª e última saída do Framework B, ao lado de [[cbm|CBM]], [[tbm|TBM]], [[proof-test|Proof Test]] e [[rtf|RTF]]: quando NENHUMA tarefa proativa é tecnicamente aplicável e eficaz, e a consequência da falha não é tolerável, o RCM não aceita conviver com o risco — a saída é mudar o projeto, não a rotina de manutenção. Redesenho não é sinônimo de "trocar por um equipamento melhor": é reavaliar se a condição ATUAL de instalação e de operação exigida ainda corresponde às premissas do projeto original — e, quando não corresponde, reprojetar.

## Quando é a decisão certa (Framework B)

Duas condições simultâneas (Moubray, cap. 9-10; SAE JA1011 §5.7):

1. **Nenhuma tarefa proativa passa no crivo de aplicabilidade/eficácia** — CBM sem P-F detectável, TBM sem idade característica (β ≈ 1), proof test que não reduziria o risco ao nível exigido;
2. **A consequência não é tolerável** — segurança, meio ambiente, ou econômica acima do limite que o RTF aceitaria.

Nesse cruzamento, o RCM é categórico: não existe "aceitar o risco por enquanto" — a mudança de projeto é compulsória (é a última linha do diagrama de decisão de Moubray).

## Não existe redesenho genérico — cada instalação é um caso

Aqui mora o ponto que costuma ser perdido: redesenho não é aplicar uma receita de catálogo. É reavaliar a condição ATUAL da instalação e da operação exigida contra as premissas do projeto ORIGINAL — a vazão de projeto ainda bate com a vazão real de operação? O fluido mudou (viscosidade, temperatura, presença de sólidos)? O regime de operação (partidas/paradas, turndown) ainda é o que o projeto assumiu? Frequentemente a "falha crônica" que parece pedir redesenho é, na verdade, um sistema operando fora da janela para a qual foi projetado — e o reprojeto certo é específico daquela instalação, daquele fluido, daquele regime. Não existe solução transferível de uma planta para outra sem essa reavaliação.

## Exemplos do que "redesenhar" pode significar

- Trocar o material/metalurgia por um mais resistente ao mecanismo de falha identificado;
- Adicionar redundância (standby, N+1) quando a indisponibilidade é o problema;
- Alterar a lógica de controle/instrumentação para eliminar o modo de operação que gera a falha;
- Redimensionar o equipamento para a condição REAL de operação — não a de projeto original, se ela mudou.

## Na plataforma

O [seletor de estratégia](/pt/metodo) chega ao redesenho pelos dois caminhos do RCM: proteção que não entrega a disponibilidade exigida (via [[proof-test|Proof Test]]) e falha evidente sem tarefa aplicável com consequência de segurança (via [[rtf|RTF]]).
