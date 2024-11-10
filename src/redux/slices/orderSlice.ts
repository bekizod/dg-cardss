import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Define the initial state
interface OrderState {
  orders: any[];
  highlyOrderedProducts: any[];
  createOrderLoading: boolean;
  fetchUserOrdersLoading: boolean;
  getHighlyOrderedProductsLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  createOrderLoading: false,
  fetchUserOrdersLoading: false,
  getHighlyOrderedProductsLoading: false,
  orders: [],
  highlyOrderedProducts: [],
  error: null,
};

// Async actions
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData: any, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "https://alsaifgallery.onrender.com/api/v1/order/createOrder",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://alsaifgallery.onrender.com/api/v1/order/getOrders/${userId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getHighlyOrderedProducts = createAsyncThunk(
  "orders/getHighlyOrderedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("auth-token");
      const response = await axios.get(
        "https://alsaifgallery.onrender.com/api/v1/order/highlyOrderedProducts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      // Optional: Check if error.response exists
      const message = error.response?.data?.message || "An error occurred";
      return rejectWithValue(message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle create order loading state
    builder.addCase(createOrder.pending, (state) => {
      state.createOrderLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.createOrderLoading = false;
      state.orders = action.payload;
      // handle order creation success
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.createOrderLoading = false;
      state.error = action.payload as string;
    });

    // Handle fetch user orders loading state
    builder.addCase(getOrders.pending, (state) => {
      state.fetchUserOrdersLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.fetchUserOrdersLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.fetchUserOrdersLoading = false;
      state.error = action.payload as string;
    });

    // Handle get highly ordered products loading state
    builder.addCase(getHighlyOrderedProducts.pending, (state) => {
      state.getHighlyOrderedProductsLoading = true;
    });
    builder.addCase(getHighlyOrderedProducts.fulfilled, (state, action) => {
      state.getHighlyOrderedProductsLoading = false;
      state.highlyOrderedProducts = action.payload;
    });
    builder.addCase(getHighlyOrderedProducts.rejected, (state, action) => {
      state.getHighlyOrderedProductsLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default ordersSlice.reducer;
