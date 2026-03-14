'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { getImagePath } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-main-600/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="flex items-center">
            <Image 
              src={getImagePath('/images/logo.png')} 
              alt="野々花の里" 
              width={200} 
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-white/80 transition">
              ホーム
            </Link>
            <Link href="/menu" className="text-white hover:text-white/80 transition">
              お食事
            </Link>
            <Link href="/#access" className="text-white hover:text-white/80 transition">
              店舗情報
            </Link>
          </nav>

          {/* 電話番号 */}
          <a
            href="tel:0973793375"
            className="hidden md:flex items-center gap-2 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
          >
            <FiPhone />
            <span>0973-79-3375</span>
          </a>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white text-2xl"
            aria-label="メニュー"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* モバイルナビゲーション */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-white hover:text-white/80 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              ホーム
            </Link>
            <Link
              href="/menu"
              className="text-white hover:text-white/80 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              お食事
            </Link>
            <Link
              href="/#access"
              className="text-white hover:text-white/80 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              店舗情報
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
