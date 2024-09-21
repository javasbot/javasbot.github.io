import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ErrorPage from "./errorPage/index.tsx";
import { lazy, Suspense } from "react";
import BE from "./pages/be";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const BFEPage = lazy(() => import("./pages/bfe"));
const AIPage = lazy(() => import("./pages/ai"));

const router = createBrowserRouter([
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
