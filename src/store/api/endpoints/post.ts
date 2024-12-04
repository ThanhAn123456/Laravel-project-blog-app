import { api } from "..";

const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: (page = 1) => ({
        url: `/posts`,
        method: "GET",
        params: {
          page: page,
        },
      }),
      providesTags: ["Post"],
    }),
    getPost: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getPostByUserId: builder.query({
      query: (userId) => ({
        url: `/posts/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getPostCountByUserId: builder.query({
      query: (userId) => ({
        url: `/posts/user/${userId}/count`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
  }),
});

export const { useGetAllPostQuery, useGetPostQuery, useGetPostByUserIdQuery, useGetPostCountByUserIdQuery } = postApi;
