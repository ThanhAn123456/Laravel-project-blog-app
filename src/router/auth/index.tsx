import { RouteObject } from "react-router-dom";
import { AuthLayout } from "layouts";
import { GoogleCallback, GitHubCallback, SignIn, SignUp } from "pages";

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
    ],
  },
];

export default AuthRoutes;
