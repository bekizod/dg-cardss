import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the interface for product data
interface Product {
  _id: string;
  name: string;
  adjective: string;
  description: string;
  price: string;
  imageIds: string[];
  additionalInformation: {
    SKU: string;
    barcode: string;
    brand: string;
    color: string;
    size: string;
    warranty: string;
    returnPolicy: string;
    material: string;
  };
  category: {
    _id: string;
    categoryName: string;
  };
  stockQuantity: number;
  ratings: {
    averageRating: number;
    numberOfRatings: number;
  };
}

// Define the state interface
interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching all products
export const SearchProducts = createAsyncThunk(
  'products/SearchProducts',
  async (queryParams: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://alsaifgallery.onrender.com/api/v1/product/getAllProducts?${queryParams}`
      );

      // Return an object containing the desired values
      return {
        products: response.data.data.products,
        total: response.data.data.total,
        pages: response.data.data.pages,
      };
    } catch (error) {
      // Handle error and return it using rejectWithValue
      return rejectWithValue(error.response.data);
    }
  }
);

// Create product slice
const searchSlice = createSlice({
  name: 'searchProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SearchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SearchProducts.fulfilled, (state, action) => {
       const { products, total, pages } = action.payload; // Destructure the values
      state.products = products; // Set products in state
      state.total = total; // Set total in state
      state.pages = pages; // Set pages in state
      state.status = 'succeeded';// Store products here
      })
      .addCase(SearchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default searchSlice.reducer;
