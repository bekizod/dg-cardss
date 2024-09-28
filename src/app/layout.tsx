"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import TopHeader from "@/components/TopHeader";
import Footer from "@/components/Footer";
import TopNextNavbar from "@/components/TopNextNavbar";
import enTranslations from "@/locales/en.json";
import arTranslations from "@/locales/ar.json";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState("en");
  const [translations, setTranslations] = useState(enTranslations);
  const pathname = usePathname(); // Get the current path

  // Initialize locale from URL or localStorage
  useEffect(() => {
    const storedLocale = localStorage.getItem("locale") || "en";
    setCurrentLocale(storedLocale);
    setTranslations(storedLocale === "ar" ? arTranslations : enTranslations);
  }, [pathname]);

  // Handle language toggle without URL redirection
  const handleLanguageToggle = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    localStorage.setItem("locale", newLocale);
    setTranslations(newLocale === "ar" ? arTranslations : enTranslations);
    setCurrentLocale(newLocale);
  };

  return (
    <html lang={currentLocale} dir={currentLocale === "ar" ? "rtl" : "ltr"}>
      <body className={`bg-white dark:bg-black ${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeSwitcher />
          <div className="fixed top-0 left-0 right-0 z-50">
            <TopHeader />
            <TopNextNavbar onLanguageToggle={handleLanguageToggle} />
          </div>
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
