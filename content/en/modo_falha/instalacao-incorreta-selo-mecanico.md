---
slug: instalacao-incorreta-selo-mecanico
tipo_nota: modo_falha
locale: en
titulo: 'Incorrect Installation (Infant Mortality)'
status: published
taxonomia:
  - selo-mecanico
iso14224_code: 'SE-INST'
fontes:
  - 'API 682, 4th ed. — Shaft Sealing Systems for Centrifugal and Rotary Pumps (cartridge standard)'
  - 'John Crane — official technical documentation (IOMs per type)'
  - 'Karassik et al., Pump Handbook, 4th ed. — sealing chapter'
  - 'Nowlan & Heap (1978) — infant mortality patterns'
  - 'Moubray, RCM II (1997), ch. 3'
fw_a:
  categoria: infant
  beta: '<1 (classic infant mortality)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Shaft deflection and alignment check at commissioning; intensive monitoring in the first days of operation'
pf_tipico: 'hours to a few days — one of the shortest P-F intervals in the whole component'
plano_manutencao:
  - tarefa: 'Measure shaft deflection at the seal face before start-up'
    metodo: 'Dial gauge at the seal face position, with the shaft turned manually one full revolution'
    periodicidade: 'At every seal installation/replacement, before start-up'
    condicao: 'Pump assembled, shaft coupled, before energizing the motor'
    criterio: 'Total indicated runout (TIR) ≤ 0.05 mm at the seal face position'
    acao: 'Deflection above the limit → fix shaft-coupling alignment before start-up; do not compensate by "waiting for it to settle"'
    especialidade: 'Precision mechanics / alignment'
    duracao: '0.5 h'
    passos:
      - 'Position the dial gauge at the seal face position (or as close as possible)'
      - 'Turn the shaft manually one full revolution, recording the reading at least 4 points'
      - 'Calculate the TIR (total indicated runout, max minus min)'
      - 'If above 0.05 mm, investigate and fix alignment/coupling before proceeding'
    registros:
      - 'TIR measured at the seal face [mm]'
  - tarefa: 'Confirm the cartridge standard was respected (no manual spring-compression field adjustment)'
    metodo: 'Installation checklist: verify the cartridge transport clips/rings were removed in the correct sequence, without manual compression'
    periodicidade: 'At every cartridge seal installation'
    condicao: 'During assembly, before start-up'
    criterio: 'Cartridge installed per the manufacturer IOM — no manual spring-compression adjustment nor premature removal of transport clips'
    acao: 'Procedure deviation identified → re-evaluate the seal before start-up; risk of incorrect face preload'
    especialidade: 'Mechanical'
    duracao: '0.3 h'
    passos:
      - 'Confirm the transport clip/ring removal sequence per the IOM'
      - 'Verify no manual compression adjustment was made in the field'
      - 'Log procedure compliance or deviation'
    registros:
      - 'Cartridge procedure followed per IOM (yes/no)'
tags:
  - infant mortality
  - alignment
  - shaft deflection
  - cartridge
  - API 682
  - commissioning
revisado_em: 2026-07-18
---

## Beginner

**What it is.** Unlike the [[selo-mecanico|mechanical seal]]'s other failure modes, which develop over time in operation, this one happens **at the moment of installation** — and the seal fails early, sometimes within hours or a few days. The most common causes: shaft-coupling misalignment (the seal is designed for a small shaft deflection at the face position — exceeding that limit overloads the faces asymmetrically and locally), or an incorrect manual adjustment on a **cartridge**-type seal — which already comes pre-set at the factory precisely to eliminate that variable, but can still be installed wrong if the transport clips are removed out of sequence or if someone tries to "adjust" the compression manually in the field.

**How to recognize it in the field.** It is the failure mode with the component's **shortest P-F** — often hours to a few days. If a newly installed seal fails quickly, incorrect installation should be the first suspicion, especially if the pump never operated well from the start (unlike a failure that appears after months of normal operation).

**Why it matters.** The API 682 **cartridge** standard was created specifically to eliminate this cause of failure — pre-assembling and pre-setting the entire seal at the factory, removing "field adjustment" as a variable. Even so, shaft misalignment remains a common root cause, because it's a variable **external** to the seal (from the coupling/pump base), not eliminated by the cartridge.

## Specialist

### Why 0.05 mm of deflection is the critical limit

The mechanical seal face operates with micrometer-scale design clearances — a shaft deflection above 0.05 mm at the face position is already enough to introduce a cyclic load variation between the faces on every rotation (the face "hits" slightly harder at one point in the revolution than the opposite one). That asymmetric load accelerates localized wear and can, in severe cases, cause thermal shock or fatigue cracking at the face — the same type of damage that would appear from [[abrasao-faces-selo-mecanico|abrasion]] or thermal fatigue, but with a completely different origin (alignment mechanics, not chemistry or particles).

### The cartridge standard and where it still fails

The cartridge seal eliminates manual spring-compression adjustment — historically the component's largest source of infant mortality before API 682 standardized this format. But the cartridge doesn't fix shaft misalignment, which is a variable of the **pump and coupling**, not the seal — so correctly installing a cartridge seal still requires a shaft deflection check before start-up, even though the seal itself is perfectly pre-set at the factory.

### Framework A — diagnosis

`Infant`, **β < 1** — the classic infant-mortality signature (Nowlan & Heap): failure concentrated in the first few days, decreasing rate afterward. If the seal survives the initial risk window with no symptom, this specific failure mode's risk drops to practically zero, and the component is then governed by the other 4 modes with much longer P-F intervals.

### Framework B — prescription

The correct prescription is not time-based replacement — it is **procedure verification before start-up** (shaft deflection measurement + cartridge procedure confirmation), which attacks the cause directly. There's no sensor or monitoring route that substitutes for this check: once start-up happens with misalignment beyond the limit, damage has already begun accumulating from the first rotation.

## Engineer

### The physics of cyclic loading from misalignment

A shaft misaligned at the seal face position produces a non-circular orbit of the contact point over each rotation — instead of a constant closing load on the faces (as the design assumes), the load varies cyclically, with a peak on every revolution. That cyclic loading, even small in absolute amplitude, is physically analogous to low-cycle fatigue in mechanical components: the face was not designed to withstand cyclic variable load at the same magnitude it withstands static load, and service life under that condition drops sharply relative to the original design.

### Why the symptom can take a while despite damage starting immediately

Unlike [[dry-running-selo-mecanico|dry running]] (destruction in minutes), misalignment damage is cumulative from the first rotation, but the **functional symptom** (perceptible leakage) only appears once accumulated localized wear opens a sufficient leak path — days, not months, but not instantaneous. This reinforces why preventive verification (measuring before operating) is worth far more than any reactive strategy: by the time the symptom appears, a meaningful fraction of the seal's service life has already been consumed by a problem that a few minutes of installation checking would have avoided.
