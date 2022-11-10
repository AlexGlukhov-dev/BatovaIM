/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ['online.moysklad.ru', 'storage.files.mow1.cloud.servers.ru', 'storage.files.mo01.cloud.servers.com']
  },
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/personal',
        has: [
          {
            type: 'cookie',
            key: 'PAC_authorized',
            value: 'false'
          }
        ],
        destination: '/',
        permanent: false
      }
    ]
  }
};
