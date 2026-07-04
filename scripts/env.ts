// Carrega .env para scripts CLI (Node ≥ 21 tem loadEnvFile nativo; sem dependência extra).
export function loadEnv(): void {
  try {
    process.loadEnvFile?.('.env');
  } catch {
    // .env ausente é aceitável (ex.: CI só com dry-run) — quem exigir variável valida depois.
  }
}
