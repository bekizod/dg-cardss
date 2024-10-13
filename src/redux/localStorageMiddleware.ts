import { Middleware } from '@reduxjs/toolkit';
import { saveCartToLocalStorage } from '../utils/localStorage';
import { CartState } from './slices/cartSlice'; // Import the type

// Define middleware with generic types
const localStorageMiddleware: Middleware<{}, { cart: CartState }> = storeAPI => next => action => {
  const result = next(action);
  
  // Check if the action affects the cart slice (starts with 'cart/')
  if (typeof action === 'object' && action !== null && 'type' in action && typeof action.type === 'string' && action.type.startsWith('cart/')) {
    const cartItems = storeAPI.getState().cart.items;
    saveCartToLocalStorage(cartItems); // Save updated cart items to localStorage
  }
  
  return result;
};

export default localStorageMiddleware;
