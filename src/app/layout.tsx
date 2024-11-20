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

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState("en");
  const [translations, setTranslations] = useState(enTranslations);
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale") || "en";
    setCurrentLocale(storedLocale);
    setTranslations(storedLocale === "ar" ? arTranslations : enTranslations);
  }, [pathname]);

  const handleLanguageToggle = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    localStorage.setItem("locale", newLocale);
    setTranslations(newLocale === "ar" ? arTranslations : enTranslations);
    setCurrentLocale(newLocale);
  };

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

  return (
    <div>
      <ThemeSwitcher />
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopHeader />
        <TopNextNavbar
          logoUrl={theme.logo || "/default-logo.png"} // Provide fallback for logo
          onLanguageToggle={handleLanguageToggle} // Pass language toggle function
        />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentLocale, setCurrentLocale] = useState("en");

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale") || "en";
    setCurrentLocale(storedLocale);
  }, []);

  return (
    <html lang={currentLocale} dir={currentLocale === "ar" ? "rtl" : "ltr"}>
      <body className={`bg-white dark:bg-black`}>
        <Provider store={store}>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <LayoutContent>{children}</LayoutContent>
            </ThemeProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
