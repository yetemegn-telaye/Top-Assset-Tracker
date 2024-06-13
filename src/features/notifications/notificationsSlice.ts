import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notificationApi } from "./notificationApi";
import { RootState } from "../../redux/store";

interface NotificationState {
  notifications: any[];
}

const initialState: NotificationState = {
  notifications: [],
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

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      notificationApi.endpoints.fetchNotification.matchFulfilled,
      (state, action: any) => {
        state.notifications = action.payload;
        console.log("Notifications fetched", action.payload);
      }
    );
    builder.addMatcher(
      notificationApi.endpoints.fetchNotification.matchRejected,
      (state, action) => {
        console.error("Failed to fetch notifications", action.payload);
      }
    );
  },
});

export const selectNotifications = (state: RootState) => state.notifications;

export default notificationSlice.reducer;
