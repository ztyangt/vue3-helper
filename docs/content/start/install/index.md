---
outline: deep
---

# 快速开始

## 安装

推荐使用包管理工具安装：

::: code-group

```sh [npm]
npm install @wiit/vue3-helper
```

```sh [pnpm]
pnpm add @wiit/vue3-helper
```

```sh [yarn]
yarn add @wiit/vue3-helper
```

:::

## 样式引用

```ts
import '@wiit/vue3-helper/dist/index.css' // 引入基础样式
```

## 组件注册

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { RegisterComponents } from '@wiit/vue3-helper'

const app = createApp(App)

app.use(RegisterComponents)

app.mount('#app')
```

## 指令注册

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { RegisterDirectives } from '@wiit/vue3-helper'

const app = createApp(App)

app.use(RegisterDirectives)

app.mount('#app')
```
