/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "constants/routes";
import { CreateArticlePage, ResultsPage } from "app/pages";

import "index.css";
import { AppErrorBoundary, RouteErrorElement, Toaster } from "ui/components";
import { toast } from "ui/hooks/useToast";

// Function to display a warning message
function warnBeforeUnload(event: any) {
  const message = "Are you sure you want to leave? Your changes may not be saved.";

  // Check if the event is related to closing the tab
  if (event?.clientY && event.clientY < 0) {
    // Display a custom message for closing the tab
    sessionStorage.clear();

    toast({
      title: "OK you caught me!",
      description: "I'm broke and can't afford a DB, so if you this close tab.... no more data(on all tabs)",
      variant: "destructive",
      duration: 1000000,
    });
    return message;
  }
}

// Attach the function to the beforeunload event
window.addEventListener("beforeunload", warnBeforeUnload);

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
      <div className="container mx-auto px-4 md:px-8">
        <RouterProvider router={router} />
      </div>
    </AppErrorBoundary>
    <Toaster />
  </React.StrictMode>,
);
