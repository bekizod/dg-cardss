import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import postFeedbackReducer from "./slices/postFeedbackSlice";
import favoriteReducer from "./slices/favoriteSlice";
import cartReducer from "./slices/cartSlice";
import themeReducer from "./slices/themeSlice";
import searchSliceReducer from "./slices/searchSlice";
import parentCategoriesSliceReducer from "./slices/parentCategoriesSlice";
import advertisementReducer from "./slices/bannersSlice";
import coverPictureSliceReducer from "./slices/coverPictureSlice";
import orderReducer from "./slices/orderSlice";
import localeReducer from "./slices/localeSlice";
import favoriteProductsReducer from "./slices/favoriteProductsSlice";
import paymentReducer from "./slices/paymentSlice";
import addressReducer from "./slices/addressSlice";
import localStorageMiddleware from "./localStorageMiddleware";
import { loadCartFromLocalStorage } from "../utils/localStorage";

// Load initial cart state from localStorage
const loadedCartItems = loadCartFromLocalStorage();

// Define the initial state for the cart including totalPrice, totalQuantity, and totalDiscount
const initialCartState = {
  items: loadedCartItems || [],
  totalQuantity:
    loadedCartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0,
  totalPrice:
    loadedCartItems?.reduce(
      (acc, item) =>
        acc + (item.price - (item.price * item.discount) / 100) * item.quantity,
      0
    ) || 0,
  totalDiscount:
    loadedCartItems?.reduce(
      (acc, item) => acc + ((item.price * item.discount) / 100) * item.quantity,
      0
    ) || 0,
  totalItems: loadedCartItems?.length,
};

// Configure the store
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    categories: categoryReducer,
    favorites: favoriteReducer,
    cart: cartReducer,
    postFeedback: postFeedbackReducer,
    advertisement: advertisementReducer,
    coverPictureSlice: coverPictureSliceReducer,
    parentCategoriesSlice: parentCategoriesSliceReducer,
    searchProducts: searchSliceReducer,
    orders: orderReducer,
    favoriteProducts: favoriteProductsReducer,
    payment: paymentReducer,
    address: addressReducer,
    locale: localeReducer,
  },
  preloadedState: {
    cart: initialCartState, // Set initial state for the cart
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware), // Add your middleware
});

// Infer types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
