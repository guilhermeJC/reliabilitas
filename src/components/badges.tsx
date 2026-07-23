import type { Nota } from '@/lib/db/notas';

// DEV-083 #8: extraído de notas/[slug]/page.tsx pra seguir a convenção do
// resto (Breadcrumb/Backlinks/FwCards/PlanoTable são todos componentes
// próprios). Badges de tipo/ISO 14224/Fw A/Fw B no topo de toda nota.
export function Badges({ nota }: { nota: Nota }) {
  const fwA = nota.frontmatter.fw_a as { categoria?: string } | undefined;
  const fwB = nota.frontmatter.fw_b as { decisao?: string; periodicidade?: string } | undefined;
  const iso = nota.frontmatter.iso14224_code as string | undefined;
  return (
    <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
      <span className="rounded px-2 py-1 text-white" style={{ background: 'var(--navy-700)' }}>
        {nota.tipo_nota}
      </span>
      {iso && (
        <span
          className="rounded border bg-white px-2 py-1 font-mono"
          style={{ borderColor: '#d3dae6' }}
        >
          ISO 14224: {iso}
        </span>
      )}
      {fwA?.categoria && (
        <span className="rounded px-2 py-1 text-white" style={{ background: 'var(--fw-a)' }}>
          Fw A · {fwA.categoria}
        </span>
      )}
      {fwB?.decisao && (
        <span className="rounded px-2 py-1 text-white" style={{ background: 'var(--fw-b)' }}>
          Fw B · {fwB.decisao}
          {fwB.periodicidade ? ` (${fwB.periodicidade})` : ''}
        </span>
      )}
    </div>
  );
}
