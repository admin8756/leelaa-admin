<template>
  <div class="form-control w-full">
    <!-- Label -->
    <label v-if="label" :for="id" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>

    <!-- Color Picker -->
    <div class="relative">
      <div 
        class="w-full h-10 rounded-lg border border-base-300 cursor-pointer flex items-center px-3 gap-2"
        @click="showPicker = true"
      >
        <div 
          class="w-6 h-6 rounded border"
          :style="{ backgroundColor: modelValue || '#FFFFFF' }"
        ></div>
        <span class="text-sm">{{ modelValue || '请选择颜色' }}</span>
      </div>

      <!-- Color Picker Panel -->
      <div 
        v-if="showPicker"
        class="color-picker absolute z-50 mt-2 p-4 bg-base-100 rounded-lg shadow-lg border border-base-300"
        style="width: 240px"
      >
        <!-- Saturation-Value Picker -->
        <div 
          ref="saturationValue"
          class="saturation-value relative w-full h-40 rounded-lg mb-4 cursor-crosshair"
          :style="{
            backgroundColor: `hsl(${hue}, 100%, 50%)`
          }"
        >
          <div
            class="absolute inset-0"
            :style="{
              background: 'linear-gradient(to right, #fff 0%, transparent 100%), linear-gradient(to top, #000 0%, transparent 100%)'
            }"
          ></div>
          <div
            class="absolute w-4 h-4 -translate-x-2 -translate-y-2 rounded-full border-2 border-white pointer-events-none"
            :style="{
              left: `${saturation}%`,
              top: `${100 - value}%`
            }"
          ></div>
        </div>

        <!-- Hue Slider -->
        <input
          type="range"
          min="0"
          max="360"
          step="1"
          v-model="hue"
          @input="handleHueChange"
          class="range range-xs mb-4"
          style="background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)"
        >

        <!-- Preset Colors -->
        <div class="grid grid-cols-7 gap-1">
          <button
            v-for="color in presetColors"
            :key="color"
            class="w-6 h-6 rounded-full border border-base-300"
            :style="{ backgroundColor: color }"
            @click="selectPresetColor(color)"
          ></button>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useEventListener, useDraggable } from '@vueuse/core'

const props = defineProps({
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
  }
})

const emit = defineEmits(['update:modelValue'])
const id = `color-${Math.random().toString(36).slice(2)}`

// State
const showPicker = ref(false)
const saturationValue = ref(null)
const hue = ref(0)
const saturation = ref(100)
const value = ref(100)

// Preset colors
const presetColors = [
  '#FF0000', '#FF4D00', '#FF9900', '#FFE500', '#CCFF00', '#80FF00', '#33FF00',
  '#00FF19', '#00FF66', '#00FFB2', '#00FFFF', '#00B3FF', '#0066FF', '#0019FF',
  '#3300FF', '#7F00FF', '#CC00FF', '#FF00F2', '#FF0099', '#FF004D', '#000000'
]

// Convert color formats
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null
}

const hexToHsv = (hex) => {
  const rgb = hexToRgb(hex)
  if (!rgb) return { h: 0, s: 100, v: 100 }
  
  const r = rgb[0] / 255
  const g = rgb[1] / 255
  const b = rgb[2] / 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min
  
  let h = 0
  let s = max === 0 ? 0 : diff / max * 100
  let v = max * 100
  
  if (diff === 0) {
    h = 0
  } else if (max === r) {
    h = 60 * ((g - b) / diff + (g < b ? 6 : 0))
  } else if (max === g) {
    h = 60 * ((b - r) / diff + 2)
  } else if (max === b) {
    h = 60 * ((r - g) / diff + 4)
  }
  
  return { h, s, v }
}

// Convert HSV to RGB
const hsvToRgb = (h, s, v) => {
  s = s / 100
  v = v / 100
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  let r, g, b
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break
    case 1: r = q; g = v; b = p; break
    case 2: r = p; g = v; b = t; break
    case 3: r = p; g = q; b = v; break
    case 4: r = t; g = p; b = v; break
    case 5: r = v; g = p; b = q; break
  }

  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  ]
}

// Convert RGB to Hex
const rgbToHex = (r, g, b) => {
  const toHex = x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

// Initialize color from prop
watch(() => props.modelValue, (newColor) => {
  if (newColor) {
    const { h, s, v } = hexToHsv(newColor)
    hue.value = h
    saturation.value = s
    value.value = v
  }
}, { immediate: true })

// Update color from HSV
const updateColor = () => {
  const rgb = hsvToRgb(hue.value / 360, saturation.value, value.value)
  const hexValue = rgbToHex(...rgb)
  emit('update:modelValue', hexValue)
}

// Handle hue change
const handleHueChange = (e) => {
  hue.value = e.target.value
  updateColor()
}

// Handle saturation-value change
const handleSaturationValueChange = (e) => {
  if (!saturationValue.value) return
  
  const rect = saturationValue.value.getBoundingClientRect()
  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
  const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height))
  
  saturation.value = (x / rect.width) * 100
  value.value = 100 - (y / rect.height) * 100
  
  updateColor()
}

// Handle preset color selection
const selectPresetColor = (color) => {
  const rgb = hexToRgb(color)
  if (rgb) {
    const hexValue = rgbToHex(...rgb)
    emit('update:modelValue', hexValue)
  }
  showPicker.value = false
}

// Handle click outside
const handleClickOutside = (e) => {
  if (!e.target.closest('.color-picker')) {
    showPicker.value = false
  }
}

// Setup draggable
if (typeof window !== 'undefined') {
  useEventListener(window, 'mousedown', (e) => {
    if (e.target.closest('.saturation-value')) {
      const handleMouseMove = (e) => {
        handleSaturationValueChange(e)
      }
      
      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
      
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      
      handleSaturationValueChange(e)
    }
  })
  
  useEventListener(window, 'mousedown', handleClickOutside)
}
</script>

<style>
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #fff;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #fff;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
