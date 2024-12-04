import { api } from "..";

const likeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLikes: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}/likes`,
        method: "GET",
      }),
      providesTags: ["Like"],
    }),
  }),
});

export const { useGetLikesQuery} = likeApi;
