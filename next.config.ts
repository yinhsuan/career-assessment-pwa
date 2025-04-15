const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com'],
  },
  // 添加這個配置來暫時禁用 ESLint 檢查
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPWA(nextConfig);