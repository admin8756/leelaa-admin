<template>
  <div class="form-control w-full">
    <!-- Label -->
    <label v-if="label" :for="id" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>

    <!-- Percent Input -->
    <div class="relative flex items-center">
      <!-- Prefix Icon -->
      <div v-if="prefixIcon" class="absolute left-3">
        <i :class="prefixIcon"></i>
      </div>

      <!-- Input -->
      <input
        :id="id"
        ref="input"
        v-model="displayValue"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        class="input input-bordered w-full pr-12"
        :class="[
          size ? `input-${size}` : '',
          error ? 'input-error' : '',
          disabled ? 'input-disabled' : '',
          prefixIcon ? 'pl-10' : ''
        ]"
        @input="onInput"
        @blur="onBlur"
        @keydown="onKeyDown"
      />

      <!-- Percent Sign -->
      <div class="absolute right-3 text-base-content/50">%</div>

      <!-- Slider -->
      <input
        v-if="showSlider"
        type="range"
        v-model="sliderValue"
        :min="min"
        :max="max"
        :step="step"
        class="range range-sm absolute -bottom-6 left-0 right-0"
        :class="{ 'range-primary': !error }"
        @input="onSliderInput"
      />
    </div>

    <!-- Error Message -->
    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useVModel } from '@vueuse/core'

export default {
  name: 'LeelaaPercent',

  props: {
    modelValue: {
      type: [Number, String],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入百分比'
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    precision: {
      type: Number,
      default: 0
    },
    showSlider: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    prefixIcon: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    const id = `percent-${Math.random().toString(36).substr(2, 9)}`
    const input = ref(null)
    const innerValue = useVModel(props, 'modelValue', emit)
    const sliderValue = ref(props.modelValue || 0)

    // Format display value
    const displayValue = computed({
      get: () => {
        if (!innerValue.value && innerValue.value !== 0) return ''
        return Number(innerValue.value).toFixed(props.precision)
      },
      set: (val) => {
        let num = parseFloat(val)
        if (isNaN(num)) {
          innerValue.value = ''
          return
        }
        num = Math.min(Math.max(num, props.min), props.max)
        innerValue.value = Number(num.toFixed(props.precision))
      }
    })

    // Watch for model value changes
    watch(() => props.modelValue, (val) => {
      if (val !== null && val !== undefined) {
        sliderValue.value = Number(val)
      }
    })

    // Input handlers
    const onInput = (event) => {
      const value = event.target.value.replace(/[^\d.-]/g, '')
      if (value === '' || value === '-') {
        innerValue.value = ''
        return
      }

      let num = parseFloat(value)
      if (!isNaN(num)) {
        num = Math.min(Math.max(num, props.min), props.max)
        innerValue.value = Number(num.toFixed(props.precision))
        sliderValue.value = num
      }
    }

    const onBlur = () => {
      if (innerValue.value === '') {
        innerValue.value = props.min
      }
      emit('change', innerValue.value)
    }

    const onKeyDown = (event) => {
      // Allow: backspace, delete, tab, escape, enter, decimal point
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(event.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (event.keyCode === 65 && event.ctrlKey === true) ||
        // Allow: Ctrl+C
        (event.keyCode === 67 && event.ctrlKey === true) ||
        // Allow: Ctrl+V
        (event.keyCode === 86 && event.ctrlKey === true) ||
        // Allow: Ctrl+X
        (event.keyCode === 88 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39) ||
        // Allow minus sign at start
        (event.keyCode === 189 && event.target.value === '')) {
        return
      }
      // Ensure that it is a number and stop the keypress
      if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) &&
        (event.keyCode < 96 || event.keyCode > 105)) {
        event.preventDefault()
      }
    }

    const onSliderInput = (event) => {
      const value = parseFloat(event.target.value)
      innerValue.value = Number(value.toFixed(props.precision))
    }

    return {
      id,
      input,
      displayValue,
      sliderValue,
      onInput,
      onBlur,
      onKeyDown,
      onSliderInput
    }
  }
}
</script>

<style scoped>
.range {
  height: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.range::-webkit-slider-thumb {
  height: 1rem;
  width: 1rem;
}

.range::-moz-range-thumb {
  height: 1rem;
  width: 1rem;
}
</style>
