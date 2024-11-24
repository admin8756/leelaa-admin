<template>
  <div class="form-control">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>

    <div class="flex flex-wrap gap-2" :class="{ 'flex-col': direction === 'vertical' }">
      <label
        v-for="option in options"
        :key="option.value"
        class="btn"
        :class="[
          modelValue === option.value ? 'btn-primary' : 'btn-outline',
          size && `btn-${size}`,
          option.disabled || disabled ? 'btn-disabled' : ''
        ]"
      >
        <input
          type="radio"
          class="hidden"
          :name="name"
          :value="option.value"
          :disabled="option.disabled || disabled"
          :checked="modelValue === option.value"
          @change="onChange(option.value)"
        />
        <span>{{ option.label }}</span>
      </label>
    </div>

    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'LeelaaFormRadio',

  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    name: {
      type: String,
      default() {
        return `radio-${Math.random().toString(36).substr(2, 9)}`
      }
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
    direction: {
      type: String,
      default: 'horizontal',
      validator: (value) => ['horizontal', 'vertical'].includes(value)
    },
    size: {
      type: String,
      default: '',
      validator: (value) => ['lg', 'sm', 'xs', ''].includes(value)
    }
  },

  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    // 标准化选项格式
    const normalizedOptions = computed(() => {
      return props.options.map(option => {
        if (typeof option === 'string' || typeof option === 'number') {
          return { label: option, value: option }
        }
        return option
      })
    })

    // 处理值变化
    const onChange = (value) => {
      emit('update:modelValue', value)
      emit('change', value)
    }

    return {
      normalizedOptions,
      onChange
    }
  }
}
</script>
