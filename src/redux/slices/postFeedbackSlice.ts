import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
export const postFeedback = createAsyncThunk(
  "feedback/postFeedback",
  async (feedback: string, { rejectWithValue }) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        "https://alsaifgallery.onrender.com/api/v1/user/postFeedBack",
        {
          feedBack: feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postFeedbackSlice = createSlice({
  name: "feedbackPost",
  initialState: {
    status: "idle",
    message: "",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postFeedback.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postFeedback.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(postFeedback.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to set  postFeedback";
      });
  },
});

export default postFeedbackSlice.reducer;
