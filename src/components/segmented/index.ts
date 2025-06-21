import type { App } from "vue";
import _Segmented from "./src/index";
import { getComponentPrefix } from "../_utils/config";

const Segmented = Object.assign(_Segmented, {
  install(app: App) {
    app.component(getComponentPrefix(_Segmented.name), _Segmented);
  },
});

export type SegmentedInstance = InstanceType<typeof _Segmented>;
export type SegmentedProps = SegmentedInstance["$props"];

export default Segmented;
