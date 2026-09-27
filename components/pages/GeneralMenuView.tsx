'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPhotoMenu } from '@/lib/menuData';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';

export default function GeneralMenuView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const menuCategories = getPhotoMenu(locale);

  return (
    <div className="min-h-screen bg-white">
      {/* ヒーローセクション */}
      <section className="relative h-64 bg-gradient-to-r from-amber-100 to-amber-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            {dict.general.title}
          </h1>
          <p className="text-lg text-gray-700">
            {dict.general.subtitle}
          </p>
        </motion.div>
      </section>

      {/* メニュー一覧 */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {menuCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              {/* カテゴリタイトル */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-amber-900 mb-2">
                  {category.categoryName}
                </h2>
                {category.description && (
                  <p className="text-gray-600 text-lg">{category.description}</p>
                )}
                <div className="mt-2 h-1 w-20 bg-amber-500 rounded"></div>
              </motion.div>

              {/* カテゴリ内のメニュー項目 */}
              <div className="space-y-8">
                {category.menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white border border-amber-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* 画像 */}
                      {item.image && (
                        <div className="relative w-full md:w-64 h-48 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 256px"
                          />
                        </div>
                      )}
                      
                      {/* テキスト部分 */}
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                          <h3 className="text-2xl font-bold text-amber-900">{item.name}</h3>
                          <span className="text-2xl font-bold text-amber-800">
                            ¥{item.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {/* 注意事項 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-amber-50 rounded-lg"
          >
            <h3 className="text-xl font-bold text-amber-900 mb-4">{dict.menu.notesTitle}</h3>
            <ul className="space-y-2 text-gray-700">
              {dict.menu.notes.map((note, index) => (
                <li key={index}>• {note}</li>
              ))}
            </ul>
          </motion.div>

          {/* お問い合わせボタン */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <a
              href="tel:0973793375"
              className="inline-block bg-amber-800 text-white px-8 py-4 rounded-full text-lg hover:bg-amber-700 transition"
            >
              {dict.common.reserve}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
