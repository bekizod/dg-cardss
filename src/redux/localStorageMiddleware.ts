import { Middleware } from "@reduxjs/toolkit";
import { saveCartToLocalStorage } from "../utils/localStorage";
import { CartState } from "./slices/cartSlice"; // Import the type

const localStorageMiddleware: Middleware<{}, { cart: CartState }> =
  (storeAPI) => (next) => (action) => {
    const result = next(action);

    // Only access localStorage in the browser environment
    if (typeof window !== "undefined") {
      // Check if the action affects the cart slice (starts with 'cart/')
      if (
        typeof action === "object" &&
        action !== null &&
        "type" in action &&
        typeof action.type === "string" &&
        action.type.startsWith("cart/")
      ) {
        const cartItems = storeAPI.getState().cart.items;
        saveCartToLocalStorage(cartItems); // Save updated cart items to localStorage
      }
    }

    return result;
  };

export default localStorageMiddleware;
