---
slug: instrumentacao
tipo_nota: familia
locale: en
titulo: 'Instrumentation'
status: published
taxonomia:
  - controle-do-escoamento
fontes:
  - 'ISO 14224:2016 — equipment taxonomy (Annex A: control and safety classes — input devices, control logic units, fire & gas detectors)'
  - 'IEC 61511 — Functional safety: Safety Instrumented Systems for the process industry'
revisado_em: 2026-07-08
resumo: 'Family that measures, transmits and commands: sensors/transmitters, control logic and fire & gas detection. In ISO 14224 it maps to the control and safety classes. Detailed families in Phase 1.'
---

The equipment that **measures, transmits and commands** — the plant's senses and brain. It does not touch the fluid's energy: it converts process state into signal and signal into decision.

## Usual groups

*(handbooks per type in Phase 1)*

- **Sensors and transmitters** (*input devices* in ISO 14224) — pressure, temperature, flow and level: the quality of every loop starts here;
- **Control logic** (*control logic units*) — PLCs, DCSs and dedicated controllers;
- **Fire and gas detection** (*fire & gas detectors*) — safety functions, typically within instrumented systems (SIS, IEC 61511).

The loop's **final element** — the control valve — lives in the [[valvulas|Valves]] family.

Reliability: calibration drift, impulse-line plugging and hidden failures of safety functions dominate — SIS instruments have diagnostic coverage and proof-test intervals dictated by SIL (IEC 61511), not by shutdown convenience.
