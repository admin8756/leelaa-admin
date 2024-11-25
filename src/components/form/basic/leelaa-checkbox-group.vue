<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>

    <div class="flex flex-wrap gap-4">
      <label 
        v-for="option in options" 
        :key="option.value"
        class="flex items-center gap-2 cursor-pointer"
      >
        <input
          type="checkbox"
          class="checkbox"
          :class="[
            error ? 'checkbox-error' : '',
            size && `checkbox-${size}`
          ]"
          :value="option.value"
          :checked="isChecked(option.value)"
          @change="handleChange(option.value)"
        />
        <slot name="option" :option="option">
          {{ option.label }}
        </slot>
      </label>
    </div>

    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Array,
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
})

const emit = defineEmits(['update:modelValue', 'change'])

// Methods
const isChecked = (value) => props.modelValue.includes(value)

const handleChange = (value) => {
  const newValue = [...props.modelValue]
  const index = newValue.indexOf(value)
  
  if (index === -1) {
    newValue.push(value)
  } else {
    newValue.splice(index, 1)
  }
  
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>
