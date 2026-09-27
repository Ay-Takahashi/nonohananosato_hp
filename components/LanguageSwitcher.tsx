'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGlobe } from 'react-icons/fi';
import {
  LOCALES,
  localePath,
  stripLocaleFromPathname,
  type Locale,
} from '@/i18n/config';

/**
 * 言語切り替え UI
 *
 * 静的エクスポートのためサーバー側で Accept-Language を見た自動リダイレクトはできない。
 * 代わりに全言語へのリンクを常に出し、ユーザーに選んでもらう（静的サイトの一般的な方式）。
 * 現在のページと同じパスの別言語版へリンクする。
 */
export default function LanguageSwitcher({
  locale,
  label,
  className = '',
  onNavigate,
}: {
  locale: Locale;
  label: string;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() ?? '/';
  const basePathname = stripLocaleFromPathname(pathname);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <FiGlobe className="text-white/70 mr-1" aria-hidden="true" />
      <span className="sr-only">{label}</span>
      {LOCALES.map((target, index) => {
        const isCurrent = target.id === locale;
        return (
          <span key={target.id} className="flex items-center">
            {index > 0 && <span className="text-white/30 px-1" aria-hidden="true">/</span>}
            {isCurrent ? (
              <span
                className="text-white font-semibold px-1 text-sm"
                aria-current="true"
                lang={target.htmlLang}
              >
                {target.shortLabel}
              </span>
            ) : (
              <Link
                href={localePath(target.id, basePathname)}
                hrefLang={target.hreflang}
                lang={target.htmlLang}
                onClick={onNavigate}
                className="text-white/70 hover:text-white transition px-1 text-sm"
                title={target.label}
              >
                {target.shortLabel}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
