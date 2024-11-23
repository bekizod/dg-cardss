import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import arTranslations from "@/locales/ar.json" assert { type: "json" };
import enTranslations from "@/locales/en.json" assert { type: "json" };

export type Translations = typeof arTranslations;

interface LocaleState {
  currentLocale: string;
  translations: Translations;
}

const DEFAULT_LOCALE = "en";

// Safely get locale from localStorage
const getStoredLocale = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("locale") || DEFAULT_LOCALE;
  }
  return DEFAULT_LOCALE;
};

const initialState: LocaleState = {
  currentLocale: getStoredLocale(),
  translations: getStoredLocale() === "ar" ? arTranslations : enTranslations,
};

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      const locale = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("locale", locale);
      }
      state.currentLocale = locale;
      state.translations = locale === "ar" ? arTranslations : enTranslations;
    },
  },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;
