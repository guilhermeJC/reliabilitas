// Textos do DOCUMENTO de plano de manutenção (melhoria 3 do fundador, 10/07)
// — o template RELIABILITAS aplicado a todo plano exportado (CSV/MD), moldado
// no exemplo real de plano industrial fornecido pelo fundador (informações
// gerais → identificação → escopo/segurança → tarefas com procedimento e
// registros → restabelecimento → validação com assinaturas).
//
// Vivem AQUI (módulo TS por locale) e não em messages/*.json de propósito: o
// catálogo next-intl inteiro é serializado no HTML de toda página (hurdle do
// Dia 5) — estes textos só precisam existir nas páginas de modo de falha.

import type { Locale } from '@/lib/content/schema';

export interface TextosPlanoDoc {
  tagline: string;
  site: string;
  tituloPorDecisao: Record<string, string>;
  tituloGenerico: string;
  disclaimerTitulo: string;
  // {modo} e {equipamento} são substituídos na geração.
  disclaimer: string;
  secClassificacao: string;
  secInfoGerais: string;
  secEscopo: string;
  secResumo: string;
  secTarefa: string;
  secRestabelecimento: string;
  secValidacao: string;
  campo: string;
  valor: string;
  equipamento: string;
  modoFalha: string;
  fwA: string;
  fwB: string;
  pfTipico: string;
  periodicidade: string;
  condicao: string;
  metodo: string;
  tarefa: string;
  criterio: string;
  acao: string;
  especialidade: string;
  duracao: string;
  procedimento: string;
  registros: string;
  parametro: string;
  valorMedido: string;
  passo: string;
  registro: string;
  local: string;
  tag: string;
  fabricanteModelo: string;
  sistema: string;
  dataPrimeiraOrdem: string;
  preenchimento: string; // placeholder de campo a preencher
  escopoItens: string[];
  restabelecimentoItens: string[];
  executadoPor: string;
  aprovadoPor: string;
  auditadoPor: string;
  assinatura: string;
  data: string;
  desvio: string;
  desvioMotivo: string;
  sim: string;
  nao: string;
  geradoPor: string;
  revisado: string;
  metodologia: string;
}

const PT: TextosPlanoDoc = {
  tagline: 'Conhecimento de confiabilidade industrial, aberto a todos',
  site: 'reliabilitas.io',
  tituloPorDecisao: {
    cbm: 'PLANO DE MANUTENÇÃO PREDITIVA (CBM)',
    tbm: 'PLANO DE MANUTENÇÃO PREVENTIVA (TBM)',
    proof_test: 'PLANO DE BUSCA DE FALHA (PROOF TEST)',
  },
  tituloGenerico: 'PLANO DE MANUTENÇÃO',
  disclaimerTitulo: 'FOCO NO MODO DE FALHA',
  disclaimer:
    'Este plano existe para combater especificamente o modo de falha "{modo}" em "{equipamento}". Na metodologia RELIABILITAS (Framework A → Framework B), plano de manutenção periódico só é tecnicamente válido para modos de falha com decisão TBM ou CBM. Para falhas aleatórias sem P-F detectável, falhas ocultas ou mortalidade infantil, plano periódico NÃO faz sentido — a resposta correta é outra (RTF + gestão de sobressalentes, proof test, controle de qualidade na montagem). A classificação que fundamenta este plano está na seção 1.',
  secClassificacao: 'CLASSIFICAÇÃO DO MODO DE FALHA (O PORQUÊ DESTE PLANO)',
  secInfoGerais: 'INFORMAÇÕES GERAIS E IDENTIFICAÇÃO',
  secEscopo: 'ESCOPO TÉCNICO E SEGURANÇA',
  secResumo: 'RESUMO DAS TAREFAS',
  secTarefa: 'TAREFA',
  secRestabelecimento: 'RESTABELECIMENTO OPERACIONAL',
  secValidacao: 'VALIDAÇÃO E ASSINATURAS',
  campo: 'Campo',
  valor: 'Valor',
  equipamento: 'Equipamento',
  modoFalha: 'Modo de falha',
  fwA: 'Fw A (diagnóstico)',
  fwB: 'Fw B (prescrição)',
  pfTipico: 'Intervalo P-F típico',
  periodicidade: 'Periodicidade',
  condicao: 'Condição de contorno',
  metodo: 'Método',
  tarefa: 'Tarefa',
  criterio: 'Critério de aceitação',
  acao: 'Ação em desvio',
  especialidade: 'Especialidade',
  duracao: 'Tempo estimado',
  procedimento: 'Procedimento',
  registros: 'Registros — valores medidos',
  parametro: 'Parâmetro / medição',
  valorMedido: 'Valor medido',
  passo: 'Passo',
  registro: 'Registro',
  local: 'Local de instalação',
  tag: 'TAG do equipamento',
  fabricanteModelo: 'Fabricante / modelo',
  sistema: 'Sistema',
  dataPrimeiraOrdem: 'Data da 1ª ordem',
  preenchimento: '[ __________ ]',
  escopoItens: [
    'Solicitar Permissão de Trabalho junto à operação/segurança antes do início.',
    'Medições preditivas (vibração, ultrassom, parâmetros de processo) são feitas com o equipamento EM OPERAÇÃO, em condição de carga estável — registrar o ponto de operação junto com cada medição.',
    'Qualquer intervenção intrusiva exige bloqueio e etiquetagem (LOTO), drenagem e despressurização confirmadas antes da abertura.',
    'Qualquer situação anormal: comunicar imediatamente o responsável de manutenção/engenharia.',
    'Manter o local limpo e organizado; encerrar a Permissão de Trabalho ao final.',
  ],
  restabelecimentoItens: [
    'Equipamento remontado, proteções recolocadas e sistema alinhado (quando houve intervenção)',
    'Liberação para operação comunicada ao operador da área',
    'Primeira operação após a manutenção acompanhada',
    'Valores medidos e anomalias registrados no CMMS com código de falha padronizado',
    'Tendências (vibração/processo) atualizadas e limiares de alarme revisados',
  ],
  executadoPor: 'EXECUTADO POR (nome/matrícula)',
  aprovadoPor: 'APROVADO POR (nome/matrícula)',
  auditadoPor: 'AUDITADO POR (nome/matrícula)',
  assinatura: 'Assinatura',
  data: 'Data',
  desvio: 'HOUVE DESVIO DE PLANEJAMENTO?',
  desvioMotivo: 'Motivo do desvio',
  sim: 'SIM',
  nao: 'NÃO',
  geradoPor: 'Gerado por RELIABILITAS',
  revisado: 'Conteúdo revisado em',
  metodologia: 'Metodologia: Framework A (diagnóstico) → Framework B (prescrição)',
};

const EN: TextosPlanoDoc = {
  tagline: 'Industrial reliability knowledge, open to everyone',
  site: 'reliabilitas.io',
  tituloPorDecisao: {
    cbm: 'PREDICTIVE MAINTENANCE PLAN (CBM)',
    tbm: 'PREVENTIVE MAINTENANCE PLAN (TBM)',
    proof_test: 'FAILURE-FINDING PLAN (PROOF TEST)',
  },
  tituloGenerico: 'MAINTENANCE PLAN',
  disclaimerTitulo: 'FAILURE-MODE FOCUS',
  disclaimer:
    'This plan exists to combat specifically the failure mode "{modo}" on "{equipamento}". In the RELIABILITAS methodology (Framework A → Framework B), a periodic maintenance plan is only technically valid for failure modes with a TBM or CBM decision. For random failures without a detectable P-F, hidden failures or infant mortality, a periodic plan makes NO sense — the correct answer is another one (RTF + spares management, proof test, assembly quality control). The classification grounding this plan is in section 1.',
  secClassificacao: 'FAILURE-MODE CLASSIFICATION (WHY THIS PLAN EXISTS)',
  secInfoGerais: 'GENERAL INFORMATION AND IDENTIFICATION',
  secEscopo: 'TECHNICAL SCOPE AND SAFETY',
  secResumo: 'TASK SUMMARY',
  secTarefa: 'TASK',
  secRestabelecimento: 'OPERATIONAL RESTORATION',
  secValidacao: 'VALIDATION AND SIGN-OFF',
  campo: 'Field',
  valor: 'Value',
  equipamento: 'Equipment',
  modoFalha: 'Failure mode',
  fwA: 'Fw A (diagnosis)',
  fwB: 'Fw B (prescription)',
  pfTipico: 'Typical P-F interval',
  periodicidade: 'Periodicity',
  condicao: 'Boundary condition',
  metodo: 'Method',
  tarefa: 'Task',
  criterio: 'Acceptance criterion',
  acao: 'Action on deviation',
  especialidade: 'Craft/specialty',
  duracao: 'Estimated time',
  procedimento: 'Procedure',
  registros: 'Records — measured values',
  parametro: 'Parameter / measurement',
  valorMedido: 'Measured value',
  passo: 'Step',
  registro: 'Record',
  local: 'Installation location',
  tag: 'Equipment TAG',
  fabricanteModelo: 'Manufacturer / model',
  sistema: 'System',
  dataPrimeiraOrdem: 'First-order date',
  preenchimento: '[ __________ ]',
  escopoItens: [
    'Request a Work Permit from operations/safety before starting.',
    'Predictive measurements (vibration, ultrasound, process parameters) are taken with the equipment IN OPERATION, at stable load — record the operating point with every measurement.',
    'Any intrusive intervention requires lockout-tagout (LOTO), with draining and depressurization confirmed before opening.',
    'Any abnormal situation: immediately inform the maintenance/engineering responsible.',
    'Keep the site clean and organized; close the Work Permit at the end.',
  ],
  restabelecimentoItens: [
    'Equipment reassembled, guards reinstalled and system lined up (when intervention occurred)',
    'Release for operation communicated to the area operator',
    'First operation after maintenance witnessed',
    'Measured values and anomalies recorded in the CMMS with a standardized failure code',
    'Trends (vibration/process) updated and alarm thresholds reviewed',
  ],
  executadoPor: 'EXECUTED BY (name/ID)',
  aprovadoPor: 'APPROVED BY (name/ID)',
  auditadoPor: 'AUDITED BY (name/ID)',
  assinatura: 'Signature',
  data: 'Date',
  desvio: 'WAS THERE A PLANNING DEVIATION?',
  desvioMotivo: 'Deviation reason',
  sim: 'YES',
  nao: 'NO',
  geradoPor: 'Generated by RELIABILITAS',
  revisado: 'Content reviewed on',
  metodologia: 'Methodology: Framework A (diagnosis) → Framework B (prescription)',
};

export function textosPlanoDoc(locale: Locale): TextosPlanoDoc {
  return locale === 'en' ? EN : PT;
}
