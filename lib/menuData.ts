/**
 * メニュー／施設情報のロケール別取得
 *
 * 日本語（data/*.json）を正となるデータとし、他ロケールは
 * data/translations/*.{locale}.json のオーバーレイで上書きする。
 * オーバーレイのキーは日本語表記そのもの。訳が見つからない場合は
 * 日本語のまま表示する（フォールバック）ので、日本語データを更新しても
 * 表示が壊れることはない（訳が古くなるだけ）。
 */
import photoMenuData from '@/data/photoMenu.json';
import simpleMenuData from '@/data/simpleMenu.json';
import groupMenuData from '@/data/groupMenu.json';
import facilityInfoData from '@/data/facilityInfo.json';

import menuEn from '@/data/translations/menu.en.json';
import menuZh from '@/data/translations/menu.zh.json';
import facilityEn from '@/data/translations/facility.en.json';
import facilityZh from '@/data/translations/facility.zh.json';

import type { Locale } from '@/i18n/config';
import { getImagePath } from '@/lib/utils';

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface MenuCategory {
  categoryName: string;
  description: string;
  menuItems: MenuItem[];
}

export interface OtherMenuItem {
  name: string;
  price?: number | null;
  note?: string;
}

export interface OtherMenuCategory {
  /** 表示用のカテゴリ名（ロケール適用後） */
  categoryName: string;
  /** data/simpleMenu.json 上のキー（日本語）。React の key に使う */
  key: string;
  commonNote?: string;
  commonPrice?: number | null;
  list: OtherMenuItem[];
}

export interface CourseMenu {
  name: string;
  description: string;
  price: number;
  items: string[];
  minPeople?: number;
  image?: string;
}

export interface FacilityInfo {
  facilityName: string;
  address: { postalCode: string; full: string };
  businessHours: {
    restaurant: { hours: string; note: string };
    shop: { hours: string; note: string };
  };
  closedDays: string;
  parking: string;
  seating: string;
  contact: { tel: string; fax: string; email: string };
}

interface TextOverride {
  name?: string;
  description?: string;
  note?: string;
}

interface MenuTranslations {
  photoMenuCategories?: Record<string, { categoryName?: string; description?: string }>;
  dishes?: Record<string, TextOverride>;
  simpleMenuCategories?: Record<string, string>;
  simpleMenuItems?: Record<string, TextOverride>;
  courseMenus?: Record<string, TextOverride>;
}

/** ja は上書きなし（日本語データがそのまま正） */
const MENU_TRANSLATIONS: Record<Locale, MenuTranslations | null> = {
  ja: null,
  en: menuEn as MenuTranslations,
  zh: menuZh as MenuTranslations,
};

type FacilityTranslations = Partial<Omit<FacilityInfo, 'contact' | 'address' | 'businessHours'>> & {
  address?: Partial<FacilityInfo['address']>;
  businessHours?: {
    restaurant?: Partial<FacilityInfo['businessHours']['restaurant']>;
    shop?: Partial<FacilityInfo['businessHours']['shop']>;
  };
};

const FACILITY_TRANSLATIONS: Record<Locale, FacilityTranslations | null> = {
  ja: null,
  en: facilityEn as FacilityTranslations,
  zh: facilityZh as FacilityTranslations,
};

/**
 * 翻訳が undefined（キーが無い）のときだけ日本語にフォールバックする。
 * 空文字列は「意図的に空欄」として尊重する（日本語データ側も空のことが多い）。
 */
function pick(translated: string | undefined, fallback: string): string {
  return translated === undefined ? fallback : translated;
}

export function getPhotoMenu(locale: Locale): MenuCategory[] {
  const t = MENU_TRANSLATIONS[locale];
  return (photoMenuData as MenuCategory[]).map((category) => {
    const categoryOverride = t?.photoMenuCategories?.[category.categoryName];
    return {
      categoryName: pick(categoryOverride?.categoryName, category.categoryName),
      description: pick(categoryOverride?.description, category.description),
      menuItems: category.menuItems.map((item) => {
        const override = t?.dishes?.[item.name];
        return {
          ...item,
          name: pick(override?.name, item.name),
          description: pick(override?.description, item.description),
          ...(item.image ? { image: getImagePath(item.image) } : {}),
        };
      }),
    };
  });
}

export function getOtherMenus(locale: Locale): OtherMenuCategory[] {
  const t = MENU_TRANSLATIONS[locale];
  const raw = simpleMenuData as Record<string, Omit<OtherMenuCategory, 'categoryName' | 'key'>>;
  return Object.entries(raw).map(([key, categoryData]) => ({
    key,
    categoryName: pick(t?.simpleMenuCategories?.[key], key),
    commonNote: categoryData.commonNote,
    commonPrice: categoryData.commonPrice,
    list: categoryData.list.map((item) => {
      const override = t?.simpleMenuItems?.[item.name];
      return {
        ...item,
        name: pick(override?.name, item.name),
        ...(item.note !== undefined ? { note: pick(override?.note, item.note) } : {}),
      };
    }),
  }));
}

export function getCourseMenus(locale: Locale): CourseMenu[] {
  const t = MENU_TRANSLATIONS[locale];
  return (groupMenuData.courseMenus as CourseMenu[]).map((course) => {
    const override = t?.courseMenus?.[course.name];
    return {
      ...course,
      name: pick(override?.name, course.name),
      description: pick(override?.description, course.description),
      ...(course.image ? { image: getImagePath(course.image) } : {}),
    };
  });
}

export function getFacilityInfo(locale: Locale): FacilityInfo {
  const base = facilityInfoData as FacilityInfo;
  const t = FACILITY_TRANSLATIONS[locale];
  if (!t) return base;

  return {
    ...base,
    facilityName: pick(t.facilityName, base.facilityName),
    address: {
      // 郵便番号は表記を変えない
      postalCode: base.address.postalCode,
      full: pick(t.address?.full, base.address.full),
    },
    businessHours: {
      restaurant: {
        hours: pick(t.businessHours?.restaurant?.hours, base.businessHours.restaurant.hours),
        note: pick(t.businessHours?.restaurant?.note, base.businessHours.restaurant.note),
      },
      shop: {
        hours: pick(t.businessHours?.shop?.hours, base.businessHours.shop.hours),
        note: pick(t.businessHours?.shop?.note, base.businessHours.shop.note),
      },
    },
    closedDays: pick(t.closedDays, base.closedDays),
    parking: pick(t.parking, base.parking),
    seating: pick(t.seating, base.seating),
    contact: base.contact,
  };
}
