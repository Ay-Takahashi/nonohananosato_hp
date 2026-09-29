import { Metadata } from 'next';
import { buildGeneralMenuMetadata } from '@/i18n/metadata';
import { DEFAULT_LOCALE } from '@/i18n/config';

export const metadata: Metadata = buildGeneralMenuMetadata(DEFAULT_LOCALE);

export default function GeneralMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
