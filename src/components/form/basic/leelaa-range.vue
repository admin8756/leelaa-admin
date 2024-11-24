<template>
  <div class="form-control">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>
    
    <div class="flex items-center gap-4">
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        class="range"
        :class="[
          error ? 'range-error' : '',
          size && `range-${size}`,
          disabled ? 'range-disabled' : ''
        ]"
        :disabled="disabled"
        @input="onChange"
      />
      <span class="text-sm">{{ modelValue }}</span>
    </div>

    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'LeelaaFormRange',

  props: {
    modelValue: {
      type: [Number, String],
      default: 0
    },
    label: {
      type: String,
      default: ''
    },
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    step: {
      type: [Number, String],
      default: 1
    },
    disabled: {
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
      default: '',
      validator: (value) => ['lg', 'sm', 'xs', ''].includes(value)
    }
  },

  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    const onChange = (event) => {
      const value = Number(event.target.value)
      emit('update:modelValue', value)
      emit('change', value)
    }

    return {
      onChange
    }
  }
}
</script>
