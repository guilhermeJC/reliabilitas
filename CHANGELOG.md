# Changelog

Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) · Versionamento: [SemVer](https://semver.org/lang/pt-BR/).

## [0.1.0] — 2026-09-04

Primeira versão pública, no ar em [reliabilitas.com](https://reliabilitas.com). Acervo de 124 notas
(62 em português, 62 em inglês), 324 ligações de grafo e 501 testes.

### Conteúdo

- **Handbook de bomba centrífuga no padrão editorial completo**: princípio de funcionamento
  (Bernoulli → Euler), anatomia interativa com 14 pontos clicáveis e linha de fluxo, velocidade
  específica, leis de afinidade, NPSH, curva H-Q ao vivo com região preferida de operação, seção de
  instalação com quatro diagramas próprios, clusterização por seis eixos e fotografia licenciada.
- **Dois componentes aprofundados** — rolamento e selo mecânico — com **dez modos de falha**
  próprios, cada um em três níveis de leitura (Entender / Aplicar / Dominar) e com plano de
  manutenção exportável.
- **Taxonomia funcional validada contra a ISO 14224**: oito classes por função sobre o fluido, com
  famílias, princípios construtivos, fichas de marca e modelo, e notas de estratégia (TBM, CBM,
  proof test, run-to-failure, redesenho).
- **Todo modo de falha carrega o método visível**: Framework A (padrão de taxa de falha, Nowlan &
  Heap) para o diagnóstico e Framework B (lógica de decisão RCM, SAE JA1011 / Moubray) para a
  prescrição, com o plano de manutenção derivado na estrutura mínima de procedimento.
- Página **"Como usar as calculadoras"**, com teoria, parâmetros, estimativa e leitura de resultado.
- Página de **normas técnicas citadas**, agregando as fontes primárias usadas no acervo.
- **Alerta de causa raiz em padrão infantil**: quando um modo de falha tem β < 1 e a prescrição é
  monitoramento por condição, a nota avisa que monitorar detecta mas **não elimina a causa**, e que
  revisar por idade tende a piorar — porque cada intervenção reinicia o período de maior risco
  (Nowlan & Heap). Vale automaticamente para qualquer modo de falha futuro.

### Aplicação

- **Navegação em grafo**: wikilinks entre notas, backlinks automáticos, grafo local em SVG próprio e
  árvore taxonômica lateral com trilha de navegação.
- **Busca em texto completo** com pesos (título > tags > corpo), busca sem acento em ambos os
  idiomas e trecho destacado no resultado.
- **Três calculadoras de confiabilidade**, validadas contra exemplos da literatura _antes_ de virarem
  interface: Weibull de dois parâmetros (confiabilidade, taxa de risco, MTTF, B10, leitura do
  Framework A ao vivo pelo β), MTBF/MTTR/disponibilidade e intervalo P-F.
- **Exportação** do plano de manutenção e da nota em CSV e Markdown, gerada no navegador.
- **Fórmulas renderizadas** no servidor com KaTeX.
- **Bilíngue de verdade**: PT e EN com URLs próprias, e a troca de idioma preserva a página e a busca.
- **Seletor de estratégia RCM**: quatro perguntas levam à decisão de manutenção e ao plano-base.
- Duas superfícies de participação: **"Sugerir correção"** em qualquer página e **"Colaborar"** para
  propor uma nota nova. Nenhum dado pessoal é obrigatório.

### Segurança

- **Row Level Security** negando acesso anônimo em todas as tabelas, provado por teste contra a
  instância viva no CI, afirmando o código de erro exato do Postgres.
- **Nenhuma credencial no navegador**: o acesso ao banco vive em módulos `server-only`, e a única
  variável pública é o endpoint de telemetria, que não é segredo.
- **Content-Security-Policy com nonce por requisição**, sem `unsafe-inline` em scripts.
- **Busca via função parametrizada** no banco, com execução negada a usuários anônimos.
- **Rate limit** nas rotas de escrita e no login do painel, com honeypot que devolve sucesso falso a
  robôs, sem gravar nada.
- **Alvo de wikilink só vira link** se for um identificador canônico, o que torna injeção de atributo
  impossível por construção; links em Markdown passam por lista de protocolos permitidos.
- **Painel de moderação** protegido por senha e cookie assinado, com verificação independente em cada
  rota que altera dados.
- **Todo o tráfego passa pela borda**: o servidor de origem redireciona para o domínio canônico, de
  modo que nenhuma requisição escapa das regras de firewall e limite de taxa.
- Cabeçalhos de segurança, HSTS e política de permissões ativos em todas as respostas.

### Infraestrutura

- **Publicação travada atrás do CI**: o deploy só dispara depois que estilo, tipos, auditoria de
  dependências, análise estática, testes e build de produção passam. Build vermelho não publica.
- **Validação de conteúdo no build**: frontmatter inválido, cadeia taxonômica quebrada ou wikilink
  órfão derrubam o CI antes de qualquer publicação.
- **Ingest transacional** com reconciliação: notas removidas do repositório saem do banco.
- **Observabilidade**: verificação de saúde, rastreamento de erros e log estruturado com
  identificador de correlação por requisição.
- `sitemap.xml` e `robots.txt` próprios, com 144 endereços e permissão explícita para rastreadores.
- Medição de audiência sem cookies.

[0.1.0]: https://github.com/guilhermeJC/reliabilitas/releases/tag/v0.1.0
