import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { transferApi } from "./TransferApi";
import { RootState } from '../../redux/store';


interface TransferState {
  transfers: any[];
  transfer: any;
  approvers: any[];
  locations: any[];
  isTransfersLoading: boolean;
  error: string | null;
  isApproverLoading: boolean;
  isLocationLoading: boolean;
  approversError: string | null;
  locationsError: string | null;
  isCreateTransferLoading: boolean;
  createTransferError: string | null;
  
}

const initialState: TransferState = {
  transfers: [],
  transfer: {},
  approvers: [],
  locations: [],
  isTransfersLoading: false,
  error: null,
  isApproverLoading: false,
  isLocationLoading: false,
  approversError: null,
  locationsError: null,
  isCreateTransferLoading: false,
  createTransferError: null,
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
      return response;
    } catch (err: any) {
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
        state.isTransfersLoading = false;
        state.transfers = action.payload.transfers;
      }
    );
    builder.addMatcher(
      transferApi.endpoints.fetchTransferList.matchPending,
      (state) => {
        state.isTransfersLoading = true;

        state.error = null;
      }
    );
    builder.addMatcher(
      transferApi.endpoints.fetchTransferList.matchRejected,
      (state, action) => {
        state.isTransfersLoading = false;
        state.error = action.error.message ?? null;
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
      transferApi.endpoints.createTransfer.matchPending,
      (state) => {
        state.isCreateTransferLoading = true;
        state.createTransferError = null;
      }
    );
    builder.addMatcher(
      transferApi.endpoints.createTransfer.matchRejected,
      (state, action: any) => {
        state.isCreateTransferLoading = false;
        state.createTransferError = action.error.message ?? null;
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
      state.isApproverLoading = false;
      state.approversError = null;
    }
  );
  builder.addMatcher(
    transferApi.endpoints.fetchApprovers.matchPending,
    (state) => {
      state.isApproverLoading = true;
      state.approversError = null;
    }
  );
  builder.addMatcher(
    transferApi.endpoints.fetchApprovers.matchRejected,
    (state, action: any) => {
      state.isApproverLoading = false;
      state.approversError = action.error.message ?? null;
    }
  );
  builder.addMatcher(
    transferApi.endpoints.fetchLocations.matchFulfilled,
    (state, action: any) => {
      state.locations = action.payload;
      state.isLocationLoading = false;
      state.locationsError = null;
    }
  );
  builder.addMatcher(
    transferApi.endpoints.fetchLocations.matchPending,
    (state) => {
      state.isLocationLoading = true;
      state.locationsError = null;
    }
  );
  builder.addMatcher
    (transferApi.endpoints.fetchLocations.matchRejected,
    (state, action: any) => {
      state.isLocationLoading = false;
      state.locationsError = action.error.message ?? null;
    }
  );
  }
});

export const selectTransferList = (state: RootState) => state.transfer.transfers;
export const selectTransferDetail = (state: RootState) => state.transfer.transfer;
export const selectApprovers = (state: RootState) => state.transfer.approvers;
export const selectLocations = (state: RootState) => state.transfer.locations;
export const selectIsTransfersLoading = (state: RootState) => state.transfer.isTransfersLoading;
export const selectTransfersError = (state: RootState) => state.transfer.error;
export const selectIsApproverLoading = (state: RootState) => state.transfer.isApproverLoading;
export const selectApproversError = (state: RootState) => state.transfer.approversError;
export const selectIsLocationLoading = (state: RootState) => state.transfer.isLocationLoading;
export const selectLocationsError = (state: RootState) => state.transfer.locationsError;
export const selectIsCreateTransferLoading = (state: RootState) => state.transfer.isCreateTransferLoading;
export const selectCreateTransferError = (state: RootState) => state.transfer.createTransferError;

export default transferSlice.reducer;
