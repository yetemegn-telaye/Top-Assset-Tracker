import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { transferApi } from "./TransferApi";
import TransferList from "./TransferList";
import { RootState } from '../../redux/store';



// interface TransferState {
//     id: string,
//     item_name: string,
//     qty: string,
//     unit_measurement: string,
//     origin: string,
//     destination: string,
//     issuer: string,
//     status: string,
//     issued_date: string
// }

const initialState = {
    transfers: [],

};

export const fetchTransfersListThunk = createAsyncThunk(
    "transfers/fetchTransferList",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await dispatch(transferApi.endpoints.fetchTransferList.initiate(_));
            return response.data;
        } catch (err: any) {
            console.error("Error in fetchTransfersListThunk:", err);

            return rejectWithValue(err.response.data);
        }
    }
);

const transferSlice = createSlice({
  name: "transferList",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addMatcher(
        transferApi.endpoints.fetchTransferList.matchFulfilled,
   
      (state:any, action: any) => {
       
        state.transfers = action.payload.transfers;
       
      }

    );
    builder.addMatcher(
       transferApi.endpoints.fetchTransferList.matchRejected,
        (state:any, action: any) => {
          console.log("Transfer list failed to fetch:", action.payload);
          
        }
    )
    
},
  
});

export const selectTransferList = (state: RootState) => state.transfer;

export default transferSlice.reducer;
