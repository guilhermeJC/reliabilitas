---
slug: cbm
tipo_nota: estrategia
locale: en
titulo: 'CBM — Condition-Based Maintenance'
status: published
taxonomia: []
resumo: 'Framework B''s predictive output: monitor the condition and intervene between point P and functional failure — P-F/2 periodicity.'
fontes:
  - 'Moubray, RCM II (1997), ch. 7 — Proactive Maintenance 2: Predictive Tasks'
  - 'SAE JA1011:2009 — task applicability and effectiveness criteria'
  - 'PRO-MNT-001 Rev02 + IT-MNT-001 — the two-framework methodology'
tags:
  - predictive
  - P-F
  - condition monitoring
revisado_em: 2026-07-11
---

## What it is

**Condition-Based Maintenance** (predictive maintenance): instead of intervening by calendar, a **signal that precedes functional failure** is monitored (vibration, temperature, oil particles, performance trend, acoustic emission) and intervention happens when the condition crosses the threshold — inside the P-F curve window (the interval between the detectable failure and the functional failure).

## When it is the right decision (Framework B)

Three **simultaneous** conditions (Moubray, ch. 7; SAE JA1011):

1. **A detectable P-F exists** — the failure mode emits a measurable signal before compromising the function;
2. **The P-F interval is practicable** — there is time to detect, plan and act (inspecting every **P-F/2** guarantees at least one reading inside the window);
3. **Detection is reliable** — the chosen technique actually sees point P on that machine and operating condition.

It applies both to **Wear-out with P-F** and to **Random with P-F** failures (IT-MNT-001's "Random with detectable P-F" category): what CBM demands is the *advance warning*, not a predictable age.

## Periodicity and pitfalls

- **Periodicity = P-F/2** — of the P-F interval **of the technique in use**: ultrasound sees point P before spectral analysis, which sees it before temperature; changing technique changes the P-F and therefore the route.
- **Baseline first**: without the healthy-machine reference (vibration signature, acceptance performance curve), the alarm threshold is a guess.
- **CBM does not fix causes**: detecting early buys planning time — recurrence demands root-cause analysis (the canonical example is [[cavitacao|cavitation]]: CBM detects it, but the correction is operational/design).

## On the platform

The [strategy selector](/en/metodo) walks these questions for any failure mode; the [P-F calculator](/en/calculadoras) sizes the route from the estimated interval.
