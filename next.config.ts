import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // コメント・いいねAPIが記事の存在確認で content/articles を読むため、デプロイに含める
  outputFileTracingIncludes: {
    '/api/articles/**': ['./content/articles/**/*'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
  },
};

export default nextConfig;
