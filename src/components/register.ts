import type { App, Plugin } from "vue";
import Icon from "./icon";
import Segmented from "./segmented";

const components: Record<string, Plugin> = {
  Icon,
  Segmented,
};

const RegisterComponents = (app: App) => {
  Object.keys(components).forEach((key) => {
    app.use(components[key]);
  });
};

export default RegisterComponents;
