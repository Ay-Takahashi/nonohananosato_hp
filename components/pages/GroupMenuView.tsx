'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { getCourseMenus, getFacilityInfo, type CourseMenu } from '@/lib/menuData';
import { getDictionary, type Dictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import MultilineText from '@/components/MultilineText';
import MenuTabs from '@/components/MenuTabs';

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

export default function GroupMenuView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const courseMenus = getCourseMenus(locale);
  const facilityInfo = getFacilityInfo(locale);

  const [selectedCourse, setSelectedCourse] = useState<CourseMenu | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <MenuTabs locale={locale} dict={dict} current="group" />

      {/* ヒーローセクション */}
      <section className="relative h-64 bg-gradient-to-r from-main-400 via-main-500 to-main-400 flex items-center justify-center border-b-2 border-accent-500">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{dict.group.title}</h1>
          <p className="text-lg text-white">
            <MultilineText text={dict.menu.groupIntro} />
          </p>
        </motion.div>
      </section>

      {/* コンテンツエリア */}
      <section className="py-16">
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
      </section>
    </div>
  );
}
