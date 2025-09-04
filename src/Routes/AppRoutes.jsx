import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ProtectedAuthRoutes from "./ProtectedAuthRoutes";
import ProtectedRoute from "./ProtectedRoute";

// Lazy imports
const Login = lazy(() => import("../Pages/Auth/Login/Login"));
const Register = lazy(() => import("../Pages/Auth/Register/Register"));
const Posts = lazy(() => import("../Pages/Posts/Posts"));
const PostDetails = lazy(() => import("../Pages/PostDetails/PostDetails"));
const Profile = lazy(() => import("../Pages/Auth/Profile/Profile"));
const NotFound = lazy(() => import("../Pages/NotFound/NotFound"));

// Helper to wrap with Suspense
const Loadable = (Component) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProtectedRoute>{Loadable(Posts)}</ProtectedRoute>,
      },
      {
        path: "posts/:id",
        element: Loadable(PostDetails),
      },
      {
        path: "profile",
        element: <ProtectedRoute>{Loadable(Profile)}</ProtectedRoute>,
      },
      {
        path: "login",
        element: <ProtectedAuthRoutes>{Loadable(Login)}</ProtectedAuthRoutes>,
      },
      {
        path: "register",
        element: (
          <ProtectedAuthRoutes>{Loadable(Register)}</ProtectedAuthRoutes>
        ),
      },
      {
        path: "*",
        element: Loadable(NotFound),
      },
    ],
  },
]);
