<template>
  <div class="form-control w-full">
    <!-- Label -->
    <label v-if="label" :for="id" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>
    
    <!-- Input Container -->
    <div class="relative">
      <!-- Input Field -->
      <input
        :id="id"
        ref="input"
        v-model="innerValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxLength"
        class="input input-bordered w-full"
        :class="[
          size ? `input-${size}` : '',
          error ? 'input-error' : '',
          disabled ? 'input-disabled' : ''
        ]"
        @input="onInput"
        @blur="onBlur"
      />
      
      <!-- Prefix Icon -->
      <div v-if="prefixIcon" class="absolute left-3 top-1/2 -translate-y-1/2">
        <i :class="prefixIcon"></i>
      </div>
      
      <!-- Suffix Icon or Clear Button -->
      <div v-if="suffixIcon || (clearable && innerValue)" class="absolute right-3 top-1/2 -translate-y-1/2">
        <button
          v-if="clearable && innerValue"
          type="button"
          class="btn btn-ghost btn-circle btn-xs"
          @click="clearValue"
        >
          <i class="fas fa-times"></i>
        </button>
        <i v-else-if="suffixIcon" :class="suffixIcon"></i>
      </div>
    </div>
    
    <!-- Error Message -->
    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
    
    <!-- Character Count -->
    <label v-if="showCount && maxLength" class="label">
      <span class="label-text-alt">{{ innerValue.length }}/{{ maxLength }}</span>
    </label>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { validators } from '../utils'

export default {
  name: 'InputText',
  
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
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
    clearable: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: undefined
    },
    showCount: {
      type: Boolean,
      default: false
    },
    prefixIcon: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '',
      validator: (value) => ['lg', 'sm', 'xs', ''].includes(value)
    }
  },
  
  emits: ['update:modelValue', 'input', 'blur', 'clear'],
  
  setup(props, { emit }) {
    const id = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)
    const input = ref(null)
    const innerValue = ref(props.modelValue)
    
    // 监听值变化
    const onInput = () => {
      emit('update:modelValue', innerValue.value)
      emit('input', innerValue.value)
    }
    
    // 失去焦点
    const onBlur = () => {
      emit('blur', innerValue.value)
    }
    
    // 清除值
    const clearValue = () => {
      innerValue.value = ''
      emit('update:modelValue', '')
      emit('clear')
      input.value?.focus()
    }
    
    return {
      id,
      input,
      innerValue,
      onInput,
      onBlur,
      clearValue
    }
  }
}
</script>
