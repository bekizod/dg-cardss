// store/slices/categorySlice.ts
"use client";

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// CategoryState interface for managing categories, subcategories, and products
interface CategoryState {
  parentCategories: any[];
  subCategories: any[];
  products: any[];
  product: any[]; // For single product
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  parentCategories: [],
  subCategories: [],
  products: [],
  product: [], // Initial value for the single product
  loading: false,
  error: null,
};

// Thunk to fetch parent categories
export const fetchParentCategories = createAsyncThunk(
  'categories/fetchParentCategories',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('https://alsaifgallery.onrender.com/api/v1/category/getParentCategories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch parent categories');
    }
  }
);

// Thunk to fetch subcategories
export const fetchSubCategories = createAsyncThunk(
  'categories/fetchSubCategories',
  async (parentId: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`https://alsaifgallery.onrender.com/api/v1/category/subCategories/${parentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch subcategories');
    }
  }
);

// Thunk to fetch products by subcategory
export const fetchProductsByCategory = createAsyncThunk(
  'categories/fetchProductsByCategory',
  async (subcategoryId: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`https://alsaifgallery.onrender.com/api/v1/product/getProductByCategories/${subcategoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch products');
    }
  }
);

// Thunk to fetch a single product (new addition)
export const fetchSingleProduct = createAsyncThunk(
  'categories/fetchSingleProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`https://alsaifgallery.onrender.com/api/v1/product/getSingleProduct/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch the product');
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Parent categories
    builder.addCase(fetchParentCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchParentCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.parentCategories = action.payload;
    });
    builder.addCase(fetchParentCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Subcategories
    builder.addCase(fetchSubCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSubCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.subCategories = action.payload;
    });
    builder.addCase(fetchSubCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Products by category
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Single product
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default categorySlice.reducer;
