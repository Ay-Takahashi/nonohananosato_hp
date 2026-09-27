'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { FiGlobe, FiCheck, FiChevronDown } from 'react-icons/fi';
import {
  LOCALES,
  localePath,
  stripLocaleFromPathname,
  type Locale,
} from '@/i18n/config';

/**
 * 言語切り替え UI（ドロップダウン）
 *
 * 静的エクスポートのためサーバー側で Accept-Language を見た自動リダイレクトはできない。
 * 代わりに全言語への導線を出し、ユーザーに選んでもらう（静的サイトの一般的な方式）。
 * 現在のページと同じパスの別言語版へリンクする。
 *
 * 各言語名はその言語自身の表記で出す（英語話者が「日本語」の中から英語を探せるように）。
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
  const current = LOCALES.find((l) => l.id === locale) ?? LOCALES[0];

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // 外側クリックと Esc で閉じる
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 text-white/80 hover:text-white transition px-2 py-1.5 rounded-full border border-white/20 hover:border-white/40"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={label}
      >
        <FiGlobe aria-hidden="true" />
        <span className="text-sm" lang={current.htmlLang}>
          {current.shortLabel}
        </span>
        <FiChevronDown
          className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          id={menuId}
          role="menu"
          aria-label={label}
          className="absolute right-0 top-full mt-2 min-w-40 py-1 bg-main-500 border border-white/15 rounded-lg shadow-lg overflow-hidden"
        >
          {LOCALES.map((target) => {
            const isCurrent = target.id === locale;
            return (
              <li key={target.id} role="none">
                <Link
                  href={localePath(target.id, basePathname)}
                  hrefLang={target.hreflang}
                  lang={target.htmlLang}
                  role="menuitem"
                  aria-current={isCurrent ? 'true' : undefined}
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate?.();
                  }}
                  className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition ${
                    isCurrent
                      ? 'text-white font-semibold bg-white/10'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{target.label}</span>
                  {isCurrent && <FiCheck aria-hidden="true" />}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
