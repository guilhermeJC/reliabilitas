---
slug: deslocamento-positivo
tipo_nota: principio
locale: pt
titulo: 'Bombas de Deslocamento Positivo'
status: published
taxonomia:
  - adicao-de-energia
  - bombas
fontes:
  - 'Hydraulic Institute — ANSI/HI 3.1-3.5 (Rotary Pumps) e 6.1-6.5 (Reciprocating Pumps)'
  - 'Karassik et al., Pump Handbook, 4ª ed. (2008), cap. 3'
revisado_em: 2026-07-18
resumo: 'Princípio em que volumes discretos de líquido são capturados e deslocados mecanicamente. Vazão quase independente da pressão (curva vertical) — exige válvula de alívio. Divide-se em alternativas (pistão/diafragma) e rotativas (engrenagem/parafuso/lóbulos).'
ordem: 2
---

Princípio de funcionamento em que **volumes discretos** de líquido são capturados mecanicamente. "Volume discreto" quer dizer isto: em vez de um rotor acelerar continuamente um fluxo (como na [[dinamicas|rotodinâmica]]), aqui uma **câmara de volume fixo e conhecido** se enche de líquido na sucção, se fecha, e é fisicamente deslocada até a descarga — um pistão que avança num cilindro, um par de engrenagens que carrega líquido entre os dentes e a carcaça, um parafuso que empurra o fluido entre seus filetes. Cada ciclo (ou volta) desloca sempre o **mesmo volume**, com folgas internas mínimas — é essa característica, e não o material ou o tamanho, que define o princípio.

Consequência direta: a vazão depende só da geometria da câmara e da velocidade (rotação ou cursos por minuto) — **não** da pressão contra a qual a bomba trabalha. A curva característica Q×P é praticamente **vertical**: a mesma vazão nominal, entregue em qualquer pressão dentro dos limites mecânicos da máquina.

## Por que a válvula de alívio é obrigatória

Numa bomba rotodinâmica sempre existe uma via de escape interna: a folga dos [[bomba-centrifuga|anéis de desgaste]] deixa o líquido recircular do lado de alta pressão de volta para a sucção. Se a descarga for bloqueada, a vazão simplesmente cai a zero e a bomba estabiliza no **head de shutoff** — um valor finito, definido pela própria curva da máquina (ver Bomba Centrífuga, seção Princípio).

A bomba de deslocamento positivo **não tem essa via de escape** — a câmara é vedada por construção, é essa vedação que garante a vazão constante em primeiro lugar. Se a descarga for bloqueada (válvula fechada, linha entupida, filtro obstruído), a bomba **continua tentando deslocar o mesmo volume a cada ciclo** contra um caminho sem saída: a pressão sobe sem limite teórico, até romper o componente mais fraco do sistema — carcaça, flange, mangueira, o próprio elemento de bombeamento. Não é uma possibilidade remota: é a consequência matemática direta de "vazão constante" quando a saída é removida. Por isso, toda instalação de deslocamento positivo tem, **por norma**, uma válvula de alívio (ou de segurança) na linha de descarga, dimensionada para desviar a vazão nominal inteira de volta à sucção ou a um reservatório antes que a pressão de projeto seja excedida — não é um acessório de segurança opcional, é parte do princípio de funcionamento.

## Autoescorvantes

"Autoescorvante" significa que a bomba consegue **evacuar o ar** da própria linha de sucção sozinha, sem precisar que ela já esteja cheia de líquido para começar a funcionar — ao contrário da rotodinâmica, que depende de líquido no rotor para gerar força centrífuga (rotor girando em ar não bombeia nada). Como o elemento de deslocamento positivo (pistão, engrenagem, lóbulo) desloca **qualquer fluido que esteja na câmara** — líquido ou gás — ele também desloca o ar inicialmente preso na linha, ciclo a ciclo, até que o líquido chegue e a bomba passe a bombear normalmente. É por isso que bombas de deslocamento positivo são a escolha natural para escorva de poços profundos, esvaziamento de tanques até o fundo e serviços onde a linha de sucção não pode ser garantida sempre cheia.

## Tipos usuais

*(handbooks por tipo na Fase 1)*

- **Alternativas** — volume confinado por movimento retilíneo, vazão pulsante: pistão, êmbolo (*plunger*) e diafragma (isolamento total do processo — fluidos perigosos);
- **Rotativas** — volume confinado por rotação, vazão mais suave: engrenagens externas e internas, lóbulos, parafuso simples/duplo/triplo, palhetas, **cavidade progressiva** (Mono — a escolha clássica para polpas, lamas e multifásico viscoso), peristáltica (o tubo flexível é o único elemento molhado) e rotor flexível.

Modos de falha dominantes migram das faces de selagem e válvulas (alternativas) para folgas e desgaste de elementos rotativos.

## Vazão quase independente da pressão — comparativo Q×P

O widget abaixo compara as duas respostas lado a lado: feche a válvula de descarga (o mesmo gesto físico nos dois casos) e veja o que acontece. Na rotodinâmica, a vazão cai suavemente até zero — a própria curva da máquina limita o head no shutoff, e nada se rompe. Na deslocamento positivo, a vazão praticamente não se move — é a pressão necessária para mantê-la que dispara, ilustrando exatamente por que a válvula de alívio da seção acima não é opcional.
