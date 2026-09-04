# RELIABILITAS — deploy padronizado (PowerShell 5.x compatível, sem &&).
# G2: o push na main dispara o CI; só DEPOIS do CI verde o workflow deploy.yml
# chama o Deploy Hook da Vercel (vercel.json desliga o auto-deploy em main;
# preview de PR continua automático). Build vermelho não publica.
$ErrorActionPreference = 'Stop'

Write-Host '==> Verificação local (o mesmo que o CI vai rodar)'
npm run format:check
npm run lint
npm run typecheck

Write-Host '==> Auditoria de dependências'
# Rodado aqui de propósito: CVEs novas aparecem na base de advisories ENTRE
# sessões, sem nada mudar no código, e este é o estágio do CI que mais derrubou
# o pipeline. Descobrir localmente custa segundos; descobrir pelo CI já custou
# dias de atraso silencioso.
npm audit --audit-level=high

Write-Host '==> Validando conteúdo (ingest dry-run)'
npm run ingest:dry

Write-Host '==> Suíte de testes'
npm test

Write-Host '==> Push para main (dispara o CI; deploy.yml publica só se o CI passar)'
git push origin main

Write-Host '==> Agora CONFIRME o resultado — "pushed" nao e "em producao":'
Write-Host '    1. Actions "CI" precisa terminar verde'
Write-Host '    2. Actions "Deploy" dispara o webhook (nao significa que a Vercel terminou)'
Write-Host '    3. So a PAGINA no ar prova o deploy: abra https://reliabilitas.com'
