interface PageProps {
  searchParams: Promise<{ st?: string | string[] }>;
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const st = typeof sp.st === 'string' ? sp.st : null;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div
        className="w-full max-w-sm rounded-lg border bg-white p-6"
        style={{ borderColor: '#e3e8f0' }}
      >
        <h1 className="text-lg font-medium" style={{ color: 'var(--navy-900)' }}>
          Painel de aprovação
        </h1>
        <p className="mt-1 text-xs text-slate-500">Acesso restrito ao fundador.</p>

        {st === 'erro' && (
          <p
            className="mt-3 rounded-md border-l-4 bg-white p-2 text-sm text-slate-700"
            style={{ borderColor: 'var(--accent)' }}
          >
            Senha incorreta.
          </p>
        )}
        {st === 'limite' && (
          <p
            className="mt-3 rounded-md border-l-4 bg-white p-2 text-sm text-slate-700"
            style={{ borderColor: 'var(--accent)' }}
          >
            Muitas tentativas. Aguarde alguns minutos.
          </p>
        )}

        <form action="/api/admin/login" method="post" className="mt-4 space-y-3">
          <label className="block text-sm">
            <span className="text-slate-700">Senha</span>
            <input
              type="password"
              name="senha"
              required
              autoFocus
              className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
              style={{ borderColor: '#d3dae6' }}
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-md px-4 py-2 text-sm font-medium text-white"
            style={{ background: 'var(--navy-700)' }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
