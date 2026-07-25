// Compara os arquivos de migração do repositório contra o que está de fato
// registrado em public.schema_migrations no banco real. Existir no Git NÃO
// significa que foi aplicada (achado real, DEV-100/25-07: a 0007 do pivot
// DEV-094 ficou 1 dia sem rodar em produção, falhando o Colaborar em
// silêncio). Lógica pura — a leitura do disco/banco fica no script.

export interface DivergenciaMigracoes {
  /** Existe no repositório, mas nenhuma linha correspondente em schema_migrations. */
  pendentes: string[];
  /** Registrada em schema_migrations, mas o arquivo não existe mais no repositório. */
  orfas: string[];
}

export function comparaMigracoes(
  arquivosLocais: string[],
  aplicadas: string[],
): DivergenciaMigracoes {
  const setAplicadas = new Set(aplicadas);
  const setLocais = new Set(arquivosLocais);
  return {
    pendentes: arquivosLocais.filter((f) => !setAplicadas.has(f)).sort(),
    orfas: aplicadas.filter((a) => !setLocais.has(a)).sort(),
  };
}
