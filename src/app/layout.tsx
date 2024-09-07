// app/layout.tsx or app/RootLayout.tsx
"use client"; // Ensure this component is client-side

import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import TopHeader from "@/components/TopHeader";
import Footer from "@/components/Footer";
import TopNextNavbar from "@/components/TopNextNavbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter(); // Use `useRouter` from `next/navigation`
  const { locale, asPath } = router;

  // Toggle function for language
  const handleLanguageToggle = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.push(`/${newLocale}${asPath}`, undefined, { locale: newLocale });
  };

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
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
