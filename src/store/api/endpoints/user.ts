import { api } from "..";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `user/${userId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (body : FormData) => ({
        url: "user/?_method=PUT",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], 
    }),
  }),
});

export const { useGetUserQuery, useGetUserByIdQuery, useUpdateUserMutation } = userApi;
