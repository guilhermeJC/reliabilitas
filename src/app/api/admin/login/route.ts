import { NextRequest, NextResponse } from 'next/server';
import { criaTokenSessao, senhaCorreta } from '@/lib/admin-auth';
import { criaRateLimiter } from '@/lib/rate-limit';
import { extraiIp } from '@/lib/request-ip';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-session';

// Painel de aprovação (11/07) — login por senha única (sem conta de usuário,
// Auth completo adiado pra Fase 2/3 — DEV-018/DEV-046). Rate limit por IP
// contra força bruta da senha (defesa em profundidade; teto global no
// Cloudflare). Cookie httpOnly+secure+sameSite=strict — nunca lido por JS.

const permite = criaRateLimiter({ maxNaJanela: 5, janelaMs: 15 * 60 * 1000 });

function segredo(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error('ADMIN_SESSION_SECRET não configurado no .env');
  return s;
}

function senhaEsperada(): string {
  const s = process.env.ADMIN_PASSWORD;
  if (!s) throw new Error('ADMIN_PASSWORD não configurado no .env');
  return s;
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const senha = String(form.get('senha') ?? '');

  const ip = extraiIp(req.headers);
  if (!permite(ip)) {
    return NextResponse.redirect(new URL('/admin/login?st=limite', req.url), 303);
  }

  if (!senhaCorreta(senha, senhaEsperada())) {
    return NextResponse.redirect(new URL('/admin/login?st=erro', req.url), 303);
  }

  const token = criaTokenSessao(segredo());
  const res = NextResponse.redirect(new URL('/admin', req.url), 303);
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias — mesma duração do token
  });
  return res;
}
