'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { getImagePath } from '@/lib/utils';
import { localePath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const href = (path: string) => localePath(locale, path);

  return (
    <header className="fixed top-0 left-0 right-0 bg-main-600/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <Link href={href('/')} className="flex items-center">
            <Image
              src={getImagePath('/images/logo.png')}
              alt={dict.common.logoAlt}
              width={1014}
              height={294}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href={href('/')} className="text-white hover:text-white/80 transition">
              {dict.nav.home}
            </Link>
            <Link href={href('/menu')} className="text-white hover:text-white/80 transition">
              {dict.nav.menu}
            </Link>
            <Link href={href('/#access')} className="text-white hover:text-white/80 transition">
              {dict.nav.info}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {/* 言語切り替え */}
            <LanguageSwitcher locale={locale} label={dict.nav.languageLabel} />

            {/* 電話番号 */}
            <a
              href="tel:0973793375"
              className="flex items-center gap-2 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
            >
              <FiPhone />
              <span>0973-79-3375</span>
            </a>
          </div>

          {/* モバイル: 言語切り替え + メニューボタン */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageSwitcher locale={locale} label={dict.nav.languageLabel} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white text-2xl"
              aria-label={dict.nav.menuButtonLabel}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* モバイルナビゲーション */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link
              href={href('/')}
              className="text-white hover:text-white/80 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {dict.nav.home}
            </Link>
            <Link
              href={href('/menu')}
              className="text-white hover:text-white/80 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {dict.nav.menu}
            </Link>
            <Link
              href={href('/#access')}
              className="text-white hover:text-white/80 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {dict.nav.info}
            </Link>
            <a
              href="tel:0973793375"
              className="flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition justify-center"
            >
              <FiPhone />
              <span>0973-79-3375</span>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
