import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface PaymentState {
  isPaymentSelected: boolean;
}

const initialState: PaymentState = {
  isPaymentSelected: false, // initial value is false
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    // Action to set payment selection status
    setPaymentSelected(state, action: PayloadAction<boolean>) {
      state.isPaymentSelected = action.payload;
    },
  },
});

export const { setPaymentSelected } = paymentSlice.actions;
export default paymentSlice.reducer;
