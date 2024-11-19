import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define CartItem interface
export interface CartItem {
  id: string;
  buyerId: string;
  image: string;
  name: string;
  color: string;
  quantity: number;
  stockQuantity: number;
  price: number; // API-provided price (may already include discount)
  unitPrice: number; // API-provided unit price after discount
  discount: number; // API-provided discount percentage
  link: string;
  averageRating: number;
  numberOfRating: number;
  brand: string;
  adjective: string;
}

// Define CartState interface with total fields
export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  totalDiscount: number;
  totalItems: number; // Total number of products in the cart
}

// Define the initial state for the cart
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  totalDiscount: 0,
  totalItems: 0,
};

// Helper to calculate totals
const calculateTotals = (state: CartState, buyerId: string) => {
  const filteredItems = state.items.filter((item) => item.buyerId === buyerId);
  state.totalQuantity = filteredItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  state.totalPrice = filteredItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );
  state.totalDiscount = filteredItems.reduce(
    (acc, item) => acc + (item.price - item.unitPrice) * item.quantity,
    0
  );
  state.totalItems = state.items.filter(
    (item) => item.buyerId === buyerId
  ).length;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, buyerId, quantity, color } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === id && item.buyerId === buyerId && item.color === color
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(action.payload);
      }
      calculateTotals(state, buyerId);
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; buyerId: string }>
    ) => {
      const { id, buyerId } = action.payload;
      state.items = state.items.filter(
        (item) => item.id !== id || item.buyerId !== buyerId
      );
      calculateTotals(state, buyerId);
    },
    incrementQuantity: (
      state,
      action: PayloadAction<{ id: string; buyerId: string }>
    ) => {
      const { id, buyerId } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.buyerId === buyerId
      );
      if (item && item.quantity < item.stockQuantity) item.quantity += 1;
      calculateTotals(state, buyerId);
    },
    decrementQuantity: (
      state,
      action: PayloadAction<{ id: string; buyerId: string }>
    ) => {
      const { id, buyerId } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.buyerId === buyerId
      );
      if (item && item.quantity > 1) item.quantity -= 1;
      calculateTotals(state, buyerId);
    },
    updateBuyerIdAfterLogin: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.items.forEach((item) => {
        if (item.buyerId === "guest") item.buyerId = userId;
      });
      calculateTotals(state, userId);
    },
    clearCartByBuyerId: (state, action: PayloadAction<string>) => {
      const buyerId = action.payload;
      state.items = state.items.filter((item) => item.buyerId !== buyerId);
      calculateTotals(state, buyerId); // Recalculate totals to update state after clearing
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  updateBuyerIdAfterLogin,
  clearCartByBuyerId,
} = cartSlice.actions;
export default cartSlice.reducer;
