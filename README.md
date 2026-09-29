# 野の花の郷 - 飲食店ホームページ

地元の新鮮な食材を使用した飲食店のホームページです。

## 技術スタック

- **Next.js 16** - Reactフレームワーク (App Router)
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストのCSSフレームワーク
- **Framer Motion** - スムーズなアニメーション
- **React Icons** - アイコンライブラリ

## 機能

- ✅ レスポンシブデザイン
- ✅ トップページ（ヒーロー、コンセプト、メニュー紹介、アクセス）
- ✅ 一般メニューページ
- ✅ 団体メニューページ
- ✅ スムーズなスクロールアニメーション
- ✅ モバイル対応ナビゲーション
- ✅ 多言語対応（日本語 / 英語 / 簡体中文）

## 開発環境のセットアップ

### Docker環境（推奨）

ローカルのNode.js環境を変更せずに開発できます。このプロジェクトはDockerベースの開発を前提としています。

#### 必要な環境

- **Docker Desktop** - [ダウンロード](https://www.docker.com/products/docker-desktop)
- **VS Code（推奨）** - TypeScript補完とエラー表示のため

#### 初回セットアップ

1. **Docker Desktopを起動**

2. **エディタ用の依存関係をインストール**（TypeScript補完用）
   ```bash
   npm install
   ```
   > **注意**: このステップはVS Codeでの型チェックとコード補完のためです。
   > アプリケーションの実行にはDocker内の`node_modules`が使用されます。

3. **開発サーバーを起動**
   ```bash
   docker-compose up --build
   ```
   
   初回は依存関係のインストールで時間がかかります（1-2分程度）。

4. **ブラウザで確認**
   
   [http://localhost:3000](http://localhost:3000) を開いてください。

#### 日常の開発フロー

```bash
# サーバー起動
docker-compose up

# バックグラウンドで起動
docker-compose up -d

# ログを確認（バックグラウンド起動時）
docker-compose logs -f

# 停止
Ctrl+C または docker-compose down
```

#### ファイル編集

- ファイルを編集すると自動的にホットリロードされます
- `app/`配下のファイル変更は即座に反映されます
- Turbopackにより高速なリロードを実現

#### トラブルシューティング

**エディタでTypeScriptエラーが表示される**
```bash
# ローカルのnode_modulesを再インストール
npm install
```

**変更が反映されない**
```bash
# コンテナを再起動
docker-compose restart

# キャッシュをクリアして再ビルド
docker-compose down
docker-compose up --build
```

**ポートが使用中**
```bash
# 既存のコンテナを停止
docker-compose down

# または別のポートを使用（docker-compose.ymlを編集）
ports:
  - "3001:3000"
```

### ローカル環境（非推奨）

Docker環境の利用を推奨しますが、直接ローカルで実行することも可能です。

#### 必要な環境
- **Node.js 20.9.0以上**
- npm または yarn

#### セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 本番環境での起動
npm start
```

## プロジェクト構造

```
homepage/
├── app/
│   ├── (ja)/                   # 日本語（デフォルト）: / , /menu , /menu/general
│   │   ├── layout.tsx          # 日本語のルートレイアウト
│   │   ├── page.tsx
│   │   └── menu/
│   │       ├── page.tsx
│   │       └── general/page.tsx
│   ├── [locale]/               # 英語・中文: /en/... , /zh/...
│   │   ├── layout.tsx          # generateStaticParams で全ロケールを静的生成
│   │   ├── params.ts           # [locale] セグメントの解決
│   │   ├── page.tsx
│   │   └── menu/
│   │       ├── page.tsx
│   │       └── general/page.tsx
│   ├── global-not-found.tsx    # 404 ページ
│   ├── globals.scss            # グローバルスタイル
│   ├── robots.ts
│   └── sitemap.ts              # 全ロケールの URL + hreflang
├── components/
│   ├── SiteShell.tsx           # <html>/<body> と共通レイアウト（全ロケール共通）
│   ├── Header.tsx              # ヘッダー（言語切り替え含む）
│   ├── Footer.tsx              # フッター
│   ├── LanguageSwitcher.tsx    # 言語切り替え UI
│   └── pages/                  # 各ページ本体（ロケールを props で受け取る）
├── i18n/
│   ├── config.ts               # ロケール定義（追加はここだけ）
│   ├── getDictionary.ts
│   ├── metadata.ts             # ロケール別メタデータ・hreflang
│   └── dictionaries/           # UI 文言の辞書（ja / en / zh）
├── data/
│   ├── *.json                  # 日本語のメニュー・施設情報（正データ）
│   └── translations/           # 各言語の訳（オーバーレイ）
├── public/
│   └── images/                 # 画像ファイル
└── package.json
```

## カスタマイズ

### 店舗情報の変更

以下のファイルで店舗情報を変更できます：

- `data/facilityInfo.json` - 住所・営業時間・連絡先など（日本語）
- `data/translations/facility.{en,zh}.json` - 上記の各言語表記
- `components/Header.tsx` - ヘッダーの電話番号とロゴ
- `i18n/metadata.ts` / `i18n/dictionaries/*.json` - ページタイトルと説明

### メニューの変更

- `data/photoMenu.json` - 定食メニュー（写真付き）
- `data/simpleMenu.json` - 単品・ドリンクなど
- `data/groupMenu.json` - 団体様お食事プラン
- `data/translations/menu.{en,zh}.json` - 上記の各言語訳（**要監修**）

### デザインの変更

- `app/globals.scss` - グローバルスタイル
- Tailwind CSSのユーティリティクラスで各コンポーネントのスタイルを変更

### 画像の追加

1. 画像を `public/images/` フォルダに配置
2. Next.jsの `Image` コンポーネントを使用して表示

```tsx
import Image from 'next/image';

<Image
  src="/images/your-image.jpg"
  alt="説明"
  width={800}
  height={600}
/>
```

## 多言語対応（i18n）

| 言語 | URL | `<html lang>` |
| --- | --- | --- |
| 日本語（デフォルト） | `/` `/menu` `/menu/general` | `ja` |
| English | `/en` `/en/menu` `/en/menu/general` | `en` |
| 简体中文 | `/zh` `/zh/menu` `/zh/menu/general` | `zh-Hans` |

- `output: 'export'` のため middleware は使えない。ロケールは URL パスで表現し、
  `app/[locale]` の `generateStaticParams` でビルド時に全ロケール分の HTML を生成する。
- 日本語はプレフィックスなし（既存の本番 URL を変えないため）。`app/(ja)` 配下に配置している。
- ブラウザの言語から自動リダイレクトはできない（静的配信のため）。ヘッダーの言語切り替えリンクで選んでもらう。
- `sitemap.ts` が全ロケールの URL を列挙し、各ページに `hreflang`（+ `x-default`）を付与する。

### 言語を追加する

1. `i18n/config.ts` の `LOCALES` に 1 件追加する
2. `i18n/dictionaries/<locale>.json` を追加する（`ja.json` をコピーして訳す）
3. `data/translations/menu.<locale>.json` / `facility.<locale>.json` を追加する

ルーティング側の変更は不要。

### 翻訳の管理

- UI 文言: `i18n/dictionaries/{ja,en,zh}.json`
- メニュー・施設情報: `data/*.json`（日本語が正）+ `data/translations/*.{en,zh}.json`（訳のオーバーレイ）
  - キーは日本語表記そのもの。訳が無いキーは日本語のまま表示される（フォールバック）
- **料理名・メニュー説明・施設名の訳は機械翻訳のドラフト**。各ファイルの `_meta.needsReview` /
  辞書の `_meta.needsReview` に「要監修」の箇所を明示しているので、店舗側の監修後に差し替えること。

## デプロイ

### ブランチとデプロイ先

| ブランチ | 役割 | デプロイ先 | URL |
| --- | --- | --- | --- |
| `master` | 本番 | GitHub Pages | https://nonohananosato.jp |
| `dev` | 開発・確認用 | Vercel | https://nonohananosato-hp.vercel.app |

開発は `dev` ブランチで行います。`master` に直接コミットしないでください。

```
dev で作業 → push → Vercel で確認 → master へマージ → GitHub Pages に本番反映
```

### 本番（GitHub Pages）

`master` への push で `.github/workflows/nextjs.yml` が動き、`npm run build` の成果物 `out/` が
自動でデプロイされます。手動実行は GitHub の Actions タブから可能です。

### 開発用（Vercel）

`dev` への push で自動ビルドされます。Vercel 側の Production Branch は `dev` に設定済みです。

開発用サイトは検索エンジンにインデックスされないよう、`vercel.json` の `X-Robots-Tag` ヘッダーと
`app/robots.ts` の Vercel 判定の2箇所で noindex にしています。この設定は変更しないでください。
