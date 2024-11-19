// store/favoriteSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface Category {
  _id: string;
  categoryName: string;
  categoryLogo: string;
}

interface FavoriteState {
  favorites: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoriteState = {
  favorites: [],
  loading: false,
  error: null,
};

// Thunk to fetch favorite categories
export const fetchFavorites = createAsyncThunk("favorites/fetch", async () => {
  const token = Cookies.get("token");
  const response = await axios.get(
    "https://alsaifgallery.onrender.com/api/v1/user/getFavoriteCategories",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data.data;
});

// Thunk to add a favorite category
export const addFavorite = createAsyncThunk(
  "favorites/add",
  async (categoryId: string) => {
    const token = Cookies.get("token");
    const response = await axios.post(
      "https://alsaifgallery.onrender.com/api/v1/user/saveFavoriteCategories",
      { categoryId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.data;
  }
);

// Thunk to remove a favorite category
export const removeFavorite = createAsyncThunk(
  "favorites/remove",
  async (categoryId: string) => {
    const token = Cookies.get("token");
    await axios.post(
      `https://alsaifgallery.onrender.com/api/v1/user/removeFavoriteCategories/${categoryId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return categoryId;
  }
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching favorites";
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (category) => category._id !== action.payload
        );
      });
  },
});

export default favoriteSlice.reducer;
