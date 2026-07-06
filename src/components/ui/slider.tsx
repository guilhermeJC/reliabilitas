'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';

// shadcn/ui adotado no primeiro primitive real (DEV-016): componente vendorizado
// sobre @radix-ui/react-slider — sem CLI init para preservar globals.css e os
// tokens do design congelado (M02). Tema direto nas variáveis do projeto.

export function Slider({
  value,
  onValueChange,
  min,
  max,
  step,
  'aria-label': ariaLabel,
}: {
  value: number;
  onValueChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  'aria-label': string;
}) {
  return (
    <SliderPrimitive.Root
      className="relative flex h-5 w-full touch-none select-none items-center"
      value={[value]}
      onValueChange={([v]) => onValueChange(v)}
      min={min}
      max={max}
      step={step}
    >
      <SliderPrimitive.Track className="relative h-1.5 grow overflow-hidden rounded-full bg-slate-200">
        <SliderPrimitive.Range
          className="absolute h-full"
          style={{ background: 'var(--navy-700)' }}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label={ariaLabel}
        className="block h-4 w-4 rounded-full border-2 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-2"
        style={{ borderColor: 'var(--navy-700)' }}
      />
    </SliderPrimitive.Root>
  );
}
