---
outline: deep
---

<script setup>
import IconList from './components/icon-list.vue'
</script>

# 字体图标

基于 [REMIX ICON](https://remixicon.com/) 免费用于个人用途和商业用途的图标库进行封装。

## 使用方式

```vue
<template>
  <div class="ml-30 mt-20">
    <c-icon name="4k-line" color="red" :size="50" />
  </div>
</template>

<script setup lang="ts">
import { CIcon } from '@wiit/vue3-helper'
</script>

<style lang="scss" scoped></style>

```

## 图标预览

<IconList />

## API

### 属性

| 属性名 | 说明 | 类型 | 是否必选 | 默认值 |
| --- | --- | --- | --- | --- |
| name | 图标名称 | string | 是 | - |
| size | 图标大小 | number | 否 | 16 |
| color | 图标颜色 | string | 否 | #333 |
| spin | 是否旋转 | boolean | 否 | false |
