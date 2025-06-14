import type { App, Plugin } from "vue";
import Icon from "./icon";

const components: Record<string, Plugin> = {
  Icon,
};

const RegisterComponents = (app: App) => {
  Object.keys(components).forEach((key) => {
    app.use(components[key]);
  });
};

export default RegisterComponents;
