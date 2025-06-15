import type { Directive, DirectiveBinding } from 'vue'

interface ResizableElement extends HTMLElement {
  __resizeHandles?: HTMLElement[]
  __resizeListeners?: {
    mousedown: (e: MouseEvent) => void
  }[]
  __dragPreview?: HTMLElement
}

interface ResizeOptions {
  minWidth?: number
  minHeight?: number
}

const resize: Directive<ResizableElement, ResizeOptions> = {
  mounted(el: ResizableElement, binding: DirectiveBinding<ResizeOptions>) {
    // 设置元素初始样式
    el.style.position = 'absolute'
    el.style.userSelect = 'none'

    // 创建拖拽预览层
    const createDragPreview = () => {
      const preview = document.createElement('div')
      preview.style.position = 'absolute'
      preview.style.pointerEvents = 'none'
      preview.style.border = '2px dashed #3498db'
      preview.style.backgroundColor = 'rgba(52, 152, 219, 0.1)'
      preview.style.zIndex = '1000'
      preview.style.display = 'none'
      el.parentElement?.appendChild(preview)
      return preview
    }

    // 创建4个角落的拖拽手柄
    const createHandle = (position: string) => {
      const handle = document.createElement('div')
      handle.className = `resize-handle resize-handle-${position}`
      handle.style.position = 'absolute'
      handle.style.width = '10px'
      handle.style.height = '10px'
      handle.style.backgroundColor = '#fff'
      handle.style.opacity = '0'
      handle.style.border = '1px solid #333'
      handle.style.zIndex = '100'
      handle.style.touchAction = 'none'

      // 设置不同位置
      if (position.includes('top')) handle.style.top = '-5px'
      if (position.includes('bottom')) handle.style.bottom = '-5px'
      if (position.includes('left')) handle.style.left = '-5px'
      if (position.includes('right')) handle.style.right = '-5px'

      // 设置不同的鼠标样式
      if (position === 'top-left') handle.style.cursor = 'nwse-resize'
      if (position === 'top-right') handle.style.cursor = 'nesw-resize'
      if (position === 'bottom-left') handle.style.cursor = 'nesw-resize'
      if (position === 'bottom-right') handle.style.cursor = 'nwse-resize'

      el.appendChild(handle)
      return handle
    }

    // 创建拖拽预览层
    el.__dragPreview = createDragPreview()

    // 创建4个角落的拖拽手柄
    const handles = [
      createHandle('top-left'),
      createHandle('top-right'),
      createHandle('bottom-left'),
      createHandle('bottom-right'),
    ]

    el.__resizeHandles = handles
    el.__resizeListeners = []

    // 获取父容器
    const parent = el.parentElement
    if (!parent) return

    // 确保父容器有定位
    if (getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative'
    }

    const minWidth = binding.value?.minWidth ?? 50
    const minHeight = binding.value?.minHeight ?? 50

    // 拖拽状态
    let isResizing = false
    let resizeDirection: string | null = null
    let startX = 0
    let startY = 0
    let startWidth = 0
    let startHeight = 0
    let startLeft = 0
    let startTop = 0
    let finalWidth = 0
    let finalHeight = 0
    let finalLeft = 0
    let finalTop = 0

    // 获取父容器边界
    const getParentBounds = () => {
      return {
        left: 0,
        top: 0,
        right: parent.clientWidth,
        bottom: parent.clientHeight,
      }
    }

    // 更新拖拽预览
    const updateDragPreview = () => {
      if (!el.__dragPreview) return
      const preview = el.__dragPreview
      preview.style.display = 'block'
      preview.style.left = `${finalLeft}px`
      preview.style.top = `${finalTop}px`
      preview.style.width = `${finalWidth}px`
      preview.style.height = `${finalHeight}px`
    }

    // 隐藏拖拽预览
    const hideDragPreview = () => {
      if (!el.__dragPreview) return
      el.__dragPreview.style.display = 'none'
    }

    // 鼠标按下事件处理函数
    const handleMouseDown = (e: MouseEvent, direction: string) => {
      e.preventDefault()
      e.stopPropagation()

      isResizing = true
      resizeDirection = direction

      startX = e.clientX
      startY = e.clientY
      startWidth = el.offsetWidth
      startHeight = el.offsetHeight
      startLeft = el.offsetLeft
      startTop = el.offsetTop

      // 初始化最终值为起始值
      finalWidth = startWidth
      finalHeight = startHeight
      finalLeft = startLeft
      finalTop = startTop

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    // 鼠标移动事件处理函数
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizeDirection) return

      const dx = e.clientX - startX
      const dy = e.clientY - startY
      const parentBounds = getParentBounds()

      // 根据拖拽方向计算新尺寸和位置
      switch (resizeDirection) {
        case 'top-left':
          finalWidth = Math.max(minWidth, startWidth - dx)
          finalHeight = Math.max(minHeight, startHeight - dy)
          finalLeft = startLeft + (startWidth - finalWidth)
          finalTop = startTop + (startHeight - finalHeight)
          break
        case 'top-right':
          finalWidth = Math.max(minWidth, startWidth + dx)
          finalHeight = Math.max(minHeight, startHeight - dy)
          finalTop = startTop + (startHeight - finalHeight)
          break
        case 'bottom-left':
          finalWidth = Math.max(minWidth, startWidth - dx)
          finalHeight = Math.max(minHeight, startHeight + dy)
          finalLeft = startLeft + (startWidth - finalWidth)
          break
        case 'bottom-right':
          finalWidth = Math.max(minWidth, startWidth + dx)
          finalHeight = Math.max(minHeight, startHeight + dy)
          break
      }

      // 边界检查 - 确保不会超出父容器
      // 左边界检查
      if (finalLeft < parentBounds.left) {
        finalLeft = parentBounds.left
        if (resizeDirection.includes('left')) {
          finalWidth = startWidth + startLeft - parentBounds.left
        }
      }

      // 上边界检查
      if (finalTop < parentBounds.top) {
        finalTop = parentBounds.top
        if (resizeDirection.includes('top')) {
          finalHeight = startHeight + startTop - parentBounds.top
        }
      }

      // 右边界检查
      if (finalLeft + finalWidth > parentBounds.right) {
        finalWidth = parentBounds.right - finalLeft
      }

      // 下边界检查
      if (finalTop + finalHeight > parentBounds.bottom) {
        finalHeight = parentBounds.bottom - finalTop
      }

      // 确保不小于最小尺寸
      finalWidth = Math.max(minWidth, finalWidth)
      finalHeight = Math.max(minHeight, finalHeight)

      // 更新拖拽预览
      updateDragPreview()
    }

    // 鼠标释放事件处理函数
    const handleMouseUp = () => {
      if (!isResizing) return

      isResizing = false

      // 应用最终样式
      el.style.width = `${finalWidth}px`
      el.style.height = `${finalHeight}px`
      el.style.left = `${finalLeft}px`
      el.style.top = `${finalTop}px`

      // 隐藏拖拽预览
      hideDragPreview()

      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    // 为每个拖拽点添加事件监听
    handles.forEach((handle, index) => {
      const directions = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
      const listener = (e: MouseEvent) => handleMouseDown(e, directions[index])
      handle.addEventListener('mousedown', listener)
      el.__resizeListeners?.push({ mousedown: listener })
    })
  },

  unmounted(el: ResizableElement) {
    // 清理事件监听器
    if (el.__resizeHandles) {
      el.__resizeHandles.forEach((handle) => {
        handle.remove()
      })
    }

    if (el.__resizeListeners) {
      el.__resizeListeners.forEach((listener, index) => {
        if (el.__resizeHandles?.[index]) {
          el.__resizeHandles[index].removeEventListener('mousedown', listener.mousedown)
        }
      })
    }

    // 移除拖拽预览层
    if (el.__dragPreview) {
      el.__dragPreview.remove()
    }
  },
}

export default resize
