'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPhotoMenu, getOtherMenus } from '@/lib/menuData';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import MultilineText from '@/components/MultilineText';
import MenuTabs from '@/components/MenuTabs';

export default function GeneralMenuView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const generalMenuCategories = getPhotoMenu(locale);
  const otherMenus = getOtherMenus(locale);

  return (
    <div className="min-h-screen bg-sub-200">
      <MenuTabs locale={locale} dict={dict} current="general" />

      {/* ヒーローセクション */}
      <section className="relative h-64 bg-gradient-to-r from-main-400 via-main-500 to-main-400 flex items-center justify-center border-b-2 border-accent-500">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{dict.general.title}</h1>
          <p className="text-lg text-white">
            <MultilineText text={dict.menu.generalIntro} />
          </p>
        </motion.div>
      </section>

      {/* コンテンツエリア */}
      <section className="py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {generalMenuCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            {/* カテゴリタイトル */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-main-500 mb-2">
                {category.categoryName}
              </h2>
              {category.description && (
                <p className="text-main-400 text-lg">{category.description}</p>
              )}
              <div className="mt-3 h-1 w-24 bg-accent-500 rounded mx-auto"></div>
            </div>

            {/* カテゴリ内のメニュー項目 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border-2 border-main-500/20 overflow-hidden hover:shadow-lg hover:shadow-main-500/20 transition flex flex-col"
                >
                  {/* 画像 */}
                  {item.image && (
                    <div className="relative w-full h-48">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  
                  {/* テキスト部分 */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-main-500 mb-2">{item.name}</h3>
                    <p className="text-main-500 mb-4 flex-1 text-sm">{item.description}</p>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-accent-500">
                        ¥{item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* その他のメニュー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-main-500 mb-8 text-center">{dict.menu.otherMenusTitle}</h2>
          
          <div className="space-y-8">
            {otherMenus.map((categoryData, categoryIndex) => (
              <motion.div
                key={categoryData.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-main-500/20 overflow-hidden"
              >
                <div className="bg-sub-400 px-6 py-3 border-b-2 border-main-500/20 flex items-baseline gap-3">
                  <h3 className="text-lg font-bold text-main-500">{categoryData.categoryName}</h3>
                  {categoryData.commonPrice && (
                    <span className="text-base font-bold text-main-500">
                      {dict.common.each} ¥{categoryData.commonPrice.toLocaleString()}
                    </span>
                  )}
                  {categoryData.commonNote && (
                    <span className="text-sm text-main-500">
                      {categoryData.commonNote}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryData.list.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex justify-between items-center py-2 px-3 bg-sub-200 rounded hover:bg-sub-300 transition"
                      >
                        <span className="text-main-500 text-sm">
                          {item.name}
                          {item.note && (
                            <span className="text-main-400 text-xs ml-1">({item.note})</span>
                          )}
                        </span>
                        {item.price !== undefined && item.price !== null && (
                          <span className="text-main-500 font-semibold ml-2 whitespace-nowrap">
                            ¥{item.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 注意事項 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 p-6 bg-white border-2 border-main-500/20 rounded-lg"
        >
          <h3 className="text-xl font-bold text-main-500 mb-4">{dict.menu.notesTitle}</h3>
          <ul className="space-y-2 text-main-500">
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
            className="inline-block bg-accent-500 text-white px-8 py-4 rounded-full text-lg hover:bg-accent-600 transition shadow-lg shadow-accent-500/30"
          >
            {dict.common.reserve}
          </a>
        </motion.div>
      </div>
      </section>
    </div>
  );
}
