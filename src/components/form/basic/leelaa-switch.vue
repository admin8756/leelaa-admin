<template>
  <div class="form-control">
    <label class="label cursor-pointer justify-start gap-2">
      <span v-if="label" class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
      <input
        type="checkbox"
        class="toggle"
        :class="[
          error ? 'toggle-error' : '',
          size && `toggle-${size}`,
          disabled ? 'toggle-disabled' : ''
        ]"
        :checked="modelValue"
        :disabled="disabled"
        @change="onChange"
      />
    </label>
    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'LeelaaFormSwitch',

  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
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
      const value = event.target.checked
      emit('update:modelValue', value)
      emit('change', value)
    }

    return {
      onChange
    }
  }
}
</script>
