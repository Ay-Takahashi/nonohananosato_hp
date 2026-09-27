import MenuView from '@/components/pages/MenuView';
import { resolveLocale, type LocaleParams } from '../params';

export default async function LocaleMenuPage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  return <MenuView locale={locale} />;
}
