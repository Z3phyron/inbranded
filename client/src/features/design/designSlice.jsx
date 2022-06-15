import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import designService from "./designService";

const initialState = {
  designs: [],
  design: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new design
export const createDesign = createAsyncThunk(
  "design/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token);
      return await designService.createDesign(data, token);
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

// Get all user design
export const getDesigns = createAsyncThunk(
  "design/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await designService.getDesigns(token);
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
// Get user design
export const getDesign = createAsyncThunk(
  "design/getSingle",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await designService.getDesign(id, token);
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
// Get user design
export const editDesign = createAsyncThunk(
  "design/editDesign",
  async (data , thunkAPI) => {
    try {
      console.log(data);
      const token = thunkAPI.getState().auth.user.token;
      return await designService.editDesign(data , token);
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

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDesign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDesign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.designs.push(action.payload);
      })
      .addCase(createDesign.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDesigns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDesigns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.designs = action.payload;
      })
      .addCase(getDesigns.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDesign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDesign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.design = action.payload;
      })
      .addCase(getDesign.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editDesign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editDesign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.designs = state.designs.filter(
          (design) => design._id === action.payload.id
        )
      })
      .addCase(editDesign.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = designSlice.actions;
export default designSlice.reducer;
