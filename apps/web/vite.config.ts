import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { resolve } from "path"
import { configDefaults } from "vitest/config"
import svgr from "vite-plugin-svgr"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"

export default defineConfig({
  plugins: [react(), svgr(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "common": resolve(__dirname, "../../packages/common/src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    include: [...configDefaults.include, "**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
  build: {
    rollupOptions: {
      external: ['react/jsx-runtime']
    },
  },
})
