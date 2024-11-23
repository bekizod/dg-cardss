// src/redux/addressSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddressState {
  selectedAddress: string | null; // Store the selected address
}

const initialState: AddressState = {
  selectedAddress: null, // Initially, no address is selected
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    // Action to set the selected address
    setSelectedAddress(state, action: PayloadAction<string>) {
      state.selectedAddress = action.payload;
    },
    // Action to clear the selected address (optional)
    clearSelectedAddress(state) {
      state.selectedAddress = null;
    },
  },
});

export const { setSelectedAddress, clearSelectedAddress } =
  addressSlice.actions;
export default addressSlice.reducer;
