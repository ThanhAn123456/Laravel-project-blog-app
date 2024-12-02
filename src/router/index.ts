import { createBrowserRouter } from "react-router-dom";
import AuthRoutes from "router/auth";
import HomeRoutes from "router/home";
import ProfileRoutes from "router/profile";

const router = createBrowserRouter([...AuthRoutes, ...HomeRoutes, ...ProfileRoutes]);

export default router;
