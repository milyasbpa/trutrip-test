/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/core/test/setupTest.ts",
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "**/index.ts",
        "**/index.tsx",
        "**/types.ts",
        "**/*.d.ts",
        "dist",
        "eslint.config.js",
        "vite.config.ts",
        "src/core/i18n/scripts/parseCSV.ts",
        "src/core/i18n/resources/resources.ts",
        "src/core/react-query/ReactQueryProvider.tsx",
        "src/core/router/components/private/**",
        "src/core/router/components/public/**",
        "src/core/types/**",
        "src/core/theme/**",
      ],
    },
  },
});
