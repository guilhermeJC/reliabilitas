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

ISO 15243:2017 classifies all bearing damage into **6 categories with subcategories**, each with its own morphological signature — an almost perfect mirror of our Framework A. The standard classifies by **observed appearance**, not by isolated root cause, because in practice several mechanisms often act together:

| ISO 15243 category | Subcategory | Appearance | Typical Fw A reading |
| --- | --- | --- | --- |
| **Contact fatigue** (§5.1) | Subsurface (§5.1.2) | Microcracks below the surface at inclusions, propagating into a spall | Wear-out (β>1) — see [[fadiga-subsuperficial-rolamento|dedicated note]] |
| | Surface (§5.1.3) | Microspalling originating at the surface itself | Wear-out, accelerated by low $\lambda$ |
| **Wear** (§5.2) | Abrasive (§5.2.2) | Dull appearance, progressive material removal | Mixed — see [[contaminacao-lubrificante-rolamento|contamination]] |
| | Adhesive (§5.2.3) | Smearing (skidding, galling), material transfer between surfaces | Mixed/Random — see [[falha-lubrificacao-rolamento|lubrication failure]] |
| **Corrosion** (§5.3) | Moisture (§5.3.2) | Deterioration at the rolling-element spacing, typically at standstill | Random |
| | Fretting (§5.3.3.2) | Red/blackish oxidation at the interface, from micro-movement and incorrect fit | Random/Wear-out |
| | False brinelling (§5.3.3.3) | Wear marks at rolling-element spacing + oxidation — see [[falso-brinelamento-rolamento|dedicated note]] | Random |
| **Electrical erosion** (§5.4) | Excessive current (§5.4.2) | Discolored/melted areas, craters from thermal cycling (lightning, poor welding ground) | Random (event) |
| | Leakage current (§5.4.3) | Small, closely-spaced craters, grey washboard pattern — epidemic in VFDs without shaft grounding | Mixed (continuous electrical trigger) |
| **Plastic deformation** (§5.5) | Overload (§5.5.2) | Raceway indentation, nicks on rolling elements, cage/seal damage | Random (event) — see [[montagem-incorreta-rolamento|incorrect mounting]] |
| | Particle (§5.5.3) | Indentation marks from overrolled debris | Mixed |
| **Cracking and fracture** (§5.6) | Forced (§5.6.2) | Complete ring/component separation | Random/Infant |
| | Fatigue (§5.6.3) | Propagating crack through ring or cage | Wear-out |
| | Thermal (§5.6.4) | Cracks perpendicular to the sliding direction | Random (friction event) |

The practical reading: **spalling is the end of the story, not the beginning** — in most real cases the initiator was lubrication, contamination or mounting. SKF field data (Evolution) puts **abrasive wear at roughly 26%**, **surface fatigue at ~16%** and **moisture corrosion at ~14%** of documented occurrences — the three together cover nearly half the cases and point straight at contamination/lubrication as the dominant reliability lever, not metallurgy. Root-cause diagnosis requires reading the damage **morphology** (ISO 15243), not merely finding the spall — hence the 5 failure-mode notes below, each covering the mechanism, the Fw A/B reading and the maintenance plan for one specific category.

## Contamination, lubrication and the $a_{ISO}$ factor

The $L_{10}$ rating life assumes ideal lubrication and no particles — field reality rarely delivers that, and that gap is exactly what the **modified life** (ISO 281:2007) tries to capture:

$$L_{nm} = a_1 \, a_{ISO} \, L_{10}$$

The $a_{ISO}$ factor combines three inputs: the **viscosity ratio** $\kappa$ (actual oil viscosity at operating temperature ÷ the reference viscosity required by the geometry — the direct predictor of $\lambda$), the bearing material's **fatigue load limit** $C_u$, and the **contamination factor** $e_C$ (ISO 4406 cleanliness class, lubrication type — grease, bath, circulating — and bearing size). Engineering narrative: with high $\kappa$ (thick film) and low load, $a_{ISO}$ is barely sensitive to contamination; with low $\kappa$ and load near the limit, the same particle that would be harmless in a well-lubricated system cuts life by 1–2 orders of magnitude. Contamination and lubrication **are not** peripheral care items — together with load, they are the three variables that actually decide whether a bearing reaches anywhere near its catalog L10 or fails at a fraction of it.

## Numerical example — life sensitivity to overload

Deep-groove ball bearing (p=3), $C = 25$ kN, running at $n = 1,800$ rpm with equivalent load $P = 5$ kN:

$$L_{10} = \left(\frac{25}{5}\right)^3 = 125 \text{ million revolutions} \quad\Rightarrow\quad L_{10h} = \frac{10^6}{60 \times 1,800} \times 125 \approx 1,157 \text{ h}$$

A misalignment or unbalance that raises $P$ by 25% (to 6.25 kN) — with nothing else changing — drops $L_{10}$ to $(25/6.25)^3 = 64$ million revolutions: **life is cut in half** purely from the cubic load sensitivity. It is the same calculation, run in reverse, that justifies why precision alignment and balancing are, in practice, bearing-reliability tasks — even without touching the component itself.

## Defect frequencies — the vibration signature

Bearing geometry produces deterministic frequencies when a defect meets the rolling bodies — the basis of envelope/demodulation diagnosis:

- **BPFO** (outer race), **BPFI** (inner race), **BSF** (rolling element), **FTF** (cage) — all functions of ball count, diameters and contact angle, tabulated by manufacturers per designation.
- The classic damage progression: ultrasound/acoustic emission (stage 1) → envelope with BPFx (stage 2) → conventional spectrum with harmonics and sidebands (stage 3) → audible noise and temperature (stage 4, days before the end). This ladder is the component's concrete **P-F interval** — weeks to months in the early stages.

## Selection and good practice

- **Standardized designations** (e.g. 6205, 6309, 22220): interchangeable across SKF, Schaeffler/FAG, NSK, Timken — $C$, $C_0$ and defect-frequency data come from the manufacturer's catalog.
- **Mounting** accounts for a relevant share of infant mortality: induction heating (never open flame), pressing on the correct ring, interference fits per catalog.
- **Lubrication**: quantity and regreasing intervals per catalog; excess grease is as lethal as shortage (thermal churning).
- Under **VFD drives**: verify grounding/shaft discharge ring — electrical fluting is epidemic in modern motors.
