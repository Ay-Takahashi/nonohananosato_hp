import type { Metadata } from 'next';
import '../globals.scss';
import SiteShell from '@/components/SiteShell';
import { buildRootMetadata } from '@/i18n/metadata';
import { PREFIXED_LOCALES } from '@/i18n/config';
import { resolveLocale, type LocaleParams } from './params';

/**
 * デフォルト以外のロケール（/en, /zh …）のルートレイアウト
 *
 * output: 'export' なので middleware によるロケール判定はできない。
 * generateStaticParams で全ロケール分をビルド時に列挙し、
 * out/en/... out/zh/... として静的 HTML を生成する。
 * この generateStaticParams は配下のページ（menu, menu/general）にも継承される。
 */

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale: locale.path as string }));
}

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildRootMetadata(locale);
}

export default async function LocaleRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: LocaleParams;
}>) {
  const locale = await resolveLocale(params);
  return <SiteShell locale={locale}>{children}</SiteShell>;
}
