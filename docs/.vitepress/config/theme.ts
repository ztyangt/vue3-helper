export const themeConfig = {
  logo: "/logo.svg",

  appearance: false,

  outline: {
    label: "页面导航",
  },
  search: {
    provider: "local",
    options: {
      locales: {
        root: {
          //这里是个大坑，zh是不生效的，改为root即可
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              noResultsText: "无法找到相关结果",
              resetButtonTitle: "清除查询条件",
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
              },
            },
          },
        },
      },
    },
  },

  docFooter: {
    prev: "上一节",
    next: "下一节",
  },

  lastUpdated: {
    text: "最后更新于",
    formatOptions: {
      dateStyle: "short",
      timeStyle: "medium",
    },
  },

  returnToTopLabel: "回到顶部",
  sidebarMenuLabel: "菜单",
  darkModeSwitchLabel: "主题",
  lightModeSwitchTitle: "切换到浅色模式",
  darkModeSwitchTitle: "切换到深色模式",
  footer: {
    message: "基于 MIT 许可发布",
    copyright: `版权所有 © 2024-${new Date().getFullYear()} 相左`,
    // copyright: `Copyright © 2024 相左`,
  },
  // 社交链接
  socialLinks: [{ icon: "github", link: "https://github.com/ztyangt/vue3-helper" }],
};
