import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { usersApi } from "./UsersApi";

interface UserState {
  users: any[];
  isLoading: boolean;
error: string | null;
isAddUserLoading: boolean;
addUserError: string | null;
}

const initialState: UserState = {
  users: [],
    isLoading: false,
    error: null,
    isAddUserLoading: false,
    addUserError: null,
};

export const fetchUsersThunk = createAsyncThunk(
  "users/fetchUsers",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(usersApi.endpoints.fetchUsers.initiate({})).unwrap();
      return response;
    } catch (err: any) {
      console.error("Error in fetchUsers:", err);
      return rejectWithValue(err.response ? err.response.data : { error: "Failed to fetch users" });
    }
  }
);

export const addUserThunk = createAsyncThunk(
    "users/addUser",
    async (body: any, { dispatch, rejectWithValue }) => {
      try {
        const response = await dispatch(usersApi.endpoints.addUser.initiate(body)).unwrap();
        return response;
      } catch (err: any) {
        console.error("Error in addUser:", err);
        return rejectWithValue(err.response ? err.response.data : { error: "Failed to add user" });
      }
    }
  );

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.fetchUsers.matchFulfilled,
      (state, action: any) => {
        state.users = action.payload;
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addMatcher(
        usersApi.endpoints.fetchUsers.matchPending,
        (state) => {
            state.isLoading = true;
            state.error = null;
        }
        );
    builder.addMatcher(
      usersApi.endpoints.fetchUsers.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      }
    );
    builder.addMatcher(
        usersApi.endpoints.addUser.matchFulfilled,
        (state, action: any) => {
            state.users.push(action.payload);
            state.isAddUserLoading = false;
            state.addUserError = null;
        }
      );
      builder.addMatcher(
        usersApi.endpoints.addUser.matchPending,
        (state) => {
            state.isAddUserLoading = true;
          state.addUserError = null;
        }
      )
      builder.addMatcher(
        usersApi.endpoints.addUser.matchRejected,
        (state, action) => {
            state.isAddUserLoading = false;
          state.error = action.error.message ?? null;
        }
      );
  },
});

export const selectUsers = (state: RootState) => state.users;
export const selectUsersLoading = (state: RootState) => state.users.isLoading;
export const selectUsersError = (state: RootState) => state.users.error;
export const selectAddUserLoading = (state: RootState) => state.users.isAddUserLoading;
export const selectAddUserError = (state: RootState) => state.users.addUserError;

export default usersSlice.reducer;
