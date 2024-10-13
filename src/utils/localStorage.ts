import { CartItem } from '../redux/slices/cartSlice';

export const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const serializedCart = localStorage.getItem('cartItems');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart) as CartItem[];
  } catch (e) {
    console.error("Could not load cart items from local storage", e);
    return [];
  }
};

export const saveCartToLocalStorage = (cartItems: CartItem[]): void => {
  try {
    const serializedCart = JSON.stringify(cartItems);
    localStorage.setItem('cartItems', serializedCart);
  } catch (e) {
    console.error("Could not save cart items to local storage", e);
  }
};
