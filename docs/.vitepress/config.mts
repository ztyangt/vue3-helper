import { defineConfig } from "vitepress";
import { markdownConfig } from "./config/markdown";
import { sidebarConfig } from "./config/sidebar";
import { headConfig } from "./config/head";
import { navConfig } from "./config/nav";
import { themeConfig } from "./config/theme";
import { routerConfig } from "./config/router";
import { viteConfig } from "./config/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "Vue3 Helper",
  description: "vue3开发常用辅助工具",
  head: headConfig as any,
  base: "/vue3-helper/",
  // appearance: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    // nav: navConfig, // 导航配置
    sidebar: sidebarConfig, // 侧栏配置
    ...(themeConfig as any), // 主题配置
    // socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
  ...(routerConfig as any), // 路由配置
  markdown: markdownConfig, // markdown 配置

  // vite 配置
  vite: viteConfig as any,
});
