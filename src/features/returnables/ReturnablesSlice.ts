import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { returnablesApi } from "./ReturnablesApi";
import { RootState } from "../../redux/store";

interface ReturnablesState {
  returnables: any[];
  isReturnablesLoading: boolean;
  errorReturnables: string | null;
}

const initialState: ReturnablesState = {
  returnables: [],
  isReturnablesLoading: false,
  errorReturnables: null,
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
  },
});

export const selectReturnablesList = (state: RootState) => state.returnables.returnables;
export const selectIsReturnablesLoading = (state: RootState) => state.returnables.isReturnablesLoading;
export const selectReturnablesError = (state: RootState) => state.returnables.errorReturnables;

export default returnablesSlice.reducer;
