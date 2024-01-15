/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
          protocol: 'https',
          hostname: 'pbs.twimg.com',
          port: '',
          pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/laginow/**',
      },
      {
        protocol:"https",
        hostname:'www.facebook.com',
        port:"",
        pathname:"/**"
      }
    ],
  },
}

module.exports = nextConfig
