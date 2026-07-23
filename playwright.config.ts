import { defineConfig, devices } from '@playwright/test';

// G5 (Dia 5) — smoke E2E deliberadamente enxuto: 4 fluxos críticos, 1
// browser (Chromium), 1 arquivo. Não é uma suíte de regressão visual nem
// cross-browser — isso seria desproporcional ao tamanho do projeto. `next
// dev` (não `next start`) para não exigir um build de produção separado só
// pra rodar 4 testes; CI sobe o próprio servidor quando não há um já ativo.
export default defineConfig({
  testDir: './tests/e2e',
  // Serial, não paralelo: 4 testes batendo ao mesmo tempo no cold-start do
  // `next dev` (cada um compilando uma rota diferente pela 1ª vez) disputa
  // o compilador webpack e gera flake — não vale a complexidade de isolar.
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: 'line',
  // Achado ao construir esta suíte: `next dev` com HMR ativo intercepta a
  // transição client-side do App Router em pleno clique automatizado (o
  // fetch RSC para a URL certa acontece, mas o pushState se perde em meio a
  // um rebuild concorrente do webpack) — flake real, não do teste. `next
  // start` (build de produção) elimina essa classe de problema e é mais
  // fiel ao que vai pro ar. Timeout generoso cobre o build no início.
  timeout: 90_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
    navigationTimeout: 60_000,
    actionTimeout: 15_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // No CI o build já rodou no estágio anterior (mesmo job/filesystem) —
    // rebuildar aqui seria estágio duplicado. Local: builda antes de servir.
    command: process.env.CI ? 'npm run start' : 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
