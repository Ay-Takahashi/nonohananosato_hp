import dictionaries, { type Dictionary } from './dictionaries';
import { type Locale } from './config';

/**
 * 辞書を同期的に取得する。
 *
 * 静的エクスポートなので動的 import（Promise）にする必要がなく、
 * クライアントコンポーネントからもそのまま呼べるように同期関数にしている。
 * 辞書は 3 ロケール分あわせても小さいため、全部バンドルされても問題ない。
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
