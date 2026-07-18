import { NIVEIS_LEITURA } from './schema';
import { slugifyHeading, escapeHtml } from '@/lib/markdown/render';

// T03: extrai as 3 seções de nível do corpo (contrato F8/DEV-006 — headings
// '## Beginner/Specialist/Engineer'). O ingest garante presença + conteúdo;
// aqui é defesa em profundidade: faltou nível → null e a página decide.

export type NiveisCorpo = Record<(typeof NIVEIS_LEITURA)[number], string>;

const HEADINGS: Record<(typeof NIVEIS_LEITURA)[number], string> = {
  beginner: 'Beginner',
  specialist: 'Specialist',
  engineer: 'Engineer',
};

// T02: headings de nível 2 do corpo → nav "nesta página" (ids = âncoras do render).
export interface SecaoH2 {
  texto: string;
  id: string;
}

export function extractH2(corpo: string): SecaoH2[] {
  const secoes: SecaoH2[] = [];
  for (const m of corpo.matchAll(/^##\s+(.+?)\s*$/gm)) {
    secoes.push({ texto: m[1], id: slugifyHeading(m[1]) });
  }
  return secoes;
}

// Sumário por texto (pedido do fundador, 18/07): dentro de um nível (Beginner/
// Specialist/Engineer), os headings de nível 3 são as subseções reais — a nota
// de modo de falha não tem H2 fora dos 3 nomes de nível, então o sumário útil
// ali é sobre os H3.
export function extractH3(corpo: string): SecaoH2[] {
  const secoes: SecaoH2[] = [];
  for (const m of corpo.matchAll(/^###\s+(.+?)\s*$/gm)) {
    secoes.push({ texto: m[1], id: slugifyHeading(m[1]) });
  }
  return secoes;
}

// Sumário visual no início da nota (pedido do fundador, 18/07): curto, com
// hiperlinks pro conteúdo que vem a seguir. Só compensa com >=3 seções — menos
// que isso é ruído visual sem ganho de navegação (para toda nota não faz
// sentido, AFC confirmado). HTML puro (não Markdown) porque os ids de âncora
// já são exatamente os mesmos que o render usa nos headings (slugifyHeading).
export function montaSumarioHtml(secoes: SecaoH2[], rotulo: string): string {
  if (secoes.length < 3) return '';
  const links = secoes
    .map((s) => `<a href="#${s.id}">${escapeHtml(s.texto)}</a>`)
    .join('');
  return `<nav class="sumario-pills" aria-label="${escapeHtml(rotulo)}"><span class="sumario-pills-rotulo">${escapeHtml(rotulo)}</span>${links}</nav>`;
}

export function splitNiveis(corpo: string): NiveisCorpo | null {
  const resultado = {} as NiveisCorpo;
  for (const nivel of NIVEIS_LEITURA) {
    const heading = new RegExp(`^##\\s+${HEADINGS[nivel]}\\s*$`, 'm').exec(corpo);
    if (!heading) return null;
    const resto = corpo.slice(heading.index + heading[0].length);
    const proximo = /^##\s/m.exec(resto);
    const conteudo = (proximo ? resto.slice(0, proximo.index) : resto).trim();
    if (conteudo.length === 0) return null;
    resultado[nivel] = conteudo;
  }
  return resultado;
}
