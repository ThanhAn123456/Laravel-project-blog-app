import { createBrowserRouter } from "react-router-dom";
import AuthRoutes from "router/auth";
import HomeRoutes from "router/home";
import ProfileRoutes from "router/profile";

import CreateRoutes from "./create";

const router = createBrowserRouter([
  ...AuthRoutes,
  ...HomeRoutes,
  ...CreateRoutes,
  ...ProfileRoutes,
]);

export default router;
