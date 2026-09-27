'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  getPhotoMenu,
  getOtherMenus,
  getCourseMenus,
  getFacilityInfo,
  type CourseMenu,
} from '@/lib/menuData';
import { getDictionary, type Dictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import MultilineText from '@/components/MultilineText';

type TabType = 'general' | 'group';

// 団体メニューモーダルコンポーネント
function CourseMenuModal({
  course,
  isOpen,
  onClose,
  dict,
}: {
  course: CourseMenu | null;
  isOpen: boolean;
  onClose: () => void;
  dict: Dictionary;
}) {
  if (!isOpen || !course) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition"
          aria-label={dict.common.closeDetails}
        >
          <svg className="w-6 h-6 text-main-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* 画像 */}
        {course.image && (
          <div className="relative w-full h-80">
            <Image
              src={course.image}
              alt={course.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        )}
        
        {/* コンテンツ */}
        <div className="p-8">
          <div className="bg-accent-500 text-white p-6 rounded-lg mb-6 text-center">
            <h3 className="text-3xl font-bold mb-2">{course.name}</h3>
            <p className="text-4xl font-bold">
              ¥{course.price.toLocaleString()}
            </p>
            <p className="text-sm mt-2 text-white">
              {dict.common.perPersonTaxIncl}
            </p>
            {course.description && (
              <p className="text-sm mt-3 text-white/90">
                {course.description}
              </p>
            )}
          </div>
          
          {course.items && course.items.length > 0 && (
            <>
              <h4 className="text-xl font-bold text-main-500 mb-4 border-b-2 border-accent-500 pb-2">{dict.menu.courseItemsTitle}</h4>
              <ul className="space-y-3">
                {course.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-main-500 flex items-start text-lg">
                    <span className="text-accent-500 mr-3 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// 団体メニューカードコンポーネント
function CourseMenuCard({
  course,
  index,
  onClick,
  dict,
}: {
  course: CourseMenu;
  index: number;
  onClick: () => void;
  dict: Dictionary;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white border-2 border-main-500/20 overflow-hidden hover:shadow-xl hover:shadow-main-500/20 transition cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      {/* 画像 */}
      {course.image && (
        <div className="relative w-full h-48 group flex-shrink-0">
          <Image
            src={course.image}
            alt={course.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full px-4 py-2 text-main-500 text-sm font-semibold">
              {dict.common.viewDetails}
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-accent-500 text-white p-6 text-center flex-grow flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-2">{course.name}</h3>
        <p className="text-3xl font-bold">
          ¥{course.price.toLocaleString()}
        </p>
        <p className="text-sm mt-2 text-white">
          {dict.common.perPersonTaxIncl}
        </p>
        {course.description && (
          <p className="text-sm mt-3 text-white/90">
            {course.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function MenuContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const generalMenuCategories = getPhotoMenu(locale);
  const otherMenus = getOtherMenus(locale);
  const courseMenus = getCourseMenus(locale);
  const facilityInfo = getFacilityInfo(locale);

  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const tabFromUrl: TabType | null =
    tabParam === 'general' || tabParam === 'group' ? tabParam : null;

  const [activeTab, setActiveTab] = useState<TabType>(tabFromUrl ?? 'general');
  const [selectedCourse, setSelectedCourse] = useState<CourseMenu | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // URLのtabパラメータが変わったら、レンダー中に選択中のタブへ反映する
  // （effect内でsetStateすると余分な再レンダーが発生するため避ける）
  const [prevTabParam, setPrevTabParam] = useState(tabParam);
  if (tabParam !== prevTabParam) {
    setPrevTabParam(tabParam);
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }

  const handleCourseClick = (course: CourseMenu) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCourse(null), 300);
  };

  return (
    <div className="min-h-screen bg-sub-200">
      {/* タブナビゲーション */}
      <section className="bg-main-600 border-b border-accent-500/30 sticky top-20 z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex justify-center">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-8 py-4 text-lg font-semibold transition-all relative ${
                activeTab === 'general'
                  ? 'text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {dict.menu.tabs.general}
              {activeTab === 'general' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-accent-500"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('group')}
              className={`px-8 py-4 text-lg font-semibold transition-all relative ${
                activeTab === 'group'
                  ? 'text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {dict.menu.tabs.group}
              {activeTab === 'group' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-accent-500"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ヒーローセクション */}
      <section className="relative h-64 bg-gradient-to-r from-main-400 via-main-500 to-main-400 flex items-center justify-center border-b-2 border-accent-500">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-lg text-white">
            <MultilineText text={activeTab === 'general' ? dict.menu.generalIntro : dict.menu.groupIntro} />
          </p>
        </motion.div>
      </section>

      {/* コンテンツエリア */}
      <section className="py-16">
        {activeTab === 'general' ? (
          // 一般メニュー
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
        ) : (
          // 団体メニュー
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {courseMenus.map((course, index) => (
                <CourseMenuCard 
                  key={index} 
                  course={course} 
                  index={index} 
                  onClick={() => handleCourseClick(course)}
                  dict={dict}
                />
              ))}
            </motion.div>

            {/* モーダル */}
            <CourseMenuModal 
              course={selectedCourse} 
              isOpen={isModalOpen} 
              onClose={handleCloseModal} 
              dict={dict}
            />

            {/* 注意事項 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 p-6 bg-white border-2 border-main-500/20 rounded-lg"
            >
              <h3 className="text-xl font-bold text-main-500 mb-4">{dict.menu.groupNotesTitle}</h3>
              <ul className="space-y-2 text-main-500 mb-8">
                {dict.menu.groupNotes.map((note, index) => (
                  <li key={index}>• {note}</li>
                ))}
              </ul>

              <div className="space-y-3 text-main-500">
                <div className="flex items-start">
                  <span className="font-semibold min-w-[140px]">{dict.menu.groupFacility.parking}</span>
                  <span>{facilityInfo.parking}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-semibold min-w-[140px]">{dict.menu.groupFacility.businessHours}</span>
                  <span>{facilityInfo.businessHours.restaurant.hours}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-semibold min-w-[140px]">{dict.menu.groupFacility.seating}</span>
                  <span>{facilityInfo.seating}</span>
                </div>
              </div>
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
              <p className="mt-4 text-gray-600">
                {dict.common.phoneHours}
              </p>
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function MenuView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-sub-200 flex items-center justify-center">
        <div className="text-main-500 text-xl">{dict.common.loading}</div>
      </div>
    }>
      <MenuContent locale={locale} />
    </Suspense>
  );
}
