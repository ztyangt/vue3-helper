<template>
  <div
    :class="{ 'show-loading-overlay': visible }"
    class="loading-overlay"
    :style="{ backgroundColor: background }"
  >
    <div :class="style || 'loading-spinner'" :style="{ borderTopColor: spinnerColor }"></div>
    <div class="loading-text" v-if="text">{{ text }}</div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    text?: string
    background?: string
    spinnerColor?: string
    value?: string
    style?: string
    visible?: boolean
  }>(),
  {
    text: '',
    // background: 'var( --overlay-color)',
    spinnerColor: '#3498db',
    style: '',
    visible: false
  }
)
</script>

<style lang="scss">
.dark {
  .loading-overlay {
    background-color: rgba(0, 0, 0, 0.2);
  }
}

.loading-overlay {
  transition: all 0.3s ease-in-out;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.2);

  &.show-loading-overlay {
    opacity: 1;
    visibility: visible;
  }

  .loading-spinner {
    width: 30px;
    height: 30px;
    border: 4px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .loading-text {
    margin-top: 10px;
    font-size: 12px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
