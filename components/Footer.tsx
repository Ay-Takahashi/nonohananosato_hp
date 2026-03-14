import Link from 'next/link';
import Image from 'next/image';
import { FiInstagram } from 'react-icons/fi';
import facilityInfo from '@/data/facilityInfo.json';
import { getImagePath } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="bg-main-500 text-white border-t border-accent-500/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ロゴと説明 */}
          <div>
            <div className="mb-4">
              <Image 
                src={getImagePath('/images/logo.png')} 
                alt="野々花の里" 
                width={180} 
                height={54}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sub-300 mb-4">
              地元の新鮮な食材を使用した、<br />
              心を込めた料理をご提供いたします。
            </p>
          </div>

          {/* リンク */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">メニュー</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white hover:text-white/80 transition">
                  トップ
                </Link>
              </li>
              <li>
                <Link href="/#concept" className="text-white hover:text-white/80 transition">
                  コンセプト
                </Link>
              </li>
              <li>
                <Link href="/menu/general" className="text-white hover:text-white/80 transition">
                  一般メニュー
                </Link>
              </li>
              <li>
                <Link href="/menu/group" className="text-white hover:text-white/80 transition">
                  団体メニュー
                </Link>
              </li>
            </ul>
          </div>

          {/* 店舗情報 */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">店舗情報</h4>
            <p className="text-white mb-2">
              {facilityInfo.facilityName}<br />
              {facilityInfo.address.postalCode}<br />
              {facilityInfo.address.full}
            </p>
            <div className="text-gray-300 mb-2">
              <p className="font-medium">営業時間</p>
              <p className="text-sm">レストラン: {facilityInfo.businessHours.restaurant.hours}</p>
              <p className="text-sm">売店: {facilityInfo.businessHours.shop.hours}</p>
            </div>
            <p className="text-gray-300 mb-4">
              定休日: {facilityInfo.closedDays}
            </p>
            <a
              href={`tel:${facilityInfo.contact.tel.replace(/-/g, '')}`}
              className="text-gray-300 hover:text-pink-400 transition block mb-2"
            >
              TEL: {facilityInfo.contact.tel}
            </a>
            <a
              href={`mailto:${facilityInfo.contact.email}`}
              className="text-gray-300 hover:text-pink-400 transition block mb-4"
            >
              Email: {facilityInfo.contact.email}
            </a>
            
            {/* SNS */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/nonohananosato/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-400 transition text-4xl"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-500/30 mt-8 pt-8 text-center text-white">
          <p>&copy; 2026 {facilityInfo.facilityName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
