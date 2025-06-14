import type { App } from "vue";
import _Icon from "./src/index";
import { getComponentPrefix } from "../_utils/config";

const Icon = Object.assign(_Icon, {
  install(app: App) {
    app.component(getComponentPrefix(_Icon.name), _Icon);
  },
});

export type IconInstance = InstanceType<typeof _Icon>;
export type IconProps = IconInstance["$props"];

export default Icon;
