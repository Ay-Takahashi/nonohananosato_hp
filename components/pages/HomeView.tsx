'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import { FiChevronDown } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { getImagePath } from '@/lib/utils';
import { getFacilityInfo } from '@/lib/menuData';
import { getDictionary } from '@/i18n/getDictionary';
import { localePath, type Locale } from '@/i18n/config';

const slides = [
  getImagePath('/images/IMG_8327.JPG'),
  getImagePath('/images/IMG_8338.JPG'),
  getImagePath('/images/九重“夢”大吊橋_秋.jpg'),
];

const restaurantSlides = [
  getImagePath('/images/resutorann/IMG_8328.JPG'),
  getImagePath('/images/resutorann/IMG_8333.JPG'),
  getImagePath('/images/resutorann/restran001.jpg'),
  getImagePath('/images/resutorann/restran002.jpg'),
];

export default function HomeView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const facilityInfo = getFacilityInfo(locale);
  const href = (path: string) => localePath(locale, path);

  const prefersReducedMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentRestaurantSlide, setCurrentRestaurantSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // 10秒ごとに切り替え

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRestaurantSlide((prev) => (prev + 1) % restaurantSlides.length);
    }, 5000); // 5秒ごとに切り替え

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative h-dvh flex items-center justify-center overflow-hidden z-10 bg-black">
        {/* 背景画像スライドショー */}
        <div className="absolute inset-0 -z-10">
          <AnimatePresence>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={slides[currentSlide]}
                alt={`${dict.home.heroSlideAlt} ${currentSlide + 1}`}
                fill
                className="object-cover"
                priority={currentSlide === 0}
              />
            </motion.div>
          </AnimatePresence>
          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <FadeIn className="flex flex-col items-center" onMount>
            <div className="mb-6">
              <Image
                src={getImagePath('/images/logo.png')}
                alt={dict.common.logoAlt}
                width={1014}
                height={294}
                className="w-auto h-32 md:h-48"
                priority
              />
            </div>
            <p className="text-xl md:text-2xl text-white mb-8">
              {dict.home.tagline}
            </p>
          </FadeIn>
        </div>

        {/* スクロール指示 */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiChevronDown className="text-4xl text-white" />
        </motion.div>
      </section>

      {/* コンテンツエリア（透かし背景適用） */}
      <div className="content-watermark">
      {/* コンセプトセクション */}
      <section id="concept" className="pt-1 pb-10 border-t border-accent-500/30 bg-sub-transparent">
        <div className="container mx-auto px-4">
          {/* セクション上部の余白（中身のない装飾要素） */}
          <div className="text-center mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeIn direction="left">
              <h3 className="text-3xl font-bold text-main-500 mb-6">
                {dict.home.conceptHeadingLine1}<br />{dict.home.conceptHeadingLine2}
              </h3>
              <p className="text-main-500 leading-relaxed mb-4">
                {dict.home.conceptParagraph1}
              </p>
              <p className="text-main-500 leading-relaxed">
                {dict.home.conceptParagraph2}
              </p>
            </FadeIn>

            <FadeIn className="relative h-80 bg-main-500 overflow-hidden" direction="right">
              {/* レストラン画像スライドショー */}
              <AnimatePresence>
                <motion.div
                  key={currentRestaurantSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={restaurantSlides[currentRestaurantSlide]}
                    alt={`${dict.home.restaurantSlideAlt} ${currentRestaurantSlide + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* メニュー紹介セクション */}
      <section className="py-20 bg-main-transparent border-t border-accent-500/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {dict.home.menuSectionTitle}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center max-w-5xl mx-auto">
            {/* 一般メニュー */}
            <FadeIn className="w-full max-w-md h-full" delay={0.1}>
              <Link
                href={href('/menu/general')}
                className="flex h-full flex-col bg-main-600 overflow-hidden transition group"
              >
                <div className="relative h-64 shrink-0 bg-main-400">
                  <Image
                    src={getImagePath('/images/foods/toriten.jpg')}
                    alt={dict.home.generalMenuCard.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 448px"
                  />
                </div>
                <div className="flex-1 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white/80 transition">
                    {dict.home.generalMenuCard.title}
                  </h3>
                  <p className="text-white">
                    {dict.home.generalMenuCard.description}
                  </p>
                </div>
              </Link>
            </FadeIn>

            {/* 団体メニュー */}
            <FadeIn className="w-full max-w-md h-full" delay={0.2}>
              <Link
                href={href('/menu/group')}
                className="flex h-full flex-col bg-main-600 overflow-hidden transition group"
              >
                <div className="relative h-64 shrink-0 bg-main-400">
                  <Image
                    src={getImagePath('/images/foods/IMG_8332.JPG')}
                    alt={dict.home.groupMenuCard.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 448px"
                  />
                </div>
                <div className="flex-1 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white/80 transition">
                    {dict.home.groupMenuCard.title}
                  </h3>
                  <p className="text-white">
                    {dict.home.groupMenuCard.description}
                  </p>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* アクセスセクション */}
      <section id="access" className="py-20 border-t border-accent-500/30 bg-sub-transparent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <FadeIn direction="left">
              <h3 className="text-2xl font-bold text-main-500 mb-6">{dict.home.access.heading}</h3>
              <div className="space-y-4 text-main-500">
                <div>
                  <p>{facilityInfo.facilityName}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-main-500 mb-2">{dict.home.access.address}</h4>
                  <p>{facilityInfo.address.postalCode}<br />{facilityInfo.address.full}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-main-500 mb-2">{dict.home.access.businessHours}</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium">{dict.home.access.restaurant}</p>
                      <p>{facilityInfo.businessHours.restaurant.hours}</p>
                      {facilityInfo.businessHours.restaurant.note && (
                        <p className="text-sm mt-1">{facilityInfo.businessHours.restaurant.note}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{dict.home.access.shop}</p>
                      <p>{facilityInfo.businessHours.shop.hours}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-main-500 mb-2">{dict.home.access.closedDays}</h4>
                  <p>{facilityInfo.closedDays}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-main-500 mb-2">{dict.home.access.parking}</h4>
                  <p>{facilityInfo.parking}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-main-500 mb-2">{dict.home.access.contact}</h4>
                  <div className="space-y-1">
                    <p>
                      {dict.home.access.tel}: <a href={`tel:${facilityInfo.contact.tel.replace(/-/g, '')}`} className="text-main-500 hover:text-main-600 hover:underline">
                        {facilityInfo.contact.tel}
                      </a>
                    </p>
                    <p>{dict.home.access.fax}: {facilityInfo.contact.fax}</p>
                    <p>
                      {dict.home.access.email}: <a href={`mailto:${facilityInfo.contact.email}`} className="text-main-500 hover:text-main-600 hover:underline">
                        {facilityInfo.contact.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn className="relative h-80 bg-main-500 overflow-hidden" direction="right">
              {/* Google Maps */}
              <iframe
                title={dict.home.access.mapTitle}
                src="https://www.google.com/maps?q=大分県玖珠郡九重町大字田野1672-18&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </FadeIn>
          </div>

          {/* 併設カフェ情報 */}
          <FadeIn className="mt-16 max-w-4xl mx-auto" delay={0.3}>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <a
                href="https://good-blue.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 group"
              >
                <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all overflow-hidden">
                  <Image
                    src={getImagePath('/images/goodbluelogo.jpg')}
                    alt={dict.home.cafe.logoAlt}
                    width={200}
                    height={100}
                    className="object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
              </a>
              <div className="flex-1 text-center md:text-left">
                <p className="text-main-500 leading-relaxed mb-4">
                  {dict.home.cafe.descriptionLine1}
                  <br/>
                  {dict.home.cafe.descriptionLine2}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      </div>
    </div>
  );
}
