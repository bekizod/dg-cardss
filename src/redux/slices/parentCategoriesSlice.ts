import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Thunk to fetch first 4 parent categories
export const fetchFirstFourParentCategories = createAsyncThunk(
  "parentCategories/fetchFirstFourParentCategories",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        "https://alsaifgallery.onrender.com/api/v1/category/getParentCategories?limit=4",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch parent categories");
    }
  }
);

const parentCategoriesSlice = createSlice({
  name: "parentCategories",
  initialState: {
    categories: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFirstFourParentCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFirstFourParentCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(
        fetchFirstFourParentCategories.rejected,
        (state: any, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default parentCategoriesSlice.reducer;
