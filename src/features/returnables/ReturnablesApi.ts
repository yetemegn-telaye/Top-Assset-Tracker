import baseApi from "../../utils/api";


export const returnablesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchReturnables: builder.query({
      query: () => ({
        url: "/returnable-items",
        method: "GET",
      }),
    }),
  }),
});
export const {useFetchReturnablesQuery} = returnablesApi;

