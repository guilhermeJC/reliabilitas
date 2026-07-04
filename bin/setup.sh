#!/usr/bin/env bash
# RELIABILITAS — superfície de instalação: um comando.
set -euo pipefail

echo '==> Instalando dependências'
npm install

if [ ! -f .env ]; then
  cp .env.example .env
  echo '==> .env criado a partir de .env.example — preencha as credenciais Supabase'
fi

echo '==> Verificação (formato, lint, tipos, testes)'
npm run format:check
npm run lint
npm run typecheck
npm test

echo '==> Pronto. Rode: npm run dev'
