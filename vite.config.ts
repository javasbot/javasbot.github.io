import { defineConfig } from "vite";
import { resolve } from "path";
import { name as pkgName } from "./package.json";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    emptyOutDir: true,
    sourcemap: false
  },
  server: {
    strictPort: true,
    port: 3000,
    host: true,
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
      hashPrefix: "prefix",
    },
    preprocessorOptions: { less: { javascriptEnabled: true } },
  },
  resolve: {
    alias: {
      // @ 替代为 src
      "@": resolve(__dirname, "src"),
      // @component 替代为 src/component
      "@components": resolve(__dirname, "src/components"),
    },
  }
});
