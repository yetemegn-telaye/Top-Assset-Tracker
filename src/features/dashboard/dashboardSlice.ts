import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dashboardApi } from "./DashboardApi";
import { RootState } from "../../redux/store";

interface DashboardState {
  recent_transfers: any[];
  summary: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  recent_transfers: [],
  summary: [],
  isLoading: false,
  error: null
};

export const fetchDashboardStatsThunk = createAsyncThunk(
  "dashboard/fetchDashboardStats",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(dashboardApi.endpoints.fetchDashboardStats.initiate({})).unwrap();
      return response;
    } catch (err: any) {
      console.error("Error in fetchDashboardStats:", err);
      return rejectWithValue(err.response ? err.response.data : { error: "Failed to fetch" });
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      dashboardApi.endpoints.fetchDashboardStats.matchFulfilled,
      (state, action) => {
        console.log("Dashboard stats fetched", action.payload);
        state.recent_transfers = action.payload.recent_transfers;
        state.summary = action.payload.summary;
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addMatcher(
      dashboardApi.endpoints.fetchDashboardStats.matchPending,
      (state) => {
        state.isLoading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      dashboardApi.endpoints.fetchDashboardStats.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      }
    );
  },
});

export const selectDashboardStats = (state: RootState) => state.dashboard;
export const selectIsLoading = (state: RootState) => state.dashboard.isLoading;

export default dashboardSlice.reducer;
