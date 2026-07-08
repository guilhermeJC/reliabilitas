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
      {significa && <p className="mt-0.5 text-xs leading-snug text-slate-500">{significa}</p>}
    </div>
  );
}

// Formatação numérica das calculadoras: notação fixa curta; científica só
// quando o valor é minúsculo (taxas de falha).
export function fmt(n: number, casas = 2): string {
  if (n !== 0 && Math.abs(n) < 0.001) return n.toExponential(2);
  return n.toLocaleString('en-US', { maximumFractionDigits: casas, minimumFractionDigits: 0 });
}
