---
slug: falso-brinelamento-rolamento
tipo_nota: modo_falha
locale: en
titulo: 'False Brinelling (Standstill Fretting Corrosion)'
status: published
taxonomia:
  - rolamento
iso14224_code: 'BE-FBR'
fontes:
  - 'ISO 15243:2017 — §5.3.3.2 (fretting) and §5.3.3.3 (false brinelling)'
  - 'Grebe et al. — False Brinelling: Standstill Marks on Roller Bearings (ResearchGate, 2022)'
  - 'STLE — False Brinelling: An Increasing Type of Rolling Bearing Wear (TLT, 2023)'
  - 'ONYX Insight — Fretting Corrosion Bearing Failures (Failure Atlas)'
  - 'NTN Bearing Wizard — Corrosion (rolling bearing damage)'
  - 'SKF Evolution — Bearing damage analysis with ISO 15243'
fw_a:
  categoria: random
  beta: 'not applicable in the classic sense — event triggered by external vibration at standstill, not by an accumulation of rotation cycles'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Inspection/vibration at commissioning and after any transport or prolonged standstill with external vibration present'
pf_tipico: 'the damage sets in during the standstill (days to months); it manifests as vibration/noise on the following start-up — the relevant P-F is the interval between a start-up with a mild symptom and functional failure (weeks to a few months)'
plano_manutencao:
  - tarefa: 'Check transport/storage history and external vibration before commissioning'
    metodo: 'Documentary checklist: time at standstill, presence of vibration from neighboring equipment, whether periodic rotation (barring) was applied during storage'
    periodicidade: 'At commissioning and after any prolonged shutdown (>3 months) with the rotor stationary'
    condicao: 'Before start-up, with the equipment still stopped'
    criterio: 'Rotor rotated periodically during storage OR no external vibration source nearby'
    acao: 'No periodic rotation AND external vibration present during the standstill → inspect vibration/noise already at the first start-up before assuming normal operation'
    especialidade: 'Reliability engineering / commissioning'
    duracao: '0.25 h'
    passos:
      - 'Check the record of downtime and storage/transport conditions'
      - 'Verify whether a periodic-turning (barring) routine was applied during the standstill'
      - 'Identify external vibration sources nearby (other machines, road/rail transport)'
      - 'If risk is identified, flag for reinforced inspection at start-up'
    registros:
      - 'Time at standstill [days]'
      - 'Periodic-turning routine applied (yes/no)'
  - tarefa: 'Inspect vibration/noise at the first start-up after a prolonged shutdown'
    metodo: 'Vibration spectrum and acoustic listening in the first minutes of rotation after an identified risk shutdown'
    periodicidade: 'At start-up, once per prolonged-shutdown risk event'
    condicao: 'Initial rotation, before stabilizing at full load'
    criterio: 'Absence of the harsh/irregular noise characteristic of brinelling marks (distinct from the smooth sound of a healthy bearing)'
    acao: 'Abnormal noise/vibration at start-up → visually inspect at the next shutdown opportunity; consider preventive replacement if the asset is critical'
    especialidade: 'Predictive / commissioning'
    duracao: '0.25 h'
    passos:
      - 'Record the vibration spectrum in the first minutes of rotation'
      - 'Listen for characteristic noise (harsh, rhythmic, at the rolling-element pass frequency)'
      - 'Compare with the expected healthy-bearing start-up pattern'
      - 'Log findings and decide on physical inspection'
    registros:
      - 'Abnormal noise present at start-up (yes/no)'
      - 'Start-up vibration amplitude [mm/s]'
tags:
  - fretting
  - false brinelling
  - standstill vibration
  - transport
  - commissioning
revisado_em: 2026-07-18
---

## Beginner

**What it is.** Unlike most failure modes of the [[rolamento|rolling bearing]], this one happens **while the machine is stopped, not rotating** — but exposed to some external vibration source (road/rail transport, a neighboring machine in operation, or vibration transmitted through the structure). Since the rotor doesn't turn, the same contact points between balls/rollers and raceways undergo repeated oscillatory micro-movement — too small to be real "rolling," large enough to expel the lubricant film from that specific spot and allow repeated metal-to-metal contact. The result: wear marks on the raceway, exactly at the rolling-element spacing, often with a reddish/blackish tint (oxide) — visually similar to marks from **true brinelling** (static overload deformation), but caused by a completely different mechanism. Hence the name: **false** brinelling.

**How to recognize it in the field.** The symptom only shows up **afterward** — when the machine finally goes into normal operation, it shows abnormal vibration or noise right at start-up, even though it was never operated in an adverse condition. It's one of the few bearing failure modes whose root cause happened **before** the machine even started working.

**Why it matters.** It's extremely common in equipment that goes through long-distance transport, sits in extended storage near other vibrating machines, or is shut down for extended maintenance without a periodic-turning (*barring*) routine. Prevention is simple and cheap (periodically turning the shaft during the standstill, or isolating from external vibration) — but rarely remembered because the damage is invisible until the next start-up.

## Specialist

### Mechanism — fretting without rotation (ISO 15243 §5.3.3.3)

False brinelling is a specific form of **fretting** (ISO 15243 §5.3.3.2) that occurs specifically at rest: the oscillatory micro-movement displaces the lubricant film from the contact zone, exposing the metal asperities to air. The asperities then oxidize (the characteristic red/black oxide) and, as they are "rubbed" again by the next vibration cycle, the oxide is removed by wear — an oxidation-removal cycle that progressively deepens the mark for as long as the vibration persists. **There is no plastic deformation** (unlike true brinelling) — the damage is material loss via chemical friction, not mechanical impact.

### Differentiation — false vs. true brinelling

True brinelling (ISO 15243 §5.5.2, plastic deformation) occurs from **static or impact overload** above the elastic limit — a single hammer blow during mounting, or a shock load, creates a permanent indentation by deformation. False brinelling involves no load beyond normal self-weight/preload — the damage comes entirely from the vibration+oxidation cycle at rest. The post-mortem distinction: true overload indentations have smooth plastic-deformation edges; false brinelling marks have the characteristic oxide and a regular distribution at the rolling-element spacing, with no material deformation beneath the mark.

### Framework A — diagnosis

`Random`: the trigger is entirely **external and episodic** — the presence of ambient vibration during a standstill, unrelated to the bearing's age or operating cycles. There is no "characteristic age" of failure in this mode — a new, just-installed bearing is just as vulnerable as a used one, if exposed to the same standstill-with-vibration conditions.

### Framework B — prescription

The relevant P-F here is atypical: the **damage** occurs during the standstill (not detectable without direct physical inspection), but the **symptom** only emerges at the following start-up — so the highest-value strategy is **operational prevention** (periodic turning during long shutdowns, isolation from external vibration) combined with **inspection at the first start-up** following a risk event. This is a case where the traditional Fw B (continuously monitor the condition in operation) has limited value — the detection moment that matters is commissioning/restart, not the routine route in steady-state operation.

## Engineer

### Why transport vibration is so effective at causing damage

The vibration amplitude needed to cause false brinelling is surprisingly small — studies cite micrometer-scale micro-movements as sufficient, because the mechanism doesn't depend on large displacement, it depends on **repetition**: long-distance road/rail transport accumulates millions of microvibration cycles in just a few days, far more cycles than the machine would accumulate in years of normal operation at the same amplitude — because in normal operation the bearing is **rotating**, redistributing the contact point every revolution, while at rest the same spot is repeatedly loaded with no relief.

### The risk window for standby assets

Standby pumps and motors, kept stopped for long periods but physically close to equipment in operation (same base, same structure), sit in a permanent and frequently forgotten risk window — periodic-turning routines are common on turbines and large critical rotating machines, but rarely applied to medium-sized standby pumps/motors, exactly the assets most exposed to this failure mode by going months or years without turning.

### Connection to other modes' P-F

An untreated false-brinelled bearing continues in operation with localized damage spots that act as concentrators — these spots accelerate the nucleation of subsequent [[fadiga-subsuperficial-rolamento|contact fatigue]], analogous to the particle indentation discussed under [[contaminacao-lubrificante-rolamento|contamination]]. The difference in root cause (standstill vibration vs. in-operation particle) doesn't change the final destination — both create premature nucleation sites on the raceway.
