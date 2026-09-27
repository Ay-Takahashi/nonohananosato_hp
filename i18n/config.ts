/**
 * ロケール定義（多言語対応の単一の情報源）
 *
 * 静的エクスポート（output: 'export'）構成のため middleware は使えない。
 * ロケールはすべて URL パスで表現し、ビルド時に全ロケール分の HTML を生成する。
 *
 * - デフォルトロケール（ja）はプレフィックスなし（`/`, `/menu`, `/menu/general`）
 *   → 既存の本番 URL を維持するため
 * - それ以外は `/en/...`, `/zh/...`
 *
 * `path` と `htmlLang` / `hreflang` を分離しているので、
 * 例えば繁体字を追加する場合は下の LOCALES に 1 件足すだけで済む。
 */

export type Locale = 'ja' | 'en' | 'zh';

export interface LocaleConfig {
  /** 内部的なロケール ID（辞書ファイル名と一致させる） */
  id: Locale;
  /** URL のプレフィックス。デフォルトロケールは null（プレフィックスなし） */
  path: string | null;
  /** <html lang="..."> に入れる値 */
  htmlLang: string;
  /** sitemap / link rel=alternate の hreflang */
  hreflang: string;
  /** OpenGraph の locale */
  ogLocale: string;
  /** 言語切り替え UI に出す表記（その言語自身の表記） */
  label: string;
  /** 言語切り替え UI の短縮表記 */
  shortLabel: string;
}

export const LOCALES: readonly LocaleConfig[] = [
  {
    id: 'ja',
    path: null,
    htmlLang: 'ja',
    hreflang: 'ja',
    ogLocale: 'ja_JP',
    label: '日本語',
    shortLabel: 'JA',
  },
  {
    id: 'en',
    path: 'en',
    htmlLang: 'en',
    hreflang: 'en',
    ogLocale: 'en_US',
    label: 'English',
    shortLabel: 'EN',
  },
  {
    // 簡体字。繁体字を追加する場合は id: 'zh-Hant' / path: 'zh-Hant' で 1 件追加する
    id: 'zh',
    path: 'zh',
    htmlLang: 'zh-Hans',
    hreflang: 'zh-Hans',
    ogLocale: 'zh_CN',
    label: '简体中文',
    shortLabel: '中文',
  },
] as const;

export const DEFAULT_LOCALE: Locale = 'ja';

/** デフォルト以外のロケール（[locale] セグメントで静的生成する対象） */
export const PREFIXED_LOCALES = LOCALES.filter((l) => l.path !== null);

export const LOCALE_IDS = LOCALES.map((l) => l.id);

export function getLocaleConfig(locale: Locale): LocaleConfig {
  const found = LOCALES.find((l) => l.id === locale);
  if (!found) {
    throw new Error(`Unknown locale: ${locale}`);
  }
  return found;
}

export function isLocale(value: string): value is Locale {
  return LOCALES.some((l) => l.id === value);
}

/**
 * ロケールを考慮したパスを生成する。
 * `path` は先頭スラッシュ付きのロケール非依存パス（例: '/menu', '/menu?tab=group', '/#access'）。
 */
export function localePath(locale: Locale, path: string = '/'): string {
  const prefix = getLocaleConfig(locale).path;
  if (!prefix) return path;

  if (path === '/') return `/${prefix}`;
  // '/#access' のようなハッシュのみのパスは '/en#access' になるようにする
  if (path.startsWith('/#')) return `/${prefix}${path.slice(1)}`;
  return `/${prefix}${path}`;
}

/**
 * 実際の URL パス（例: '/en/menu'）からロケール非依存パス（'/menu'）を取り出す。
 * 言語切り替え UI で「今と同じページの別言語版」へのリンクを作るのに使う。
 */
export function stripLocaleFromPathname(pathname: string): string {
  const segments = pathname.replace(/^\/+/, '').split('/');
  const first = segments[0];
  const matched = PREFIXED_LOCALES.find((l) => l.path === first);
  if (!matched) return pathname === '' ? '/' : pathname;
  const rest = segments.slice(1).join('/');
  return rest ? `/${rest}` : '/';
}
