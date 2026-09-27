import type { NextConfig } from "next";

const basePath = ''; // 独自ドメイン使用時はベースパス不要

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,  // 静的アセット用のプレフィックス
  reactCompiler: true,
  // Turbopackの設定（空でOK、エラーを回避）
  turbopack: {},
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,  // アプリで使用するための環境変数
  },
};

export default nextConfig;
