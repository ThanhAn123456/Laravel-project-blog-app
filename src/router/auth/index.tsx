import { RouteObject } from "react-router-dom";
import { AuthLayout } from "layouts";
import { SignIn, SignUp } from "pages";

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
    ],
  },
];

export default AuthRoutes;
