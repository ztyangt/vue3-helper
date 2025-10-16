<template>
  <div class="custom-loading-mask" :style="{ backgroundColor: background }">
    <div class="custom-loading-spinner">
      <div class="custom-loading-circular">
        <svg viewBox="25 25 50 50" class="circular">
          <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
        </svg>
      </div>
      <span v-if="text" class="custom-loading-text">{{ text }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "LoadingComponent",

  props: {
    text: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    background: {
      type: String as PropType<string>,
      default: "rgba(0, 0, 0, 0.4)",
    },
  },
});
</script>

<style scoped>
.custom-loading-mask {
  position: absolute;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.4);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-loading-spinner {
  text-align: center;
}

.custom-loading-circular {
  display: inline;
  position: relative;
  vertical-align: middle;
}

.custom-loading-circular .circular {
  height: 42px;
  width: 42px;
  animation: loading-rotate 2s linear infinite;
}

.custom-loading-circular .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #409eff;
  stroke-linecap: round;
}

.custom-loading-text {
  display: block;
  margin-top: 12px;
  color: #409eff;
  font-size: 14px;
}

@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
