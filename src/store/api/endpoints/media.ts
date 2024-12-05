import { CreateMediaType } from "types/media.type";
import { api } from "..";

const mediaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMediaByPostId: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}/media`,
        method: "GET",
      }),
      providesTags: ["Media"],
    }),
    createMedia: builder.mutation({
      query: (body: FormData) => ({
        url: `/media`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Media"],
    }),
  }),
});

export const { useGetMediaByPostIdQuery, useCreateMediaMutation } = mediaApi;
