import mdItCustomAttrs from "markdown-it-custom-attrs";
import { MermaidMarkdown } from "vitepress-plugin-mermaid";

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
    md.use(MermaidMarkdown);
  },
};
