import { describe, expect, it } from 'vitest';
import { writePlan, type PgLike } from '@/lib/db/ingest-writer';
import type { IngestPlan } from '@/lib/content/plan';

// F4: gravação em transação ÚNICA — falha parcial nunca deixa o grafo zerado.
// F1: reconciliação — nota removida/renomeada em content/ sai do banco (sem zumbi).

interface Chamada {
  text: string;
  params?: unknown[];
}

function fakeClient(falharEm?: number) {
  const chamadas: Chamada[] = [];
  const client: PgLike = {
    async query(text: string, params?: unknown[]) {
      chamadas.push({ text, params });
      if (falharEm !== undefined && chamadas.length === falharEm) {
        throw new Error('falha simulada');
      }
      return { rowCount: text.startsWith('delete from public.notas') ? 2 : 1 };
    },
  };
  return { client, chamadas };
}

const plano: IngestPlan = {
  notas: [
    {
      slug: 'bombas',
      tipo_nota: 'familia',
      locale: 'pt',
      titulo: 'Bombas',
      status: 'published',
      taxonomia: ['transferencia-de-fluidos-liquidos'],
      frontmatter: { slug: 'bombas' },
      corpo_md: 'corpo',
      revisado_em: '2026-07-04',
      ordem: null,
    },
    {
      slug: 'bombas',
      tipo_nota: 'familia',
      locale: 'en',
      titulo: 'Pumps',
      status: 'published',
      taxonomia: ['transferencia-de-fluidos-liquidos'],
      frontmatter: { slug: 'bombas' },
      corpo_md: 'body',
      revisado_em: '2026-07-04',
      ordem: null,
    },
  ],
  arestas: [
    {
      origem_slug: 'bombas',
      destino_slug: 'transferencia-de-fluidos-liquidos',
      locale: 'pt',
      tipo: 'taxonomia',
    },
    {
      origem_slug: 'bombas',
      destino_slug: 'transferencia-de-fluidos-liquidos',
      locale: 'en',
      tipo: 'taxonomia',
    },
  ],
};

describe('writePlan — gravação atômica do ingest (F4/F1)', () => {
  it('F4: envolve toda a gravação em uma única transação (begin…commit)', async () => {
    const { client, chamadas } = fakeClient();
    await writePlan(client, plano);
    expect(chamadas[0].text).toBe('begin');
    expect(chamadas.at(-1)!.text).toBe('commit');
    expect(chamadas.filter((c) => c.text === 'begin')).toHaveLength(1);
  });

  it('F4: qualquer falha faz rollback e propaga o erro (nada de estado parcial)', async () => {
    const { client, chamadas } = fakeClient(3);
    await expect(writePlan(client, plano)).rejects.toThrow('falha simulada');
    expect(chamadas.at(-1)!.text).toBe('rollback');
    expect(chamadas.some((c) => c.text === 'commit')).toBe(false);
  });

  it('F10: upsert renova atualizado_em no conflito (não congela no 1º insert)', async () => {
    const { client, chamadas } = fakeClient();
    await writePlan(client, plano);
    const upserts = chamadas.filter((c) => c.text.includes('insert into public.notas'));
    expect(upserts).toHaveLength(2);
    expect(upserts[0].text).toContain('on conflict (slug, locale) do update');
    expect(upserts[0].text).toContain('atualizado_em = now()');
    expect(upserts[0].text).toContain('revisado_em');
  });

  it('F1: remove do banco as notas que saíram do acervo (reconciliação, sem zumbi)', async () => {
    const { client, chamadas } = fakeClient();
    await writePlan(client, plano);
    const del = chamadas.find((c) => c.text.startsWith('delete from public.notas'));
    expect(del).toBeDefined();
    expect(del!.text).toContain('not exists');
    expect(del!.params).toEqual([
      ['bombas', 'bombas'],
      ['pt', 'en'],
    ]);
  });

  it('DEV-007: substitui as arestas integralmente (delete + insert derivado do plano)', async () => {
    const { client, chamadas } = fakeClient();
    await writePlan(client, plano);
    const idxDel = chamadas.findIndex((c) => c.text.startsWith('delete from public.arestas'));
    const idxIns = chamadas.findIndex((c) => c.text.includes('insert into public.arestas'));
    expect(idxDel).toBeGreaterThan(0);
    expect(idxIns).toBeGreaterThan(idxDel);
    expect(chamadas[idxIns].params).toEqual([
      ['bombas', 'bombas'],
      ['transferencia-de-fluidos-liquidos', 'transferencia-de-fluidos-liquidos'],
      ['pt', 'en'],
      ['taxonomia', 'taxonomia'],
    ]);
  });

  it('reporta contagens: notas gravadas e zumbis removidos', async () => {
    const { client } = fakeClient();
    const r = await writePlan(client, plano);
    expect(r.gravadas).toBe(2);
    expect(r.removidas).toBe(2);
  });

  it('plano sem arestas não emite insert de arestas (delete ainda roda)', async () => {
    const { client, chamadas } = fakeClient();
    await writePlan(client, { notas: plano.notas, arestas: [] });
    expect(chamadas.some((c) => c.text.startsWith('delete from public.arestas'))).toBe(true);
    expect(chamadas.some((c) => c.text.includes('insert into public.arestas'))).toBe(false);
  });
});
