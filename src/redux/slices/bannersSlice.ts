import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching advertisements
export const getAdvertisements = createAsyncThunk(
  'advertisement/getAdd',
  async (parentId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://alsaifgallery.onrender.com/api/v1/advertisement/getAdd/${parentId}`);
      return response.data.data; // Returns the array of advertisements
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Advertisement slice
const advertisementSlice = createSlice({
  name: 'advertisement',
  initialState: {
    data: [],    // Advertisements data
    status: 'idle',
    error: null,
  },
  reducers: {
    // Optional: Add a reset action if you ever need to manually clear the state
    resetAdvertisements: (state) => {
      state.data = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdvertisements.pending, (state) => {
        state.status = 'loading';
        state.data = [];  // Clear the previous advertisements data before loading new data
      })
      .addCase(getAdvertisements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload; // Set the fetched data
      })
      .addCase(getAdvertisements.rejected, (state : any, action) => {
        state.status = 'failed';
        state.error = action.payload || "Error when Fetching Banners";
      });
  },
});

export const { resetAdvertisements } = advertisementSlice.actions;  // Export the reset action
export default advertisementSlice.reducer;
