---
slug: rtf
tipo_nota: estrategia
locale: en
titulo: 'RTF — Run-to-Failure'
status: published
taxonomia: []
resumo: 'Running until failure — an engineering DECISION, not an omission: valid for random failure without P-F and tolerable consequence, always with managed spares.'
fontes:
  - 'Moubray, RCM II (1997), ch. 9 — Other Default Actions'
  - 'Nowlan & Heap (1978) — preventive maintenance does not reduce random failure'
  - 'PRO-MNT-001 Rev02 §5.2 — decision sieve'
tags:
  - planned corrective
  - spares
  - redesign
revisado_em: 2026-07-10
---

## What it is

**Run-to-Failure**: the deliberate decision to **operate the item until functional failure** and then correct it — with a spare on the shelf, a replacement procedure ready and the failure consequence accepted in advance. It is **planned corrective** maintenance; the opposite of corrective-by-surprise.

## When it is the right decision (Framework B)

Two simultaneous conditions:

1. **Random failure without P-F** — β ≈ 1 (no age to justify [[tbm|TBM]]) **and** no monitorable signal to anticipate the failure (no window for [[cbm|CBM]]). The canonical example: an electronics board burned by a surge.
2. **Tolerable consequence** — the failure is evident and its cost (downtime, repair, safety) is acceptable against the cost of any prevention attempt that, by definition, would not work.

**If the consequence is NOT tolerable** (safety/environment, or economically intolerable), RTF is forbidden and the compulsory way out is **redesign** — redundancy, better component selection, elimination of the failure mode (Moubray, ch. 9; the last line of the decision diagram).

## What RTF demands (it is not "doing nothing")

- **Spares management** sized by λ and lead time;
- **A fast-replacement procedure** (MTTR is the variable left to manage);
- **Failure recording** in the CMMS with a standardized code — the history is what will allow reclassification if a pattern emerges.

## On the platform

The [strategy selector](/en/metodo) reaches RTF through the "no P-F + evident + economic consequence" path — and compulsory redesign when the consequence is safety.
