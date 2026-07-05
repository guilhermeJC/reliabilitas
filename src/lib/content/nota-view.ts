// F15: visibilidade pública de uma nota (F01 — archived ganha aviso, não 404).
// Draft/review NUNCA vazam existência ao público: respondem como inexistentes (D11).

export type NotaViewEstado = 'published' | 'archived' | 'missing';

export function classificaNotaView(nota: { status: string } | null): NotaViewEstado {
  if (!nota) return 'missing';
  if (nota.status === 'published') return 'published';
  if (nota.status === 'archived') return 'archived';
  return 'missing';
}
