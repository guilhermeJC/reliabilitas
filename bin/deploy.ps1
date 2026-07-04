# RELIABILITAS — deploy padronizado (PowerShell 5.x compatível, sem &&).
# Fase 0–1: deploy = push na main (Vercel constrói e publica; preview por PR).
# Release oficial: git tag vX.Y.Z dispara release.yml (a criar no Dia 5).
$ErrorActionPreference = 'Stop'

Write-Host '==> Verificação local (o mesmo que o CI vai rodar)'
npm run format:check
npm run lint
npm run typecheck
npm test

Write-Host '==> Validando conteúdo (ingest dry-run)'
npm run ingest:dry

Write-Host '==> Push para main (Vercel faz o deploy)'
git push origin main

Write-Host '==> Deploy disparado. Acompanhe o CI no GitHub e o build na Vercel.'
