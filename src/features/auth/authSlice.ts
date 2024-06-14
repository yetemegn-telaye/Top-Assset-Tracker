import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "./AuthApi";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  role: string;
  location_id: string;
}

export interface AuthState {
  message: string;
  user: User;
  token: string;
}

const initialState: AuthState = {
  message: "",
  user: {
    id: 0,
    name: "",
    email: "",
    email_verified_at: "",
    created_at: "",
    updated_at: "",
    role: "",
    location_id: ""
  },
  token: ""
};

export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await dispatch(authApi.endpoints.loginUser.initiate(credentials)).unwrap();
      return response;
    } catch (err: any) {
      console.error("Error in loginUser:", err);
      return rejectWithValue(err.response ? err.response.data : { error: "Failed to login" });
    }
  }
);

export const logOutUser = createAsyncThunk(
  "auth/logoutUser",
  async (
    _,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await dispatch(authApi.endpoints.logoutUser.initiate({})).unwrap();
      return response;
    } catch (err: any) {
      console.error("Error in logoutUser:", err);
      return rejectWithValue(err.response ? err.response.data : { error: "Failed to logout" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.message = "";
      state.user = {
        id: 0,
        name: "",
        email: "",
        email_verified_at: "",
        created_at: "",
        updated_at: "",
        role: "",
        location_id: ""
      };
      state.token = "";
      storage.removeItem('persist:root');  // Clear persisted state
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, action: any) => {
        console.log("loginUser fulfilled payload:", action.payload);
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    );
    builder.addMatcher(
      authApi.endpoints.logoutUser.matchFulfilled,
      (state) => {
        state.message = "";
        state.user = {
          id: 0,
          name: "",
          email: "",
          email_verified_at: "",
          created_at: "",
          updated_at: "",
          role: "",
          location_id: ""
        };
        state.token = "";
        storage.removeItem('persist:root');  // Clear persisted state
      }
    );
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const selectAuthState = (state: any) => state.auth;
export const selectIsAuthenticated = (state: any) => state.auth.token !== "";
export const selectUser = (state: any) => state.auth.user;

export const { resetAuthState } = authSlice.actions;

export default persistedAuthReducer;
