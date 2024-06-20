import baseApi from "../../utils/api";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials:{email:string, password:string}) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
        query: () => ({
            url: "/logout",
            method: "POST",
        }),
        }),
  }),
});

export const {useLoginUserMutation, useLogoutUserMutation} = authApi;