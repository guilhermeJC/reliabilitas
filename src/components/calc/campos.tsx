'use client';

// Campos compartilhados das calculadoras (F05) — entrada numérica com rótulo e
// linha de resultado em JetBrains Mono (dados = mono, DEV-015).

export function CampoNumero({
  label,
  value,
  onChange,
  min,
  step,
  sufixo,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  step?: number;
  sufixo?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="text-slate-600">{label}</span>
      <span className="mt-1 flex items-center gap-2">
        <input
          type="number"
          value={Number.isFinite(value) ? value : ''}
          min={min}
          step={step}
          onChange={(e) => onChange(e.target.valueAsNumber)}
          className="w-full rounded-md border bg-white px-3 py-1.5 font-mono text-sm"
          style={{ borderColor: '#d3dae6' }}
        />
        {sufixo && <span className="shrink-0 font-mono text-xs text-slate-500">{sufixo}</span>}
      </span>
    </label>
  );
}

// Revisão do fundador (08/07): resultado em horas ganha a conversão em DIAS ao
// lado (horas segue sendo a unidade canônica) e uma linha "significa" que
// traduz o número em linguagem de operação.
export function LinhaResultado({
  label,
  valor,
  destaque = false,
  conversao,
  significa,
}: {
  label: string;
  valor: string;
  destaque?: boolean;
  conversao?: string;
  significa?: string;
}) {
  return (
    <div className="border-b border-slate-200/70 py-1.5 last:border-b-0">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-slate-600">{label}</span>
        <span className="text-right">
          <span
            className="font-mono text-sm"
            style={{
              color: destaque ? 'var(--navy-700)' : undefined,
              fontWeight: destaque ? 500 : 400,
            }}
          >
            {valor}
          </span>
          {conversao && (
            <span className="ml-1.5 font-mono text-xs text-slate-400">{conversao}</span>
          )}
        </span>
      </div>
      {significa && <p className="text-[11px] leading-snug text-slate-400">{significa}</p>}
    </div>
  );
}

// DEV-118: `fmt` mudou para `src/lib/calc/formato.ts` — lógica pura num `.tsx`
// era intestável (a suíte roda em `node`, sem JSX), e foi por isso que um
// defeito de formatação publicado sobreviveu. Reexportado aqui para não quebrar
// os imports existentes.
export { fmt } from '@/lib/calc/formato';
