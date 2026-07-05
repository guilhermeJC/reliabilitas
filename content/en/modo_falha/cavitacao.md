---
slug: cavitacao
tipo_nota: modo_falha
locale: en
titulo: 'Cavitation'
status: published
taxonomia:
  - transferencia-de-fluidos-liquidos
  - bombas
  - dinamicas
  - bomba-centrifuga
iso14224_code: 'ERO'
fontes:
  - 'Karassik et al., Pump Handbook, 4th ed. (2008), ch. 2'
  - 'ANSI/HI 9.6.1 (2024) — Guideline for NPSH Margin'
  - 'Moubray, RCM II (1997), ch. 8 — P-F interval'
  - 'Nowlan & Heap (1978) — failure rate patterns'
  - 'Pumps & Systems — Cavitation 101'
fw_a:
  categoria: mixed_complex
  beta: 'variable (random operational trigger + progressive erosion β>1)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'P-F/2 (typical monthly inspection; continuous via online monitoring)'
pf_tipico: 'days to weeks (erosion); minutes (severe performance collapse)'
plano_manutencao:
  - tarefa: 'Vibration analysis'
    metodo: 'Spectrum + envelope; broadband high-frequency energy'
    periodicidade: 'Monthly (P-F/2)'
  - tarefa: 'Acoustic inspection'
    metodo: 'Ultrasound/stethoscope at volute and suction ("gravel" noise)'
    periodicidade: 'Monthly, with the vibration route'
  - tarefa: 'Process monitoring'
    metodo: 'Calculated NPSHa vs NPSHr; flow vs BEP; PIMS trending'
    periodicidade: 'Continuous (deviation alarm)'
revisado_em: 2026-07-04
---

## Beginner

**What it is.** Inside a [[bomba-centrifuga|centrifugal pump]], pressure at the impeller inlet can drop below the liquid's **vapor pressure**. The liquid boils locally — vapor bubbles form and, dragged into higher-pressure regions, **collapse violently** against metal surfaces.

**How to recognize it in the field.** Characteristic "pumping gravel" noise, drop in flow and pressure, elevated vibration and — over time — impeller surface pitted like an orange peel.

**Consequences.** Impeller erosion, mechanical seal and bearing damage from vibration, performance loss and, if ignored, functional failure of the pump.

## Specialist

**Mechanism.** Micro-bubble collapse produces micro-jets with extreme local pressures that remove material by surface fatigue. Dominant causes: insufficient available NPSH (low tank level, clogged suction strainer, high temperature), operation far from BEP (suction recirculation) and air ingestion (false cavitation — mandatory differential diagnosis).

**Framework A — diagnosis.** `Mixed/Complex`: the trigger is operational and can appear at any time (random component), but the resulting erosion progresses with time (wear-out component, β>1). Decompose via FMEA when the root cause is recurrent.

**Framework B — prescription.** A detectable P-F exists (vibration, noise, performance trend) and the failure is evident → **CBM at P-F/2**. Tasks in the exportable plan below. The definitive fix is operational/design: restore NPSH margin, move the operating point, anti-cavitation trim.

## Engineer

**Margin criterion (ANSI/HI 9.6.1; API 610):**

NPSHa > NPSHr + margin — typical NPSHa/NPSHr ratio 1.1–2.5 depending on suction energy; API 610 requires NPSHa ≥ NPSHr + 0.6 m at rated point.

**Available NPSH:**

NPSHa = (P_suction − P_vapor)/(ρg) + z − h_f

**Quantitative detection.** Vibration spectrum: broadband high-frequency energy (no dominant discrete peak), modulated by vane passing (BPF = n_vanes × N). Head drop ≥ 3% in the NPSH test defines the catalog NPSHr (HI).

**Reliability.** Treating erosion as wear-out: Weibull with β ≈ 1.5–3 over time under cavitating condition; the observed P-F interval (days to weeks between detectable vibration and functional loss) supports monthly P-F/2 periodicity (Moubray, ch. 8). _Live Weibull calculator lands on Day 3._

**Primary bibliography.** Karassik ch. 2 (NPSH, off-BEP behavior) · ANSI/HI 9.6.1 (margins) · Moubray RCM II ch. 8 (P-F) · Nowlan & Heap (failure patterns).
