import { api } from "..";

const likeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLikeByPostId: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}/likes`,
        method: "GET",
      }),
      providesTags: ["Like"],
    }),
    getIsLikedByPostId: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}/isLiked`,
        method: "GET",
      }),
      providesTags: ["Like"],
    }),
    createLike: builder.mutation({
      query: ({ postId }) => ({
        url: `/posts/${postId}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Like"],
    }),
    deleteLike: builder.mutation({
      query: ({ postId }) => ({
        url: `/posts/${postId}/unlike`,
        method: "DELETE",
      }),
      invalidatesTags: ["Like"],
    }),
  }),
});

export const {
  useGetLikeByPostIdQuery,
  useGetIsLikedByPostIdQuery,
  useCreateLikeMutation,
  useDeleteLikeMutation,
} = likeApi;
