export const routerConfig = {
  rewrites: {
    "content/:page": ":page",
    "content/:pkg/:page/(.*)": ":pkg/:page/index.md",
  },
};
