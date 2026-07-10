---
slug: proof-test
tipo_nota: estrategia
locale: pt
titulo: 'Proof Test — Busca de Falha'
status: published
taxonomia: []
resumo: 'A resposta às falhas OCULTAS: teste funcional periódico que revela o estado latente — T = 2(1−D)/λ_DU, com os tetos da IEC 61511 e da NR-13.'
fontes:
  - 'Moubray, RCM II (1997), cap. 8 — Default Actions 1: Failure-finding'
  - 'IEC 61511 — segurança funcional; periodicidade de proof test'
  - 'NR-13 (item 13.5.4.10) — teto regulatório para PSVs'
  - 'PRO-MNT-001 Rev02 §4.6 — hierarquia de periodicidade NR-13 × RCM × IEC'
tags:
  - falha oculta
  - PSV
  - SIS
  - teste funcional
revisado_em: 2026-07-10
---

## O que é

**Busca de falha** (*failure-finding task* / **proof test**): teste funcional periódico de um item cuja falha é **oculta** — o equipamento aparenta normalidade e a falha só se revelaria quando a função fosse **demandada**. O arquétipo: a PSV que não abre, a chave de nível que não comuta, o intertravamento que não atua.

## Quando é a decisão certa (Framework B)

"Oculta" é dimensão de **visibilidade**, não de estatística — ela se sobrepõe a qualquer categoria do Framework A (a PSV pode ter Wear-out na sede E Random no travamento; ambas ocultas). O critério é um só: **a operação NÃO percebe a falha em condições normais**. Se a falha é oculta, o proof test é obrigatório — não existe CBM de uma função que nunca é exercitada.

## Periodicidade — a regra dos três tetos

$$T = \frac{2\,(1 - D)}{\lambda_{DU}}$$

onde $D$ é a disponibilidade requerida da função de proteção e $\lambda_{DU}$ a taxa de falhas perigosas não detectadas. Três fontes competem — **prevalece sempre a mais curta**:

1. **Cálculo RCM** (fórmula acima);
2. **IEC 61511** (se o item integra uma SIF: o SIL define o intervalo);
3. **NR-13** (PSVs: nunca além da inspeção interna do vaso protegido — item 13.5.4.10).

## Armadilhas

O proof test **exercita** o item — teste mal executado é oportunidade de mortalidade infantil (recalibração, remontagem); o teste deve simular a demanda real (simular nível na chave, pop test de bancada na PSV) e registrar **valor medido**, não "OK".

## Na plataforma

O [seletor de estratégia](/pt/metodo) identifica a ocultação na segunda pergunta e aplica a fórmula com os seus números.
