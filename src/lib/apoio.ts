// F07 parcial (T01) — canais de doação (D24: Pix/PayPal/Ko-fi como funding
// principal). Os URLs reais são pendência do FUNDADOR (JOURNAL Dia 3); enquanto
// vazio, o banner de apoio simplesmente não renderiza (nunca link morto).
// A página completa T08 Apoiar nasce no Dia 4 (G4).

export interface CanalDoacao {
  rotulo: string;
  href: string;
}

// Canais que se pagam via QR Code (Pix, PayPal) — sem link navegável direto,
// por isso ficam fora de DOACAO_LINKS: a imagem é o meio principal, com o
// código "copia e cola" (quando existir) como alternativa pra quem está no
// desktop. `href` fica disponível pra um canal que também tenha link direto
// (ex.: paypal.me), mas não é obrigatório.
export interface CanalQrCode {
  rotulo: string;
  imagem: string;
  largura: number;
  altura: number;
  copiavel?: string;
  href?: string;
}

export const DOACAO_LINKS: CanalDoacao[] = [];

// DEV-112 (auditoria 25/07, aplicado em 31/07) — os QRs eram servidos no tamanho original: o do
// Pix tinha 880 KB (1254×1254) para ser exibido a 220 px, em TODA visita à
// página que sustenta o funding. Reamostrados para 440 px (2× o tamanho de
// exibição, cobre tela retina) e convertidos para WebP: 880 KB → 22 KB e
// 40 KB → 13 KB, ~885 KB a menos por visita.
//
// Integridade verificada antes de trocar, não presumida: o QR do PayPal
// DECODIFICA idêntico ao original (jsQR). O do Pix não decodifica nem no
// original — a foto sobreposta no centro derruba esse decodificador (leitor de
// celular lida bem), então foi medida a integridade dos módulos: proporção de
// preto 31,2% → 29,8% (desvio 1,4 pp) e WebP indistinguível de PNG-paleta
// (6,5% × 6,4% de pixels intermediários), o que mostra que o custo veio do
// redimensionamento, não do formato. Originais preservados no histórico do Git.
export const DOACAO_QRCODES: CanalQrCode[] = [
  {
    rotulo: 'Pix',
    imagem: '/doacao/pix-picpay.webp',
    largura: 220,
    altura: 220,
    copiavel:
      '00020126360014br.gov.bcb.pix0114+55119737778875204000053039865802BR5925Guilherme Joaquim Correia6009Sao Paulo62290525REC6A6526A3BD14C5410461206304D12C',
  },
  {
    // Sem paypal.me/copiável por enquanto (conta pessoal com pendência do
    // fundador) — só a imagem do QR, funcional por si só via app do PayPal.
    rotulo: 'PayPal',
    imagem: '/doacao/qrcode-pay-pal.webp',
    largura: 220,
    altura: 242,
  },
];
