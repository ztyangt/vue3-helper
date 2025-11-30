(function () {
  // 监听 html 上 classList 是否包含 dark 类
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes") {
        const html = document.querySelector("html");
        const isDark = html.classList.contains("dark");
        if (isDark) {
          // 给 body 添加 arco-theme 属性
          const body = document.querySelector("body");
          body.setAttribute("arco-theme", "dark");
        } else {
          // 移除 body 上的 arco-theme 属性
          const body = document.querySelector("body");
          body.removeAttribute("arco-theme");
        }
      }
    });
  });
  // 监听 html 上的 classList
  observer.observe(document.querySelector("html"), {
    attributes: true,
  });
  // 初始化时判断 html 上的 classList
  const html = document.querySelector("html");
  const isDark = html.classList.contains("dark");
  if (isDark) {
    const body = document.querySelector("body");
    body.setAttribute("arco-theme", "dark");
  }
})();
