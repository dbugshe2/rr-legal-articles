/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    setupFiles: "./setupTests.ts",
    environment: "jsdom",
    include: ["test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    css: false,
  },
  plugins: [
    tsconfigPaths(),
    react(),
    checker({ typescript: true }),
    !process.env.VITEST ? checker({ typescript: true }) : undefined,
  ],
});
