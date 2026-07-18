---
slug: degradacao-elastomeros-selo-mecanico
tipo_nota: modo_falha
locale: pt
titulo: 'Degradação de Elastômeros'
status: published
taxonomia:
  - selo-mecanico
iso14224_code: 'SE-ELAST'
fontes:
  - 'API 682, 4ª ed. — Shaft Sealing Systems for Centrifugal and Rotary Pumps (compatibilidade química de elastômeros)'
  - 'AESSEAL — whitepaper API 682 4ª edição'
  - 'John Crane — documentação técnica oficial (seleção de O-rings/elastômeros)'
  - 'Karassik et al., Pump Handbook, 4ª ed. — capítulo de selagem'
  - 'Bloch & Geitner — Machinery Failure Analysis and Troubleshooting, 4ª ed.'
fw_a:
  categoria: wear_out
  beta: '1,5–2,5 (degradação química acelera com temperatura — comportamento tipo Arrhenius)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Semestral (inspeção visual em intervenções) + revisão de compatibilidade a cada mudança de fluido/processo'
pf_tipico: 'meses a poucos anos, fortemente dependente da temperatura e da compatibilidade química real com o fluido'
plano_manutencao:
  - tarefa: 'Revisar compatibilidade química do elastômero a cada mudança de fluido/processo'
    metodo: 'Consulta a tabela de compatibilidade química do fabricante (NBR, EPDM, FKM/Viton, FFKM/Kalrez) contra a composição e temperatura reais do fluido'
    periodicidade: 'A cada mudança de fluido de processo, aditivo ou faixa de temperatura de operação'
    condicao: 'Revisão documental — não exige parada'
    criterio: 'Elastômero especificado dentro da faixa de compatibilidade química e térmica do fabricante para o fluido real'
    acao: 'Incompatibilidade identificada → trocar o elastômero na próxima intervenção, mesmo sem sintoma visível ainda'
    especialidade: 'Engenharia de processo / materiais'
    duracao: '0,5 h por revisão'
    passos:
      - 'Levantar composição química completa do fluido, incluindo aditivos e contaminantes esperados'
      - 'Consultar a tabela de compatibilidade do fabricante do elastômero instalado'
      - 'Verificar a faixa de temperatura real de operação contra o limite do material'
      - 'Registrar a decisão e, se incompatível, planejar a troca'
    registros:
      - 'Elastômero especificado vs. recomendado para o fluido'
  - tarefa: 'Inspecionar visualmente elastômeros em toda intervenção programada'
    metodo: 'Inspeção visual de O-rings/elementos secundários removidos: inchamento, endurecimento, extrusão, trincas'
    periodicidade: 'Em toda oportunidade de desmontagem (troca de selo, manutenção da bomba)'
    condicao: 'Selo desmontado'
    criterio: 'Elastômero sem inchamento >10-15% de volume aparente, sem endurecimento excessivo (perda de flexibilidade) e sem extrusão na fresta de retenção'
    acao: 'Sinais de degradação → substituir mesmo que o selo ainda não tenha vazado; investigar causa química/térmica antes de reinstalar o mesmo material'
    especialidade: 'Mecânica'
    duracao: '0,25 h'
    passos:
      - 'Remover e inspecionar visualmente cada elastômero secundário'
      - 'Avaliar inchamento, endurecimento e presença de extrusão ou trincas'
      - 'Fotografar e registrar o estado para comparação histórica'
      - 'Substituir se qualquer sinal de degradação estiver presente'
    registros:
      - 'Estado do elastômero (OK/inchado/endurecido/extrudado/trincado)'
tags:
  - elastômeros
  - compatibilidade química
  - O-ring
  - API 682
revisado_em: 2026-07-18
---

## Beginner

**O que é.** As vedações secundárias do [[selo-mecanico]] (O-rings, ou elastômero no fole) selam estática e dinamicamente entre o selo, o eixo e a câmara — e, ao contrário das faces cerâmicas/carbono, são feitas de borracha sintética (NBR, EPDM, FKM/Viton, FFKM/Kalrez, conforme o serviço). Cada composto tem uma **janela de compatibilidade química e térmica** específica: exposto a um fluido ou temperatura fora dessa janela, o elastômero incha (absorve o fluido), endurece (perde plasticidade por reticulação química adicional), ou — em casos extremos — extruda (é empurrado para fora da fresta de retenção sob pressão, uma vez que perdeu a resistência mecânica original).

**Como reconhece em campo.** É um dos modos de falha mais **lentos** do componente — meses a anos, dependendo da severidade da incompatibilidade. Muitas vezes só é descoberto na desmontagem do selo por outro motivo (troca de rolamento na mesma bomba, por exemplo), quando o elastômero já está visivelmente comprometido mas ainda não vazou.

**Por que importa.** É inteiramente evitável com a seleção correta de material na especificação original — e a causa raiz típica não é "elastômero de baixa qualidade", é **compatibilidade química incorreta para o fluido real**, muitas vezes porque o processo mudou depois da especificação original do selo (novo fluido, novo aditivo, nova faixa de temperatura) sem que a seleção de elastômero fosse revisada.

## Specialist

### Os três mecanismos de degradação

1. **Inchamento (swelling)**: o elastômero absorve moléculas do fluido, incha, e perde as propriedades mecânicas originais de vedação — a folga de projeto na fresta muda, comprometendo a vedação estática/dinâmica.
2. **Endurecimento**: reticulação química adicional (geralmente por calor ou exposição prolongada a certos fluidos) torna o elastômero mais rígido e menos capaz de acompanhar movimentos axiais/térmicos — perde a capacidade de "seguir" o selo durante a operação.
3. **Extrusão**: sob pressão, um elastômero já degradado (amolecido ou com resistência mecânica reduzida) é empurrado para dentro da fresta de retenção e eventualmente rompe — o modo final e mais visível de falha.

### Framework A — diagnóstico

`Wear-out`, **β ≈ 1,5–2,5**: a degradação química segue comportamento tipo Arrhenius — a taxa de reação (e portanto a taxa de degradação) aproximadamente dobra a cada 10 °C de aumento de temperatura, de forma análoga ao envelhecimento de isolamento elétrico. Isso significa que a mesma incompatibilidade química que levaria anos para se manifestar a temperatura ambiente pode se manifestar em semanas a uma temperatura de processo elevada.

### Framework B — prescrição

A prescrição de maior valor aqui é **preventiva por especificação** — revisar a compatibilidade do elastômero sempre que o fluido de processo, aditivos ou faixa de temperatura mudarem, antes que qualquer sintoma apareça. A inspeção visual em intervenções programadas é a segunda camada, capturando degradação já em curso antes que progrida para extrusão e vazamento.

## Engineer

### Por que a temperatura é a variável dominante

A cinética de degradação química de elastômeros segue aproximadamente a equação de Arrhenius, com energia de ativação típica que faz a taxa de reação dobrar a cada ~10 °C — a mesma relação matemática usada para o envelhecimento térmico de isolamento de motores elétricos (regra de Montsinger). Na prática de engenharia, isso significa que uma revisão de compatibilidade feita para a temperatura de projeto original perde validade se o processo passa a operar de forma crônica em temperatura mais alta, mesmo que ainda "dentro da faixa nominal" do equipamento como um todo.

### Por que a extrusão é o sintoma final, não a causa

Ao contrário da [[abrasao-faces-selo-mecanico|abrasão das faces]], onde o dano é visível progressivamente desde o início, a degradação de elastômeros é **invisível** durante a maior parte do seu curso — o material incha ou endurece internamente antes de qualquer falha funcional aparecer. A extrusão só ocorre quando a resistência mecânica já caiu abaixo do necessário para resistir à pressão diferencial na fresta — nesse ponto, a falha completa costuma seguir rapidamente. É por isso que a inspeção visual periódica (mesmo sem sintoma de vazamento) tem valor real: ela captura o inchamento/endurecimento **antes** da extrusão, numa janela onde a substituição preventiva ainda é simples e barata.
