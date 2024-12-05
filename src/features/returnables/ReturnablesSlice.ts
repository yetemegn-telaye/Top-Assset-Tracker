import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { returnablesApi } from "./ReturnablesApi";
import { RootState } from "../../redux/store";

interface ReturnablesState {
  returnables: any[];
  isReturnablesLoading: boolean;
  errorReturnables: any | null;
  isItemRetunLoading: boolean;
  itemReturnError: any | null;
}

const initialState: ReturnablesState = {
  returnables: [],
  isReturnablesLoading: false,
  errorReturnables: null,
  isItemRetunLoading: false,
  itemReturnError: null,
  
};

export const fetchReturnablesListThunk = createAsyncThunk(
  "returnables/fetchReturnables",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(returnablesApi.endpoints.fetchReturnables.initiate({})).unwrap();
      return response;
    } catch (err: any) {
      console.error("Error in fetchReturnablesListThunk:", err.response);
      return rejectWithValue(err.response ? err.response.satus.code : { error: "Failed to fetch returnables" });
    }
  }
);

export const returnItemThunk = createAsyncThunk(
  "returnables/returnItem",
  async (returnableId: number, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(returnablesApi.endpoints.returnItem.initiate(returnableId)).unwrap();
      return response;
    } catch (err: any) {
      console.error("Error in returnItemThunk:", err);
      return rejectWithValue(err.response ? err.response.data : { error: "Failed to return item" });
    }
  }
);

const returnablesSlice = createSlice({
  name: "returnables",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      returnablesApi.endpoints.fetchReturnables.matchFulfilled,
      (state, action: any) => {
        state.returnables = action.payload.returnable_items;
        state.isReturnablesLoading = false;
      }
    );
    builder.addMatcher(
      returnablesApi.endpoints.fetchReturnables.matchPending,
      (state) => {
        state.isReturnablesLoading = true;
        state.errorReturnables = null;
      }
    );
    builder.addMatcher(
      returnablesApi.endpoints.fetchReturnables.matchRejected,
      (state, action) => {
        state.isReturnablesLoading = false;
        state.errorReturnables = action.payload?.status ?? "Failed to fetch returnables";
        console.log('error in returnables', action.payload?.status)
      }
    );

    builder.addMatcher(
      returnablesApi.endpoints.returnItem.matchFulfilled,
      (state, action: any) => {
        state.isItemRetunLoading = false;
        state.itemReturnError = null;
      }
    );
    
    builder.addMatcher(
      returnablesApi.endpoints.returnItem.matchPending,
      (state)=>{
        state.isItemRetunLoading = true;
        state.itemReturnError = null;
      }
    );
    builder.addMatcher(
      returnablesApi.endpoints.returnItem.matchRejected,
      (state, action) => {
        state.isItemRetunLoading = false;
        state.itemReturnError = action.error ?? "Failed to return item";
      }
    );
  },
});

export const selectReturnablesList = (state: RootState) => state.returnables.returnables;
export const selectIsReturnablesLoading = (state: RootState) => state.returnables.isReturnablesLoading;
export const selectReturnablesError = (state: RootState) => state.returnables.errorReturnables;
export const selectIsItemReturnLoading = (state: RootState) => state.returnables.isItemRetunLoading;
export const selectItemReturnError = (state: RootState) => state.returnables.itemReturnError;

export default returnablesSlice.reducer;
