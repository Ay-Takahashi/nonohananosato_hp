import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Turbopackの設定（空でOK、エラーを回避）
  turbopack: {},
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
