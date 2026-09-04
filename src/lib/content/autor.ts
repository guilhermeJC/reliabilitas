import { FOTO_FUNDADOR, LINKEDIN_URL, NOME_FUNDADOR } from '@/lib/contato';

// DEV-128 — QUEM aparece no byline de uma nota. Lógica pura (testável em node,
// tests/unit/autor-nota.test.ts): frontmatter.autor presente e bem-formado →
// contribuidor; ausente → autor padrão do acervo (o curador, contato.ts). O
// componente AutorNota só renderiza o resultado. O contrato do campo vive em
// content/schema.ts (autorSchema, estrito) e é validado no ingest — a checagem
// estrutural aqui é só defensiva, nunca a fonte de verdade.

export interface LinkAutor {
  href: string;
  rotulo: string;
}

export interface AutorByline {
  nome: string;
  /** Linha de credenciais: formação · função/empresa — ou o texto i18n do padrão. */
  cargo?: string;
  /** Caminho público da foto; ausente → o componente mostra avatar de iniciais. */
  foto?: string;
  link?: LinkAutor;
  /** true = autor do acervo → o byline oferece "Sobre o autor →" (/sobre). */
  padrao: boolean;
}

interface AutorFrontmatter {
  nome: string;
  formacao?: string;
  funcaoEmpresa?: string;
  linkedinSite?: string;
  foto?: string;
}

function textoOuNada(v: unknown): string | undefined {
  return typeof v === 'string' && v.trim() !== '' ? v.trim() : undefined;
}

function autorDoFrontmatter(fm: Record<string, unknown>): AutorFrontmatter | null {
  const a = fm.autor;
  if (!a || typeof a !== 'object') return null;
  const o = a as Record<string, unknown>;
  const nome = textoOuNada(o.nome);
  if (!nome) return null;
  return {
    nome,
    formacao: textoOuNada(o.formacao),
    funcaoEmpresa: textoOuNada(o.funcaoEmpresa),
    linkedinSite: textoOuNada(o.linkedinSite),
    foto: textoOuNada(o.foto),
  };
}

// Rótulo curto pro href: "LinkedIn" pra qualquer subdomínio do LinkedIn; senão
// o domínio sem "www.". Nunca lança — texto que não é URL volta como veio.
export function rotuloDoLink(href: string): string {
  let host: string;
  try {
    host = new URL(href).hostname.toLowerCase();
  } catch {
    return href;
  }
  if (host === 'linkedin.com' || host.endsWith('.linkedin.com')) return 'LinkedIn';
  return host.replace(/^www\./, '');
}

// Avatar quando não há foto: 1ª letra do primeiro e do último nome.
export function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return '';
  const primeira = partes[0]?.[0] ?? '';
  const ultima = partes.length > 1 ? (partes[partes.length - 1]?.[0] ?? '') : '';
  return (primeira + ultima).toUpperCase();
}

export function autorDaNota(frontmatter: Record<string, unknown>, cargoPadrao: string): AutorByline {
  const a = autorDoFrontmatter(frontmatter);
  if (!a) {
    return {
      nome: NOME_FUNDADOR,
      cargo: cargoPadrao,
      foto: FOTO_FUNDADOR,
      link: { href: LINKEDIN_URL, rotulo: 'LinkedIn' },
      padrao: true,
    };
  }
  const byline: AutorByline = { nome: a.nome, padrao: false };
  const cargo = [a.formacao, a.funcaoEmpresa].filter(Boolean).join(' · ');
  if (cargo) byline.cargo = cargo;
  if (a.foto) byline.foto = a.foto;
  if (a.linkedinSite) byline.link = { href: a.linkedinSite, rotulo: rotuloDoLink(a.linkedinSite) };
  return byline;
}
