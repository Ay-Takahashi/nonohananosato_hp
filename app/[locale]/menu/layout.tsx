import { Metadata } from 'next';
import { buildMenuMetadata } from '@/i18n/metadata';
import { resolveLocale, type LocaleParams } from '../params';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildMenuMetadata(locale);
}

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
