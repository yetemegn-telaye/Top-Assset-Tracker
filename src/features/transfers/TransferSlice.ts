import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { transferApi } from "./TransferApi";
import { RootState } from '../../redux/store';

interface TransferState {
  transfers: any[];
}

const initialState: TransferState = {
  transfers: [],
};

export const fetchTransfersListThunk = createAsyncThunk(
  "transfers/fetchTransferList",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(transferApi.endpoints.fetchTransferList.initiate({})).unwrap();
      return response;
    } catch (err: any) {
      console.error("Error in fetchTransfersListThunk:", err);
      return rejectWithValue(err.response ? err.response.data : { error: "Failed to fetch transfers" });
    }
  }
);

const transferSlice = createSlice({
  name: "transferList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      transferApi.endpoints.fetchTransferList.matchFulfilled,
      (state, action: any) => {
        state.transfers = action.payload.transfers;
      }
    );
    builder.addMatcher(
      transferApi.endpoints.fetchTransferList.matchRejected,
      (state, action) => {
        console.error("Transfer list failed to fetch:", action.payload);
      }
    );
  },
});

export const selectTransferList = (state: RootState) => state.transfer.transfers;

export default transferSlice.reducer;
