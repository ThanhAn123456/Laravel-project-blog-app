import { MainLayout } from "layouts";
import { Create } from "pages";
import { ErrorBoundary } from "react-error-boundary";
import { RouteObject } from "react-router-dom";

const CreateRoutes: RouteObject[] = [
  {
    path: "/create",
    element: <MainLayout />,
    errorElement: <ErrorBoundary fallback={<div>Something went wrong</div>} />,
    children: [
      {
        path: "",
        element: <Create />,
      },
    ],
  },
];

export default CreateRoutes;
