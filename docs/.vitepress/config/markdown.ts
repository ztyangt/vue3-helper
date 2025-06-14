import mdItCustomAttrs from "markdown-it-custom-attrs";

export const markdownConfig = {
  image: {
    lazyLoading: true,
  },
  lineNumbers: true,
  math: true,
  config: (md) => {
    md.use(mdItCustomAttrs, "image", {
      "data-fancybox": "gallery",
    });
  },
};
