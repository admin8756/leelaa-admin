<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>

    <div class="relative border rounded-lg" ref="signatureBox">
      <!-- 画布 -->
      <canvas 
        ref="canvas"
        class="w-full cursor-crosshair touch-none"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="stopDrawing"
      ></canvas>

      <!-- 工具栏 -->
      <div class="absolute top-2 right-2 flex gap-2">
        <button type="button" class="btn btn-sm" @click="clear">
          清除
        </button>
        <button type="button" class="btn btn-sm btn-primary" @click="save">
          确认
        </button>
      </div>
    </div>

    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script>
import { ref, onMounted, watch, onUnmounted } from 'vue'

export default {
  name: 'LeelaaSignature',

  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    lineWidth: {
      type: Number,
      default: 2
    },
    lineColor: {
      type: String,
      default: '#000000'
    },
    height: {
      type: Number,
      default: 200
    }
  },

  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    const canvas = ref(null)
    const signatureBox = ref(null)
    const isDrawing = ref(false)
    const lastX = ref(0)
    const lastY = ref(0)
    const ctx = ref(null)

    // 初始化画布
    const initCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = signatureBox.value.getBoundingClientRect()
      
      // 设置画布大小
      canvas.value.width = rect.width * dpr
      canvas.value.height = props.height * dpr
      canvas.value.style.height = `${props.height}px`
      
      // 设置绘图上下文
      ctx.value = canvas.value.getContext('2d')
      ctx.value.scale(dpr, dpr)
      ctx.value.lineCap = 'round'
      ctx.value.lineJoin = 'round'
      ctx.value.strokeStyle = props.lineColor
      ctx.value.lineWidth = props.lineWidth

      // 如果有已保存的签名，恢复它
      if (props.modelValue) {
        const img = new Image()
        img.onload = () => {
          ctx.value.drawImage(img, 0, 0, canvas.value.width, canvas.value.height)
        }
        img.src = props.modelValue
      }
    }

    // 开始绘制
    const startDrawing = (e) => {
      isDrawing.value = true
      const rect = canvas.value.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      lastX.value = (e.clientX - rect.left) * dpr
      lastY.value = (e.clientY - rect.top) * dpr
    }

    // 绘制
    const draw = (e) => {
      if (!isDrawing.value) return

      const rect = canvas.value.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const x = (e.clientX - rect.left) * dpr
      const y = (e.clientY - rect.top) * dpr

      ctx.value.beginPath()
      ctx.value.moveTo(lastX.value, lastY.value)
      ctx.value.lineTo(x, y)
      ctx.value.stroke()

      lastX.value = x
      lastY.value = y
    }

    // 停止绘制
    const stopDrawing = () => {
      isDrawing.value = false
    }

    // 处理触摸开始
    const handleTouchStart = (e) => {
      e.preventDefault()
      const touch = e.touches[0]
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
      })
      startDrawing(mouseEvent)
    }

    // 处理触摸移动
    const handleTouchMove = (e) => {
      e.preventDefault()
      const touch = e.touches[0]
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
      })
      draw(mouseEvent)
    }

    // 清除画布
    const clear = () => {
      const dpr = window.devicePixelRatio || 1
      ctx.value.clearRect(0, 0, canvas.value.width * dpr, canvas.value.height * dpr)
      emit('update:modelValue', '')
    }

    // 保存签名
    const save = () => {
      const isEmpty = isCanvasEmpty()
      if (isEmpty) {
        emit('update:modelValue', '')
      } else {
        const dataUrl = canvas.value.toDataURL('image/png')
        emit('update:modelValue', dataUrl)
      }
    }

    // 检查画布是否为空
    const isCanvasEmpty = () => {
      const pixelBuffer = new Uint32Array(
        ctx.value.getImageData(0, 0, canvas.value.width, canvas.value.height).data.buffer
      )
      return !pixelBuffer.some(color => color !== 0)
    }

    // 监听值变化
    watch(() => props.modelValue, (newVal) => {
      if (!newVal && ctx.value) {
        clear()
      }
    })

    // 监听窗口大小变化
    const handleResize = () => {
      initCanvas()
    }

    onMounted(() => {
      initCanvas()
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    return {
      canvas,
      signatureBox,
      startDrawing,
      draw,
      stopDrawing,
      handleTouchStart,
      handleTouchMove,
      clear,
      save
    }
  }
}
</script>
