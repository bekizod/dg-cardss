"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi"; // Import icons from react-icons

const ThemeSwitcher: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="md:fixed md:right-5 z-[10000000000] md:top-1/3">
      <button
        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        type="button"
        className="flex h-10 w-10 p-2 items-center justify-center rounded-md md:border md:border-gray-800 text-gray-800 focus:outline-none focus:ring-0 focus:ring-gray-200 dark:border-slate-300 dark:text-white"
      >
        {currentTheme === "dark" ? (
          <FiSun size={24} className="text-white" /> // Light mode icon
        ) : (
          <FiMoon size={24} className="text-black" /> // Dark mode icon
        )}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
