/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
  images: {
    domains: ["via.placeholder.com", "/", "pwa-cdn.alsaifgallery.com"],
  },
};

export default nextConfig;