/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "ar",
  },
  images: {
    domains: ["via.placeholder.com", "/", "pwa-cdn.alsaifgallery.com"],
  },
};

export default nextConfig;