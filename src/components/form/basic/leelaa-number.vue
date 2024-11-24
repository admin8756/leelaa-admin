<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>
    
    <div class="join w-full">
      <!-- Decrease Button -->
      <button 
        type="button"
        class="join-item btn btn-square"
        :class="{ 'btn-disabled': isMin }"
        @click="decrease"
      >
        <i class="fas fa-minus"></i>
      </button>
      
      <!-- Input -->
      <input
        type="number"
        :value="modelValue"
        class="join-item input input-bordered w-full text-center"
        :class="{ 'input-error': error }"
        :min="min"
        :max="max"
        :step="step"
        :placeholder="placeholder"
        @input="handleInput"
        @blur="handleBlur"
      />
      
      <!-- Increase Button -->
      <button 
        type="button"
        class="join-item btn btn-square"
        :class="{ 'btn-disabled': isMax }"
        @click="increase"
      >
        <i class="fas fa-plus"></i>
      </button>
    </div>

    <!-- Error Message -->
    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Number, null],
    default: null
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
  placeholder: {
    type: String,
    default: '请输入数字'
  },
  min: {
    type: Number,
    default: -Infinity
  },
  max: {
    type: Number,
    default: Infinity
  },
  step: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

// Computed
const isMin = computed(() => props.modelValue !== null && props.modelValue <= props.min)
const isMax = computed(() => props.modelValue !== null && props.modelValue >= props.max)

// Methods
const handleInput = (event) => {
  let value = event.target.value === '' ? null : Number(event.target.value)
  
  // Clamp value between min and max
  if (value !== null) {
    value = Math.max(props.min, Math.min(props.max, value))
  }
  
  emit('update:modelValue', value)
  emit('change', value)
}

const handleBlur = (event) => {
  let value = event.target.value === '' ? null : Number(event.target.value)
  
  // Round to nearest step
  if (value !== null && props.step !== 0) {
    value = Math.round(value / props.step) * props.step
    value = Number(value.toFixed(10)) // Fix floating point precision issues
  }
  
  // Clamp value between min and max
  if (value !== null) {
    value = Math.max(props.min, Math.min(props.max, value))
  }
  
  emit('update:modelValue', value)
  emit('change', value)
}

const decrease = () => {
  if (props.modelValue === null) {
    const value = Math.min(0, props.max)
    emit('update:modelValue', value)
    emit('change', value)
    return
  }
  
  if (!isMin.value) {
    const value = Math.max(props.min, props.modelValue - props.step)
    emit('update:modelValue', value)
    emit('change', value)
  }
}

const increase = () => {
  if (props.modelValue === null) {
    const value = Math.max(0, props.min)
    emit('update:modelValue', value)
    emit('change', value)
    return
  }
  
  if (!isMax.value) {
    const value = Math.min(props.max, props.modelValue + props.step)
    emit('update:modelValue', value)
    emit('change', value)
  }
}
</script>
