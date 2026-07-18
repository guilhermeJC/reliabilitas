---
slug: instalacao-incorreta-selo-mecanico
tipo_nota: modo_falha
locale: pt
titulo: 'Instalação Incorreta (Mortalidade Infantil)'
status: published
taxonomia:
  - selo-mecanico
iso14224_code: 'SE-INST'
fontes:
  - 'API 682, 4ª ed. — Shaft Sealing Systems for Centrifugal and Rotary Pumps (padrão cartucho)'
  - 'John Crane — documentação técnica oficial (IOMs por tipo)'
  - 'Karassik et al., Pump Handbook, 4ª ed. — capítulo de selagem'
  - 'Nowlan & Heap (1978) — padrões de mortalidade infantil'
  - 'Moubray, RCM II (1997), cap. 3'
fw_a:
  categoria: infant
  beta: '<1 (mortalidade infantil clássica)'
fw_b:
  tem_pf: true
  evidente: true
  decisao: cbm
  periodicidade: 'Verificação de deflexão de eixo e alinhamento no comissionamento; monitoramento intensivo nos primeiros dias de operação'
pf_tipico: 'horas a poucos dias — um dos P-F mais curtos de todo o componente'
plano_manutencao:
  - tarefa: 'Medir deflexão de eixo na face do selo antes do start-up'
    metodo: 'Relógio comparador na posição da face do selo, com o eixo girado manualmente uma volta completa'
    periodicidade: 'Em toda instalação/troca de selo, antes do start-up'
    condicao: 'Bomba montada, eixo acoplado, antes de energizar o motor'
    criterio: 'Deflexão total indicada (TIR) ≤ 0,05 mm na posição da face do selo'
    acao: 'Deflexão acima do limite → corrigir alinhamento eixo-acoplamento antes do start-up; não compensar "esperando acomodar"'
    especialidade: 'Mecânica de precisão / alinhamento'
    duracao: '0,5 h'
    passos:
      - 'Posicionar o relógio comparador na posição da face do selo (ou o mais próximo possível)'
      - 'Girar o eixo manualmente uma volta completa, registrando a leitura em pelo menos 4 pontos'
      - 'Calcular o TIR (indicador total de leitura, máximo menos mínimo)'
      - 'Se acima de 0,05 mm, investigar e corrigir alinhamento/acoplamento antes de prosseguir'
    registros:
      - 'TIR medido na face do selo [mm]'
  - tarefa: 'Confirmar que o padrão cartucho foi respeitado (sem ajuste manual de compressão de mola em campo)'
    metodo: 'Checklist de instalação: verificar se os grampos/anéis de transporte do cartucho foram removidos na sequência correta, sem forçar compressão manual'
    periodicidade: 'Em toda instalação de selo cartucho'
    condicao: 'Durante a montagem, antes do start-up'
    criterio: 'Cartucho instalado conforme o IOM do fabricante — sem ajuste manual de compressão de mola nem remoção prematura dos grampos de transporte'
    acao: 'Desvio do procedimento identificado → reavaliar o selo antes do start-up; risco de pré-carga incorreta nas faces'
    especialidade: 'Mecânica'
    duracao: '0,3 h'
    passos:
      - 'Confirmar a sequência de remoção dos grampos/anéis de transporte conforme o IOM'
      - 'Verificar que nenhum ajuste manual de compressão foi feito em campo'
      - 'Registrar conformidade ou desvio do procedimento'
    registros:
      - 'Procedimento de cartucho seguido conforme IOM (sim/não)'
tags:
  - mortalidade infantil
  - alinhamento
  - deflexão de eixo
  - cartucho
  - API 682
  - comissionamento
revisado_em: 2026-07-18
---

## Beginner

**O que é.** Diferente dos outros modos de falha do [[selo-mecanico]], que se desenvolvem ao longo do tempo em operação, este acontece **no momento da instalação** — e o selo falha cedo, às vezes em horas ou poucos dias. As causas mais comuns: desalinhamento eixo-acoplamento (o selo é projetado para uma pequena deflexão de eixo na posição da face — passar desse limite sobrecarrega as faces de forma assimétrica e localizada), ou ajuste manual incorreto de um selo do tipo **cartucho** — que já vem pré-ajustado de fábrica exatamente para eliminar essa variável, mas ainda assim pode ser instalado errado se os grampos de transporte forem removidos fora de sequência ou se alguém tentar "ajustar" a compressão manualmente em campo.

**Como reconhece em campo.** É o modo de falha com o **P-F mais curto** do componente — muitas vezes horas a poucos dias. Se um selo recém-instalado falha rapidamente, instalação incorreta deve ser a primeira suspeita, especialmente se a bomba nunca operou bem desde o início (diferente de uma falha que aparece depois de meses de operação normal).

**Por que importa.** O padrão **cartucho** da API 682 foi criado especificamente para eliminar esta causa de falha — pré-montando e pré-ajustando o selo inteiro de fábrica, removendo o "ajuste em campo" como variável. Ainda assim, desalinhamento de eixo continua sendo uma causa raiz comum, porque é uma variável **externa** ao selo (do acoplamento/base da bomba), não eliminada pelo cartucho.

## Specialist

### Por que 0,05 mm de deflexão é o limite crítico

A face do selo mecânico opera com folgas de projeto da ordem de micrômetros — uma deflexão de eixo de mais de 0,05 mm na posição da face já é suficiente para introduzir uma variação cíclica de carga entre as faces a cada rotação (a face "bate" ligeiramente mais forte num ponto do giro do que no oposto). Essa carga assimétrica acelera desgaste localizado e pode, em casos severos, causar choque térmico ou trinca por fadiga na face — o mesmo tipo de dano que apareceria por [[abrasao-faces-selo-mecanico|abrasão]] ou fadiga térmica, mas com origem completamente diferente (mecânica de alinhamento, não química ou de partículas).

### O padrão cartucho e onde ele ainda falha

O selo cartucho elimina o ajuste manual de compressão de mola — historicamente a maior fonte de mortalidade infantil do componente antes da API 682 padronizar esse formato. Mas o cartucho não corrige desalinhamento de eixo, que é uma variável da **bomba e do acoplamento**, não do selo — por isso a instalação correta de um selo cartucho ainda exige verificação de deflexão de eixo antes do start-up, mesmo que o selo em si esteja perfeitamente pré-ajustado de fábrica.

### Framework A — diagnóstico

`Infant`, **β < 1** — a assinatura clássica de mortalidade infantil (Nowlan & Heap): falha concentrada nos primeiros dias, taxa decrescente depois. Se o selo sobrevive à janela inicial de risco sem sintoma, o risco específico deste modo de falha cai a praticamente zero, e o componente passa a ser governado pelos outros 4 modos com P-F muito mais longos.

### Framework B — prescrição

A prescrição correta não é troca por tempo — é **verificação de procedimento antes do start-up** (medição de deflexão de eixo + confirmação do procedimento de cartucho), que ataca a causa diretamente. Não há sensor ou rota de monitoramento que substitua essa verificação: uma vez que o start-up acontece com desalinhamento fora do limite, o dano já começou a se acumular desde a primeira rotação.

## Engineer

### A física da carga cíclica por desalinhamento

Um eixo desalinhado na posição da face do selo produz uma órbita não-circular do ponto de contato ao longo de cada rotação — em vez de uma carga de fechamento constante nas faces (como o projeto assume), a carga varia ciclicamente, com um pico a cada volta. Esse carregamento cíclico, mesmo que pequeno em amplitude absoluta, é fisicamente análogo à fadiga de baixo ciclo em componentes mecânicos: a face não foi projetada para suportar carga variável cíclica na mesma magnitude que suporta carga estática, e a vida útil sob essa condição cai drasticamente frente ao projeto original.

### Por que o sintoma pode demorar apesar do dano começar imediatamente

Diferente do [[dry-running-selo-mecanico|dry running]] (destruição em minutos), o dano por desalinhamento é cumulativo desde a primeira rotação, mas o **sintoma funcional** (vazamento perceptível) só aparece quando o desgaste localizado acumulado abre um caminho de vazamento suficiente — dias, não meses, mas não instantâneo. Isso reforça por que a verificação preventiva (medir antes de operar) vale muito mais que qualquer estratégia reativa: pelo tempo em que o sintoma aparece, uma fração relevante da vida útil do selo já foi consumida por um problema evitável em minutos de verificação na instalação.
