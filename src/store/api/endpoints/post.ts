import { api } from "..";

const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET",
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
  }),
});

export const { useGetAllPostQuery, useGetPostQuery } = postApi;
