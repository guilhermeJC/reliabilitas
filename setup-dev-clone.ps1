# RELIABILITAS - Setup do clone de desenvolvimento (fora do OneDrive)
# Uso: 1) Ajuste $GitHubUser abaixo  2) Botao direito > Executar com PowerShell
#      (ou no terminal: powershell -ExecutionPolicy Bypass -File .\setup-dev-clone.ps1)

$GitHubUser = "guilhermeJC"   # <<< TROQUE pelo seu usuario do GitHub

$RepoUrl  = "https://github.com/$GitHubUser/reliabilitas.git"
$DevPath  = "C:\dev\reliabilitas"
$DocsSrc  = "C:\Users\Administrador\OneDrive - FEI\Documents\Obsidian Vault\2.1. PROJECTS\D - RELIABILITAS\.reliabilitas\docs"

Write-Host "== RELIABILITAS dev setup ==" -ForegroundColor Cyan

if ($GitHubUser -eq "SEU_USUARIO") {
    Write-Host "ERRO: edite este arquivo e troque SEU_USUARIO pelo seu usuario do GitHub." -ForegroundColor Red
    exit 1
}

if (Test-Path $DevPath) {
    Write-Host "AVISO: $DevPath ja existe. Abortando para nao sobrescrever." -ForegroundColor Yellow
    exit 1
}

New-Item -ItemType Directory -Force -Path "C:\dev" | Out-Null
Write-Host "[1/4] Clonando $RepoUrl ..." -ForegroundColor Cyan
git clone $RepoUrl $DevPath
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO no clone. Verifique usuario/autenticacao GitHub." -ForegroundColor Red
    exit 1
}

Write-Host "[2/4] Copiando docs fundadores (local-only, D28)..." -ForegroundColor Cyan
Copy-Item -Path "$DocsSrc\*" -Destination "$DevPath\docs\" -Recurse -Force

Write-Host "[3/4] Verificando..." -ForegroundColor Cyan
Set-Location $DevPath
git status
Get-ChildItem "$DevPath\docs" | Select-Object Name

Write-Host "[4/4] Pronto! Desenvolvimento em: $DevPath" -ForegroundColor Green
Write-Host "Abra o VS Code/Claude Code NESTA pasta para o M04." -ForegroundColor Green
