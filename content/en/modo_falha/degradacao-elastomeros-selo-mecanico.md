---
slug: degradacao-elastomeros-selo-mecanico
tipo_nota: modo_falha
locale: en
titulo: 'Elastomer Degradation'
status: published
taxonomia:
  - selo-mecanico
iso14224_code: 'SE-ELAST'
fontes:
  - 'API 682, 4th ed. — Shaft Sealing Systems for Centrifugal and Rotary Pumps (elastomer chemical compatibility)'
  - 'AESSEAL — API 682 4th edition whitepaper'
  - 'John Crane — official technical documentation (O-ring/elastomer selection)'
  - 'Karassik et al., Pump Handbook, 4th ed. — sealing chapter'
  - 'Bloch & Geitner — Machinery Failure Analysis and Troubleshooting, 4th ed.'
fw_a:
  categoria: wear_out
  beta: '1.5–2.5 (chemical degradation accelerates with temperature — Arrhenius-type behavior)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Semi-annual (visual inspection at interventions) + compatibility review at every fluid/process change'
pf_tipico: 'months to a few years, strongly dependent on temperature and actual chemical compatibility with the fluid'
plano_manutencao:
  - tarefa: 'Review elastomer chemical compatibility at every fluid/process change'
    metodo: 'Check the manufacturer chemical-compatibility table (NBR, EPDM, FKM/Viton, FFKM/Kalrez) against the actual fluid composition and temperature'
    periodicidade: 'At every process fluid, additive or operating temperature range change'
    condicao: 'Documentary review — no shutdown required'
    criterio: 'Specified elastomer within the manufacturer chemical and thermal compatibility range for the actual fluid'
    acao: 'Incompatibility identified → replace the elastomer at the next intervention, even without a visible symptom yet'
    especialidade: 'Process engineering / materials'
    duracao: '0.5 h per review'
    passos:
      - 'Gather the fluid full chemical composition, including expected additives and contaminants'
      - 'Check the installed elastomer manufacturer compatibility table'
      - 'Verify the actual operating temperature range against the material limit'
      - 'Log the decision and, if incompatible, plan the replacement'
    registros:
      - 'Specified vs. recommended elastomer for the fluid'
  - tarefa: 'Visually inspect elastomers at every scheduled intervention'
    metodo: 'Visual inspection of removed O-rings/secondary elements: swelling, hardening, extrusion, cracking'
    periodicidade: 'At every disassembly opportunity (seal replacement, pump maintenance)'
    condicao: 'Seal disassembled'
    criterio: 'Elastomer with no swelling >10-15% apparent volume, no excessive hardening (loss of flexibility) and no extrusion at the retaining gap'
    acao: 'Signs of degradation → replace even if the seal has not leaked yet; investigate chemical/thermal cause before reinstalling the same material'
    especialidade: 'Mechanical'
    duracao: '0.25 h'
    passos:
      - 'Remove and visually inspect each secondary elastomer'
      - 'Assess swelling, hardening and presence of extrusion or cracking'
      - 'Photograph and log the condition for historical comparison'
      - 'Replace if any sign of degradation is present'
    registros:
      - 'Elastomer condition (OK/swollen/hardened/extruded/cracked)'
tags:
  - elastomers
  - chemical compatibility
  - O-ring
  - API 682
revisado_em: 2026-07-18
---

## Beginner

**What it is.** The [[selo-mecanico|mechanical seal]]'s secondary seals (O-rings, or elastomer in a bellows) seal statically and dynamically between the seal, the shaft and the chamber — and unlike the ceramic/carbon faces, they're made of synthetic rubber (NBR, EPDM, FKM/Viton, FFKM/Kalrez, depending on service). Each compound has a specific **chemical and thermal compatibility window**: exposed to a fluid or temperature outside that window, the elastomer swells (absorbs the fluid), hardens (loses plasticity from additional chemical cross-linking), or — in extreme cases — extrudes (gets pushed out of the retaining gap under pressure, once it has lost its original mechanical strength).

**How to recognize it in the field.** It's one of the component's **slowest** failure modes — months to years, depending on the severity of the incompatibility. It's often only discovered when the seal is disassembled for another reason (e.g., a bearing replacement on the same pump), when the elastomer is already visibly compromised but hasn't leaked yet.

**Why it matters.** It's entirely preventable with correct material selection at the original specification — and the typical root cause isn't "low-quality elastomer," it's **incorrect chemical compatibility for the actual fluid**, often because the process changed after the seal's original specification (a new fluid, a new additive, a new temperature range) without the elastomer selection being reviewed.

## Specialist

### The three degradation mechanisms

1. **Swelling**: the elastomer absorbs fluid molecules, swells, and loses its original mechanical sealing properties — the design gap clearance changes, compromising the static/dynamic seal.
2. **Hardening**: additional chemical cross-linking (usually from heat or prolonged exposure to certain fluids) makes the elastomer stiffer and less able to follow axial/thermal movements — it loses the ability to "track" the seal during operation.
3. **Extrusion**: under pressure, an already-degraded elastomer (softened or with reduced mechanical strength) gets pushed into the retaining gap and eventually ruptures — the final and most visible failure mode.

### Framework A — diagnosis

`Wear-out`, **β ≈ 1.5–2.5**: chemical degradation follows Arrhenius-type behavior — the reaction rate (and therefore the degradation rate) roughly doubles for every 10 °C temperature increase, analogous to electrical insulation aging. This means the same chemical incompatibility that would take years to manifest at room temperature can manifest in weeks at an elevated process temperature.

### Framework B — prescription

The highest-value prescription here is **preventive via specification** — reviewing elastomer compatibility whenever the process fluid, additives or temperature range change, before any symptom appears. Visual inspection at scheduled interventions is the second layer, catching degradation already underway before it progresses to extrusion and leakage.

## Engineer

### Why temperature is the dominant variable

Elastomer chemical degradation kinetics roughly follow the Arrhenius equation, with typical activation energy that doubles the reaction rate every ~10 °C — the same mathematical relationship used for electric motor insulation thermal aging (Montsinger's rule). In engineering practice, this means a compatibility review done for the original design temperature loses validity if the process starts chronically operating at a higher temperature, even if still "within nominal range" for the equipment as a whole.

### Why extrusion is the final symptom, not the cause

Unlike [[abrasao-faces-selo-mecanico|face abrasion]], where the damage is visible progressively from the start, elastomer degradation is **invisible** through most of its course — the material swells or hardens internally before any functional failure appears. Extrusion only occurs once mechanical strength has already dropped below what's needed to resist the differential pressure at the gap — at that point, complete failure usually follows quickly. That's why periodic visual inspection (even without a leakage symptom) has real value: it catches swelling/hardening **before** extrusion, in a window where preventive replacement is still simple and cheap.
