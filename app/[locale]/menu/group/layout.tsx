import { Metadata } from 'next';
import { buildGroupMenuMetadata } from '@/i18n/metadata';
import { resolveLocale, type LocaleParams } from '../../params';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildGroupMenuMetadata(locale);
}

export default function GroupMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
