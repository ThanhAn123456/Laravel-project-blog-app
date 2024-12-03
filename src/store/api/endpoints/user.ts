import { api } from "..";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => ({
        url: `/${userId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    })
  }),
});

export const { useGetUserQuery } = userApi;
