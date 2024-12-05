import baseApi from "../../utils/api";


export const alertsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAlerts: builder.query({
      query: () => ({
        url: "/alerts",
        method: "GET",
      }),
    }),
  }),
});
export const {useFetchAlertsQuery} = alertsApi;

