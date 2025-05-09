"use client";

import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../redux/store";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import TopHeader from "@/components/TopHeader";
import Footer from "@/components/Footer";
import TopNextNavbar from "@/components/TopNextNavbar";
import enTranslations from "@/locales/en.json";
import arTranslations from "@/locales/ar.json";
import { usePathname } from "next/navigation";
import { fetchThemeFromAPI } from "@/redux/slices/themeSlice";
import { AuthProvider } from "@/context/UserContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentLocale, setCurrentLocale] = useState("en");

  // Locale toggle handler
  const handleLanguageToggle = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    localStorage.setItem("locale", newLocale);
    setCurrentLocale(newLocale);
  };

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale") || "en";
    setCurrentLocale(storedLocale);
  }, []);

  return (
    <html
      lang={currentLocale}
      dir={currentLocale === "ar" ? "rtl" : "ltr"} // Set language and text direction
    >
      <body className="bg-white dark:bg-slate-950">
        <Provider store={store}>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="flex flex-col min-h-screen">
                {/* Fixed header section */}
                <div className="fixed top-0 left-0 right-0 z-50">
                  <TopHeader />
                  <div className="hidden md:block">
                    <ThemeSwitcher />
                  </div>

                  {/* Pass props for language toggle */}
                  <ThemeFetcherAndApplier
                    onLanguageToggle={handleLanguageToggle}
                    currentLocale={currentLocale}
                  />
                </div>

                {/* Main content */}
                <main className="flex-grow mt-[24px] lg:mt-[124px]">
                  {children}
                </main>

                {/* Footer */}
                <Footer />
              </div>
            </ThemeProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}

function ThemeFetcherAndApplier({
  onLanguageToggle,
  currentLocale,
}: {
  onLanguageToggle: () => void;
  currentLocale: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme);

  // Theme Fetching and Application
  useEffect(() => {
    dispatch(fetchThemeFromAPI());

    if (theme.primaryColor) {
      document.documentElement.style.setProperty(
        "--color-primary",
        theme.primaryColor
      );
      document.documentElement.style.setProperty(
        "--color-secondary",
        theme.secondaryColor
      );
      document.documentElement.style.setProperty(
        "--color-tertiary",
        theme.tertiaryColor
      );
    }
  }, [dispatch, theme.primaryColor, theme.secondaryColor, theme.tertiaryColor]);

  const logoUrl = theme?.logo

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <TopHeader />
      <TopNextNavbar logoUrl={logoUrl} onLanguageToggle={onLanguageToggle} />
    </div>
  );
}
