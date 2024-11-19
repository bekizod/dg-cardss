"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { ReactNode } from "react";

interface CustomThemeProviderProps {
  children: ReactNode;
  attribute: string;
  defaultTheme: string;
  enableSystem: boolean;
}

const ThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
  ...props
}) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
