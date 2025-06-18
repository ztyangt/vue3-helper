<template>
  <a-button type="primary" class="mt-20" @click="toggleTheme($event, true)">点击切换主题</a-button>
</template>

<script setup lang="ts">
import { useTheme } from "@wiit/vue3-helper";

const { toggleTheme } = useTheme();
</script>

<style lang="scss" scoped></style>
