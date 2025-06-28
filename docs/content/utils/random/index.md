---
outline: deep
---

# Random <Badge type="tip" text="静态类" />

:::info
提供多种随机数据生成功能，包括字符串、数字、布尔值、颜色、日期、UUID和密码等，适用于测试数据生成、演示场景等。
:::

## 核心功能

- **多种数据类型**：支持字符串、数字、布尔值、颜色、日期等基础类型
- **数据结构生成**：支持从数组随机选取元素，或根据模板生成随机对象
- **安全标识符**：生成符合标准的UUID和安全密码
- **简单易用**：所有方法均为静态方法，无需实例化

## 基本用法

```ts
import { Random } from '@wiit/vue3-helper'

// 生成8位随机字符串
const randomStr = Random.string(8) 

// 生成1-100的随机数
const randomNum = Random.number(1, 100)

// 生成随机颜色
const randomColor = Random.color()
```

## API 文档

### Random.string()

```ts
static string(length: number): string
```

**功能**：生成指定长度的随机字符串  
**参数**：
- `length`: 字符串长度  
**返回**：包含大小写字母和数字的随机字符串  
**示例**：
```ts
Random.string(10) // "Xc3jK9pLq2"
```

### Random.number()

```ts
static number(min: number, max: number): number
```

**功能**：生成指定范围内的随机整数  
**参数**：
- `min`: 最小值（包含）
- `max`: 最大值（包含）  
**返回**：范围内的随机整数  
**示例**：
```ts
Random.number(5, 10) // 7
```

### Random.boolean()

```ts
static boolean(): boolean
```

**功能**：生成随机布尔值  
**返回**：true 或 false  
**示例**：
```ts
Random.boolean() // true
```

### Random.array()

```ts
static array<T>(array: T[], length: number): T[]
```

**功能**：从数组中随机选择指定数量的元素  
**参数**：
- `array`: 源数组
- `length`: 要选择的元素数量  
**返回**：包含随机元素的新数组  
**示例**：
```ts
Random.array([1,2,3,4,5], 3) // [2,5,1]
```

### Random.object()

```ts
static object<T>(object: T, length: number): T
```

**功能**：根据模板对象生成包含随机值的对象  
**参数**：
- `object`: 模板对象（定义结构和类型）
- `length`: 如果属性是数组，生成的数组长度  
**返回**：填充随机值的对象  
**示例**：
```ts
Random.object({name:'', age:0, tags:[]}, 3)
// {name:'AbcXyZ', age:42, tags:['tag1','tag2']}
```

### Random.color()

```ts
static color(): string
```

**功能**：生成随机十六进制颜色代码  
**返回**：格式为 `#rrggbb` 的颜色字符串  
**示例**：
```ts
Random.color() // "#3a7bd5"
```

### Random.date()

```ts
static date(): Date
```

**功能**：生成2000年至今的随机日期  
**返回**：Date 对象  
**示例**：
```ts
Random.date() // new Date(2015,6,23)
```

### Random.uuid()

```ts
static uuid(): string
```

**功能**：生成符合标准的UUID  
**返回**：格式为 `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx` 的字符串  
**示例**：
```ts
Random.uuid() // "d4a3b2c1-1234-5678-9012-abcdef123456"
```

### Random.password()

```ts
static password(length: number = 12): string
```

**功能**：生成随机密码  
**参数**：
- `length`: 密码长度（默认12）  
**返回**：包含大小写字母、数字和特殊字符的密码  
**示例**：
```ts
Random.password(10) // "Xk3$j9Pq*L"
```

## 使用示例

### 生成测试数据

```ts
// 生成随机用户数据
const mockUser = {
  id: Random.uuid(),
  username: Random.string(8),
  age: Random.number(18, 60),
  isActive: Random.boolean(),
  lastLogin: Random.date(),
  favoriteColors: Random.array(['red','green','blue'], 2)
}
```

### Vue组件中使用

```vue
<script setup>
import { Random } from '@wiit/vue3-helper'

const randomItems = ref(
  Array(5).fill(null).map(() => ({
    id: Random.uuid(),
    value: Random.number(1, 100),
    color: Random.color()
  }))
)
</script>
```

### 生成强密码

```ts
function generateStrongPassword(length = 12) {
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  let password = ''
  do {
    password = Random.password(length)
  } while (
    !/[A-Z]/.test(password) || 
    !/[a-z]/.test(password) || 
    !/[0-9]/.test(password) ||
    !new RegExp(`[${specialChars}]`).test(password)
  )
  return password
}
```

## 实现说明

1. **随机源**：
   - 使用 `Math.random()` 作为基础随机数生成器
   - 不适合安全敏感场景（如需加密安全随机数，应使用 `crypto.getRandomValues`）

2. **性能考虑**：
   - 数组随机排序使用 Fisher-Yates 洗牌算法的简化实现
   - 对象生成使用浅层遍历

3. **扩展建议**：
   ```ts
   // 可扩展字符集
   static string(length: number, charset?: string) {
     const chars = charset || DEFAULT_CHARSET
     // ...
   }
   ```

## 注意事项

- 所有方法生成的随机数基于 `Math.random()`，不适合加密用途
- 密码生成建议二次验证复杂度
- 大数组随机选择可能影响性能