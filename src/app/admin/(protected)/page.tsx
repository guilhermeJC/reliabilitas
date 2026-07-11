import { listSugestoes, listContribuicoes } from '@/lib/db/moderacao';
import type { SugestaoRow, ContribuicaoRow } from '@/lib/db/moderacao';

// Painel de aprovação (11/07) — fila por nota das sugestões (T09) e das
// contribuições de conteúdo novo ("Colaborar"). "Aceita"/"resolvida" é
// triagem, NÃO publicação: o conteúdo aceito ainda passa pelo fluxo
// Git→CI→ingest de sempre (AFC do fundador — DEV-046).
export const dynamic = 'force-dynamic';

const BADGE: Record<string, string> = {
  nova: '#e8510a',
  lida: '#7f77dd',
  resolvida: '#1d9e75',
  aceita: '#1d9e75',
  rejeitada: '#6b7280',
};

function Badge({ status }: { status: string }) {
  return (
    <span
      className="rounded px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-white"
      style={{ background: BADGE[status] ?? '#6b7280' }}
    >
      {status}
    </span>
  );
}

function AcaoStatus({ action, status, rotulo }: { action: string; status: string; rotulo: string }) {
  return (
    <form action={action} method="post" className="inline">
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        className="rounded border px-2 py-1 text-[11px] font-medium transition-colors hover:bg-slate-50"
        style={{ borderColor: '#d3dae6', color: 'var(--navy-700)' }}
      >
        {rotulo}
      </button>
    </form>
  );
}

function CardSugestao({ s }: { s: SugestaoRow }) {
  return (
    <li className="rounded-lg border bg-white p-4" style={{ borderColor: '#e3e8f0' }}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs text-slate-500">
          {s.pagina} · {s.locale} · {new Date(s.criado_em).toLocaleString('pt-BR')}
        </span>
        <Badge status={s.status} />
      </div>
      <p className="mt-2 whitespace-pre-wrap text-sm text-slate-800">{s.mensagem}</p>
      {s.contato && <p className="mt-1 text-xs text-slate-500">Contato: {s.contato}</p>}
      <div className="mt-3 flex gap-2">
        <AcaoStatus action={`/api/admin/sugestoes/${s.id}/status`} status="lida" rotulo="Marcar lida" />
        <AcaoStatus
          action={`/api/admin/sugestoes/${s.id}/status`}
          status="resolvida"
          rotulo="Marcar resolvida"
        />
      </div>
    </li>
  );
}

function CardContribuicao({ c }: { c: ContribuicaoRow }) {
  return (
    <li className="rounded-lg border bg-white p-4" style={{ borderColor: '#e3e8f0' }}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs text-slate-500">
          {c.tipo_nota} · pai: {c.taxonomia_pai} · {c.locale} ·{' '}
          {new Date(c.criado_em).toLocaleString('pt-BR')}
        </span>
        <Badge status={c.status} />
      </div>
      <h3 className="mt-1 text-sm font-medium" style={{ color: 'var(--navy-700)' }}>
        {c.titulo_sugerido}
      </h3>
      {c.resumo && <p className="mt-1 text-sm text-slate-600 italic">{c.resumo}</p>}
      {/* Preview em texto puro (React escapa por padrão) — NUNCA renderizar
          markdown de terceiro não confiável como HTML sem sanitização (DEV-017). */}
      <pre
        className="mt-2 max-h-64 overflow-y-auto whitespace-pre-wrap rounded-md p-3 font-mono text-[12px] leading-relaxed text-slate-700"
        style={{ background: 'var(--canvas)' }}
      >
        {c.corpo_md}
      </pre>
      {c.contato && <p className="mt-1 text-xs text-slate-500">Contato: {c.contato}</p>}
      <div className="mt-3 flex gap-2">
        <AcaoStatus
          action={`/api/admin/contribuicoes/${c.id}/status`}
          status="lida"
          rotulo="Marcar lida"
        />
        <AcaoStatus
          action={`/api/admin/contribuicoes/${c.id}/status`}
          status="aceita"
          rotulo="Aceitar (vira fila de trabalho)"
        />
        <AcaoStatus
          action={`/api/admin/contribuicoes/${c.id}/status`}
          status="rejeitada"
          rotulo="Rejeitar"
        />
      </div>
    </li>
  );
}

export default async function AdminPainelPage() {
  const [sugestoes, contribuicoes] = await Promise.all([listSugestoes(), listContribuicoes()]);

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
          Sugestões de correção ({sugestoes.length})
        </h2>
        {sugestoes.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">Nenhuma sugestão ainda.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {sugestoes.map((s) => (
              <CardSugestao key={s.id} s={s} />
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
          Contribuições de conteúdo ({contribuicoes.length})
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          &ldquo;Aceitar&rdquo; não publica — marca como matéria-prima pra reescrever no padrão editorial e
          seguir o fluxo Git→CI de sempre.
        </p>
        {contribuicoes.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">Nenhuma contribuição ainda.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {contribuicoes.map((c) => (
              <CardContribuicao key={c.id} c={c} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
