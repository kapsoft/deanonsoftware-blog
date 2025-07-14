/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Redirects from old WordPress URLs if needed
  async redirects() {
    return [
      {
        source: '/blog/:year/:month/:day/:slug',
        destination: '/blog/:year-:month-:day-:slug',
        permanent: true,
      },
    ];
  },
  
  // Headers for RSS feed
  async headers() {
    return [
      {
        source: '/rss.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/rss+xml',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
