"use client";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, store } from "../redux/store";
import { RootState } from "../redux/store";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import TopHeader from "@/components/TopHeader";
import Footer from "@/components/Footer";
import TopNextNavbar from "@/components/TopNextNavbar";
import { AuthProvider } from "@/context/UserContext";
import { fetchThemeFromAPI } from "@/redux/slices/themeSlice";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="{bg-white dark:bg-black ">
        <Provider store={store}>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ThemeSwitcher />
              <ThemeFetcherAndApplier>{children}</ThemeFetcherAndApplier>
              <Footer />
            </ThemeProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}

function ThemeFetcherAndApplier({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme);

  // Fetch theme and logo when the component mounts
  useEffect(() => {
    dispatch(fetchThemeFromAPI()); // Fetch theme when component loads
  }, [dispatch]);

  // Update CSS variables based on fetched theme
  useEffect(() => {
    if (theme.primaryColor) {
      document.documentElement.style.setProperty("--color-primary", theme.primaryColor);
      document.documentElement.style.setProperty("--color-secondary", theme.secondaryColor);
      document.documentElement.style.setProperty("--color-tertiary", theme.tertiaryColor);
    }
  }, [theme.primaryColor, theme.secondaryColor, theme.tertiaryColor]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopHeader /> {/* Pass the logo URL */}
        <TopNextNavbar logoUrl={theme.logo} />
      </div>
      <main>{children}</main>
    </>
  );
}
