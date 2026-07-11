'use client';

import { useState } from 'react';
import { notaPath } from '@/lib/routes';
import type { Hotspot } from '@/lib/anatomia/bomba-centrifuga';
import type { Locale } from '@/lib/content/schema';

// Anatomia interativa (melhoria 2 do fundador, 10/07): o corte técnico do
// equipamento com hotspots numerados clicáveis — clique abre o painel com a
// descrição de engenharia do componente e a lista de aprofundamento com
// hiperlinks (notas do acervo e âncoras da própria página). A arte é o asset
// próprio /anatomia/<slug>.svg (BR-009/DEV-025) com a linha-guia do fluxo;
// os botões são HTML nativo sobreposto por coordenadas percentuais —
// acessíveis por teclado, sem JS a arte continua íntegra (BR-010).

export function AnatomiaInterativa({
  src,
  alt,
  hotspots,
  locale,
  textos,
}: {
  src: string;
  alt: string;
  hotspots: Hotspot[];
  locale: Locale;
  textos: { dica: string; fluxo: string; aprofundar: string };
}) {
  const [ativo, setAtivo] = useState(hotspots[0]?.num ?? 1);
  const selecionado = hotspots.find((h) => h.num === ativo);
  const conteudo = selecionado ? (locale === 'en' ? selecionado.en : selecionado.pt) : null;

  return (
    <section
      className="mt-6 rounded-lg border bg-white p-4 md:p-5"
      style={{ borderColor: '#e3e8f0' }}
    >
      <p className="text-xs text-slate-500">{textos.dica}</p>

      <div className="relative mt-3">
        {/* A arte (asset próprio) — os hotspots são botões reais por cima */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-auto w-full" />
        {hotspots.map((h) => {
          const texto = locale === 'en' ? h.en : h.pt;
          const ehAtivo = h.num === ativo;
          return (
            <button
              key={h.num}
              type="button"
              aria-pressed={ehAtivo}
              aria-label={`${h.num}. ${texto.titulo}`}
              onClick={() => setAtivo(h.num)}
              className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 font-mono text-[11px] font-bold transition-transform hover:scale-110 md:h-7 md:w-7 md:text-[12px]"
              style={{
                left: `${h.x}%`,
                top: `${h.y}%`,
                background: ehAtivo ? '#E8510A' : '#ffffff',
                color: ehAtivo ? '#ffffff' : '#E8510A',
                borderColor: '#E8510A',
                boxShadow: ehAtivo
                  ? '0 0 0 4px rgba(232, 81, 10, 0.18)'
                  : '0 1px 3px rgba(18, 35, 63, 0.25)',
              }}
            >
              {h.num}
            </button>
          );
        })}
      </div>

      <p className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
        <svg width="34" height="8" viewBox="0 0 34 8" aria-hidden="true" className="shrink-0">
          <line
            x1="0"
            y1="4"
            x2="26"
            y2="4"
            stroke="#E8510A"
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />
          <path d="M 26 0 L 34 4 L 26 8 z" fill="#E8510A" />
        </svg>
        {textos.fluxo}
      </p>

      {conteudo && (
        <div
          className="mt-3 rounded-md border-l-4 bg-slate-50 px-4 py-3"
          style={{ borderColor: '#E8510A' }}
          aria-live="polite"
        >
          <h3 className="text-sm font-medium" style={{ color: 'var(--navy-700)' }}>
            <span className="font-mono text-[12px]" style={{ color: '#E8510A' }}>
              {selecionado!.num}.
            </span>{' '}
            {conteudo.titulo}
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{conteudo.descricao}</p>
          {conteudo.links.length > 0 && (
            <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[12px]">
              <span className="font-medium uppercase tracking-[0.12em] text-slate-400">
                {textos.aprofundar}:
              </span>
              {conteudo.links.map((l) => (
                <a
                  key={l.rotulo}
                  href={l.slug ? notaPath(locale, l.slug) : `#${l.anchor}`}
                  className="underline-offset-2 hover:underline"
                  style={{ color: 'var(--wikilink)' }}
                >
                  {l.rotulo}
                </a>
              ))}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
