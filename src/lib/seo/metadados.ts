import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo/site';
import type { Locale } from '@/lib/content/schema';

// DEV-133 — Open Graph do site inteiro. Achado no dia do lançamento: só as
// notas declaravam `og:*`, e NENHUMA página declarava `og:image`. Como o
// anúncio do projeto é um post apontando para a home, o preview sairia sem
// imagem e com título genérico — na única página que o lançamento divulgaria.
//
// O DEV-121 tinha resolvido isso para as notas, que era o caso pensado na
// época (SEO de conteúdo). A home nunca entrou porque ninguém a compartilhava
// ainda; hoje ela é o cartão de visita.

// O nome carrega VERSÃO de propósito. Redes sociais (LinkedIn à frente) baixam
// e guardam a imagem nos servidores delas por dias, indexada pela URL. Reenviar
// bytes novos na MESMA URL não adianta: o Post Inspector revalida os metadados,
// mas reusa a imagem em cache. Trocar a URL é o único jeito confiável de forçar
// a rebusca — então, ao mudar a arte, incremente o sufixo em vez de sobrescrever.
export const OG_IMAGE = '/og-reliabilitas-v2.png';

const TEXTO: Record<Locale, { titulo: string; descricao: string; ogLocale: string }> = {
  pt: {
    titulo: 'RELIABILITAS — Handbook aberto de engenharia de confiabilidade',
    descricao:
      'Modos de falha, diagnóstico e estratégia de manutenção (RCM), com fontes citadas e calculadoras validadas. Gratuito, em português e inglês.',
    ogLocale: 'pt_BR',
  },
  en: {
    titulo: 'RELIABILITAS — Open reliability engineering handbook',
    descricao:
      'Failure modes, diagnosis and maintenance strategy (RCM), with cited sources and validated calculators. Free, in English and Portuguese.',
    ogLocale: 'en_US',
  },
};

export function metadadosBase(locale: Locale): Metadata {
  const t = TEXTO[locale];
  const url = `${SITE_URL}/${locale}`;
  // URL absoluta de propósito: rede social não resolve caminho relativo ao
  // montar o preview — o crawler dela não tem a página como base.
  const imagem = `${SITE_URL}${OG_IMAGE}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: 'RELIABILITAS', template: '%s · RELIABILITAS' },
    description: t.descricao,
    openGraph: {
      type: 'website',
      title: t.titulo,
      description: t.descricao,
      url,
      siteName: 'RELIABILITAS',
      locale: t.ogLocale,
      images: [{ url: imagem, width: 1200, height: 630, alt: 'RELIABILITAS' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.titulo,
      description: t.descricao,
      images: [imagem],
    },
  };
}
