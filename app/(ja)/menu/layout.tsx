import { Metadata } from 'next';
import { buildMenuMetadata } from '@/i18n/metadata';
import { DEFAULT_LOCALE } from '@/i18n/config';

export const metadata: Metadata = buildMenuMetadata(DEFAULT_LOCALE);

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
