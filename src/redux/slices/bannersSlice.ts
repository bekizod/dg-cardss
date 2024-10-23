import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching advertisements by parentId with caching
export const getAdvertisements = createAsyncThunk(
  'advertisement/getAdd',
  async (parentId: string, { getState, rejectWithValue }) => {
    const { advertisement } = getState() as { advertisement: { cache: Record<string, any> } };

    // Check if the data for this parentId already exists in the cache
    if (advertisement.cache[parentId]) {
      // Return cached data to avoid a new API call
      return advertisement.cache[parentId];
    }

    try {
      const response = await axios.get(`https://alsaifgallery.onrender.com/api/v1/advertisement/getAdd/${parentId}`);
      return { parentId, data: response.data.data }; // Return both parentId and fetched data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Advertisement slice
const advertisementSlice = createSlice({
  name: 'advertisement',
  initialState: {
    cache: {},  // Store advertisements data by parentId
    status: 'idle',
    error: null,
  },
  reducers: {
    // Optional: Reset action to clear the cache or data manually
    resetAdvertisements: (state) => {
      state.cache = {};
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdvertisements.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAdvertisements.fulfilled, (state : any, action) => {
        state.status = 'succeeded';
        const { parentId, data } = action.payload;
        state.cache[parentId] = data; // Cache the fetched data for the specific parentId
      })
      .addCase(getAdvertisements.rejected, (state : any, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error when Fetching Banners';
      });
  },
});

export const { resetAdvertisements } = advertisementSlice.actions;
export default advertisementSlice.reducer;
