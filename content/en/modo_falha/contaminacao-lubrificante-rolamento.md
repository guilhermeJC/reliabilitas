---
slug: contaminacao-lubrificante-rolamento
tipo_nota: modo_falha
locale: en
titulo: 'Lubricant Contamination'
status: published
taxonomia:
  - rolamento
iso14224_code: 'BE-CONT'
fontes:
  - 'ISO 15243:2017 — §5.2.2 (abrasive wear) and §5.5.3 (particle indentation)'
  - 'ISO 281:2007 — contamination factor $e_C$ in the $a_{ISO}$ calculation'
  - 'ISO 4406:2021 — Fluid cleanliness code classification'
  - 'SKF Evolution — Bearing damage analysis with ISO 15243'
  - 'Precision Lubrication — How Contamination Impacts Rolling Element Bearing Life'
  - 'Water Tech (2022) — Centrifugal Pump Bearings: Tips for Improving Reliability and Reducing Failure (52% statistic)'
  - 'Moubray, RCM II (1997), ch. 3 — failure patterns and infant mortality'
fw_a:
  categoria: mixed_complex
  beta: '1.0–1.3 (accelerates fatigue/wear; particle-ingress trigger is random)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Quarterly oil analysis (routine route); continuous via particle sensor on critical assets'
pf_tipico: 'months (mild progressive contamination) to weeks (acute ingress from seal/gasket failure)'
plano_manutencao:
  - tarefa: 'Oil analysis — particle count and ISO 4406 code'
    metodo: 'Standardized sampling (live mid-stream point, clean bottle) + laser particle counter; ISO 4406 code (e.g. 18/16/13)'
    periodicidade: 'Quarterly; monthly on critical assets or with a contamination history'
    condicao: 'System in normal operation for at least 30 min (representative suspended particles)'
    criterio: 'ISO 4406 code within the manufacturer target for the bearing/system (typically 16/14/11 to 18/16/13 depending on criticality)'
    acao: 'Code above target → investigate the ingress path (seal, breather, oil change) and consider added filtration (kidney-loop) before intervening on the bearing'
    especialidade: 'Predictive / oil analysis'
    duracao: '0.25 h collection + lab'
    passos:
      - 'Collect sample at a representative point (return line or turbulent reservoir), never from a static bottom'
      - 'Use a certified clean bottle and avoid contaminating the sample during collection'
      - 'Send for laser particle counting and ISO 4406 coding'
      - 'Compare the code with the defined target for the system'
      - 'If out of target, investigate the ingress path before any corrective action on the bearing'
    registros:
      - 'ISO 4406 code (e.g. XX/XX/XX)'
      - 'Particle count by size range [particles/mL]'
  - tarefa: 'Inspect seals, gaskets and breathers'
    metodo: 'Visual inspection + desiccant breather check (if fitted)'
    periodicidade: 'Quarterly, alongside oil change/analysis'
    condicao: 'Machine stopped, safe access to the housing'
    criterio: 'Seals without visible drying/cracking; breather unobstructed and desiccant not saturated (indicator color)'
    acao: 'Compromised seal → replace before it becomes an ingress path; saturated breather → replace desiccant element'
    especialidade: 'Mechanical'
    duracao: '0.3 h'
    passos:
      - 'Visually inspect sealing lips and seals for drying, cracking or wear'
      - 'Check the desiccant breather indicator color (if fitted)'
      - 'Log findings and replace compromised components'
    registros:
      - 'Seal condition (OK/degraded)'
      - 'Breather condition (OK/saturated)'
tags:
  - ISO 4406
  - contamination
  - oil analysis
  - aISO
  - abrasive wear
revisado_em: 2026-07-18
---

## Beginner

**What it is.** A [[rolamento|rolling bearing]] depends on an extremely thin lubricant film (fractions of a micrometer) to separate the moving surfaces. When solid particles — dust, rust, manufacturing residue, or wear debris from other components — enter that oil or grease, they get "trapped" between the surfaces and act like miniature sandpaper: each pass scratches and removes a bit of material, in a process called **abrasive wear**. Particles larger than the lubricant film itself can also be "run over" by the rolling elements, leaving indentation marks on the raceway — spots where fatigue will nucleate sooner.

**How to recognize it in the field.** It is one of the few failure modes that can be detected **before it even shows up in vibration** — a simple oil sample sent for lab analysis (particle counting) reveals the problem months in advance. Classic entry paths: a dried-out shaft seal, an unfiltered/non-desiccant breather, an oil change in a dirty environment, or wear debris from another component circulating in the same oil line.

**Why it matters.** The field statistic is stark: industry studies attribute roughly **half of premature pump bearing failures** to the combination of contamination + inadequate lubrication — more than any other single factor, including "pure" material fatigue. It is also one of the **cheapest failure modes to prevent**: quarterly oil analysis costs a fraction of an unplanned outage.

## Specialist

### Mechanism — abrasive wear and particle indentation (ISO 15243 §5.2.2/§5.5.3)

The standard distinguishes two signatures depending on particle size relative to the EHL film thickness: particles **smaller** than the film stay suspended and produce **diffuse abrasive wear** (progressive dull appearance on the raceway); particles **larger** than the film get squeezed between the surfaces and leave **discrete indentations** — each indentation later becomes a stress concentrator that accelerates [[fadiga-subsuperficial-rolamento|contact fatigue]]. In other words: contamination is rarely the final cause recorded in a failure report (which usually says "spalling") — it is the **silent initiator** that brings forward, by years, a fatigue event that would otherwise take much longer to appear.

### The metric that matters: ISO 4406, not "dirty oil"

ISO 4406 expresses cleanliness as three numbers (e.g. 18/16/13) — particle counts ≥4 μm, ≥6 μm and ≥14 μm per mL, on a logarithmic scale: **each point lower in the code represents half the particles of that size**. There is no such thing as "clean oil" in the abstract — there is a specific target per system, set by the bearing manufacturer as a function of criticality and expected film thickness (κ). High-precision systems (turbomachinery, high-speed bearings) demand lower (cleaner) codes than low-criticality applications.

### Framework A — diagnosis

`Mixed/Complex`: the **particle-ingress trigger is operational/environmental** (seal failure, a poorly executed oil change, a dusty environment) — typically random in time — but once present, contamination **accelerates** a progressive wear process (β slightly above 1 in accumulated damage). This is why the category blends both patterns: uncontrolled, behavior tends toward Random (ingress event); with chronic untreated ingress, it tends toward accelerated Wear-out.

### Framework B — prescription

**CBM via oil analysis**, with the advantage of detecting the cause **before** any vibration signal appears — particle analysis is, in practice, the earliest P-F available for this failure mode, earlier even than the [[fadiga-subsuperficial-rolamento|fatigue]] ultrasound stage. The seal/breather inspection task attacks the **cause** (ingress path), while oil analysis monitors the **condition** (contamination level already present) — the two complement each other.

## Engineer

### The contamination factor $e_C$ and its relation to $\kappa$

ISO 281:2007 models the contamination effect through the factor $e_C$, which feeds into the $a_{ISO}$ calculation (see [[rolamento|Rolling Bearing]]) together with the viscosity ratio $\kappa$ and the fatigue load limit $C_u$. The relationship is **neither linear nor independent**: with high $\kappa$ (thick film, $\lambda > 3$), the same contamination level has a small impact on $a_{ISO}$ — the film keeps particles away from real contact; with low $\kappa$, the same ISO 4406 code can reduce $a_{ISO}$ by one to two orders of magnitude. In engineering practice, this means that **investing in correct viscosity and a thick film is also a defense against contamination** — the two variables interact, they do not act in isolation.

### Why 4 μm, 6 μm and 14 μm in ISO 4406

The standard's three size thresholds are not arbitrary: particles in the **4–6 μm** range are comparable in size to the typical EHL film thickness in precision bearings — they most efficiently pierce the film and generate localized indentation/abrasion; particles **≥14 μm** are already visible to the naked eye on filter inspection and correlate with coarser wear from upstream components (lubrication pumps, gears). A system can have a low count of large particles and still suffer life degradation from excess in the fine range — hence the requirement for a three-number code, not a single aggregate value.

### Interaction with the component's other failure modes

Contamination rarely acts alone: abrasive particles that damage the surface locally reduce film thickness, creating conditions that favor secondary [[falha-lubrificacao-rolamento|lubrication failure]]; and a post-mortem of a bearing with a chronic contamination history frequently shows dispersed (not concentrated) spalling — the characteristic signature of multiple indentations acting as distributed nucleation sites — distinct from the concentrated spalling of pure Hertzian fatigue.
