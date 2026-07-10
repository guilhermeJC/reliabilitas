---
slug: tbm
tipo_nota: estrategia
locale: en
titulo: 'TBM — Time-Based Maintenance'
status: published
taxonomia: []
resumo: 'The classic preventive output: scheduled replacement or restoration — technically valid ONLY when a characteristic failure age exists (β > 1).'
fontes:
  - 'Moubray, RCM II (1997), ch. 6 — Proactive Maintenance 1: Preventive Tasks'
  - 'Nowlan & Heap (1978) — failure patterns; p. 46 on induced infant mortality'
  - 'PRO-MNT-001 Rev02 + IT-MNT-001 — the two-framework methodology'
tags:
  - preventive
  - Weibull
  - scheduled replacement
revisado_em: 2026-07-10
---

## What it is

**Time-Based Maintenance** (the classic **preventive**): scheduled replacement or restoration by age or usage (hours, cycles, kilometres), regardless of the item's apparent condition.

## When it is the right decision (Framework B)

Two **simultaneous** conditions (Moubray, ch. 6):

1. **A characteristic failure age** — failure probability grows with time/usage: **β > 1** in the Weibull analysis, with dispersion low enough for an interval to make sense;
2. **Restoration returns the original resistance** — replacing/overhauling the item genuinely "resets the clock" (true for physical wear; false for operation-induced failures).

The interval comes from Weibull analysis of the history (or the manufacturer's recommendation while data is lacking — revised after 2–3 cycles).

## The pitfall that defines the strategy

**TBM on a random failure (β ≈ 1) is technically unjustifiable** — and worse than useless: every intervention reintroduces **infant mortality** risk (assembly error, contamination, infant parts) into an item that was not heading toward failure (Nowlan & Heap, p. 46 — the discovery that founded RCM: only ~11% of complex failure modes have a dominant wear-out zone). Before scheduling any periodic replacement, the question is always: *does this failure mode have an age?* — if not, the path is [[cbm|CBM]] (if there is a P-F) or [[rtf|RTF]].

## On the platform

The [strategy selector](/en/metodo) runs this triage question by question; the [Weibull calculator](/en/calculadoras) estimates β and η from your history — β is the deciding vote between TBM and the alternatives.
