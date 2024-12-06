import { RouteObject } from "react-router-dom";
import { AuthLayout } from "layouts";
import { GoogleCallback, GitHubCallback, SignIn, SignUp } from "pages";
import ResetPassword from "pages/auth/resetPassword/ResetPassword";
import ForgotPassword from "pages/auth/fogotPassword.tsx/ForgotPassword";

const AuthRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "github/callback",
        element: <GitHubCallback />,
      },
      {
        path: "google/callback",
        element: <GoogleCallback />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
];

export default AuthRoutes;
