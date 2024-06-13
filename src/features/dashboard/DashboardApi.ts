import baseApi from "../../utils/api";


export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchDashboardStats: builder.query({
      query: () => ({
        url: "/dashboard/stats",
        method: "GET",
      }),
    }),
  }),
});
export const {useFetchDashboardStatsQuery} = dashboardApi;

