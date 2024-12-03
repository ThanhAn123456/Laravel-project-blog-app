import { api } from "..";

const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (page = 1) => ({
        url: `/user`,
        method: "GET",
        params: {
          page: page,
        },
      }),
      providesTags: ["Post"],
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
  }),
});

export const { useGetUserQuery, useGetUserByIdQuery } = postApi;
