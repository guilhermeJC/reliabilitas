# RELIABILITAS — superfície de instalação: um comando (PowerShell 5.x compatível, sem &&).
$ErrorActionPreference = 'Stop'

Write-Host '==> Instalando dependências'
npm install

if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host '==> .env criado a partir de .env.example — preencha as credenciais Supabase'
}

Write-Host '==> Verificação (formato, lint, tipos, testes)'
npm run format:check
npm run lint
npm run typecheck
npm test

Write-Host '==> Pronto. Rode: npm run dev'
