import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dashboardApi } from "./DashboardApi";

interface DashboardState {
    status: string;
    count: string;
}

const initialState: DashboardState = {
    status: "",
    count: "",
};

export const fetchDashboardStatsThunk = createAsyncThunk(
    "dashboard/fetchDashboardStats",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await dispatch(dashboardApi.endpoints.fetchDashboardStats.initiate(_));
            console.log(response);
            return response.data;
        } catch (err: any) {
            console.error("Error in fetchDashboardStats:", err);

            return rejectWithValue(err.response.data);
        }
    }
);

const dashboardSlice = createSlice({
  name: "dashbooardStats",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      dashboardApi.endpoints.fetchDashboardStats.matchFulfilled,
   
      (state:any, action: any) => {
        console.log("Dashboard stats fetched", action.payload);
        state.status = action.payload.status;
        state.count = action.payload.count;
      }

    );
    builder.addMatcher(
       dashboardApi.endpoints.fetchDashboardStats.matchRejected,
        (state:any, action: any) => {
          console.log("Dashboard stats failed to fetch:", action.payload);
          
        }
    )
    
},
  
});

export const selectDashboardStats = (state: { dashboard: { status: string; count: string; }; }) => state.dashboard;

export default dashboardSlice.reducer;
