import { Metadata } from 'next';
import { buildGeneralMenuMetadata } from '@/i18n/metadata';
import { resolveLocale, type LocaleParams } from '../../params';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildGeneralMenuMetadata(locale);
}

export default function GeneralMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
