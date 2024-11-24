<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>
    
    <select
      v-model="innerValue"
      :disabled="disabled"
      :multiple="multiple"
      class="select select-bordered w-full"
      :class="[
        error ? 'select-error' : '',
        size && `select-${size}`,
        disabled ? 'select-disabled' : ''
      ]"
      @change="onChange"
    >
      <option v-if="placeholder && !multiple" value="" disabled selected>{{ placeholder }}</option>
      <template v-for="group in normalizedOptions" :key="group.label">
        <optgroup v-if="group.options" :label="group.label">
          <option
            v-for="option in group.options"
            :key="option.value"
            :value="option.value"
            :disabled="option.disabled"
          >
            {{ option.label }}
          </option>
        </optgroup>
        <option
          v-else
          :value="group.value"
          :disabled="group.disabled"
        >
          {{ group.label }}
        </option>
      </template>
    </select>

    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'LeelaaFormSelect',
  
  props: {
    modelValue: {
      type: [String, Number, Array],
      default: ''
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
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
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '',
      validator: (value) => ['lg', 'sm', 'xs', ''].includes(value)
    }
  },

  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    const innerValue = ref(props.modelValue)

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
    const onChange = () => {
      emit('update:modelValue', innerValue.value)
      emit('change', innerValue.value)
    }

    return {
      innerValue,
      normalizedOptions,
      onChange
    }
  }
}
</script>
