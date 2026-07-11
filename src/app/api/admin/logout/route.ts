import { NextRequest, NextResponse } from 'next/server';

const COOKIE = 'admin_session';

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL('/admin/login', req.url), 303);
  res.cookies.delete(COOKIE);
  return res;
}
