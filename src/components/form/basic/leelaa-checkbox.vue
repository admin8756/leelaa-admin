<template>
  <div class="form-control">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>

    <div class="flex flex-wrap gap-4" :class="{ 'flex-col': direction === 'vertical' }">
      <label
        v-for="option in normalizedOptions"
        :key="option.value"
        class="label cursor-pointer justify-start gap-2"
        :class="{ 'opacity-50 cursor-not-allowed': option.disabled || disabled }"
      >
        <input
          type="checkbox"
          class="checkbox"
          :class="[
            error ? 'checkbox-error' : '',
            size && `checkbox-${size}`,
            option.disabled || disabled ? 'checkbox-disabled' : ''
          ]"
          :value="option.value"
          :disabled="option.disabled || disabled"
          :checked="isChecked(option.value)"
          @change="onChange($event, option.value)"
        />
        <span class="label-text">{{ option.label }}</span>
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
  name: 'LeelaaFormCheckbox',

  props: {
    modelValue: {
      type: [Array, Boolean],
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
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
      if (!props.options.length) {
        return [{ label: props.label || '', value: true }]
      }
      return props.options.map(option => {
        if (typeof option === 'string' || typeof option === 'number') {
          return { label: option, value: option }
        }
        return option
      })
    })

    // 检查是否选中
    const isChecked = (value) => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(value)
      }
      return props.modelValue === value
    }

    // 处理值变化
    const onChange = (event, value) => {
      const checked = event.target.checked
      let newValue

      if (Array.isArray(props.modelValue)) {
        newValue = checked
          ? [...props.modelValue, value]
          : props.modelValue.filter(v => v !== value)
      } else {
        newValue = checked
      }

      emit('update:modelValue', newValue)
      emit('change', newValue)
    }

    return {
      normalizedOptions,
      isChecked,
      onChange
    }
  }
}
</script>
