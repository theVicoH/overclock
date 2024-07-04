import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    server: {
      deps: {
        inline: [
          "react-native"
        ]
      }
    }
  },
  resolve: {
    alias: {
      "common/styles": path.resolve(__dirname, "../../packages/common/src/styles"),
      "react-native": "react-native-web",
    },
  },
})
