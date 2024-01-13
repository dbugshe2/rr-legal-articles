import type { RouteItem } from "types";

export const routePaths = {
  results: "/",
  createArticle: "create",
} as const;

export const routeNames = {
  results: "Results",
  createArticle: "Create Article",
} as const;

export const routes: Record<string, RouteItem> = {
  results: {
    path: routePaths.results,
    name: routeNames.results,
  },
  createArticle: {
    path: routePaths.createArticle,
    name: routeNames.createArticle,
  },
} as const;
