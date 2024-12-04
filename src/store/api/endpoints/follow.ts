import { api } from "..";

const followApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFollowers: builder.query({
      query: (userId) => ({
        url: `followers/${userId}`,
        method: "GET",
      }),
      providesTags: ["Follow"],
    }),
    getFollowing: builder.query({
        query: (userId) => ({
          url: `following/${userId}`,
          method: "GET",
        }),
        providesTags: ["Follow"],
    }),
    getFollowersCount: builder.query({
        query: (userId) => ({
          url: `followersCount/${userId}`,
          method: "GET",
        }),
        providesTags: ["Follow"],
    }),
    getFollowingCount: builder.query({
        query: (userId) => ({
        url: `followingCount/${userId}`,
        method: "GET",
        }),
        providesTags: ["Follow"],
    }),
  }),
});

export const { useGetFollowersQuery, useGetFollowingQuery, useGetFollowersCountQuery, useGetFollowingCountQuery } = followApi;
