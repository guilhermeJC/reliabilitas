import { describe, expect, it } from 'vitest';
import { comparaMigracoes } from '@/lib/db/migracoes';

describe('comparaMigracoes', () => {
  it('não acusa nada quando local e banco batem exatamente', () => {
    const r = comparaMigracoes(
      ['0001_init.sql', '0002_busca.sql'],
      ['0001_init.sql', '0002_busca.sql'],
    );
    expect(r).toEqual({ pendentes: [], orfas: [] });
  });

  it('acusa pendente quando o arquivo existe no repo mas não foi aplicado', () => {
    const r = comparaMigracoes(
      ['0001_init.sql', '0002_busca.sql', '0003_nova.sql'],
      ['0001_init.sql', '0002_busca.sql'],
    );
    expect(r.pendentes).toEqual(['0003_nova.sql']);
    expect(r.orfas).toEqual([]);
  });

  it('acusa órfã quando o banco tem uma migração cujo arquivo sumiu do repo', () => {
    const r = comparaMigracoes(['0001_init.sql'], ['0001_init.sql', '0002_removida.sql']);
    expect(r.pendentes).toEqual([]);
    expect(r.orfas).toEqual(['0002_removida.sql']);
  });

  it('reproduz o achado real do DEV-100: 0007/0008 no repo, banco só com até 0006', () => {
    const locais = [
      '0001_init.sql',
      '0002_busca.sql',
      '0003_sugestoes.sql',
      '0004_rls_schema_migrations.sql',
      '0005_contribuicoes.sql',
      '0006_ordem.sql',
      '0007_contribuicoes_autor.sql',
      '0008_autoria_contribuidor.sql',
    ];
    const aplicadas = locais.slice(0, 6);
    const r = comparaMigracoes(locais, aplicadas);
    expect(r.pendentes).toEqual(['0007_contribuicoes_autor.sql', '0008_autoria_contribuidor.sql']);
    expect(r.orfas).toEqual([]);
  });

  it('ordena o resultado alfabeticamente independente da ordem de entrada', () => {
    const r = comparaMigracoes(['0002_b.sql', '0001_a.sql'], []);
    expect(r.pendentes).toEqual(['0001_a.sql', '0002_b.sql']);
  });

  it('lida com listas vazias sem erro', () => {
    expect(comparaMigracoes([], [])).toEqual({ pendentes: [], orfas: [] });
  });
});
