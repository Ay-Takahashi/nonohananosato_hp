'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm shadow-lg shadow-pink-500/20 z-50 border-b border-pink-500/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="野々花の里" 
              width={200} 
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#concept" className="text-white hover:text-pink-400 transition">
              コンセプト
            </Link>
            <Link href="/menu" className="text-white hover:text-pink-400 transition">
              メニュー
            </Link>
            <Link href="/#access" className="text-white hover:text-pink-400 transition">
              アクセス
            </Link>
          </nav>

          {/* 電話番号 */}
          <a
            href="tel:0123456789"
            className="hidden md:flex items-center gap-2 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
          >
            <FiPhone />
            <span>012-345-6789</span>
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
              href="/#concept"
              className="text-white hover:text-pink-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              コンセプト
            </Link>
            <Link
              href="/menu"
              className="text-white hover:text-pink-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              メニュー
            </Link>
            <Link
              href="/#access"
              className="text-white hover:text-pink-400 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              アクセス
            </Link>
            <a
              href="tel:0123456789"
              className="flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition justify-center"
            >
              <FiPhone />
              <span>012-345-6789</span>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
