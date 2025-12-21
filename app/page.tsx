'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 背景画像 */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/ryouri-kago.jpg"
            alt="料理背景"
            fill
            className="object-cover"
            priority
          />
          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-black/50 to-gray-900/70" />
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-pink-500 mb-6">
              野の花の郷
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              心を込めた料理でおもてなし
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/menu?tab=general"
                className="bg-pink-500 text-white px-8 py-4 rounded-full text-lg hover:bg-pink-600 transition shadow-lg shadow-pink-500/30"
              >
                メニューを見る
              </Link>
              <a
                href="tel:0123456789"
                className="bg-transparent text-white border-2 border-pink-500 px-8 py-4 rounded-full text-lg hover:bg-pink-500/10 transition"
              >
                ご予約・お問い合わせ
              </a>
            </div>
          </motion.div>
        </div>

        {/* スクロール指示 */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiChevronDown className="text-4xl text-pink-500" />
        </motion.div>
      </section>

      {/* コンセプトセクション */}
      <section id="concept" className="py-20 border-t border-pink-500/30" style={{ backgroundColor: '#e8d3d1' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-pink-500 mb-4">
              Concept
            </h2>
            <p className="text-xl text-gray-600">コンセプト</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-pink-500 mb-6">
                地元の食材を活かした<br />心温まる料理
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                私たちは、地元の新鮮な食材を厳選し、伝統的な調理法と現代的なアレンジを融合させた料理をご提供しています。
              </p>
              <p className="text-gray-700 leading-relaxed">
                お客様に心からくつろいでいただける空間で、季節の味わいをお楽しみください。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-80 bg-gray-900 border border-pink-500/30 rounded-lg overflow-hidden"
            >
              {/* 画像プレースホルダー */}
              <div className="absolute inset-0 flex items-center justify-center text-pink-500/30">
                <p className="text-2xl font-bold">店内写真</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* メニュー紹介セクション */}
      <section className="py-20 bg-gray-900 border-t border-pink-500/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-pink-500 mb-4">
              Menu
            </h2>
            <p className="text-xl text-gray-400">メニュー</p>
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
                className="block bg-black border border-pink-500/30 rounded-lg overflow-hidden shadow-lg shadow-pink-500/10 hover:shadow-xl hover:shadow-pink-500/20 transition group"
              >
                <div className="relative h-64 bg-gray-800">
                  {/* 画像プレースホルダー */}
                  <div className="absolute inset-0 flex items-center justify-center text-pink-500/30">
                    <p className="text-2xl font-bold">料理写真</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-pink-500 mb-2 group-hover:text-pink-400 transition">
                    一般メニュー
                  </h3>
                  <p className="text-gray-300">
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
                className="block bg-black border border-pink-500/30 rounded-lg overflow-hidden shadow-lg shadow-pink-500/10 hover:shadow-xl hover:shadow-pink-500/20 transition group"
              >
                <div className="relative h-64 bg-gray-800">
                  {/* 画像プレースホルダー */}
                  <div className="absolute inset-0 flex items-center justify-center text-pink-500/30">
                    <p className="text-2xl font-bold">料理写真</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-pink-500 mb-2 group-hover:text-pink-400 transition">
                    団体メニュー
                  </h3>
                  <p className="text-gray-300">
                    宴会や会食に最適なコース料理をご用意しております。
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* アクセスセクション */}
      <section id="access" className="py-20 border-t border-pink-500/30" style={{ backgroundColor: '#e8d3d1' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-pink-500 mb-4">
              Access
            </h2>
            <p className="text-xl text-gray-600">アクセス</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-pink-500 mb-6">店舗情報</h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-pink-500 mb-2">住所</h4>
                  <p>〒000-0000<br />都道府県 市区町村 1-2-3</p>
                </div>
                <div>
                  <h4 className="font-semibold text-pink-500 mb-2">営業時間</h4>
                  <p>11:00〜22:00</p>
                </div>
                <div>
                  <h4 className="font-semibold text-pink-500 mb-2">定休日</h4>
                  <p>水曜日</p>
                </div>
                <div>
                  <h4 className="font-semibold text-pink-500 mb-2">電話番号</h4>
                  <a href="tel:0123456789" className="text-pink-500 hover:text-pink-600 hover:underline">
                    012-345-6789
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-80 bg-gray-900 border border-pink-500/30 rounded-lg overflow-hidden"
            >
              {/* 地図プレースホルダー */}
              <div className="absolute inset-0 flex items-center justify-center text-pink-500/30">
                <p className="text-2xl font-bold">Google Maps</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
