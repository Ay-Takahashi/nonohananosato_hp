import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.scss';
import SiteShell from '@/components/SiteShell';
import { getDictionary } from '@/i18n/getDictionary';
import { DEFAULT_LOCALE, LOCALES, localePath } from '@/i18n/config';

/**
 * 全体の 404 ページ
 *
 * 複数ルートレイアウト構成（app/layout.tsx を持たない）のため、
 * この not-found 自身が <html> / <body> を持つ必要がある。
 * どのロケールにも属さない URL のためデフォルトロケール（日本語）で表示し、
 * 各言語のトップページへのリンクを併記する。
 */
export const metadata: Metadata = {
  title: `${getDictionary(DEFAULT_LOCALE).notFound.title} | ${getDictionary(DEFAULT_LOCALE).meta.site.siteName}`,
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  const dict = getDictionary(DEFAULT_LOCALE);

  return (
    <SiteShell locale={DEFAULT_LOCALE}>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <p className="text-6xl font-bold text-main-500 mb-4">404</p>
        <h1 className="text-2xl font-bold text-main-500 mb-4">{dict.notFound.title}</h1>
        <p className="text-main-500 mb-8">{dict.notFound.description}</p>
        <ul className="flex flex-wrap gap-4 justify-center">
          {LOCALES.map((locale) => (
            <li key={locale.id}>
              <Link
                href={localePath(locale.id, '/')}
                hrefLang={locale.hreflang}
                lang={locale.htmlLang}
                className="inline-block bg-accent-500 text-white px-6 py-3 rounded-full hover:bg-accent-600 transition"
              >
                {locale.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}
