---
slug: instrumentacao
tipo_nota: familia
locale: pt
titulo: 'Instrumentação'
status: published
taxonomia:
  - controle-do-escoamento
fontes:
  - 'ISO 14224:2016 — taxonomia de equipamentos (Anexo A: classes de controle e segurança — input devices, control logic units, fire & gas detectors)'
  - 'IEC 61511 — Functional safety: Safety Instrumented Systems for the process industry'
revisado_em: 2026-07-08
resumo: 'Família que mede, transmite e comanda: sensores/transmissores, lógica de controle e detecção de fogo e gás. Na ISO 14224 corresponde às classes de controle e segurança. Famílias detalhadas na Fase 1.'
---

Os equipamentos que **medem, transmitem e comandam** — os sentidos e o cérebro da planta. Não tocam a energia do fluido: convertem o estado do processo em sinal e o sinal em decisão.

## Grupos usuais

*(handbooks por tipo na Fase 1)*

- **Sensores e transmissores** (*input devices* na ISO 14224) — pressão, temperatura, vazão e nível: a qualidade de toda malha começa aqui;
- **Lógica de controle** (*control logic units*) — CLPs, SDCDs e controladores dedicados;
- **Detecção de fogo e gás** (*fire & gas detectors*) — funções de segurança, tipicamente dentro de sistemas instrumentados (SIS, IEC 61511).

O **elemento final** da malha — a válvula de controle — vive na família [[valvulas|Válvulas]].

Confiabilidade: deriva de calibração, entupimento de tomadas de impulso e falhas ocultas de funções de segurança dominam — instrumentos de SIS têm cobertura de diagnóstico e *proof test* ditados pelo SIL (IEC 61511), não pela conveniência da parada.
