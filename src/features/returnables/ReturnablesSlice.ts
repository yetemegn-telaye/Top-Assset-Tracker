import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { returnablesApi } from "./ReturnablesApi";
import { RootState } from "../../redux/store";

interface ReturnablesState {
  returnables: any[];
  isReturnablesLoading: boolean;
  errorReturnables: string | null;
  isItemRetunLoading: boolean;
  itemReturnError: string | null;
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
      console.error("Error in fetchReturnablesListThunk:", err);
      return rejectWithValue(err.response ? err.response.data : { error: "Failed to fetch returnables" });
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
    builder.addCase(fetchReturnablesListThunk.pending, (state) => {
      state.isReturnablesLoading = true;
      state.errorReturnables = null;
    });
    builder.addCase(fetchReturnablesListThunk.fulfilled, (state, action) => {
      state.returnables = action.payload.returnable_items;
      state.isReturnablesLoading = false;
    });
    builder.addCase(fetchReturnablesListThunk.rejected, (state, action) => {
      state.errorReturnables = action.error.message ?? "Failed to fetch returnables";
      state.isReturnablesLoading = false;
    });
    builder.addCase(
      returnItemThunk.fulfilled,
      (state, action) => {
        console.log("Return Item response:", action.payload);
        state.isItemRetunLoading = false;
        state.itemReturnError = null;
      }
    );
    builder.addCase(
      returnItemThunk.pending,
      (state) => {
        state.isItemRetunLoading = true;
        state.itemReturnError = null;
      }
    );
    builder.addCase(
      returnItemThunk.rejected,
      (state, action) => {
        state.isItemRetunLoading = false;
        state.itemReturnError = action.error.message ?? "Failed to return item";
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
