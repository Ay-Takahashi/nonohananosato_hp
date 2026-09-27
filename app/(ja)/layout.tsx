import type { Metadata } from 'next';
import '../globals.scss';
import SiteShell from '@/components/SiteShell';
import { buildRootMetadata } from '@/i18n/metadata';
import { DEFAULT_LOCALE } from '@/i18n/config';

/**
 * デフォルトロケール（日本語）のルートレイアウト
 *
 * 日本語はプレフィックスなしの URL（`/`, `/menu`, `/menu/general`）で配信する。
 * 既存の本番 URL を維持するための構成。
 * ロケールごとに <html lang> を変える必要があるため、
 * app/[locale]/layout.tsx と合わせて「複数ルートレイアウト」構成になっている。
 */

export const metadata: Metadata = buildRootMetadata(DEFAULT_LOCALE);

export default function JaRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteShell locale={DEFAULT_LOCALE}>{children}</SiteShell>;
}
