<template>
  <div class="overhide mt-10 br-5">
    <canvas class="gl-demo w-100" ref="canvasRef" />
  </div>
</template>

<script setup lang="ts">
import { BaseCanvas } from "@wiit/vue3-helper";
import { ref, onMounted, onBeforeUnmount } from "vue";
import fragmentShader from "../shader/taichi.glsl";

let shader: BaseCanvas | null = null;
const canvasRef = ref<HTMLCanvasElement>();

onMounted(() => {
  if (!canvasRef.value) return;
  shader = new BaseCanvas(canvasRef.value, fragmentShader);
});

onBeforeUnmount(() => {
  shader?.destory();
});
</script>

<style lang="scss" scoped>
.gl-demo {
  aspect-ratio: 16/9;
}
</style>
