import { MainLayout } from "layouts";
import { Profile } from "pages";
import { ErrorBoundary } from "react-error-boundary";
import { RouteObject } from "react-router-dom";

const ProfileRoutes: RouteObject[] = [
  {
    path: "/profile",
    element: <MainLayout />,
    errorElement: <ErrorBoundary fallback={<div>Something went wrong</div>} />,
    children: [
      {
        path: "",
        element: <Profile />,
      },
      {
        path: ":userId",
        element: <Profile />,
      },
    ],
  },
];

export default ProfileRoutes;
