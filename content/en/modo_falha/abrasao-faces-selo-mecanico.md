---
slug: abrasao-faces-selo-mecanico
tipo_nota: modo_falha
locale: en
titulo: 'Face Abrasion'
status: published
taxonomia:
  - selo-mecanico
iso14224_code: 'SE-ABR'
fontes:
  - 'API 682, 4th ed. — Shaft Sealing Systems for Centrifugal and Rotary Pumps'
  - 'FSA — API 682 Part 5: Piping Plans (Plan 32 for dirty/abrasive fluids)'
  - 'John Crane — official technical documentation (face selection and plans)'
  - 'Karassik et al., Pump Handbook, 4th ed. — sealing chapter'
  - 'ISO 4406:2021 — Fluid cleanliness code classification'
fw_a:
  categoria: wear_out
  beta: '1.3–2 (particle-accelerated wear — faster than natural face wear)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Monthly (leak trend + injection-plan inspection)'
pf_tipico: 'weeks to a few months, depending on particle concentration and hardness in the process fluid'
plano_manutencao:
  - tarefa: 'Monitor visual/instrumented leakage trend'
    metodo: 'Visual inspection of drip at the seal drain or a leak sensor, compared against the post-commissioning baseline'
    periodicidade: 'Monthly; weekly in service with known abrasive fluid'
    condicao: 'In operation, with no interference from recent area washdown/cleaning'
    criterio: 'Leakage stable or mildly increasing within the expected range (the seal "leaks by design")'
    acao: 'Accelerated, sustained leakage increase → suspect progressive abrasion; plan replacement before outright leakage'
    especialidade: 'Predictive / field inspection'
    duracao: '0.15 h'
    passos:
      - 'Observe/measure leakage at the seal drain at the same reference point'
      - 'Compare with the baseline established right after commissioning'
      - 'Log the trend over time, not just the point value'
    registros:
      - 'Estimated leak rate [drops/min or mL/h]'
  - tarefa: 'Inspect and validate Sealing Plan 32 (clean fluid injection)'
    metodo: 'Check external barrier fluid injection pressure/flow against the design specification'
    periodicidade: 'Monthly'
    condicao: 'In operation'
    criterio: 'Injection pressure above chamber pressure (ensures clean flow inward, not process fluid outward)'
    acao: 'Insufficient injection pressure → fix at the source (pump/regulator) before particles re-enter the chamber'
    especialidade: 'Instrumentation / process'
    duracao: '0.2 h'
    passos:
      - 'Measure Plan 32 injection pressure at the reference point'
      - 'Compare with the seal chamber pressure (must always be higher)'
      - 'Log and fix deviations at the clean-fluid source'
    registros:
      - 'Plan 32 injection pressure [bar]'
      - 'Seal chamber pressure [bar]'
tags:
  - abrasion
  - Plan 32
  - dirty fluid
  - seal faces
revisado_em: 2026-07-18
---

## Beginner

**What it is.** When the process fluid carries suspended solids (sand, catalyst, precipitates, upstream corrosion products) and there's no piping plan keeping those particles away from the chamber, they get trapped between the [[selo-mecanico|mechanical seal]]'s faces — which are designed for separation by a ~1 μm fluid film, not for tolerating solid particles. Every trapped particle scratches the faces on each rotation, like miniature sandpaper, progressively opening a leak path between surfaces that should be in near-perfect contact.

**How to recognize it in the field.** Unlike [[dry-running-selo-mecanico|dry running]] (minutes), this is a **gradual** process — growing leakage over weeks to months, without the sudden temperature spike characteristic of film loss. It's detectable early through simple visual observation of drip at the seal drain.

**Why it matters.** It's one of the component's most preventable failure modes: the fix (Sealing Plan 32, which injects clean external fluid into the chamber) is well established by API 682 and relatively low-cost compared to the cost of recurring seal replacements in unprotected abrasive service.

## Specialist

### Mechanism — particles between faces designed for a fluid film

Seal faces operate with micrometer-scale clearances, maintained by the fluid film itself. Particles larger than that clearance can't pass freely — they get trapped at the interface and, with every relative rotation between the faces, act as an abrasive, scratching the lapped surface. Damage accumulates progressively: first the original flatness (2–3 light bands) is lost, then individual scratches coalesce into continuous leak channels.

### Why Plan 32 is the canonical answer, not a material swap

Although harder faces (silicon carbide against silicon carbide, instead of carbon against SiC) resist abrasion better, the design solution preferred by the FSA/API 682 is to **keep particles away from the interface** — Plan 32 injects clean external fluid into the chamber, creating an environment where the faces never see the dirty process fluid directly. Swapping only the face material without treating the contamination pathway is a stopgap that buys time, not one that eliminates the cause.

### Framework A — diagnosis

`Wear-out`, **β > 1**: abrasion accumulates damage progressively and increasingly with exposure time — the higher the particle concentration and hardness, the faster the effective β pushes the curve to the left (earlier failure). It's a classic wear pattern, distinct from the random event of dry running.

### Framework B — prescription

**CBM via leakage trend**, complemented by an active check of Plan 32 (which attacks the cause, not just monitors the symptom). This failure mode's advantage is a relatively long P-F (weeks to months) — real time to plan the seal replacement at a scheduled outage instead of reacting to outright leakage.

## Engineer

### The physics of critical particle size

Abrasive damage is most efficient when particle size is comparable to or slightly larger than the faces' operating clearance (typically sub-micrometer to a few micrometers) — much smaller particles can pass through suspended without significant damage; much larger particles tend to be mechanically filtered before reaching the interface (depending on chamber geometry). That's why the Plan 32 specification usually includes a dedicated filter sized for the critical size range, not just "clean fluid" in generic terms.

### Interaction with other failure modes

Faces already worn by abrasion lose part of their ability to generate the hydrodynamic pressure that sustains the film — a seal with advanced abrasion becomes more vulnerable to a transition into [[dry-running-selo-mecanico|dry running]] under a process upset that a seal with intact faces would tolerate without issue. A post-mortem on a combined-failure seal frequently shows both patterns: abrasion scratches at the edges + concentrated thermal damage at the center of the face, where the film finally collapsed.
