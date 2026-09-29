import Link from 'next/link';
import { localePath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';

/**
 * 一般メニュー / 団体メニューの切り替えタブ
 *
 * 以前はクエリパラメータ（?tab=）で切り替えるボタンだったが、
 * それだと useSearchParams が必要になり静的エクスポートで prerender できず、
 * 本文が検索エンジンに届かなかった（#11）。
 * 各タブを独立したページへの Link にすることで、両方が静的 HTML として出力される。
 */
export default function MenuTabs({
  locale,
  dict,
  current,
}: {
  locale: Locale;
  dict: Dictionary;
  current: 'general' | 'group';
}) {
  const tabs = [
    { key: 'general' as const, path: '/menu/general', label: dict.menu.tabs.general },
    { key: 'group' as const, path: '/menu/group', label: dict.menu.tabs.group },
  ];

  return (
    <section className="bg-main-600 border-b border-accent-500/30 sticky top-20 z-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <nav className="flex justify-center" aria-label={dict.nav.menu}>
          {tabs.map((tab) => {
            const isCurrent = tab.key === current;
            return (
              <Link
                key={tab.key}
                href={localePath(locale, tab.path)}
                aria-current={isCurrent ? 'page' : undefined}
                className={`px-8 py-4 text-lg font-semibold transition-all relative ${
                  isCurrent ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
                {isCurrent && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-accent-500" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
