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
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # トップページ
│   ├── globals.css         # グローバルスタイル
│   └── menu/
│       ├── general/        # 一般メニュー
│       │   └── page.tsx
│       └── group/          # 団体メニュー
│           └── page.tsx
├── components/
│   ├── Header.tsx          # ヘッダーコンポーネント
│   └── Footer.tsx          # フッターコンポーネント
├── public/
│   └── images/             # 画像ファイル
└── package.json
```

## カスタマイズ

### 店舗情報の変更

以下のファイルで店舗情報を変更できます：

- `components/Header.tsx` - ヘッダーの電話番号とロゴ
- `components/Footer.tsx` - フッターの店舗情報
- `app/page.tsx` - トップページのアクセス情報
- `app/layout.tsx` - ページタイトルと説明

### メニューの変更

- `app/menu/general/page.tsx` - 一般メニューの内容
- `app/menu/group/page.tsx` - 団体メニューの内容

### デザインの変更

- `app/globals.css` - グローバルスタイル
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

## デプロイ

### Vercelへのデプロイ（推奨）

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

