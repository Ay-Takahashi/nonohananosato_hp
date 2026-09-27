import ja from './ja.json';
import en from './en.json';
import zh from './zh.json';
import type { Locale } from '../config';

/**
 * 辞書の型は日本語辞書の形から自動導出する。
 * 新しいキーを ja.json に足すと、他ロケールで不足していれば型エラーになる。
 */
export type Dictionary = typeof ja;

const dictionaries: Record<Locale, Dictionary> = {
  ja,
  en,
  zh,
};

export default dictionaries;
