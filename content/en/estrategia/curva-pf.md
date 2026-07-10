---
slug: curva-pf
tipo_nota: estrategia
locale: en
titulo: 'P-F Curve and P-F Interval'
status: published
taxonomia: []
resumo: 'The concept underlying all predictive maintenance: the time between detectable failure (P) and functional failure (F) — and the P-F/2 route rule.'
fontes:
  - 'Moubray, RCM II (1997), ch. 7 — the P-F interval and on-condition tasks'
  - 'Bloch & Geitner — Machinery Failure Analysis and Troubleshooting, ch. 7 (field P-F)'
  - 'PRO-MNT-001 Rev02 §4.5 — operational definition'
tags:
  - P-F
  - predictive
  - periodicity
revisado_em: 2026-07-10
---

## What it is

The **P-F curve** describes the trajectory of a failure mode with progressive degradation: at point **P** (*potential failure*) the defect becomes **detectable** by some technique; at point **F** (*functional failure*) the function is compromised. The **P-F interval** is the time between the two — the **window of opportunity** of all predictive maintenance: it is inside it that [[cbm|CBM]] detects, plans and acts.

## The three properties that decide everything

1. **The P-F belongs to the TECHNIQUE, not just the machine** — for the same bearing failure, ultrasound sees P months before spectral analysis, which sees it before temperature, which sees it before audible noise. Changing the technique moves point P and stretches or shrinks the window.
2. **The P-F varies with material and severity** — in [[cavitacao|cavitation]], from ~1 week (cast iron, severe condition) to ~6 months (stainless, moderate — Bloch & Geitner): the route is calibrated by the **worst plausible P-F** of the material×service pair.
3. **The route rule: periodicity = P-F/2** — inspecting at half the interval guarantees at least one reading inside the window even at the worst alignment between route and degradation onset (Moubray, ch. 7). When P-F/2 becomes shorter than the practicable route cycle, the path is **continuous** monitoring.

## Classic pitfall

Confusing P-F with "lifetime": the P-F interval **does not start at installation** — it starts when degradation sets in (which, in Mixed/Complex modes, depends on an operational trigger). That is why P-F **does not size [[tbm|TBM]]** — it sizes **inspection frequency**.

## On the platform

The [P-F calculator](/en/calculadoras) applies the rule with your numbers; the [calculator guide](/en/calculadoras/guia) teaches how to estimate the interval per technique.
