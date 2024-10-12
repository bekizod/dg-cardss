"use client"
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import TopHeader from "@/components/TopHeader";
import Footer from "@/components/Footer";
import TopNextNavbar from "@/components/TopNextNavbar";
import { AuthProvider } from "@/context/UserContext";
import { Provider } from "react-redux"; // Import Provider from react-redux
import { store } from "../redux/store";
 

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Welcome To Alsaif Gallery",
//   description: "Your Best Choice E-Commerce",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-white dark:bg-black `}>
        {/* Wrap the app with Redux Provider */}
        <Provider store={store}>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ThemeSwitcher />
              <div className="fixed top-0 left-0 right-0 z-50">
                <TopHeader />
                <TopNextNavbar />
              </div>
              <main>{children}</main>
              <Footer />
            </ThemeProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
