import baseApi from "../../utils/api";


export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchNotification: builder.query({
      query: () => ({
        url: "/inboxes",
        method: "GET",
      }),
    }),
    clearNotification: builder.mutation({
      query: (id) => ({
        url: `/inbox/mark-as-read/${id}`,
        method: "PATCH",
      }),
    }),
  }),

});
export const {useFetchNotificationQuery, useClearNotificationMutation} = notificationApi;

