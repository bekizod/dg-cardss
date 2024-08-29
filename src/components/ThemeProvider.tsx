"use client";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";
import React, { ReactNode } from "react";

interface CustomThemeProviderProps extends ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<CustomThemeProviderProps> = ({ children, ...props }) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
