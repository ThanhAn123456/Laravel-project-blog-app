import { createBrowserRouter } from "react-router-dom";
import AuthRoutes from "router/auth";
import HomeRoutes from "router/home";
import CreateRoutes from "./create";

const router = createBrowserRouter([
  ...AuthRoutes,
  ...HomeRoutes,
  ...CreateRoutes,
]);

export default router;
