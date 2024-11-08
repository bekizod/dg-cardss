import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  signedUrls: string[];
}

interface FavoriteProductsState {
  favoriteProducts: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoriteProductsState = {
  favoriteProducts: [],
  loading: false,
  error: null,
};

// Fetch favorite products
export const fetchFavoriteProducts = createAsyncThunk(
  'favoriteProducts/fetchFavoriteProducts',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch('https://alsaifgallery.onrender.com/api/v1/user/getFavoriteProducts', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.status) {
        return data.user.favoriteProducts;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue('Failed to fetch favorite products');
    }
  }
);

// Save a favorite product
export const saveFavoriteProduct = createAsyncThunk(
  'favoriteProducts/saveFavoriteProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch('https://alsaifgallery.onrender.com/api/v1/user/saveFavoriteProducts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      if (data.status) {
        return { productId, productData: data.data }; // Send back the added product's details
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to save favorite product');
    }
  }
);

// Remove a favorite product
export const removeFavoriteProduct = createAsyncThunk(
  'favoriteProducts/removeFavoriteProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`https://alsaifgallery.onrender.com/api/v1/user/removeFavoriteProduct/${productId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.status) {
        return productId; // Return the ID of the removed product
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue('Failed to remove favorite product');
    }
  }
);

const favoriteProductsSlice = createSlice({
  name: 'favoriteProducts',
  initialState,
  reducers: {
    // Locally add a favorite product
    addFavoriteLocally: (state, action: PayloadAction<Product>) => {
      state.favoriteProducts.push(action.payload);
    },
    // Locally remove a favorite product by ID
    removeFavoriteLocally: (state, action: PayloadAction<string>) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (product) => product._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchFavoriteProducts
      .addCase(fetchFavoriteProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.favoriteProducts = action.payload;
      })
      .addCase(fetchFavoriteProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle saveFavoriteProduct
      .addCase(saveFavoriteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveFavoriteProduct.fulfilled, (state, action: PayloadAction<{ productId: string; productData: Product }>) => {
        state.loading = false;
        state.favoriteProducts.push(action.payload.productData); // Add the new product to the favorites list
      })
      .addCase(saveFavoriteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle removeFavoriteProduct
      .addCase(removeFavoriteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavoriteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.favoriteProducts = state.favoriteProducts.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(removeFavoriteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the actions for local updates
export const { addFavoriteLocally, removeFavoriteLocally } = favoriteProductsSlice.actions;

export default favoriteProductsSlice.reducer;
