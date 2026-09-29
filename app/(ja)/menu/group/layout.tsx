import { Metadata } from 'next';
import { buildGroupMenuMetadata } from '@/i18n/metadata';
import { DEFAULT_LOCALE } from '@/i18n/config';

export const metadata: Metadata = buildGroupMenuMetadata(DEFAULT_LOCALE);

export default function GroupMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
