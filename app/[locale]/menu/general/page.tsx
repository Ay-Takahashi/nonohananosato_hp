import GeneralMenuView from '@/components/pages/GeneralMenuView';
import { resolveLocale, type LocaleParams } from '../../params';

export default async function LocaleGeneralMenuPage({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  return <GeneralMenuView locale={locale} />;
}
