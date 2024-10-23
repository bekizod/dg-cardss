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
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching all cover pictures
      .addCase(getAllCoverPictures.pending, (state: any) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getAllCoverPictures.fulfilled, (state: any, action: any) => {
        state.isFetching = false;
        state.pictures = action.payload.data; // Load all cover pictures
      })
      .addCase(getAllCoverPictures.rejected, (state: any, action: any) => {
        state.isFetching = false;
        state.error = action.payload.message;
      });
  }
});

export default coverPictureSlice.reducer;