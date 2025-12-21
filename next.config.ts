import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Turbopackの設定（空でOK、エラーを回避）
  turbopack: {},
};

export default nextConfig;
