'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import facilityInfo from '@/data/facilityInfo.json';
import { useState, useEffect } from 'react';

const slides = [
  '/images/IMG_8327.JPG',
  '/images/IMG_8338.JPG',
  '/images/IMG_8339.JPG',
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // 5秒ごとに切り替え

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 背景画像スライドショー */}
        <div className="absolute inset-0 -z-10">
          <AnimatePresence mode="wait">
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
                alt={`スライド画像 ${currentSlide + 1}`}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              野の花の郷
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              心を込めた料理でおもてなし
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/menu?tab=general"
                className="bg-accent-500 text-white px-8 py-4 rounded-full text-lg hover:bg-accent-600 transition shadow-lg shadow-accent-500/30"
              >
                メニューを見る
              </Link>
              <a
                href="tel:0973793375"
                className="bg-transparent text-white border-2 border-accent-500 px-8 py-4 rounded-full text-lg hover:bg-accent-500/10 transition"
              >
                ご予約・お問い合わせ
              </a>
            </div> */}
          </motion.div>
        </div>

        {/* スクロール指示 */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiChevronDown className="text-4xl text-white" />
        </motion.div>
      </section>

      {/* コンセプトセクション */}
      <section id="concept" className="pt-1 pb-10 border-t border-accent-500/30 bg-sub-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-main-500 mb-6">
                くじゅう連山の麓で<br />四季を味わう
              </h3>
              <p className="text-main-500 leading-relaxed mb-4">
                雄大なくじゅう連山の麓で、四季折々の景色の中で味合うお料理
              </p>
              <p className="text-main-500 leading-relaxed">
                お客様に安心して美味しく、召し上がっていただきたい思いから、旬の食材、すべてのお料理に真心と手間暇をかけております
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-80 bg-main-500 border border-accent-500/30 rounded-lg overflow-hidden"
            >
              {/* 画像プレースホルダー */}
              <div className="absolute inset-0 flex items-center justify-center text-white/30">
                <p className="text-2xl font-bold">店内写真</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* メニュー紹介セクション */}
      <section className="py-20 bg-main-500 border-t border-accent-500/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              お品書き
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* 一般メニュー */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href="/menu?tab=general"
                className="block bg-main-600 border border-accent-500/30 rounded-lg overflow-hidden shadow-lg shadow-accent-500/10 hover:shadow-xl hover:shadow-accent-500/20 transition group"
              >
                <div className="relative h-64 bg-main-400">
                  {/* 画像プレースホルダー */}
                  <div className="absolute inset-0 flex items-center justify-center text-white/30">
                    <p className="text-2xl font-bold">料理写真</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white/80 transition">
                    一般メニュー
                  </h3>
                  <p className="text-white">
                    季節の食材を使った定食やコース料理をご用意しております。
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* 団体メニュー */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link
                href="/menu?tab=group"
                className="block bg-main-600 border border-accent-500/30 rounded-lg overflow-hidden shadow-lg shadow-accent-500/10 hover:shadow-xl hover:shadow-accent-500/20 transition group"
              >
                <div className="relative h-64 bg-main-400">
                  {/* 画像プレースホルダー */}
                  <div className="absolute inset-0 flex items-center justify-center text-white/30">
                    <p className="text-2xl font-bold">料理写真</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white/80 transition">
                    団体メニュー
                  </h3>
                  <p className="text-white">
                    宴会や会食に最適なコース料理をご用意しております。
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* アクセスセクション */}
      <section id="access" className="py-20 border-t border-accent-500/30 bg-sub-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-main-500 mb-4">
              Access
            </h2>
            <p className="text-xl text-main-500">アクセス</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-main-500 mb-6">店舗情報</h3>
              <div className="space-y-4 text-main-500">
                <div>
                  <p>{facilityInfo.facilityName}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-main-500 mb-2">住所</h4>
                  <p>{facilityInfo.address.postalCode}<br />{facilityInfo.address.full}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-main-500 mb-2">営業時間</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium">レストラン</p>
                      <p>{facilityInfo.businessHours.restaurant.hours}</p>
                      {facilityInfo.businessHours.restaurant.note && (
                        <p className="text-sm mt-1">{facilityInfo.businessHours.restaurant.note}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">売店</p>
                      <p>{facilityInfo.businessHours.shop.hours}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-main-500 mb-2">定休日</h4>
                  <p>{facilityInfo.closedDays}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-main-500 mb-2">駐車場</h4>
                  <p>{facilityInfo.parking}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-main-500 mb-2">お問い合わせ</h4>
                  <div className="space-y-1">
                    <p>
                      電話: <a href={`tel:${facilityInfo.contact.tel.replace(/-/g, '')}`} className="text-main-500 hover:text-main-600 hover:underline">
                        {facilityInfo.contact.tel}
                      </a>
                    </p>
                    <p>FAX: {facilityInfo.contact.fax}</p>
                    <p>
                      Email: <a href={`mailto:${facilityInfo.contact.email}`} className="text-main-500 hover:text-main-600 hover:underline">
                        {facilityInfo.contact.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-80 bg-main-500 border border-accent-500/30 rounded-lg overflow-hidden"
            >
              {/* 地図プレースホルダー */}
              <div className="absolute inset-0 flex items-center justify-center text-white/30">
                <p className="text-2xl font-bold">Google Maps</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
