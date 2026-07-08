---
slug: bombas
tipo_nota: familia
locale: pt
titulo: 'Bombas'
status: published
taxonomia:
  - adicao-de-energia
iso14224_code: 'PU'
fontes:
  - 'ISO 14224:2016, tabela A.4 (equipment class PU)'
  - 'Hydraulic Institute — ANSI/HI 1.1-1.2 (Rotodynamic Pumps: Nomenclature and Definitions)'
  - 'Karassik et al., Pump Handbook, 4ª ed. (2008), cap. 1'
revisado_em: 2026-07-06
resumo: 'Família de máquinas que adicionam energia a um líquido para movê-lo. O Hydraulic Institute a classifica em cinéticas (rotodinâmicas + efeito especial) e de deslocamento positivo — a escolha do princípio define física, curva e modos de falha.'
---

Máquinas que **adicionam energia a um líquido** para transferi-lo entre pontos do processo — vencendo elevação, pressão e perdas por atrito. Na forma mais comum, um acionador (motor → eixo) converte **energia mecânica** em **energia hidráulica** (pressão + velocidade) no líquido.

## Como a energia é fornecida ao líquido

O que diferencia os equipamentos que movem líquidos não é *se* adicionam energia — todos adicionam — mas **de onde vem essa energia e por qual mecanismo ela é transferida**:

| Equipamento | Fonte da energia | Mecanismo de transferência |
| --- | --- | --- |
| **Bomba** (rotor, pistão, engrenagens) | motor → eixo → elemento mecânico | o elemento mecânico acelera ou desloca o líquido diretamente |
| **Ejetor / eductor** (*jet pump*) | fluido motriz sob alta pressão | um jato motriz arrasta e pressuriza o líquido aspirado (efeito Venturi) |
| **Air lift** (bomba de ar) | ar comprimido (compressor) | o ar injetado reduz a densidade da coluna, que então sobe |
| **Aríete hidráulico** | energia cinética da própria água | o golpe de aríete eleva uma fração da vazão a grande altura |
| **Intensificador hidráulico** | outro circuito hidráulico | converte a pressão de um fluido em pressão maior no outro |

Ponto de norma importante: pela classificação do **Hydraulic Institute**, os três dispositivos sem partes móveis acionados por fluido — **ejetor, air lift e aríete** — não são categorias à parte, e sim **bombas de efeito especial** (*special-effect pumps*), uma subfamília das bombas **cinéticas** (ao lado das rotodinâmicas). O **intensificador** é o único que foge: é um **multiplicador de pressão**, não um transportador de fluido — tratado à parte.

## Princípios de funcionamento

A família divide-se em princípios fundamentais — a escolha entre eles define a física, a curva característica e os modos de falha dominantes:

- [[dinamicas|Rotodinâmicas]] — a energia é transferida continuamente por um impelidor rotativo (equação de Euler); ex.: centrífugas, axiais. Vazão varia com a pressão do sistema.
- [[deslocamento-positivo|Deslocamento positivo]] — volumes discretos são capturados e deslocados (engrenagens, pistão, parafuso). Vazão quase independente da pressão; exige válvula de alívio.
- [[efeito-especial|Efeito especial]] — sem partes móveis, acionadas por fluido ou gás motriz (ejetor, air lift, aríete). Robustas e baratas, com rendimento baixo.

Mais de 80% dos ativos rotativos de uma planta de processo típica são bombas — dominadas pela [[bomba-centrifuga|bomba centrífuga]].
