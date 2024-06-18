import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "./AuthApi";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

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
  isLoginLoading?: boolean;
  isLogoutLoading?: boolean;
  loginError?: string;
  logoutError?: string;
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
    location_id: "",
  },
  token: "",
  isLoginLoading: false,
  isLogoutLoading: false,
  loginError: "",
  logoutError: "",
};

export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await dispatch(authApi.endpoints.loginUser.initiate(credentials));
      return response.data;
    } catch (err: any) {
      alert("Error in loginUser:");
      return rejectWithValue(err.response.data);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "auth/logoutUser",
  async (
    token: string,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response: any = await dispatch(authApi.endpoints.logoutUser.initiate(token));
      window.localStorage.removeItem('token');
      return response.data;
    } catch (err: any) {
      console.error("Error in logoutUser:", err);
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.message = "";
      state.user = {
        id: 0,
        name: "",
        email: "",
        email_verified_at: "",
        created_at: "",
        updated_at: "",
        role: "",
        location_id: "",
      };
      state.token = "";
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, action: any) => {
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.token = action.payload.token;
        window.localStorage.setItem("token", action.payload.token);
      }
    );
    builder.addMatcher(
      authApi.endpoints.loginUser.matchPending,
      (state) => {
        state.isLoginLoading = true;
        state.loginError = "";
      }
    );
    builder.addMatcher(
      authApi.endpoints.loginUser.matchRejected,
      (state, action: any) => {
        state.isLoginLoading = false;
        state.loginError = action.error.message ?? "";
      }
    );
    builder.addMatcher(
      authApi.endpoints.logoutUser.matchFulfilled,
      (state, action: any) => {
        console.log("logoutUser fulfilled payload:", action.payload);
        state.message = "";
        state.user = {
          id: 0,
          name: "",
          email: "",
          email_verified_at: "",
          created_at: "",
          updated_at: "",
          role: "",
          location_id: "",
        };
        state.token = "";
      }
    );
    builder.addMatcher(
      authApi.endpoints.logoutUser.matchPending,
      (state) => {
        state.isLogoutLoading = true;
        state.logoutError = "";
      }
    );
    builder.addMatcher(
      authApi.endpoints.logoutUser.matchRejected,
      (state, action: any) => {
        state.isLogoutLoading = false;
        state.logoutError = action.error.message ?? "";
      }
    );
  },
});

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { clearAuthState } = authSlice.actions;

export const selectAuthState = (state: any) => state.auth;
export const selectIsAuthenticated = (state: any) =>
  state.auth.token !== "" || window.localStorage.getItem("token") !== null;
export const selectUser = (state: any) => state.auth.user;
export const selectIsLoginLoading = (state: any) => state.auth.isLoginLoading;
export const selectLoginError = (state: any) => state.auth.loginError;
export const selectIsLogoutLoading = (state: any) => state.auth.isLogoutLoading;
export const  selectLogoutError = (state: any) => state.auth.logoutError;

export default persistedAuthReducer;
