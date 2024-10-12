"use client"
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import favoriteReducer from './slices/favoriteSlice';
export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    favorites: favoriteReducer,
  },
});

// Infer types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
