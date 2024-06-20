import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { alertsApi } from "./AlertsApi";

interface AlertState {
  alerts: any[];
  isLoading: boolean;
  error: string|null;
}

const initialState: AlertState = {
  alerts: [],
  isLoading: false,
  error: null,
};

export const fetchAlertsThunk = createAsyncThunk(
  "alerts/fetchAlerts",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(alertsApi.endpoints.fetchAlerts.initiate({})).unwrap();
      return response;
    } catch (err: any) {
      console.error("Error in fetchAlerts:", err);
      return rejectWithValue(err.response ? err.response.data : { error: "Failed to fetch alerts" });
    }
  }
);

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      alertsApi.endpoints.fetchAlerts.matchFulfilled,
      (state, action: any) => {
        state.alerts = action.payload;
        state.isLoading = false;
        state.error = null;
    
      }
    );
    builder.addMatcher(
        alertsApi.endpoints.fetchAlerts.matchPending,
        (state) => {
            state.isLoading = true;
            state.error = null;
        }
        );
    builder.addMatcher(
      alertsApi.endpoints.fetchAlerts.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      }
    );
  },
});

export const selectAlerts = (state: RootState) => state.alerts.alerts;
export const selectAlertsLoading = (state: RootState) => state.alerts.isLoading;
export const selectAlertsError = (state: RootState) => state.alerts.error;

export default alertsSlice.reducer;
