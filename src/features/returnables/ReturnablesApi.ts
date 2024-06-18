import baseApi from "../../utils/api";


export const returnablesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchReturnables: builder.query({
      query: () => ({
        url: "/returnable-items",
        method: "GET",
      }),
    }),
    returnItem: builder.mutation<any, number>({
      query: (returnableId) => ({
        url: `return-item/${returnableId}`,
        method: 'POST',
      }),
    }),
  }),
});
export const {useFetchReturnablesQuery,useReturnItemMutation} = returnablesApi;

