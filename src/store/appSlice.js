import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoged: false,
  user: "",
  token: "",
  refresh_token: "",
  loading: false,
  error: false,
  isRefresh: false
};

export const loginAction = createAsyncThunk("login", async (payload) => {
  const res = await axios.post("http://localhost:5000/api/login", payload);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${res.data.accessToken}`;
  localStorage.setItem("auth", JSON.stringify(res.data));
  return res.data;
});

export const refreshAction = createAsyncThunk("refresh", async (payload) => {
  const res = await axios.post("http://localhost:5000/api/refresh", payload);
});

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    isLogedAction: (state, action) => {
      state.isLoged = action.payload;
    },
    tokenAction: (state, action) => {
      state.token = action.payload;
    },
    refreshTokenAction: (state, action) => {
      state.refresh_token = action.payload;
    },
    isRefreshAction: (state, action) => {
      state.isRefresh = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoged = true;
      state.token = action.payload.access;
      state.token = action.payload.refresh;
      state.error = false
    });
    builder.addCase(loginAction.rejected, (state)=> {
      state.error = true;
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { isLogedAction, tokenAction, refreshTokenAction } =
  appSlice.actions;

export default appSlice.reducer;
