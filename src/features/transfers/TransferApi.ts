import baseApi from "../../utils/api";


export const transferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchTransferList: builder.query({
      query: () => ({
        url: "/transfer-orders",
        method: "GET",
      }),
    }),

    createTransfer: builder.mutation({
      query: (body) => ({
        url: "/transfer-order/create",
        method: "POST",
        body,
      }),
    }),
    fetchTransferDetails: builder.query({
      query: (id: string) => ({
        url: `/transfer-order/${id}`,
        method: "GET",
      }),
    }),
    updateTransferStatus: builder.mutation({
      query: ({ id, body }: { id: string; body: any }) => ({
        url: `/transfer-order/${id}`,
        method: "POST",
        body,
      }),
    }),
    fetchApprovers: builder.query({
      query: () => ({
        url: "/approvers",
        method: "GET",
      }),
    }),
    fetchLocations: builder.query({
      query: () => ({
        url: "/locations",
        method: "GET",
      }),
    }),
    
  }),

});
export const {useFetchTransferListQuery, useCreateTransferMutation} = transferApi;

