/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['pbs.twimg.com', 'ik.imagekit.io', 'lh3.googleusercontent.com', 'storage.googleapis.com'],
  },
}

module.exports = nextConfig
