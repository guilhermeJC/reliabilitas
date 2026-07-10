---
slug: proof-test
tipo_nota: estrategia
locale: en
titulo: 'Proof Test — Failure-Finding'
status: published
taxonomia: []
resumo: 'The answer to HIDDEN failures: a periodic functional test that reveals the latent state — T = 2(1−D)/λ_DU, with the IEC 61511 and NR-13 ceilings.'
fontes:
  - 'Moubray, RCM II (1997), ch. 8 — Default Actions 1: Failure-finding'
  - 'IEC 61511 — functional safety; proof-test periodicity'
  - 'NR-13 (item 13.5.4.10) — regulatory ceiling for PSVs (Brazil)'
  - 'PRO-MNT-001 Rev02 §4.6 — NR-13 × RCM × IEC periodicity hierarchy'
tags:
  - hidden failure
  - PSV
  - SIS
  - functional test
revisado_em: 2026-07-10
---

## What it is

**Failure-finding** (proof test): a periodic functional test of an item whose failure is **hidden** — the equipment looks normal and the failure would only reveal itself when the function is **demanded**. The archetypes: the PSV that will not open, the level switch that will not trip, the interlock that will not act.

## When it is the right decision (Framework B)

"Hidden" is a dimension of **visibility**, not of statistics — it overlays any Framework A category (a PSV can be Wear-out at the seat AND Random in sticking; both hidden). The criterion is single: **operations does NOT perceive the failure under normal conditions**. If the failure is hidden, the proof test is mandatory — there is no CBM of a function that is never exercised.

## Periodicity — the three-ceilings rule

$$T = \frac{2\,(1 - D)}{\lambda_{DU}}$$

where $D$ is the required availability of the protective function and $\lambda_{DU}$ the dangerous-undetected failure rate. Three sources compete — **the shortest always prevails**:

1. **RCM calculation** (formula above);
2. **IEC 61511** (if the item belongs to a SIF: the SIL sets the interval);
3. **NR-13** (PSVs: never beyond the internal inspection of the protected vessel — item 13.5.4.10, Brazilian regulation).

## Pitfalls

The proof test **exercises** the item — a poorly executed test is an infant-mortality opportunity (recalibration, reassembly); the test must simulate the real demand (simulate level at the switch, bench pop test for the PSV) and record a **measured value**, not an "OK".

## On the platform

The [strategy selector](/en/metodo) identifies hiddenness at the second question and applies the formula with your numbers.
