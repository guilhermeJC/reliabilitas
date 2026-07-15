# RELIABILITAS — deploy padronizado (PowerShell 5.x compatível, sem &&).
# G2/DEV-051/053: push na main dispara o CI; só DEPOIS do CI verde, o workflow
# deploy.yml chama o Vercel Deploy Hook (vercel.json desliga o auto-deploy da
# Vercel em main — preview de PR continua automático). Release oficial:
# git tag vX.Y.Z dispara release.yml (a criar no Dia 5).
$ErrorActionPreference = 'Stop'

Write-Host '==> Verificação local (o mesmo que o CI vai rodar)'
npm run format:check
npm run lint
npm run typecheck
npm test

Write-Host '==> Validando conteúdo (ingest dry-run)'
npm run ingest:dry

Write-Host '==> Push para main (dispara o CI; deploy.yml publica só se o CI passar)'
git push origin main

Write-Host '==> Acompanhe: Actions "CI" -> Actions "Deploy" -> Vercel.'
