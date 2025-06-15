import type { App } from "vue";

const modules = import.meta.glob("./**/*.ts", { eager: true });

export const RegisterDirectives = {
  install: function (app: App<Element>) {
    for (const path in modules) {
      const module = (modules[path] as any).default;
      if (!module) continue;
      const directiveName = path.split("/")[1];
      const entry = path.split("/")[2];
      entry === "index.ts" && app.directive(directiveName, module);
    }
  },
};
