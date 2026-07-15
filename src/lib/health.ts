// G1/DEV-051 — /api/health checa alcançabilidade do banco. Endpoint de
// STATUS, nunca de dados (BR-004): a rota nunca retorna uma linha da tabela,
// só um booleano. `pingBanco` é injetável pra testar sem depender do Supabase
// real; nunca deixa uma exceção do banco propagar — vira "degradado".

export interface ResultadoSaude {
  status: 'ok' | 'degradado';
  banco: boolean;
  timestamp: string;
}

export async function verificaSaude(
  pingBanco: () => Promise<boolean>,
  agora: () => Date = () => new Date(),
): Promise<ResultadoSaude> {
  const banco = await pingBanco().catch(() => false);
  return {
    status: banco ? 'ok' : 'degradado',
    banco,
    timestamp: agora().toISOString(),
  };
}
