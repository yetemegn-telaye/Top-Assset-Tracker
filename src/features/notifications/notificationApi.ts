import baseApi from "../../utils/api";


export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchNotification: builder.query({
      query: () => ({
        url: "/inboxes",
        method: "GET",
      }),
    }),
  }),
});
export const {useFetchNotificationQuery} = notificationApi;

