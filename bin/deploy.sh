#!/usr/bin/env bash
# RELIABILITAS — deploy padronizado.
# G2: o push na main dispara o CI; só DEPOIS do CI verde o workflow deploy.yml
# chama o Deploy Hook da Vercel (vercel.json desliga o auto-deploy em main;
# preview de PR continua automático). Build vermelho não publica.
set -euo pipefail

echo '==> Verificação local (o mesmo que o CI vai rodar)'
npm run format:check
npm run lint
npm run typecheck

echo '==> Auditoria de dependências'
# Rodado aqui de propósito: CVEs novas aparecem na base de advisories ENTRE
# sessões, sem nada mudar no código, e este é o estágio do CI que mais derrubou
# o pipeline. Descobrir localmente custa segundos; descobrir pelo CI já custou
# dias de atraso silencioso.
npm audit --audit-level=high

echo '==> Validando conteúdo (ingest dry-run)'
npm run ingest:dry

echo '==> Suíte de testes'
npm test

echo '==> Push para main (dispara o CI; deploy.yml publica só se o CI passar)'
git push origin main

echo '==> Agora CONFIRME o resultado — "pushed" não é "em produção":'
echo '    1. Actions "CI" precisa terminar verde'
echo '    2. Actions "Deploy" dispara o webhook (não significa que a Vercel terminou)'
echo '    3. Só a PÁGINA no ar prova o deploy: abra https://reliabilitas.com'
