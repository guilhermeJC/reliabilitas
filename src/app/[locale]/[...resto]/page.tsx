import { notFound } from 'next/navigation';

// T10 — catch-all: qualquer rota desconhecida dentro do locale cai no 404
// bilíngue do segmento (not-found.tsx), nunca no 404 cru do Next.
export default function RotaDesconhecida() {
  notFound();
}
