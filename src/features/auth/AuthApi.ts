import baseApi from "../../utils/api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials:any) => ({
        url: "auth/login",
        method: "POST",
        body: credentials
      }),
    }),
    logoutUser: builder.mutation({
        query: () => ({
            url: "auth/logout",
            method: "POST",
        }),
        }),
  }),
});

export const {useLoginUserMutation, useLogoutUserMutation} = authApi;