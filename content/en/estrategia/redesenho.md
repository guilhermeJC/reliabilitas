---
slug: redesenho
tipo_nota: estrategia
locale: en
titulo: 'Redesign — Design Change'
status: published
taxonomia: []
resumo: 'The 5th Framework B outcome: when no proactive task is applicable and the consequence is not tolerable, RCM does not accept living with the risk — reassess the current condition against the original design and redesign.'
fontes:
  - 'Moubray, RCM II (1997), ch. 9-10 — Default Actions and the decision diagram'
  - 'SAE JA1011 §5.7 — applicability and effectiveness criteria'
  - 'PRO-MNT-001 Rev02 — the platform''s own two-framework methodology'
tags:
  - redesign
  - design change
  - safety consequence
revisado_em: 2026-07-11
---

## What it is

**Redesign** is the 5th and last Framework B outcome, alongside [[cbm|CBM]], [[tbm|TBM]], [[proof-test|Proof Test]] and [[rtf|RTF]]: when NO proactive task is technically applicable and effective, and the failure consequence is not tolerable, RCM does not accept living with the risk — the way out is changing the design, not the maintenance routine. Redesign is not a synonym for "swap for a better piece of equipment": it means reassessing whether the CURRENT installation and required operating condition still match the original design assumptions — and, when they don't, redesigning.

## When it is the right decision (Framework B)

Two simultaneous conditions (Moubray, ch. 9-10; SAE JA1011 §5.7):

1. **No proactive task passes the applicability/effectiveness test** — CBM without a detectable P-F, TBM without a characteristic age (β ≈ 1), a proof test that would not reduce risk to the required level;
2. **The consequence is not tolerable** — safety, environmental, or economic above the threshold RTF would accept.

At that intersection, RCM is categorical: there is no "accept the risk for now" — the design change is compulsory (it is the last line of Moubray's decision diagram).

## There is no generic redesign — every installation is its own case

This is the point that usually gets lost: redesign is not applying a catalog recipe. It means reassessing the CURRENT condition of the installation and the required operation against the ORIGINAL design assumptions — does the design flow still match the actual operating flow? Has the fluid changed (viscosity, temperature, presence of solids)? Is the operating regime (starts/stops, turndown) still what the design assumed? Often the "chronic failure" that seems to call for redesign is actually a system operating outside the window it was designed for — and the correct redesign is specific to that installation, that fluid, that regime. There is no solution transferable from one plant to another without this reassessment.

## Examples of what "redesigning" can mean

- Switching material/metallurgy to one more resistant to the identified failure mechanism;
- Adding redundancy (standby, N+1) when unavailability is the problem;
- Changing control/instrumentation logic to eliminate the operating mode that causes the failure;
- Resizing the equipment for the REAL operating condition — not the original design one, if it has changed.

## On the platform

The [strategy selector](/en/metodo) reaches redesign through RCM's two paths: protection that does not deliver the required availability (via [[proof-test|Proof Test]]) and an evident failure with no applicable task and safety consequence (via [[rtf|RTF]]).
