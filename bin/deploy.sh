#!/usr/bin/env bash
# RELIABILITAS — deploy padronizado.
# Fase 0–1: deploy = push na main (Vercel constrói e publica; preview por PR).
# Release oficial: git tag vX.Y.Z dispara release.yml (a criar no Dia 5).
set -euo pipefail

echo '==> Verificação local (o mesmo que o CI vai rodar)'
npm run format:check
npm run lint
npm run typecheck
npm test

echo '==> Validando conteúdo (ingest dry-run)'
npm run ingest:dry

echo '==> Push para main (Vercel faz o deploy)'
git push origin main

echo '==> Deploy disparado. Acompanhe o CI no GitHub e o build na Vercel.'
