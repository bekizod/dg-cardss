import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all cover pictures of subcategories by parentId
export const getAllCoverPictures = createAsyncThunk(
  'coverPicture/getAll',
  async ({ parentId }: { parentId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https:alsaifgallery.onrender.com/api/v1/category/getCoverPicturesOfSubCategories/${parentId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const coverPictureSlice = createSlice({
  name: 'coverPicture',
  initialState: {
    pictures: [],
    isFetching: false,
    error: ''
  },
  reducers: {
    // Reducer to clear pictures array
    clearPictures: (state) => {
      state.pictures = [];
    },
    // Reducer to reset error
    resetError: (state) => {
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoverPictures.pending, (state) => {
        state.isFetching = true;
        state.error = '';
      })
      .addCase(getAllCoverPictures.fulfilled, (state, action) => {
        state.isFetching = false;
        state.pictures = action.payload.data; // Load all cover pictures
      })
      .addCase(getAllCoverPictures.rejected, (state, action : any) => {
        state.isFetching = false;
        state.error = action.payload?.message || 'Failed to fetch cover pictures';
      });
  }
});

// Exporting actions for clearing pictures or resetting errors
export const { clearPictures, resetError } = coverPictureSlice.actions;

export default coverPictureSlice.reducer;
