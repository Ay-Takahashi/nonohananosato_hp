import MenuIndexView from '@/components/pages/MenuIndexView';
import { resolveLocale, type LocaleParams } from '../params';

export default async function LocaleMenuPage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  return <MenuIndexView locale={locale} />;
}
