'use client';

import { useState } from 'react';

// Copia um código (ex.: Pix "copia e cola") pro clipboard — sem link
// navegável, o valor não é uma URL. Feedback local via useState, sem
// dependência nova.

export function BotaoCopiar({
  texto,
  labelCopiar,
  labelCopiado,
}: {
  texto: string;
  labelCopiar: string;
  labelCopiado: string;
}) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    await navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copiar}
      className="inline-flex items-center gap-1 rounded border px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-slate-50"
      style={{
        borderColor: '#d3dae6',
        color: copiado ? 'var(--fw-b)' : 'var(--navy-700)',
      }}
    >
      {copiado ? `✓ ${labelCopiado}` : labelCopiar}
    </button>
  );
}
