import GroupMenuView from '@/components/pages/GroupMenuView';
import { resolveLocale, type LocaleParams } from '../../params';

export default async function LocaleGroupMenuPage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  return <GroupMenuView locale={locale} />;
}
