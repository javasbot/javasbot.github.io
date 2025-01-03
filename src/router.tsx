import { lazy, Suspense } from "react";
import BE from "@/pages/be";
import LoginPage from "@/pages/user/login";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { Skeleton } from "antd";
import ErrorPage from "@/errorPage";

const BFEPage = lazy(() => import("@/pages/bfe"));
const AIPage = lazy(() => import("@/pages/ai"));
const ArchPage = lazy(() => import("@/pages/arch"));
const UserPage = lazy(() => import("@/pages/user"));
const UserWrite = lazy(() => import("@/pages/user/write"));

const router = createBrowserRouter([
  {
    path: "/user/login",
    element: (
      <Suspense fallback={<Skeleton />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/user/write",
    element: (
      <Suspense fallback={<Skeleton />}>
        <UserWrite />
      </Suspense>
    ),
  },
  {
    path: "/user/home",
    element: (
      <Suspense fallback={<Skeleton />}>
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
          <Suspense fallback={<Skeleton />}>
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
          <Suspense fallback={<Skeleton />}>
            <AIPage />
          </Suspense>
        ),
      },
      {
        path: "/system_architecture",
        element: (
          <Suspense fallback={<div>加载中...</div>}>
            <ArchPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
