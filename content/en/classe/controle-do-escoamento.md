---
slug: controle-do-escoamento
tipo_nota: classe
locale: en
titulo: 'Flow Control'
status: published
taxonomia: []
fontes:
  - 'ISO 14224:2016 — equipment taxonomy (Annex A: class VA; control and safety classes)'
  - 'IEC 60534 — Industrial-process control valves'
revisado_em: 2026-07-08
resumo: 'Equipment that adds no energy to the fluid: it directs, limits, blocks, protects and measures the flow. Gathers Valves (ISO 14224 class VA) and Instrumentation.'
---

Equipment that **adds no energy to the fluid** — it manages it: directing, limiting, blocking, protecting and measuring the flow. In practice, control has an energy price — every throttling valve **dissipates** energy as head loss.

## Families

- [[valvulas|Valves]] — the blocking, regulating, protection and control element (ISO 14224 class **VA**). Includes self-actuated valves (pressure reducing/regulating) — "regulators" are not a separate family.
- [[instrumentacao|Instrumentation]] — measures, transmits and commands: sensors/transmitters, control logic and fire & gas detection (their own control and safety classes in ISO 14224).

The typical control loop closes the cycle between the two families: the transmitter measures, the controller decides and the **control valve** — final element (IEC 60534) — acts on the process.
