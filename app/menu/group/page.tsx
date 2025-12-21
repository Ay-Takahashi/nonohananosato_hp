'use client';

import { motion } from 'framer-motion';

interface CourseMenu {
  name: string;
  description: string;
  price: number;
  items: string[];
  minPeople: number;
}

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
      '食事（ご飯・味噌汁・香の物）',
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
      '食事（ご飯・味噌汁・香の物）',
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
      '極上焼き物（魚・肉）',
      '旬の煮物',
      '特選天ぷら盛り合わせ',
      '特製茶碗蒸し',
      '季節の一品料理',
      '食事（ご飯・味噌汁・香の物）',
      '特製デザート',
    ],
  },
];

export default function GroupMenuPage() {
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
            団体メニュー
          </h1>
          <p className="text-lg text-gray-700">
            宴会や会食に最適なコース料理
          </p>
        </motion.div>
      </section>

      {/* コースメニュー一覧 */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseMenus.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-amber-200 rounded-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="bg-amber-800 text-white p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">{course.name}</h3>
                  <p className="text-3xl font-bold">
                    ¥{course.price.toLocaleString()}
                  </p>
                  <p className="text-sm mt-2 text-amber-100">
                    （お一人様・税込）
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="mb-4 text-sm text-gray-500">
                    ※ {course.minPeople}名様より承ります
                  </div>
                  <h4 className="font-semibold text-amber-900 mb-3">お品書き</h4>
                  <ul className="space-y-2">
                    {course.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-700 flex items-start">
                        <span className="text-amber-600 mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 注意事項 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-amber-50 rounded-lg"
          >
            <h3 className="text-xl font-bold text-amber-900 mb-4">ご予約について</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• コース料理は2日前までのご予約が必要です</li>
              <li>• 各コース4名様より承ります</li>
              <li>• 10名様以上のご利用で個室をご用意いたします</li>
              <li>• お料理内容は季節により変更する場合がございます</li>
              <li>• アレルギーや苦手な食材がございましたら、ご予約時にお申し付けください</li>
              <li>• 飲み放題プランもご用意しております（別途2,000円）</li>
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
              className="inline-block bg-amber-800 text-white px-8 py-4 rounded-full text-lg hover:bg-amber-700 transition"
            >
              ご予約・お問い合わせ
            </a>
            <p className="mt-4 text-gray-600">
              お電話受付時間: 11:00〜20:00（水曜定休）
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
