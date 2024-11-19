import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const THEME_STORAGE_KEY = "appTheme";

const loadThemeFromLocalStorage = () => {
  if (typeof window === "undefined") return null;
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return storedTheme ? JSON.parse(storedTheme) : null;
};

const saveThemeToLocalStorage = (theme: any) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
};

export const fetchThemeFromAPI = createAsyncThunk(
  "theme/fetchTheme",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://alsaifgallery.onrender.com/api/v1/theme/getTheme"
      );
      if (!response.ok) throw new Error("Failed to fetch theme");
      const data = await response.json();
      saveThemeToLocalStorage(data.data); // Save theme to localStorage
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const themeSlice = createSlice({
  name: "theme",
  initialState: loadThemeFromLocalStorage() || {
    primaryColor: "#ffffff",
    secondaryColor: "#000000",
    tertiaryColor: "#cccccc",
    logo: "",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThemeFromAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchThemeFromAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { primaryColor, secondaryColor, tertiaryColor, logo } =
          action.payload;
        state.primaryColor = primaryColor;
        state.secondaryColor = secondaryColor;
        state.tertiaryColor = tertiaryColor;
        state.logo = logo;
      })
      .addCase(fetchThemeFromAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default themeSlice.reducer;
