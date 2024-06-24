import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notificationApi } from "./notificationApi";
import { RootState } from "../../redux/store";

interface NotificationState {
  notifications: any[];
  isLoading: boolean;
  isClearLoading: boolean;
  clearNotificationError: string | null;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  isLoading: false,
  error: null,
  isClearLoading: false,
  clearNotificationError: null,
};

export const fetchNotificationsThunk = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(notificationApi.endpoints.fetchNotification.initiate({})).unwrap();
      return response;
    } catch (err: any) {
      console.error("Error in fetchNotifications:", err);
      return rejectWithValue(err.response ? err.response.data : { error: "Failed to fetch notifications" });
    }
  }
);

export const clearNotificationThunk = createAsyncThunk(
  "notifications/clearNotification",
  async (notificationId: number, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(notificationApi.endpoints.clearNotification.initiate(notificationId)).unwrap();
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response ? err.response.data : { error: "Failed to clear notification" });
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      notificationApi.endpoints.fetchNotification.matchFulfilled,
      (state, action: any) => {
        state.notifications = action.payload;
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addMatcher(
        notificationApi.endpoints.fetchNotification.matchPending,
        (state) => {
            state.isLoading = true;
            state.error = null;
        }
        );
    builder.addMatcher(
      notificationApi.endpoints.fetchNotification.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      }
    );
    builder.addMatcher(
      notificationApi.endpoints.clearNotification.matchFulfilled,
      (state, action: any) => {
        state.isClearLoading = false;
        state.clearNotificationError = null;
      }
    );
    builder.addMatcher(
      notificationApi.endpoints.clearNotification.matchPending,
      (state) => {
        state.isClearLoading = true;
        state.clearNotificationError = null;
      }
    );
    builder.addMatcher(
      notificationApi.endpoints.clearNotification.matchRejected,
      (state, action) => {
        state.isClearLoading = false;
        state.clearNotificationError = action.error.message ?? null;
      }
    );
  },
});

export const selectNotifications = (state: RootState) => state.notifications;
export const selectIsNotificationsLoading = (state: RootState) => state.notifications.isLoading;
export const selectNotificationError = (state: RootState) => state.notifications.error;
export const selectClearError = (state: RootState) => state.notifications.clearNotificationError;
export const selecrIsClearLoading = (state: RootState) => state.notifications.isClearLoading;

export default notificationSlice.reducer;
