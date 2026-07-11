---
slug: grundfos-cr
tipo_nota: marca_modelo
locale: en
titulo: 'Grundfos CR'
status: published
taxonomia:
  - adicao-de-energia
  - bombas
  - dinamicas
  - bomba-centrifuga
resumo: 'The reference vertical in-line multistage — 16 sizes, up to 36 stages, with the CRE variant shipping motor and VFD integrated from the factory.'
fontes:
  - 'Grundfos — official CR, CRI, CRN data booklet (api.grundfos.com/literature)'
  - 'Grundfos — product page and Grundfos Product Center (grundfos.com)'
tags:
  - multistage
  - vertical in-line
  - pressure boosting
  - CRE
revisado_em: 2026-07-10
---

## Identification

**Vertical in-line multistage** centrifugal pump by **Grundfos** — the compact answer to high head: impellers stacked in series on a vertical shaft, suction and discharge aligned on the same pipe run, minimal footprint. A family of **16 sizes (CR 1s to CR 255)** and material variants: CR (cast iron/stainless), CRI (304 stainless), CRN (full 316L). The **CRE** variant ships with a **factory-integrated variable-frequency motor** — the pump regulates its own speed to a pressure setpoint.

## Position on the six axes

| Axis | Position |
| --- | --- |
| Hydraulics | Radial (low-$n_q$ stages) |
| Stages | **Multistage — up to 36** |
| Configuration | Vertical in-line |
| Sealing | Sealed (cartridge seal) |
| Standard | — (catalog product; NEMA/IEC motors) |
| Service | Utilities, pressure boosting, industrial water, RO |

## Ranges and construction

| Parameter | Catalog value |
| --- | --- |
| Flow | up to ~340 m³/h (1,500 gpm) |
| Head | up to ~280 m (910 ft) |
| Temperature | −15 °C to +90 °C (standard, per seal) |
| Materials | cast iron · 304 · 316L |

Stamped stainless stages (high efficiency in a small machine), a top-accessible quick-swap cartridge mechanical seal, rigid split coupling. The stages' accumulated axial thrust is carried by the motor bearing — sized for it by the manufacturer.

## Line variants

| Variant | Wetted material / what it solves |
| --- | --- |
| CR | Cast iron + stainless — water and general utilities |
| CRI | 304 stainless — mildly aggressive liquids |
| CRN | Full 316 stainless — chemicals and process |
| CRT | **Titanium** — seawater, chlorides and severe chemicals |
| CRE / CRIE / CRNE | Any of the above with the **E-motor** (factory-integrated VFD, setpoint control) |
| CRNE-HS | High speed — very high pressure with fewer stages |
| CRN-SF | Super-finished internal surfaces — high pressure (systems up to ~50 bar) for water treatment |

## Differentials and points of attention

- **LiqTec**: factory protection against dry running and overtemperature — the architecture's no. 1 sensitivity handled by the manufacturer itself.
- **Top-access cartridge seal**: replacement without unstacking the stages or removing the motor — the line's maintainability argument.
- **Grundfos Product Center**: online selection and curves per duty point — verifiable sizing before purchase.
- **Point of attention**: the stack's axial thrust is carried by the MOTOR bearing — the line is designed for Grundfos motors (MG/MGE); substituting a generic motor requires verifying the thrust bearing.

## Where it shines / limitations

**Shines** in boosting and utilities: high head without extreme speed, minimal vertical footprint, and the electronics ecosystem (CRE + sensors + BMS) that makes the off-the-shelf "smart pumping system" — the opposite end of the spectrum from the API process pump. **Limitations**: clean, cool fluids (stamped stages do not tolerate solids; limited thermal range); stage maintenance requires unstacking; not a platform for severe process or O&G standards.

## Official documentation

- [Grundfos — official site and Product Center](https://www.grundfos.com/) — online selection, curves and sizing.
- [CR/CRI/CRN data booklet (official PDF)](https://api.grundfos.com/literature/Grundfosliterature-6014742.pdf) — ranges, curves and limits per size (D05 — official source).

## Reliability

No published MTBF (the industry rule). The failure profile shifts with the architecture: fewer alignment/baseplate problems (in-line, rigid coupling), a quick-swap cartridge seal — and sensitivity concentrated in water quality (abrasives in the stages) and, on the CRE, in the power electronics. General benchmarks and the failure hierarchy in "Reliability in numbers" in the [[bomba-centrifuga|Centrifugal Pump]] handbook.
