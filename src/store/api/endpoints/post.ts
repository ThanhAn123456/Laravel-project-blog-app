import { api } from "..";
import { CreatePostType } from "types/post.type";

const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: (page: number) => ({
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
    createPost: builder.mutation({
      query: (body: CreatePostType) => ({
        url: `/posts`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useLazyGetAllPostQuery,
} = postApi;
