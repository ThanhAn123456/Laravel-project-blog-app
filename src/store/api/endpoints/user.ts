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
      query: (formData) => ({
        url: "user",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["User"], 
    }),
  }),
});

export const { useGetUserQuery, useGetUserByIdQuery, useUpdateUserMutation } = userApi;
