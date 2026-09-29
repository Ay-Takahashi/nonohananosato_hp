import HomeView from '@/components/pages/HomeView';
import { resolveLocale, type LocaleParams } from './params';

export default async function LocaleHome({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  return <HomeView locale={locale} />;
}
