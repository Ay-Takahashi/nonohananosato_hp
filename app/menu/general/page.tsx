'use client';

import { motion } from 'framer-motion';

interface MenuItem {
  name: string;
  description: string;
  price: number;
}

const menuItems: MenuItem[] = [
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

export default function GeneralMenuPage() {
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
            一般メニュー
          </h1>
          <p className="text-lg text-gray-700">
            季節の食材を活かした定食やコース料理
          </p>
        </motion.div>
      </section>

      {/* メニュー一覧 */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-amber-200 rounded-lg p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-amber-900">{item.name}</h3>
                  <span className="text-2xl font-bold text-amber-800">
                    ¥{item.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600">{item.description}</p>
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
            <h3 className="text-xl font-bold text-amber-900 mb-4">ご注文について</h3>
            <ul className="space-y-2 text-gray-700">
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
              className="inline-block bg-amber-800 text-white px-8 py-4 rounded-full text-lg hover:bg-amber-700 transition"
            >
              ご予約・お問い合わせ
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
