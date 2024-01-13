/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    setupFiles: "./setupTests.ts",
    environment: "jsdom",
    css: false,
  },
  plugins: [tsconfigPaths(), react()],
});
