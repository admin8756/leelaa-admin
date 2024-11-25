<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>

    <div class="relative">
      <textarea
        v-model="innerValue"
        class="textarea textarea-bordered w-full"
        :class="[
          error ? 'textarea-error' : '',
          size && `textarea-${size}`,
          disabled ? 'textarea-disabled' : ''
        ]"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows"
        :maxlength="maxLength"
        @input="onInput"
        @change="onChange"
      />

      <div v-if="showCount" class="absolute bottom-2 right-2 text-xs opacity-70">
        {{ currentLength }}/{{ maxLength }}
      </div>
    </div>

    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'LeelaaFormTextarea',

  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
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
    rows: {
      type: Number,
      default: 3
    },
    maxLength: {
      type: Number,
      default: 500
    },
    showCount: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: '',
      validator: (value) => ['lg', 'sm', 'xs', ''].includes(value)
    }
  },

  emits: ['update:modelValue', 'change', 'input'],

  setup(props, { emit }) {
    const innerValue = ref(props.modelValue)
    const currentLength = ref(String(props.modelValue).length)

    watch(() => props.modelValue, (newVal) => {
      innerValue.value = newVal
      currentLength.value = String(newVal).length
    })

    const onInput = (event) => {
      const value = event.target.value
      currentLength.value = String(value).length
      emit('update:modelValue', value)
      emit('input', value)
    }

    const onChange = (event) => {
      emit('change', event.target.value)
    }

    return {
      innerValue,
      currentLength,
      onInput,
      onChange
    }
  }
}
</script>
