import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-pink-500/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ロゴと説明 */}
          <div>
            <div className="mb-4">
              <Image 
                src="/images/logo.png" 
                alt="野々花の里" 
                width={180} 
                height={54}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-4">
              地元の新鮮な食材を使用した、<br />
              心を込めた料理をご提供いたします。
            </p>
          </div>

          {/* リンク */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-pink-400">メニュー</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-pink-400 transition">
                  トップ
                </Link>
              </li>
              <li>
                <Link href="/#concept" className="text-gray-300 hover:text-pink-400 transition">
                  コンセプト
                </Link>
              </li>
              <li>
                <Link href="/menu/general" className="text-gray-300 hover:text-pink-400 transition">
                  一般メニュー
                </Link>
              </li>
              <li>
                <Link href="/menu/group" className="text-gray-300 hover:text-pink-400 transition">
                  団体メニュー
                </Link>
              </li>
            </ul>
          </div>

          {/* 店舗情報 */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-pink-400">店舗情報</h4>
            <p className="text-gray-300 mb-2">
              〒000-0000<br />
              都道府県 市区町村 1-2-3
            </p>
            <p className="text-gray-300 mb-4">
              営業時間: 11:00〜22:00<br />
              定休日: 水曜日
            </p>
            <a
              href="tel:0123456789"
              className="text-gray-300 hover:text-pink-400 transition block mb-4"
            >
              TEL: 012-345-6789
            </a>
            
            {/* SNS */}
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-300 hover:text-pink-400 transition text-2xl"
                aria-label="Facebook"
              >
                <FiFacebook />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-pink-400 transition text-2xl"
                aria-label="Twitter"
              >
                <FiTwitter />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-pink-400 transition text-2xl"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-500/30 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 野の花の郷. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
