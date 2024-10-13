import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define CartItem interface
export interface CartItem {
  id: string;
  buyerId: string;
  image: string;
  name: string;
  color: string;
  quantity: number;
  stockQuantity: number;
  price: number;
  discount: number; // Discount as a percentage
}

// Define CartState interface with total fields
export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  totalDiscount: number; // New field to store total discount
}

// Define the initial state for the cart
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  totalDiscount: 0, // Initialize totalDiscount
};

const calculateTotals = (state: CartState) => {
  state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
  state.totalPrice = state.items.reduce(
    (acc, item) => acc + (item.price - (item.price * item.discount) / 100) * item.quantity,
    0
  );
  state.totalDiscount = state.items.reduce(
    (acc, item) => acc + (item.price * item.discount) / 100 * item.quantity,
    0
  );
};

// Create the slice for cart
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, buyerId, quantity , color } = action.payload;

      // Check if the same product (by id) and buyerId already exists in the cart
      const existingItem = state.items.find(
        item => item.id === id && item.buyerId === buyerId && item.color === color
      );

      if (existingItem) {
        // Increment the quantity if the product for this buyer already exists
        existingItem.quantity += quantity;
      } else {
        // Add the new product with buyerId to the cart
        state.items.push({ ...action.payload, quantity });
      }

      // Recalculate totals after adding item
      calculateTotals(state);
    },
    removeFromCart: (state, action: PayloadAction<{ id: string; buyerId: string }>) => {
      const { id, buyerId } = action.payload;

      // Remove the product based on both id and buyerId
      state.items = state.items.filter(
        item => item.id !== id || item.buyerId !== buyerId
      );

      // Recalculate totals after removing item
      calculateTotals(state);
    },
    incrementQuantity: (state, action: PayloadAction<{ id: string; buyerId: string }>) => {
      const { id, buyerId } = action.payload;

      const item = state.items.find(
        item => item.id === id && item.buyerId === buyerId
      );

      if (item && item.quantity < item.stockQuantity) {
        item.quantity += 1;
      }

      // Recalculate totals after incrementing quantity
      calculateTotals(state);
    },
    decrementQuantity: (state, action: PayloadAction<{ id: string; buyerId: string }>) => {
      const { id, buyerId } = action.payload;

      const item = state.items.find(
        item => item.id === id && item.buyerId === buyerId
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      // Recalculate totals after decrementing quantity
      calculateTotals(state);
    },
  },
});

// Export the actions and the reducer
export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
