import { CartItem } from "../redux/slices/cartSlice";

export const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    // Check if running in the browser
    try {
      const serializedCart = localStorage.getItem("cartItems");
      if (serializedCart === null) {
        return [];
      }
      return JSON.parse(serializedCart) as CartItem[];
    } catch (e) {
      console.error("Could not load cart items from local storage", e);
      return [];
    }
  }
  return []; // Return an empty array if not in the browser
};

export const saveCartToLocalStorage = (cartItems: CartItem[]): void => {
  if (typeof window !== "undefined") {
    // Check if running in the browser
    try {
      const serializedCart = JSON.stringify(cartItems);
      localStorage.setItem("cartItems", serializedCart);
    } catch (e) {
      console.error("Could not save cart items to local storage", e);
    }
  }
};
