import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";


// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  email: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (user, thunkAPI) => {
    try {
      return await authService.signUp(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const Sign_In = createAsyncThunk(
  "auth/signIn",
  async (user, thunkAPI) => {
    try {
      return await authService.signIn(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const SignOut = createAsyncThunk("auth/logout", async () => {
  await authService.SignOut();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    //signUp Builder
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      //signIn Builder
      .addCase(Sign_In.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Sign_In.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(Sign_In.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(SignOut.fulfilled, (state) => {
        state.user = null;
      })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
