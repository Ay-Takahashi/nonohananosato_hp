import HomeView from '@/components/pages/HomeView';
import { DEFAULT_LOCALE } from '@/i18n/config';

export default function Home() {
  return <HomeView locale={DEFAULT_LOCALE} />;
}
