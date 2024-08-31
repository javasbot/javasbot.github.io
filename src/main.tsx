import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ErrorPage from "./errorPage/index.tsx";
import BFE from "./pages/bfe";
import BE from "./pages/be";
import AI from "./pages/ai";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/bfe",
        element: <BFE />,
      },
      {
        path: "/be",
        element: <BE />,
      },
      {
        path: "/ai",
        element: <AI />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
