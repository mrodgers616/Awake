/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/forum',
        destination: 'https://forum.bankless.community',
        permanent: true,
      }, {
        source: '/buy-earth',
        destination: 'https://uniswap.org',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
