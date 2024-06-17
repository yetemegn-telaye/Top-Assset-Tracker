import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { returnablesApi } from "./ReturnablesApi";
import { RootState } from "../../redux/store";

interface ReturnablesState {
    returnables: any[];
    isLoading: boolean;
    error: string | null;
  }
  
  const initialState: ReturnablesState = {
    returnables: [],
    isLoading: false,
    error: null,
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
        builder.addMatcher(
            returnablesApi.endpoints.fetchReturnables.matchFulfilled,
            (state, action: any) => {
            state.returnables = action.payload.returnable_items;
            }
        );
        builder.addMatcher(
            returnablesApi.endpoints.fetchReturnables.matchPending,
            (state) => {
            state.isLoading = true;
            }
        );
        builder.addMatcher(
            returnablesApi.endpoints.fetchReturnables.matchRejected,
            (state, action) => {
              state.error = action.error.message ?? null;
            }
        );
        },
    });

    export const selectReturnablesList = (state: RootState) => state.returnables;
    export const selectIsReturnablesLoading = (state: RootState) => state.returnables.isLoading;
    export default returnablesSlice.reducer;