import { api } from "..";
import { SignInType } from "types/auth.type";
import { SignUpType } from "types/auth.type";

const authEndPoint = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (body: SignInType) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    signUp: builder.mutation({
      query: (body: SignUpType) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authEndPoint;
