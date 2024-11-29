import { MainLayout } from "layouts";
import { Home } from "pages";
import { ErrorBoundary } from "react-error-boundary";
import { RouteObject } from "react-router-dom";

const HomeRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary fallback={<div>Something went wrong</div>} />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
];

export default HomeRoutes;
