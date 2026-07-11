// Anatomia interativa da Bomba Centrífuga (melhoria 2 do fundador, 10/07):
// os hotspots numerados sobrepostos ao corte /anatomia/bomba-centrifuga.svg.
// Coordenadas em % do viewBox (980×560). Cada ponto: título, descrição de
// engenharia e lista de aprofundamento (notas do acervo via slug e/ou âncoras
// de seção da própria página). Textos PT+EN aqui (módulo por handbook) — fora
// do catálogo next-intl de propósito (payload).

export interface LinkAprofundamento {
  rotulo: string;
  slug?: string; // nota do acervo (resolvida com notaPath)
  anchor?: string; // âncora de h2 da própria página (slugifyHeading)
}

export interface TextoHotspot {
  titulo: string;
  descricao: string;
  links: LinkAprofundamento[];
}

export interface Hotspot {
  num: number;
  x: number; // % da largura
  y: number; // % da altura
  pt: TextoHotspot;
  en: TextoHotspot;
}

export const HOTSPOTS_BOMBA_CENTRIFUGA: Hotspot[] = [
  {
    num: 1,
    x: 9.7,
    y: 53.6,
    pt: {
      titulo: 'Bocal de sucção',
      descricao:
        'A entrada axial — a região de MENOR pressão de todo o sistema. É aqui que a margem de NPSH se decide e a cavitação nasce quando ela se esgota. Regra de ouro: nunca estrangular a sucção; redutor excêntrico com face plana para cima e 5–10 diâmetros retos antes do bocal.',
      links: [
        { rotulo: 'Cavitação — o modo de falha assinatura', slug: 'cavitacao' },
        { rotulo: 'NPSH no princípio de funcionamento', anchor: 'principio-de-funcionamento' },
      ],
    },
    en: {
      titulo: 'Suction nozzle',
      descricao:
        'The axial inlet — the LOWEST-pressure region of the entire system. This is where the NPSH margin is decided and where cavitation is born once it runs out. Golden rule: never throttle the suction; eccentric reducer flat side up and 5–10 straight diameters before the nozzle.',
      links: [
        { rotulo: 'Cavitation — the signature failure mode', slug: 'cavitacao' },
        { rotulo: 'NPSH in the working principle', anchor: 'working-principle' },
      ],
    },
  },
  {
    num: 2,
    x: 26.7,
    y: 62.9,
    pt: {
      titulo: 'Impelidor (rotor)',
      descricao:
        'O coração da máquina: pás curvadas para trás transferem energia ao fluido pela equação de Euler — todo o head nasce na periferia. A face de baixa pressão das pás, junto ao olho, é onde os pits de cavitação aparecem primeiro. Balanceamento e folgas governam vibração e rendimento.',
      links: [
        {
          rotulo: 'Equação de Euler e velocidade específica',
          anchor: 'principio-de-funcionamento',
        },
        { rotulo: 'Erosão por cavitação no impelidor', slug: 'cavitacao' },
      ],
    },
    en: {
      titulo: 'Impeller (rotor)',
      descricao:
        "The machine's heart: backward-curved vanes transfer energy to the fluid per Euler's equation — all the head is born at the periphery. The vanes' low-pressure face near the eye is where cavitation pits appear first. Balance and clearances govern vibration and efficiency.",
      links: [
        { rotulo: "Euler's equation and specific speed", anchor: 'working-principle' },
        { rotulo: 'Cavitation erosion on the impeller', slug: 'cavitacao' },
      ],
    },
  },
  {
    num: 3,
    x: 20.0,
    y: 53.6,
    pt: {
      titulo: 'Anéis de desgaste',
      descricao:
        'A vedação interna entre a descarga e a sucção do impelidor. A folga aqui É o rendimento volumétrico: dobrar a folga de projeto derruba pontos percentuais de eficiência — a deriva lenta que o monitoramento de desempenho enxerga. São sacrificiais: protegem impelidor e carcaça.',
      links: [{ rotulo: 'Rendimento decomposto (η_v)', anchor: 'principio-de-funcionamento' }],
    },
    en: {
      titulo: 'Wear rings',
      descricao:
        'The internal seal between impeller discharge and suction. The clearance here IS the volumetric efficiency: doubling the design clearance knocks off whole efficiency points — the slow drift performance monitoring sees. They are sacrificial: they protect impeller and casing.',
      links: [{ rotulo: 'Efficiency decomposed (η_v)', anchor: 'working-principle' }],
    },
  },
  {
    num: 4,
    x: 18.9,
    y: 30.4,
    pt: {
      titulo: 'Voluta (carcaça espiral)',
      descricao:
        'Coleta o fluido na periferia do impelidor e converte velocidade em pressão pela expansão progressiva de seção. A língua da voluta define a vibração de passagem de pás (BPF); fora do BEP, a distribuição de pressão desequilibra e nasce o empuxo radial — a voluta dupla existe para isso.',
      links: [
        { rotulo: 'Curva H–Q e janela de operação', anchor: 'principio-de-funcionamento' },
        { rotulo: 'Recirculação e cavitação de descarga', slug: 'cavitacao' },
      ],
    },
    en: {
      titulo: 'Volute (spiral casing)',
      descricao:
        'Collects fluid at the impeller periphery and converts velocity into pressure through progressive section expansion. The volute tongue defines blade-passing vibration (BPF); away from BEP the pressure distribution unbalances and radial thrust is born — the double volute exists for that.',
      links: [
        { rotulo: 'H–Q curve and operating window', anchor: 'working-principle' },
        { rotulo: 'Recirculation and discharge cavitation', slug: 'cavitacao' },
      ],
    },
  },
  {
    num: 5,
    x: 30.1,
    y: 17.0,
    pt: {
      titulo: 'Bocal de recalque',
      descricao:
        'A saída da voluta na pressão de descarga. É pela válvula DESTE lado que se regula vazão com a máquina em operação (nunca pela sucção). A pressão aqui, menos a de sucção, dividida por ρg, é o head entregue — a leitura de campo da curva H–Q.',
      links: [
        { rotulo: 'A bomba no sistema — ponto de operação', anchor: 'principio-de-funcionamento' },
      ],
    },
    en: {
      titulo: 'Discharge nozzle',
      descricao:
        'The volute outlet at discharge pressure. Flow is regulated at THIS side’s valve with the machine running (never at the suction). Pressure here, minus suction pressure, divided by ρg, is the delivered head — the field reading of the H–Q curve.',
      links: [{ rotulo: 'The pump in the system — operating point', anchor: 'working-principle' }],
    },
  },
  {
    num: 6,
    x: 51.5,
    y: 46.8,
    pt: {
      titulo: 'Caixa de selagem + selo mecânico',
      descricao:
        'A vedação dinâmica entre eixo e carcaça: um par de faces planas separado por um filme de ~1 μm do próprio fluido. É o item nº 1 de intervenção da bomba (ESA: ~60% das falhas registradas) — e, na maioria dos casos, a falha do selo é SINTOMA de causa a montante: operação fora do BEP, perda de flush, cavitação.',
      links: [{ rotulo: 'Selo mecânico — handbook do componente', slug: 'selo-mecanico' }],
    },
    en: {
      titulo: 'Seal chamber + mechanical seal',
      descricao:
        'The dynamic seal between shaft and casing: a pair of flat faces separated by a ~1 μm film of the pumped fluid itself. It is the pump’s no. 1 intervention item (ESA: ~60% of recorded failures) — and in most cases seal failure is a SYMPTOM of an upstream cause: off-BEP operation, flush loss, cavitation.',
      links: [{ rotulo: 'Mechanical seal — component handbook', slug: 'selo-mecanico' }],
    },
  },
  {
    num: 7,
    x: 63.3,
    y: 53.6,
    pt: {
      titulo: 'Eixo',
      descricao:
        'Transmite o torque do acionador ao impelidor. Em bombas de processo é dimensionado por RIGIDEZ tanto quanto por resistência: a deflexão na face do selo (tipicamente < 0,05 mm) decide a vida da vedação. O índice L³/D⁴ é o critério clássico de comparação entre projetos.',
      links: [{ rotulo: 'Empuxos radial e axial', anchor: 'principio-de-funcionamento' }],
    },
    en: {
      titulo: 'Shaft',
      descricao:
        'Transmits driver torque to the impeller. In process pumps it is sized for STIFFNESS as much as strength: deflection at the seal faces (typically < 0.05 mm) decides sealing life. The L³/D⁴ index is the classic design-comparison criterion.',
      links: [{ rotulo: 'Radial and axial thrusts', anchor: 'working-principle' }],
    },
  },
  {
    num: 8,
    x: 76.1,
    y: 47.1,
    pt: {
      titulo: 'Rolamentos (radial + escora)',
      descricao:
        'O rolamento radial (lado acoplado) carrega as cargas que crescem fora do BEP; o par de escora (lado oposto) absorve o empuxo axial residual do balanceamento. Respondem por ~⅓ das falhas do conjunto — com contaminação e lubrificação inadequada dominando as causas.',
      links: [{ rotulo: 'Rolamento — handbook do componente', slug: 'rolamento' }],
    },
    en: {
      titulo: 'Bearings (radial + thrust)',
      descricao:
        'The radial bearing (drive end) carries the loads that grow away from BEP; the thrust pair (non-drive end) absorbs the residual axial thrust left by the balancing. They account for ~⅓ of assembly failures — with contamination and poor lubrication dominating the causes.',
      links: [{ rotulo: 'Rolling bearing — component handbook', slug: 'rolamento' }],
    },
  },
  {
    num: 9,
    x: 70.4,
    y: 67.7,
    pt: {
      titulo: 'Carter de óleo + visor de nível',
      descricao:
        'O banho de óleo que lubrifica os rolamentos. Nível na marca do visor, óleo límpido e temperatura estável são a janela de monitoramento mais barata da máquina. Água e partículas no óleo são a causa dominante de falha prematura de rolamento — daí a análise de óleo na rota.',
      links: [{ rotulo: 'Lubrificação e falha de rolamento', slug: 'rolamento' }],
    },
    en: {
      titulo: 'Oil sump + sight glass',
      descricao:
        'The oil bath that lubricates the bearings. Level on the sight-glass mark, clear oil and stable temperature are the machine’s cheapest monitoring window. Water and particles in the oil are the dominant cause of premature bearing failure — hence oil analysis on the route.',
      links: [{ rotulo: 'Lubrication and bearing failure', slug: 'rolamento' }],
    },
  },
  {
    num: 10,
    x: 56.9,
    y: 46.8,
    pt: {
      titulo: 'Vedação dos mancais',
      descricao:
        'Labirintos ou retentores onde o eixo atravessa a caixa de mancais: mantêm o óleo dentro e a contaminação (água de lavagem, poeira, vapor) fora. Um labirinto degradado é o caminho clássico da água para o carter — e 52% das falhas de rolamento começam por contaminação.',
      links: [{ rotulo: 'Contaminação como causa raiz', slug: 'rolamento' }],
    },
    en: {
      titulo: 'Bearing housing seals',
      descricao:
        'Labyrinths or lip seals where the shaft crosses the bearing housing: they keep oil in and contamination (washdown water, dust, steam) out. A degraded labyrinth is water’s classic path into the sump — and 52% of bearing failures start with contamination.',
      links: [{ rotulo: 'Contamination as root cause', slug: 'rolamento' }],
    },
  },
  {
    num: 11,
    x: 84.6,
    y: 53.6,
    pt: {
      titulo: 'Ajuste da folga axial do rotor',
      descricao:
        'Na tampa traseira, os parafusos de ajuste posicionam o conjunto girante e definem a folga do impelidor (crítica em impelidores semiabertos: a folga É o rendimento). Ajuste feito a frio conforme o manual do fabricante, re-verificado após intervenção.',
      links: [{ rotulo: 'Rendimento e folgas', anchor: 'principio-de-funcionamento' }],
    },
    en: {
      titulo: 'Impeller axial clearance adjustment',
      descricao:
        'At the rear cover, adjustment screws position the rotating assembly and set the impeller clearance (critical on semi-open impellers: clearance IS efficiency). Set cold per the manufacturer’s manual and re-verified after any intervention.',
      links: [{ rotulo: 'Efficiency and clearances', anchor: 'working-principle' }],
    },
  },
  {
    num: 12,
    x: 73.4,
    y: 38.6,
    pt: {
      titulo: 'Ponto de medição de vibração',
      descricao:
        'O acelerômetro (fixo ou de rota) na caixa de mancais é o ouvido da preditiva: frequências de defeito de rolamento, 1×RPM (desbalanceamento), 2×RPM (desalinhamento), BPF e a banda larga de alta frequência da cavitação. Medição sempre no mesmo ponto e na mesma condição de carga.',
      links: [
        { rotulo: 'Assinatura espectral da cavitação', slug: 'cavitacao' },
        { rotulo: 'Frequências de defeito de rolamento', slug: 'rolamento' },
      ],
    },
    en: {
      titulo: 'Vibration measurement point',
      descricao:
        'The accelerometer (fixed or route-based) on the bearing housing is predictive maintenance’s ear: bearing defect frequencies, 1×RPM (unbalance), 2×RPM (misalignment), BPF and cavitation’s high-frequency broadband. Always measure at the same point and load condition.',
      links: [
        { rotulo: 'Cavitation’s spectral signature', slug: 'cavitacao' },
        { rotulo: 'Bearing defect frequencies', slug: 'rolamento' },
      ],
    },
  },
  {
    num: 13,
    x: 91.7,
    y: 45.7,
    pt: {
      titulo: 'Acoplamento + proteção',
      descricao:
        'Liga o eixo da bomba ao acionador e absorve o desalinhamento residual — que deve ser mínimo: alinhamento a laser (com correção a quente quando aplicável) é dos investimentos de maior retorno em MTBF. A proteção é mandatória (NR-12); as janelas permitem inspeção sem remoção.',
      links: [{ rotulo: 'Desalinhamento no espectro (2×RPM)', anchor: 'tecnologias' }],
    },
    en: {
      titulo: 'Coupling + guard',
      descricao:
        'Connects the pump shaft to the driver and absorbs residual misalignment — which must be minimal: laser alignment (with hot correction where applicable) is among the highest-MTBF-return investments. The guard is mandatory; slots allow inspection without removal.',
      links: [{ rotulo: 'Misalignment in the spectrum (2×RPM)', anchor: 'technologies' }],
    },
  },
  {
    num: 14,
    x: 50.3,
    y: 87.7,
    pt: {
      titulo: 'Base e grouting',
      descricao:
        'A fundação é parte da máquina: base metálica nivelada, chumbada e com grouting íntegro é o que mantém o alinhamento sob carga e temperatura. "Pé manco" (soft foot) e grouting trincado aparecem no espectro como desalinhamento recorrente que nenhum alinhamento resolve.',
      links: [],
    },
    en: {
      titulo: 'Baseplate and grouting',
      descricao:
        'The foundation is part of the machine: a level, anchored baseplate with sound grouting is what holds alignment under load and temperature. Soft foot and cracked grouting show up in the spectrum as recurring misalignment that no alignment job fixes.',
      links: [],
    },
  },
];
