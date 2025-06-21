import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";
import { fileURLToPath, URL } from "node:url";
import glsl from "vite-plugin-glsl";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vue from "@vitejs/plugin-vue";
import pkg from "./package.json";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@wiit/vue3-helper": fileURLToPath(new URL("./dist", import.meta.url)),
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or 'modern'
      },
    },
  },
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "Index",
      fileName: "index",
    },
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies || {}), "vue"],
      output: {
        globals: {
          vue: "vue",
          "@vueuse/core": "@vueuse/core",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "index.css";
          return "static/[name].[ext]";
        },
      },
    },
    cssMinify: true,
  },

  plugins: [
    vue(),
    vueJsx(),
    glsl(),
    dts({
      rollupTypes: true, // 所有的类型合并到一个文件中
      outDir: ["dist/"],
      tsconfigPath: path.resolve(__dirname, "tsconfig.json"),
      copyDtsFiles: true,
      declarationOnly: false,
      compilerOptions: {
        declaration: true,
        allowJs: false,
        emitDeclarationOnly: true,
      },
    }),
  ],
});
