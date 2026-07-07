---
slug: rolamento
tipo_nota: componente
locale: en
titulo: 'Rolling Bearing'
status: published
taxonomia: []
iso14224_code: 'BE'
resumo: 'Rolling-contact element that supports radial and axial loads with minimum friction. Transversal component (D10): the same physics — Hertzian contact, EHL lubrication, L10 life — governs its failure in pumps, motors and gearboxes.'
fontes:
  - 'ISO 281:2007 — Rolling bearings: dynamic load ratings and rating life'
  - 'ISO 15243:2017 — Rolling bearings: damage and failures — terms, characteristics and causes'
  - 'SKF — Bearing damage analysis with ISO 15243 (Evolution Magazine)'
  - 'Harris & Kotzalas — Rolling Bearing Analysis, 5th ed.'
  - 'Machine Design — The Meaning of Bearing Life (L10 vs MTBF)'
  - 'ABMA 9/11 — Load ratings and fatigue life (American equivalent)'
tags:
  - L10
  - ISO 15243
  - lubrication
  - BPFO
  - contact fatigue
revisado_em: 2026-07-06
---

## Function and contact physics

The bearing replaces sliding with **rolling bodies** (balls or rollers) between rings, cutting the friction coefficient by ~2 orders of magnitude versus a dry plain bearing. The price of that efficiency is an extreme, invisible working condition: the entire load passes through contact areas of **fractions of a millimetre** — the **Hertzian contact** — where compressive stresses reach **1.5 to 3+ GPa**, an order of magnitude above the yield strength of ordinary steel. The material only survives because the stress is compressive, confined and cyclic — and it is precisely that cycle that defines the component's natural death mode: **rolling-contact fatigue**.

Between rolling bodies and raceways there is (or should be) a lubricant film of **0.1 to 1 μm** in the **elastohydrodynamic (EHL)** regime: local pressure is so high that the oil momentarily behaves as a solid and the surfaces deform elastically. The film ratio $\lambda$ (film thickness ÷ composite roughness) is the master predictor of life: $\lambda > 3$ = separated surfaces, full life; $\lambda < 1$ = metal-to-metal contact and accelerated adhesive wear/surface fatigue.

## Rating life — L10 and the bridge to Weibull

Fatigue life is intrinsically statistical. ISO 281 defines the **L10 rating life**: the number of revolutions that **90% of a population** of identical bearings will reach or exceed:

$$L_{10} = \left(\frac{C}{P}\right)^p \quad \text{[million revolutions]}$$

with $C$ = dynamic load rating (catalog), $P$ = equivalent dynamic load and $p = 3$ for balls, $10/3$ for rollers. In hours:

$$L_{10h} = \frac{10^6}{60\,n} \left(\frac{C}{P}\right)^p$$

Three engineering readings the formula hides:

- **Cubic load sensitivity**: 25% overload halves the life. Misalignment, unbalance and off-BEP operation are silent multipliers of $P$.
- **L10 is not MTBF**: median life is ~5× L10; the distribution is Weibull with **β ≈ 1.1–1.5** for genuine fatigue — huge dispersion, predicting early failures in part of the population even with correct design. That is why bearings are natural CBM candidates, never time-based replacement.
- **Modified life** $L_{nm} = a_1 \, a_{ISO} \, L_{10}$ (ISO 281): the $a_{ISO}$ factor incorporates lubrication ($\lambda$), contamination and the fatigue limit — it can move life 1–2 orders of magnitude either way. Contamination and lubrication **are** the design.

## Failure modes — the 6 categories of ISO 15243

ISO 15243:2017 classifies all bearing damage into **6 categories with subcategories**, each with its own morphological signature — an almost perfect mirror of our Framework A:

| ISO 15243 category | Mechanism | Typical Fw A reading |
| --- | --- | --- |
| Contact fatigue (subsurface/surface) | Cracks from Hertzian cycles → spalling | Wear-out (β>1) |
| Wear (abrasive/adhesive) | Particles or metal-to-metal contact (low $\lambda$) | Mixed |
| Corrosion (moisture/frictional — fretting, false brinelling) | Chemistry + micro-movement at standstill | Random/Wear-out |
| Electrical erosion (discharge/leakage current) | VFD arcing → fluting | Mixed (electrical trigger) |
| Plastic deformation (true brinelling, overload) | Impact/static above limit | Random (event) |
| Cracking and fracture | Overload, fitting, defect | Random/Infant |

The practical reading: **spalling is the end of the story, not the beginning** — in most real cases the initiator was lubrication, contamination or mounting (field statistics: ~50% of cases originate in contamination + lubrication). Root-cause diagnosis requires reading the damage **morphology** (ISO 15243), not merely finding the spall.

## Defect frequencies — the vibration signature

Bearing geometry produces deterministic frequencies when a defect meets the rolling bodies — the basis of envelope/demodulation diagnosis:

- **BPFO** (outer race), **BPFI** (inner race), **BSF** (rolling element), **FTF** (cage) — all functions of ball count, diameters and contact angle, tabulated by manufacturers per designation.
- The classic damage progression: ultrasound/acoustic emission (stage 1) → envelope with BPFx (stage 2) → conventional spectrum with harmonics and sidebands (stage 3) → audible noise and temperature (stage 4, days before the end). This ladder is the component's concrete **P-F interval** — weeks to months in the early stages.

## Selection and good practice

- **Standardized designations** (e.g. 6205, 6309, 22220): interchangeable across SKF, Schaeffler/FAG, NSK, Timken — $C$, $C_0$ and defect-frequency data come from the manufacturer's catalog.
- **Mounting** accounts for a relevant share of infant mortality: induction heating (never open flame), pressing on the correct ring, interference fits per catalog.
- **Lubrication**: quantity and regreasing intervals per catalog; excess grease is as lethal as shortage (thermal churning).
- Under **VFD drives**: verify grounding/shaft discharge ring — electrical fluting is epidemic in modern motors.
