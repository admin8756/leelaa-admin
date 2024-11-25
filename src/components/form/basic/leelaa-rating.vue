<template>
  <div class="form-control">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>

    <div class="rating" :class="[size && `rating-${size}`]">
      <template v-for="n in max" :key="n">
        <input
          type="radio"
          :name="name"
          class="mask mask-star-2"
          :class="[
            error ? 'bg-error' : 'bg-orange-400',
            disabled ? 'cursor-not-allowed opacity-50' : ''
          ]"
          :checked="modelValue === n"
          :disabled="disabled"
          @change="onChange(n)"
        />
      </template>
    </div>

    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'LeelaaFormRating',

  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5
    },
    name: {
      type: String,
      default() {
        return `rating-${Math.random().toString(36).substr(2, 9)}`
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
    size: {
      type: String,
      default: '',
      validator: (value) => ['lg', 'md', 'sm', 'xs', ''].includes(value)
    }
  },

  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    const onChange = (value) => {
      emit('update:modelValue', value)
      emit('change', value)
    }

    return {
      onChange
    }
  }
}
</script>
