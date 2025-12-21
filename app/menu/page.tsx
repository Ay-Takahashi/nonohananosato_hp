'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface MenuItem {
  name: string;
  description: string;
  price: number;
}

interface CourseMenu {
  name: string;
  description: string;
  price: number;
  items: string[];
  minPeople: number;
}

const generalMenuItems: MenuItem[] = [
  {
    name: '季節の定食',
    description: '季節の食材を使った日替わり定食。メイン料理、ご飯、味噌汁、小鉢付き',
    price: 1500,
  },
  {
    name: '特選天ぷら定食',
    description: '新鮮な魚介と季節の野菜の天ぷら定食',
    price: 1800,
  },
  {
    name: '刺身定食',
    description: '本日の新鮮な刺身盛り合わせ',
    price: 2000,
  },
  {
    name: '野の花の郷御膳',
    description: '当店自慢の料理を少しずつ楽しめる豪華な御膳',
    price: 2500,
  },
  {
    name: '焼き魚定食',
    description: '本日の焼き魚、ご飯、味噌汁、小鉢付き',
    price: 1600,
  },
  {
    name: '煮魚定食',
    description: '旬の魚の煮付け、ご飯、味噌汁、小鉢付き',
    price: 1600,
  },
];

const courseMenus: CourseMenu[] = [
  {
    name: '雅コース',
    description: '気軽に楽しめるお手頃コース',
    price: 4000,
    minPeople: 4,
    items: [
      '前菜三種盛り',
      'お造り盛り合わせ',
      '季節の焼き物',
      '煮物',
      '揚げ物',
      '食事(ご飯・味噌汁・香の物)',
      'デザート',
    ],
  },
  {
    name: '華コース',
    description: '会食や接待に最適な本格コース',
    price: 6000,
    minPeople: 4,
    items: [
      '季節の前菜五種盛り',
      '本日のお造り盛り合わせ',
      '特選焼き物',
      '季節の煮物',
      '天ぷら盛り合わせ',
      '特製茶碗蒸し',
      '食事(ご飯・味噌汁・香の物)',
      'デザート',
    ],
  },
  {
    name: '極コース',
    description: '最上級のおもてなしコース',
    price: 8000,
    minPeople: 4,
    items: [
      '特選前菜七種盛り',
      '本日の特選お造り盛り合わせ',
      '極上焼き物(魚・肉)',
      '旬の煮物',
      '特選天ぷら盛り合わせ',
      '特製茶碗蒸し',
      '季節の一品料理',
      '食事(ご飯・味噌汁・香の物)',
      '特製デザート',
    ],
  },
];

type TabType = 'general' | 'group';

function MenuContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('general');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'general' || tab === 'group') {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-black">
      {/* ヒーローセクション */}
      <section className="relative h-64 bg-gradient-to-r from-gray-900 via-black to-gray-900 flex items-center justify-center border-b border-pink-500/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-pink-500 mb-4">
            メニュー
          </h1>
          <p className="text-lg text-gray-300">
            季節の食材を活かした定食やコース料理
          </p>
        </motion.div>
      </section>

      {/* タブナビゲーション */}
      <section className="bg-black border-b border-pink-500/30 sticky top-0 z-10 shadow-lg shadow-pink-500/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex justify-center">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-8 py-4 text-lg font-semibold transition-all relative ${
                activeTab === 'general'
                  ? 'text-pink-500'
                  : 'text-gray-400 hover:text-pink-400'
              }`}
            >
              一般メニュー
              {activeTab === 'general' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-pink-500"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('group')}
              className={`px-8 py-4 text-lg font-semibold transition-all relative ${
                activeTab === 'group'
                  ? 'text-pink-500'
                  : 'text-gray-400 hover:text-pink-400'
              }`}
            >
              団体メニュー
              {activeTab === 'group' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-pink-500"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* コンテンツエリア */}
      <section className="py-16">
        {activeTab === 'general' ? (
          // 一般メニュー
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {generalMenuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900 border border-pink-500/30 rounded-lg p-6 hover:shadow-lg hover:shadow-pink-500/20 transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-pink-500">{item.name}</h3>
                    <span className="text-2xl font-bold text-pink-400">
                      ¥{item.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* 注意事項 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 p-6 bg-gray-900 border border-pink-500/30 rounded-lg"
            >
              <h3 className="text-xl font-bold text-pink-500 mb-4">ご注文について</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• メニューは季節により変更する場合がございます</li>
                <li>• 食材の仕入れ状況により、ご提供できない場合がございます</li>
                <li>• アレルギーをお持ちの方は、事前にお申し付けください</li>
                <li>• 価格は税込表示です</li>
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
                href="tel:0123456789"
                className="inline-block bg-pink-500 text-white px-8 py-4 rounded-full text-lg hover:bg-pink-600 transition shadow-lg shadow-pink-500/30"
              >
                ご予約・お問い合わせ
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {courseMenus.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900 border-2 border-pink-500/30 rounded-lg overflow-hidden hover:shadow-xl hover:shadow-pink-500/20 transition"
                >
                  <div className="bg-pink-500 text-white p-6 text-center">
                    <h3 className="text-2xl font-bold mb-2">{course.name}</h3>
                    <p className="text-3xl font-bold">
                      ¥{course.price.toLocaleString()}
                    </p>
                    <p className="text-sm mt-2 text-pink-100">
                      (お一人様・税込)
                    </p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-300 mb-4">{course.description}</p>
                    <div className="mb-4 text-sm text-gray-400">
                      ※ {course.minPeople}名様より承ります
                    </div>
                    <h4 className="font-semibold text-pink-400 mb-3">お品書き</h4>
                    <ul className="space-y-2">
                      {course.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-300 flex items-start">
                          <span className="text-pink-500 mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* 注意事項 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 p-6 bg-gray-900 border border-pink-500/30 rounded-lg"
            >
              <h3 className="text-xl font-bold text-pink-500 mb-4">ご予約について</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• コース料理は2日前までのご予約が必要です</li>
                <li>• 各コース4名様より承ります</li>
                <li>• 10名様以上のご利用で個室をご用意いたします</li>
                <li>• お料理内容は季節により変更する場合がございます</li>
                <li>• アレルギーや苦手な食材がございましたら、ご予約時にお申し付けください</li>
                <li>• 飲み放題プランもご用意しております(別途2,000円)</li>
                <li>• キャンセルは前日までにお願いいたします</li>
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
                href="tel:0123456789"
                className="inline-block bg-pink-500 text-white px-8 py-4 rounded-full text-lg hover:bg-pink-600 transition shadow-lg shadow-pink-500/30"
              >
                ご予約・お問い合わせ
              </a>
              <p className="mt-4 text-gray-400">
                お電話受付時間: 11:00〜20:00(水曜定休)
              </p>
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-pink-500 text-xl">読み込み中...</div>
      </div>
    }>
      <MenuContent />
    </Suspense>
  );
}
