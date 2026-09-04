import { test, expect } from '@playwright/test';

// G5 — 4 fluxos críticos, ponta a ponta contra um servidor real (Vitest com
// environment 'node' não cobre nada disto: hidratação client, navegação real
// entre páginas, sessionStorage do navegador). Depende de conteúdo real no
// banco (Supabase) — CI pula graciosamente sem os secrets (mesmo padrão das
// integrações de RLS em tests/integration).

test.describe('busca', () => {
  test('busca por "rolamento" retorna resultados reais', async ({ page }) => {
    await page.goto('/pt/busca');
    // O header TAMBÉM tem uma caixa de busca (mesmo placeholder) — escopar
    // ao <main> evita o strict-mode violation do Playwright (2 matches).
    await page
      .getByRole('main')
      .getByPlaceholder('Busque por falha, componente ou norma…')
      .fill('rolamento');
    await page.getByRole('main').getByRole('button', { name: 'Buscar' }).click();
    await expect(page).toHaveURL(/\/pt\/busca\?q=rolamento/);
    await expect(page.getByText('Resultados para', { exact: false })).toBeVisible();
    await expect(page.locator('article').first()).toBeVisible();
  });
});

test.describe('seletor de nível de leitura', () => {
  test('alterna entre Entender/Aplicar/Dominar e troca o painel visível', async ({ page }) => {
    await page.goto('/pt/notas/dry-running-selo-mecanico');

    const abaEntender = page.getByRole('tab', { name: /Entender/ });
    const abaDominar = page.getByRole('tab', { name: /Dominar/ });
    await expect(abaEntender).toHaveAttribute('aria-selected', 'true');

    await abaDominar.click();
    await expect(abaDominar).toHaveAttribute('aria-selected', 'true');
    await expect(abaEntender).toHaveAttribute('aria-selected', 'false');

    // o painel Engineer carrega a calculadora Weibull embutida (F05) — prova
    // que trocou de conteúdo de verdade, não só o estado visual da aba.
    await expect(page.getByText('Weibull 2 parâmetros')).toBeVisible();
  });
});

test.describe('calculadora', () => {
  test('Weibull: mudar η recalcula o MTTF ao vivo (client-side, sem reload)', async ({ page }) => {
    await page.goto('/pt/calculadoras');
    const campoEta = page.getByLabel('η — vida característica');
    await expect(campoEta).toHaveValue('1000');

    // MTTF em η=1000, β=2 (default): η·Γ(1+1/β) ≈ 886.23 h — mesmo exemplo
    // validado em tests/unit/calc.test.ts (Smith 2004). fmt() usa
    // toLocaleString('en-US') — sem separador de milhar abaixo de 1000.
    await expect(page.getByText('886', { exact: false })).toBeVisible();

    await campoEta.fill('2000');
    await campoEta.blur();
    // dobrar η dobra o MTTF (linear em η) — ~1772,45 h. en-US insere "," de
    // milhar em 4 dígitos: "1,772.45" — asserção precisa incluir a vírgula.
    await expect(page.getByText('1,772', { exact: false })).toBeVisible();
  });
});

test.describe('troca de idioma', () => {
  test('preserva a query da busca ao trocar PT→EN (DEV-083 #3, regressão)', async ({ page }) => {
    await page.goto('/pt/busca?q=rolamento&p=1');
    await page.getByRole('link', { name: 'Ler em inglês' }).click();
    // construirUrlLocale reencaminha a query TAL QUAL está na URL atual —
    // não reaplica a canonicalização de buscaPath (que omitiria p=1).
    await expect(page).toHaveURL('/en/busca?q=rolamento&p=1');
  });
});

test.describe('byline do autor e fontes (DEV-127)', () => {
  test('autor em destaque no topo e no fim; Fontes já vêm abertas', async ({ page }) => {
    await page.goto('/pt/notas/cavitacao');
    // 2 ocorrências: antes do sumário e no fim do artigo (antes das Fontes).
    const bylines = page.getByRole('complementary', { name: 'Autor' });
    await expect(bylines).toHaveCount(2);
    await expect(bylines.first().getByText('Guilherme Joaquim Correia')).toBeVisible();
    await expect(bylines.last().getByText('Guilherme Joaquim Correia')).toBeVisible();
    // <details open>: a lista de fontes está visível sem nenhum clique.
    const fontes = page
      .locator('details')
      .filter({ has: page.locator('summary', { hasText: 'Fontes' }) });
    await expect(fontes).toHaveJSProperty('open', true);
    await expect(fontes.locator('li').first()).toBeVisible();
  });
});
