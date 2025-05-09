/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pwa-cdn.alsaifgallery.com",
      },

      {
        protocol: "https",
        hostname: "alsaifimages.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
