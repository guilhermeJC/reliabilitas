import { describe, expect, it } from 'vitest';
import { autorDaNota, iniciais, rotuloDoLink } from '@/lib/content/autor';
import { FOTO_FUNDADOR, LINKEDIN_URL, NOME_FUNDADOR } from '@/lib/contato';

// DEV-128 — byline por nota. A resolução de QUEM aparece no byline é lógica
// pura (testável aqui); o componente AutorNota só renderiza o resultado.
// Regra: frontmatter.autor ausente → autor padrão do acervo (o curador).

const CARGO_PADRAO = 'Engenheiro mecânico (CREA-SP)';

describe('autorDaNota — resolução do byline', () => {
  it('sem autor no frontmatter, devolve o autor padrão do acervo com foto, cargo i18n e LinkedIn', () => {
    const a = autorDaNota({}, CARGO_PADRAO);
    expect(a).toEqual({
      nome: NOME_FUNDADOR,
      cargo: CARGO_PADRAO,
      foto: FOTO_FUNDADOR,
      link: { href: LINKEDIN_URL, rotulo: 'LinkedIn' },
      padrao: true,
    });
  });

  it('com autor no frontmatter, devolve o contribuidor — e NÃO é o padrão', () => {
    const a = autorDaNota(
      {
        autor: {
          nome: 'Ana Souza',
          formacao: 'Engenheira química',
          funcaoEmpresa: 'Confiabilidade · Petroquímica X',
          linkedinSite: 'https://www.linkedin.com/in/ana-souza/',
        },
      },
      CARGO_PADRAO,
    );
    expect(a.padrao).toBe(false);
    expect(a.nome).toBe('Ana Souza');
    // formação e função/empresa compõem UMA linha de credenciais
    expect(a.cargo).toBe('Engenheira química · Confiabilidade · Petroquímica X');
    expect(a.link).toEqual({ href: 'https://www.linkedin.com/in/ana-souza/', rotulo: 'LinkedIn' });
    // sem foto no frontmatter → sem foto (o componente cai no avatar de iniciais)
    expect(a.foto).toBeUndefined();
  });

  it('contribuidor só com nome: sem cargo, sem link, sem foto (BR-011 — tudo opcional)', () => {
    const a = autorDaNota({ autor: { nome: 'Ana Souza' } }, CARGO_PADRAO);
    expect(a).toEqual({ nome: 'Ana Souza', padrao: false });
  });

  it('só formação OU só função: a linha de credenciais não ganha separador solto', () => {
    expect(autorDaNota({ autor: { nome: 'A', formacao: 'Eng. mecânica' } }, '').cargo).toBe(
      'Eng. mecânica',
    );
    expect(
      autorDaNota({ autor: { nome: 'A', funcaoEmpresa: 'Manutenção · Usina Y' } }, '').cargo,
    ).toBe('Manutenção · Usina Y');
  });

  it('site próprio (não-LinkedIn) vira link rotulado pelo domínio', () => {
    const a = autorDaNota(
      { autor: { nome: 'Ana Souza', linkedinSite: 'https://www.anasouza.eng.br/sobre' } },
      '',
    );
    expect(a.link).toEqual({
      href: 'https://www.anasouza.eng.br/sobre',
      rotulo: 'anasouza.eng.br',
    });
  });

  it('foto do contribuidor é repassada quando existe', () => {
    const a = autorDaNota({ autor: { nome: 'Ana Souza', foto: '/autores/ana-souza.jpg' } }, '');
    expect(a.foto).toBe('/autores/ana-souza.jpg');
  });

  it('autor malformado no frontmatter (defensivo — o schema já barra no ingest) cai no padrão', () => {
    expect(autorDaNota({ autor: 'Ana Souza' }, CARGO_PADRAO).padrao).toBe(true);
    expect(autorDaNota({ autor: { formacao: 'sem nome' } }, CARGO_PADRAO).padrao).toBe(true);
    expect(autorDaNota({ autor: null }, CARGO_PADRAO).padrao).toBe(true);
  });
});

describe('rotuloDoLink — rótulo curto para o href do byline', () => {
  it('qualquer subdomínio do LinkedIn é "LinkedIn"', () => {
    expect(rotuloDoLink('https://www.linkedin.com/in/x/')).toBe('LinkedIn');
    expect(rotuloDoLink('https://br.linkedin.com/in/x')).toBe('LinkedIn');
    expect(rotuloDoLink('https://linkedin.com/in/x')).toBe('LinkedIn');
  });

  it('outros sites viram o domínio sem www', () => {
    expect(rotuloDoLink('https://www.exemplo.com.br/perfil?x=1')).toBe('exemplo.com.br');
    expect(rotuloDoLink('https://lab.universidade.edu/')).toBe('lab.universidade.edu');
  });

  it('não é URL → devolve o texto como veio (nunca lança)', () => {
    expect(rotuloDoLink('nada')).toBe('nada');
  });
});

describe('iniciais — avatar quando não há foto', () => {
  it('primeira letra do primeiro e do último nome, em maiúsculas', () => {
    expect(iniciais('Guilherme Joaquim Correia')).toBe('GC');
    expect(iniciais('ana souza')).toBe('AS');
  });

  it('nome único → uma letra; espaços sobrando não contam', () => {
    expect(iniciais('Ana')).toBe('A');
    expect(iniciais('  ana   souza  ')).toBe('AS');
  });

  it('vazio → vazio (nunca lança)', () => {
    expect(iniciais('')).toBe('');
    expect(iniciais('   ')).toBe('');
  });
});
