import { MainLayout } from "layouts";
import { Profile } from "pages";
import EditProfile from "pages/profile/components/EditProfile";
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
      {
        path: "edit",
        element: <EditProfile />,
      },
    ],
  },
];

export default ProfileRoutes;
