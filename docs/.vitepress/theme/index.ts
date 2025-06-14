import DefaultTheme from "vitepress/theme";
import "@wiit/vue3-helper/dist/index.css";
import { RegisterComponents } from "@wiit/vue3-helper";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(RegisterComponents);
  },
};
