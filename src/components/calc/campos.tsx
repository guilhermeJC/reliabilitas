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

export function LinhaResultado({
  label,
  valor,
  destaque = false,
}: {
  label: string;
  valor: string;
  destaque?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1">
      <span className="text-sm text-slate-600">{label}</span>
      <span
        className="font-mono text-sm"
        style={{
          color: destaque ? 'var(--navy-700)' : undefined,
          fontWeight: destaque ? 500 : 400,
        }}
      >
        {valor}
      </span>
    </div>
  );
}

// Formatação numérica das calculadoras: notação fixa curta; científica só
// quando o valor é minúsculo (taxas de falha).
export function fmt(n: number, casas = 2): string {
  if (n !== 0 && Math.abs(n) < 0.001) return n.toExponential(2);
  return n.toLocaleString('en-US', { maximumFractionDigits: casas, minimumFractionDigits: 0 });
}
