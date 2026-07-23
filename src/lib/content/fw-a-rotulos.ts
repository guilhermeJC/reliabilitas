import { FW_A_CATEGORIAS } from '@/lib/content/schema';

// DEV-083 #5: vocabulário de EXIBIÇÃO da categoria Fw A (IT-MNT-001 §3–4)
// morava dentro de fw-cards.tsx (componente React) e era importado por
// plano-table.tsx só pelo lookup de dados (Middle Man — lógica de export
// dependendo de componente). Fonte única aqui. Os enums INTERNOS continuam
// distintos de propósito, não tocados: CategoriaBeta (weibull.ts, já deriva
// de FW_A_CATEGORIAS) e ComportamentoFwA (rcm/decisao.ts, vocabulário PT
// próprio do seletor de estratégia) — só a camada de rótulos era duplicada.
export const CATEGORIA_ROTULOS: Record<(typeof FW_A_CATEGORIAS)[number], string> = {
  infant: 'Infant Mortality',
  random: 'Random',
  wear_out: 'Wear-out',
  mixed_complex: 'Mixed/Complex',
  unknown: 'Unknown',
};
