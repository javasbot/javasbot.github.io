import { lazy, Suspense } from "react";
import BE from "@/pages/be";
import UserPage from "@/pages/user/index";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ErrorPage from "@/errorPage";

const BFEPage = lazy(() => import("@/pages/bfe"));
const AIPage = lazy(() => import("@/pages/ai"));

const router = createBrowserRouter([
  {
    path: "/user/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UserPage />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/bfe",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BFEPage />
          </Suspense>
        ),
      },
      {
        path: "/be",
        element: <BE />,
      },
      {
        path: "/ai",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AIPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
