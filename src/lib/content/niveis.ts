import { NIVEIS_LEITURA } from './schema';
import { slugifyHeading } from '@/lib/markdown/render';

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
