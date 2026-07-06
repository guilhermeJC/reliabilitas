// F07 parcial (T01) — canais de doação (D24: Pix/PayPal/Ko-fi como funding
// principal). Os URLs reais são pendência do FUNDADOR (JOURNAL Dia 3); enquanto
// vazio, o banner de apoio simplesmente não renderiza (nunca link morto).
// A página completa T08 Apoiar nasce no Dia 4 (G4).

export interface CanalDoacao {
  rotulo: string;
  href: string;
}

export const DOACAO_LINKS: CanalDoacao[] = [];
