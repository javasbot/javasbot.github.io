import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import type { ConfigEnv, UserConfigExport } from "vite";
import { name as pkgName } from "./package.json";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default (): UserConfigExport => {
  return defineConfig({
    envDir: "env",
    envPrefix: "GAO_",
    plugins: [react()],
    build: {
      target: "esnext",
      emptyOutDir: true,
      sourcemap: false,
    },
    server: {
      strictPort: true,
      port: 8008,
      host: true,
    },
    css: {
      modules: {
        generateScopedName: "[name]_[local]_[hash:base64:5]",
        hashPrefix: pkgName,
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
    },
  });
};
