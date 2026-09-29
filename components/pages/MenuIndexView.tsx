'use client';

import FadeIn, { stagger } from '@/components/FadeIn';
import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/i18n/getDictionary';
import { localePath, type Locale } from '@/i18n/config';
import { getImagePath } from '@/lib/utils';

/**
 * /menu の入口ページ
 *
 * 以前の /menu はタブ切り替え（?tab=）で一般・団体の両方を表示していたが、
 * useSearchParams のため静的 HTML に本文が出力されなかった（#11）。
 * 現在は一般・団体それぞれを独立したページに分け、ここは両者への導線に徹している。
 */
export default function MenuIndexView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const cards = [
    {
      key: 'general',
      href: localePath(locale, '/menu/general'),
      title: dict.general.title,
      description: dict.general.subtitle,
      image: getImagePath('/images/foods/toriten.jpg'),
    },
    {
      key: 'group',
      href: localePath(locale, '/menu/group'),
      title: dict.group.title,
      description: dict.group.subtitle,
      image: getImagePath('/images/foods/IMG_8332.JPG'),
    },
  ];

  return (
    <div className="min-h-screen bg-sub-200">
      {/* ヒーローセクション */}
      <section className="relative h-64 bg-gradient-to-r from-main-400 via-main-500 to-main-400 flex items-center justify-center border-b-2 border-accent-500">
        <FadeIn className="text-center px-4" onMount>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{dict.nav.menu}</h1>
          <p className="text-lg text-white">{dict.meta.menu.shortDescription}</p>
        </FadeIn>
      </section>

      {/* 一般 / 団体への導線 */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cards.map((card, index) => (
              <FadeIn key={card.key} delay={stagger(index)}>
                <Link
                  href={card.href}
                  className="block h-full bg-main-600 border-2 border-main-500/20 overflow-hidden hover:shadow-lg hover:shadow-accent-500/20 transition group"
                >
                  <div className="relative h-56 bg-main-400">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-white/80 transition">
                      {card.title}
                    </h2>
                    <p className="text-white/90">{card.description}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* お問い合わせボタン */}
          <FadeIn className="mt-12 text-center">
            <a
              href="tel:0973793375"
              className="inline-block bg-accent-500 text-white px-8 py-4 rounded-full text-lg hover:bg-accent-600 transition shadow-lg shadow-accent-500/30"
            >
              {dict.common.reserve}
            </a>
            <p className="mt-4 text-main-400">{dict.common.phoneHours}</p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
