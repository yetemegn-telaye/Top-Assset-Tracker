import baseApi from "../../utils/api";


export const transferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchTransferList: builder.query({
      query: () => ({
        url: "/transfer-orders",
        method: "GET",
      }),
    }),
  }),
});
export const {useFetchTransferListQuery} = transferApi;

