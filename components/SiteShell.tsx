import { Klee_One } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getImagePath } from '@/lib/utils';
import { getFacilityInfo } from '@/lib/menuData';
import { getDictionary } from '@/i18n/getDictionary';
import { getLocaleConfig, localePath, type Locale } from '@/i18n/config';

/**
 * 全ロケール共通のルートレイアウト本体（<html> / <body> を含む）
 *
 * ロケールごとに <html lang> を出し分ける必要があるため、
 * app/(ja)/layout.tsx と app/[locale]/layout.tsx がそれぞれ
 * ルートレイアウトとしてこのコンポーネントを描画する。
 */

const kleeOne = Klee_One({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-klee-one',
});

// NOTE: デフォルト値は既存実装のまま。正しい本番ドメインへの差し替えは Issue #5 で対応中。
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nonohananosato.jp';

export default function SiteShell({
  locale,
  children,
}: Readonly<{
  locale: Locale;
  children: React.ReactNode;
}>) {
  const watermarkBgPath = getImagePath('/images/08_2.jpg');
  const dict = getDictionary(locale);
  const facilityInfo = getFacilityInfo(locale);
  const localeConfig = getLocaleConfig(locale);

  // 構造化データ（JSON-LD）
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: facilityInfo.facilityName,
    image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/IMG_8327.JPG`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: facilityInfo.address.full,
      addressLocality: '九重町',
      addressRegion: '大分県',
      postalCode: facilityInfo.address.postalCode.replace('〒', ''),
      addressCountry: 'JP',
    },
    telephone: facilityInfo.contact.tel,
    email: facilityInfo.contact.email,
    url: `${siteUrl}${process.env.NEXT_PUBLIC_BASE_PATH || ''}${localePath(locale, '/')}`,
    inLanguage: localeConfig.htmlLang,
    servesCuisine: '和食',
    priceRange: '¥¥',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '11:00',
      closes: '14:00',
    },
    acceptsReservations: 'True',
  };

  return (
    <html lang={localeConfig.htmlLang}>
      {/* App Routerのルートレイアウトから呼ばれるため<head>の直接記述が正しい（next/headはPages Router用） */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --watermark-bg-image: url('${watermarkBgPath}');
          }
        ` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${kleeOne.variable} antialiased`}>
        <Header locale={locale} dict={dict} />
        <main className="pt-20">{children}</main>
        <Footer locale={locale} dict={dict} facilityInfo={facilityInfo} />
      </body>
    </html>
  );
}
