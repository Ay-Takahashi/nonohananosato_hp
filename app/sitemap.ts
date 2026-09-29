import { MetadataRoute } from 'next';
import { LOCALES, getLocaleConfig, type Locale } from '@/i18n/config';

export const dynamic = 'force-static';

/** ロケール非依存のページパス一覧（トップは '' ） */
const ROUTES = ['', '/menu', '/menu/general', '/menu/group'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nonohananosato.jp';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const lastModified = new Date();

  /** ロケールを考慮した絶対 URL。デフォルトロケールはプレフィックスなし */
  const absolute = (locale: Locale, route: string) => {
    const prefix = getLocaleConfig(locale).path;
    const path = prefix ? `/${prefix}${route}` : route;
    return `${baseUrl}${basePath}${path}`;
  };

  return ROUTES.flatMap((route) => {
    // 同一ページの全ロケール版を hreflang として相互に指す
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      languages[locale.hreflang] = absolute(locale.id, route);
    }
    // 言語が判定できない場合の既定はデフォルトロケール（日本語・プレフィックスなし）
    languages['x-default'] = `${baseUrl}${basePath}${route}`;

    return LOCALES.map((locale) => ({
      url: absolute(locale.id, route),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
      alternates: { languages },
    }));
  });
}
