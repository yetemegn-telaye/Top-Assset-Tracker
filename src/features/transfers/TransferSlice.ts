import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { transferApi } from "./TransferApi";
import { RootState } from '../../redux/store';


interface TransferState {
  transfers: any[];
  transfer: any;
  approvers: any[];
  locations: any[];
}

const initialState: TransferState = {
  transfers: [],
  transfer: {},
  approvers: [],
  locations: []
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

export const createTransferThunk = createAsyncThunk(
  "transfers/createTransfer",
  async (body: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(transferApi.endpoints.createTransfer.initiate(body)).unwrap();
      console.log("Transfer created successfully:", response);
      return response;
    } catch (err: any) {
      console.error("Error in createTransferThunk:", err);
      return rejectWithValue(err.response ? err.response.data : { error: "Failed to create transfer" });
    }
  }
);

export const fetchTransferDetailsThunk = createAsyncThunk(
  "transfers/fetchTransferDetails",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(transferApi.endpoints.fetchTransferDetails.initiate(id)).unwrap();
      console.log("Transfer details fetched successfully:", response);
      return response;
    } catch (err: any) {
      console.error("Error in fetchTransferDetailsThunk:", err);
      return rejectWithValue(err.response ? err.response.data : { error: "Failed to fetch transfer details" });
    }
  }
);

export const updateTransferStatusThunk = createAsyncThunk(
  "transfers/updateTransferStatus",
  async ({ id, body }: { id: string; body: any }, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(transferApi.endpoints.updateTransferStatus.initiate({ id, body })).unwrap();
      console.log("Transfer status updated successfully:", response);
      return response;
    } catch (err: any) {
      console.error("Error in updateTransferStatusThunk:", err);
      return rejectWithValue(err.response ? err.response.data : { error: "Failed to update transfer status" });
    }
  }
);
export const fetchApproversThunk = createAsyncThunk(
  "transfers/fetchApprovers",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(transferApi.endpoints.fetchApprovers.initiate({})).unwrap();
      console.log("Approvers fetched successfully:", response);
      return response;
    } catch (err: any) {
      console.error("Error in fetchApproversThunk:", err);
      return rejectWithValue(err.response ? err.response.data : { error: "Failed to fetch approvers" });
    }
  }
);

export const fetchLocationsThunk = createAsyncThunk(
  "transfers/fetchLocations",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(transferApi.endpoints.fetchLocations.initiate({})).unwrap();
      console.log("Locations fetched successfully:", response);
      return response;
    } catch (err: any) {
      console.error("Error in fetchLocationsThunk:", err);
      return rejectWithValue(err.response ? err.response.data : { error: "Failed to fetch locations" });
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
    builder.addMatcher(
      transferApi.endpoints.createTransfer.matchFulfilled,
      (state, action: any) => {
        alert("Transfer created successfully");
        window.location.href = "/transfers";
      }
    );
    builder.addMatcher(
      transferApi.endpoints.fetchTransferDetails.matchFulfilled,
      (state, action: any) => {
        state.transfer = action.payload.transfer_order;
      }
    );
   builder.addMatcher(
    transferApi.endpoints.updateTransferStatus.matchFulfilled,
    (state, action: any) => {
      alert("Transfer status updated successfully");
      state.transfer.status = action.payload.status;
    }
  );
  builder.addMatcher(
    transferApi.endpoints.fetchApprovers.matchFulfilled,
    (state, action: any) => {
      state.approvers = action.payload;

    }
  );
  builder.addMatcher(
    transferApi.endpoints.fetchLocations.matchFulfilled,
    (state, action: any) => {
      state.locations = action.payload;
    }
  );
  },
});

export const selectTransferList = (state: RootState) => state.transfer.transfers;
export const selectTransferDetail = (state: RootState) => state.transfer.transfer;
export const selectApprovers = (state: RootState) => state.transfer.approvers;
export const selectLocations = (state: RootState) => state.transfer.locations;

export default transferSlice.reducer;
