<template>
  <div>
    <div class="flex flex-wrap">
      <div v-for="(color, index) in color" :key="index" class="mr-20 rounded-full" :style="{ background: color }"></div>
    </div>

    <div class="mt-20">
      <a-button type="primary" @click="handleCreateColor">点击生成颜色</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Random } from "@wiit/vue3-helper";
import { ref } from "vue";

const color = ref<string[]>([]);

const handleCreateColor = () => {
  color.value = Array.from({ length: 10 }, () =>
    Random.color(
      [
        [300, 359],
        [1, 160],
      ],
      [[50, 99]],
      [[50, 80]]
    )
  );
};

handleCreateColor();
</script>

<style lang="scss" scoped>
.rounded-full {
  height: 30px;
  width: 30px;
}
</style>
