import { api } from "..";

const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMediaByPostId: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}/media`,
        method: "GET",
      }),
      providesTags: ["Media"],
    }),
    createMedia: builder.mutation({
      query: ({ media }) => ({
        url: `/media`,
        method: "POST",
        body: media,
      }),
      invalidatesTags: ["Media"],
    }),
  }),
});

export const { useGetMediaByPostIdQuery, useCreateMediaMutation } = postApi;
