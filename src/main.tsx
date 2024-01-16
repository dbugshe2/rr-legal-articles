import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "constants/routes";
import { CreateArticlePage, ResultsPage } from "app/pages";

import "index.css";
import { AppErrorBoundary, RouteErrorElement, Toaster } from "ui/components";

const router = createBrowserRouter([
  {
    path: routes.results.path,
    element: <ResultsPage />,
    errorElement: <RouteErrorElement />,
  },
  {
    path: routes.createArticle.path,
    element: <CreateArticlePage />,
    errorElement: <RouteErrorElement />,
  },
  {
    path: "*",
    element: <RouteErrorElement />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <div>
        <div className="container mx-auto px-4 md:px-8">
          <RouterProvider router={router} />
        </div>
      </div>
    </AppErrorBoundary>
    <Toaster />
  </React.StrictMode>,
);
