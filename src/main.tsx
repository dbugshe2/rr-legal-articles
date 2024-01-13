import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "constants/routes";
import { CreateArticlePage, ResultsPage } from "app/pages";

import "index.css";
import { Toaster } from "ui/components";

const router = createBrowserRouter([
  {
    path: routes.results.path,
    element: <ResultsPage />,
  },
  {
    path: routes.createArticle.path,
    element: <CreateArticlePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
);
