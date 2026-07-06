'use client';

import { useEffect, useRef, useState } from 'react';
import { NIVEIS_LEITURA } from '@/lib/content/schema';

// O elemento inesquecível (DESIGN §1): seletor de 3 níveis do T03. Alterna sem
// reload e persiste na sessão via sessionStorage — nunca cookie (BR-011/DEV-014).

type Nivel = (typeof NIVEIS_LEITURA)[number];
const STORAGE_KEY = 'reliabilitas:nivel';

export interface NivelLabel {
  label: string;
  sub: string;
}

export function NivelSelector({
  paineis,
  labels,
  extras,
}: {
  paineis: Record<Nivel, string>;
  labels: Record<Nivel, NivelLabel>;
  // Conteúdo interativo por nível (ex.: calculadora Weibull no Engineer — F05)
  extras?: Partial<Record<Nivel, React.ReactNode>>;
}) {
  const [ativo, setAtivo] = useState<Nivel>('beginner');
  const tabsRef = useRef<Map<Nivel, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const salvo = window.sessionStorage.getItem(STORAGE_KEY);
    if (salvo && (NIVEIS_LEITURA as readonly string[]).includes(salvo)) {
      setAtivo(salvo as Nivel);
    }
  }, []);

  function seleciona(nivel: Nivel) {
    setAtivo(nivel);
    window.sessionStorage.setItem(STORAGE_KEY, nivel);
  }

  function aoTeclar(e: React.KeyboardEvent) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const i = NIVEIS_LEITURA.indexOf(ativo);
    const delta = e.key === 'ArrowRight' ? 1 : -1;
    const proximo = NIVEIS_LEITURA[(i + delta + NIVEIS_LEITURA.length) % NIVEIS_LEITURA.length];
    seleciona(proximo);
    tabsRef.current.get(proximo)?.focus();
  }

  return (
    <div className="mt-6">
      <div
        role="tablist"
        aria-label="Nível de leitura"
        onKeyDown={aoTeclar}
        className="grid grid-cols-3 rounded-t-lg border border-b-0 bg-white"
        style={{ borderColor: '#e3e8f0' }}
      >
        {NIVEIS_LEITURA.map((nivel) => {
          const selecionado = nivel === ativo;
          return (
            <button
              key={nivel}
              ref={(el) => {
                if (el) tabsRef.current.set(nivel, el);
              }}
              role="tab"
              id={`tab-${nivel}`}
              aria-selected={selecionado}
              aria-controls={`painel-${nivel}`}
              tabIndex={selecionado ? 0 : -1}
              onClick={() => seleciona(nivel)}
              className="flex flex-col items-center gap-0.5 border-b-2 px-2 py-3 transition-colors"
              style={{
                borderBottomColor: selecionado ? 'var(--accent)' : 'transparent',
                color: selecionado ? 'var(--accent)' : '#5f6b7f',
              }}
            >
              <span className="text-sm font-medium">{labels[nivel].label}</span>
              <span className="font-mono text-[11px] opacity-70">{labels[nivel].sub}</span>
            </button>
          );
        })}
      </div>
      {NIVEIS_LEITURA.map((nivel) => (
        <div
          key={nivel}
          role="tabpanel"
          id={`painel-${nivel}`}
          aria-labelledby={`tab-${nivel}`}
          hidden={nivel !== ativo}
          className="rounded-b-lg border bg-white p-6 md:p-8"
          style={{ borderColor: '#e3e8f0' }}
        >
          <article className="nota-corpo" dangerouslySetInnerHTML={{ __html: paineis[nivel] }} />
          {extras?.[nivel] && <div className="mt-6">{extras[nivel]}</div>}
        </div>
      ))}
    </div>
  );
}
