import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';

export type LocaleParams = Promise<{ locale: string }>;

/** [locale] セグメントを Locale に解決する。未知の値は 404 */
export async function resolveLocale(params: LocaleParams): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  return locale;
}
