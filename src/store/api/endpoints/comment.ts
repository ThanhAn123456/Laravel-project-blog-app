import { api } from "..";

const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCommentById: builder.query({
      query: ({ postId, page, page_size }) => ({
        url: `/posts/${postId}/comments?page=${page}&page_size=${page_size}`,
        method: "GET",
      }),
      providesTags: ["Comment"],
    }),
    createComment: builder.mutation({
      query: ({ postId, comment }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentByIdQuery,
  useLazyGetCommentByIdQuery,
  useCreateCommentMutation,
} = commentApi;
