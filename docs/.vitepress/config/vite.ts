import { vitePluginForArco } from "@arco-plugins/vite-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import glsl from "vite-plugin-glsl";

export const viteConfig = {
  plugins: [
    glsl(),
    vitePluginForArco({
      style: "css",
    }),

    AutoImport({
      dts: "unplugin/auto-imports.d.ts",
      resolvers: [ArcoResolver()],
    }),
    Components({
      dts: "unplugin/components.d.ts",
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or 'modern'
      },
    },
  },
  ssr: { noExternal: ["@arco-design/web-vue"], external: ["cesium"] },
  optimizeDeps: {
    exclude: [],
  },
};
