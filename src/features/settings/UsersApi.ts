import baseApi from "../../utils/api";


export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    addUser: builder.mutation({
        query: (body: any) => ({
            url: "users/create",
            method: "POST",
            body,
        }),
        }),
  }),
});
export const {useFetchUsersQuery,useAddUserMutation} = usersApi;

