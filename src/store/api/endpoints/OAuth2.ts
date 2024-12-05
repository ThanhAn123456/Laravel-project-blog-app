import { api } from "..";
import { SignInType } from "types/auth.type";
import { SignUpType } from "types/auth.type";

const oAuth2EndPoint = api.injectEndpoints({
  endpoints: (builder) => ({
    signInByGitHub: builder.query({
      query: () => ({
        url: "/auth/github/redirect",
        method: "GET",
      }),
    }),
    signInByGoogle: builder.query({
      query: () => ({
        url: "/auth/google/redirect",
        method: "GET",
      }),
    }),
    handleGitHubCallback: builder.query({
      query: (params) => ({
        url: "/auth/github/callback",
        method: "GET",
        params,
      }),
    }),
    handleGoogleCallback: builder.query({
      query: (params) => ({
        url: "/auth/google/callback",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useSignInByGitHubQuery,
  useSignInByGoogleQuery,
  useLazySignInByGitHubQuery,
  useLazySignInByGoogleQuery,
  useLazyHandleGitHubCallbackQuery,
  useLazyHandleGoogleCallbackQuery,
} = oAuth2EndPoint;
