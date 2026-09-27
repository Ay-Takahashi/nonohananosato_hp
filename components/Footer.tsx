import Link from 'next/link';
import Image from 'next/image';
import { FiInstagram } from 'react-icons/fi';
import { getImagePath } from '@/lib/utils';
import { localePath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import type { FacilityInfo } from '@/lib/menuData';

export default function Footer({
  locale,
  dict,
  facilityInfo,
}: {
  locale: Locale;
  dict: Dictionary;
  facilityInfo: FacilityInfo;
}) {
  const href = (path: string) => localePath(locale, path);

  return (
    <footer className="bg-main-600 text-white border-t border-accent-500/30 font-bold">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ロゴと説明 */}
          <div>
            <div className="mb-4">
              <Image 
                src={getImagePath('/images/logo.png')} 
                alt={dict.common.logoAlt}
                width={180} 
                height={54}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sub-300 mb-4">
              {dict.footer.descriptionLine1}<br />
              {dict.footer.descriptionLine2}
            </p>
          </div>

          {/* リンク */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{dict.footer.linksTitle}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={href('/')} className="text-white hover:text-white/80 transition">
                  {dict.footer.top}
                </Link>
              </li>
              <li>
                <Link href={href('/#concept')} className="text-white hover:text-white/80 transition">
                  {dict.footer.concept}
                </Link>
              </li>
              <li>
                <Link href={href('/menu?tab=general')} className="text-white hover:text-white/80 transition">
                  {dict.footer.generalMenu}
                </Link>
              </li>
              <li>
                <Link href={href('/menu?tab=group')} className="text-white hover:text-white/80 transition">
                  {dict.footer.groupMenu}
                </Link>
              </li>
            </ul>
          </div>

          {/* 店舗情報 */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{dict.footer.infoTitle}</h4>
            <p className="text-white mb-2">
              {facilityInfo.facilityName}<br />
              {facilityInfo.address.postalCode}<br />
              {facilityInfo.address.full}
            </p>
            <div className="text-gray-300 mb-2">
              <p className="font-medium">{dict.footer.businessHours}</p>
              <p className="text-sm">{dict.footer.restaurant}: {facilityInfo.businessHours.restaurant.hours}</p>
              <p className="text-sm">{dict.footer.shop}: {facilityInfo.businessHours.shop.hours}</p>
            </div>
            <p className="text-gray-300 mb-4">
              {dict.footer.closedDays}: {facilityInfo.closedDays}
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
          <p>&copy; 2026 {facilityInfo.facilityName}. {dict.footer.rightsReserved}</p>
        </div>
      </div>
    </footer>
  );
}
