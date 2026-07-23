// DEV-083 #4: extração de IP repetida em admin/login, api/sugestao e
// api/contribuicao (mesma lógica, 3 cópias) — fonte única testável.
// x-forwarded-for pode trazer uma cadeia de proxies; usamos o primeiro.
export function extraiIp(headers: Pick<Headers, 'get'>): string {
  return (headers.get('x-forwarded-for') ?? 'local').split(',')[0].trim();
}
