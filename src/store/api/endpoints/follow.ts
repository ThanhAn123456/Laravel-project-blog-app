import { api } from "..";

const followApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFollowers: builder.query({
      query: (userId) => ({
        url: `${userId}/followers`,
        method: "GET",
      }),
      providesTags: ["Follow"],
    }),
    getFollowing: builder.query({
        query: (userId) => ({
          url: `${userId}/following`,
          method: "GET",
        }),
        providesTags: ["Follow"],
    }),
    getFollowersCount: builder.query({
        query: () => ({
        //   url: `${userId}/followersCount`,
          url: `/followersCount`,
          method: "GET",
        }),
        providesTags: ["Follow"],
    }),
    getFollowingCount: builder.query({
        query: (userId) => ({
        url: `${userId}/followingCount`,
        method: "GET",
        }),
        providesTags: ["Follow"],
    }),
  }),
});

export const { useGetFollowersQuery, useGetFollowingQuery, useGetFollowersCountQuery, useGetFollowingCountQuery } = followApi;
