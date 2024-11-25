<template>
  <div class="form-control w-full">
    <!-- Label -->
    <label v-if="label" :for="id" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>

    <!-- Rating Stars -->
    <div class="flex items-center gap-1">
      <div 
        v-for="index in maxValue" 
        :key="index"
        class="relative"
        @mouseover="!readonly && (hoverValue = index)"
        @mouseleave="!readonly && (hoverValue = 0)"
        @click="!readonly && updateValue(index)"
      >
        <!-- Background Star -->
        <svg 
          :class="[
            'w-6 h-6 transition-colors',
            readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
          ]"
          :fill="(hoverValue || modelValue) >= index ? color : '#D1D5DB'"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        
        <!-- Half Star -->
        <svg 
          v-if="allowHalf"
          class="absolute inset-0 pointer-events-none"
          :fill="shouldShowHalf(index) ? color : 'none'"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
        </svg>
      </div>

      <!-- Score Text -->
      <span v-if="showScore" class="ml-2 text-sm">
        {{ ((hoverValue || modelValue) || 0).toFixed(allowHalf ? 1 : 0) }}
      </span>
    </div>

    <!-- Error Message -->
    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  maxValue: {
    type: Number,
    default: 5
  },
  allowHalf: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#FBBF24' // Amber-400
  },
  readonly: {
    type: Boolean,
    default: false
  },
  showScore: {
    type: Boolean,
    default: false
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

const id = `rate-${Math.random().toString(36).substr(2, 9)}`
const hoverValue = ref(0)

const updateValue = (index) => {
  if (props.readonly) return

  let value = index
  if (props.allowHalf) {
    const target = event.target
    const rect = target.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    if (mouseX < rect.width / 2) {
      value -= 0.5
    }
  }
  emit('update:modelValue', value)
}

const shouldShowHalf = (index) => {
  if (!props.allowHalf) return false
  const value = hoverValue.value || props.modelValue
  return Math.ceil(value) === index && value % 1 !== 0
}

</script>
