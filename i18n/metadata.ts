import type { Metadata } from 'next';
import { getDictionary } from './getDictionary';
import { LOCALES, getLocaleConfig, localePath, type Locale } from './config';

/**
 * ロケール別のメタデータ生成
 *
 * hreflang は Metadata の alternates.languages で出力する（x-default はデフォルトロケール）。
 */

// NOTE: デフォルト値は既存実装のまま。正しい本番ドメインへの差し替えは Issue #5 で対応中。
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nonohananosato.jp';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const OG_IMAGE = `${basePath}/images/IMG_8327.JPG`;

/** ロケール非依存パス（'/', '/menu', '/menu/general'）から hreflang 一覧を作る */
export function buildLanguageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale.hreflang] = `${siteUrl}${basePath}${localePath(locale.id, path)}`;
  }
  // 言語が判定できない場合の既定はデフォルトロケール（日本語・プレフィックスなし）
  languages['x-default'] = `${siteUrl}${basePath}${path}`;
  return languages;
}

function canonicalUrl(locale: Locale, path: string): string {
  return `${siteUrl}${basePath}${localePath(locale, path)}`;
}

/** 各ロケールのルートレイアウト用メタデータ */
export function buildRootMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const cfg = getLocaleConfig(locale);
  const site = dict.meta.site;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: site.title,
      template: site.titleTemplate,
    },
    description: site.description,
    keywords: site.keywords,
    authors: [{ name: site.siteName }],
    creator: site.siteName,
    publisher: site.siteName,
    alternates: {
      canonical: canonicalUrl(locale, '/'),
      languages: buildLanguageAlternates('/'),
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: cfg.ogLocale,
      url: canonicalUrl(locale, '/'),
      title: site.title,
      description: site.description,
      siteName: site.siteName,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: site.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: site.title,
      description: site.shortDescription,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: `${basePath}/logo.svg`,
    },
    verification: {
      // Google Search Consoleの検証コードをここに追加できます
      // google: 'your-google-verification-code',
    },
  };
}

/** /menu 用メタデータ */
export function buildMenuMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const meta = dict.meta.menu;
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl(locale, '/menu'),
      languages: buildLanguageAlternates('/menu'),
    },
    openGraph: {
      title: `${meta.title} | ${dict.meta.site.siteName}`,
      description: meta.shortDescription,
      url: canonicalUrl(locale, '/menu'),
    },
  };
}

/** /menu/general 用メタデータ */
export function buildGeneralMenuMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const meta = dict.meta.general;
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl(locale, '/menu/general'),
      languages: buildLanguageAlternates('/menu/general'),
    },
    openGraph: {
      title: `${meta.title} | ${dict.meta.site.siteName}`,
      description: meta.description,
      url: canonicalUrl(locale, '/menu/general'),
    },
  };
}
