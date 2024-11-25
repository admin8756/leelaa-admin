<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>

    <div class="relative">
      <input
        type="text"
        :value="displayValue"
        readonly
        class="input input-bordered w-full cursor-pointer"
        :class="[
          error ? 'input-error' : '',
          size && `input-${size}`,
          disabled ? 'input-disabled' : ''
        ]"
        :placeholder="placeholder"
        :disabled="disabled"
        @click="togglePanel"
      />
      <div class="absolute inset-y-0 right-0 flex items-center pr-3">
        <i class="fas fa-chevron-down text-gray-400"></i>
      </div>

      <!-- 级联面板 -->
      <div
        v-if="showPanel"
        class="absolute z-50 mt-1 bg-base-100 rounded-lg shadow-lg border border-base-300"
        :class="{ 'right-0': align === 'right' }"
        v-click-outside="closePanel"
      >
        <div class="flex divide-x">
          <!-- 每一级选项 -->
          <div
            v-for="(options, level) in cascadeOptions"
            :key="level"
            class="w-48 max-h-64 overflow-y-auto"
          >
            <div
              v-for="option in options"
              :key="option.value"
              class="px-4 py-2 cursor-pointer hover:bg-base-200"
              :class="{
                'bg-base-200': isSelected(option, level),
                'text-primary': isSelected(option, level)
              }"
              @click="selectOption(option, level)"
            >
              <div class="flex items-center justify-between">
                <span>{{ option.label }}</span>
                <i
                  v-if="option.children && option.children.length"
                  class="fas fa-chevron-right text-xs"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

// 点击外部指令
const clickOutside = {
  mounted(el, { value }) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}

export default {
  name: 'LeelaaFormCascader',

  directives: {
    clickOutside
  },

  props: {
    modelValue: {
      type: Array,
      default: () => []
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
    separator: {
      type: String,
      default: ' / '
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
    },
    align: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'right'].includes(value)
    }
  },

  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    const showPanel = ref(false)
    const selectedOptions = ref([])
    const selectedValues = ref(props.modelValue || [])

    // 计算每一级的选项
    const cascadeOptions = computed(() => {
      const result = [props.options]
      let currentOptions = props.options

      selectedValues.value.forEach(value => {
        const option = currentOptions.find(opt => opt.value === value)
        if (option && option.children) {
          currentOptions = option.children
          result.push(currentOptions)
        }
      })

      return result
    })

    // 计算显示值
    const displayValue = computed(() => {
      if (!selectedOptions.value.length) return ''
      return selectedOptions.value.map(option => option.label).join(props.separator)
    })

    // 监听值变化
    watch(() => props.modelValue, (newValue) => {
      if (newValue && newValue.length) {
        selectedValues.value = newValue
        updateSelectedOptions()
      } else {
        selectedValues.value = []
        selectedOptions.value = []
      }
    }, { immediate: true })

    // 更新选中的选项
    const updateSelectedOptions = () => {
      const options = []
      let currentOptions = props.options

      selectedValues.value.forEach(value => {
        const option = currentOptions.find(opt => opt.value === value)
        if (option) {
          options.push(option)
          currentOptions = option.children || []
        }
      })

      selectedOptions.value = options
    }

    // 判断是否选中
    const isSelected = (option, level) => {
      return selectedValues.value[level] === option.value
    }

    // 选择选项
    const selectOption = (option, level) => {
      // 截断后面的值
      selectedValues.value = selectedValues.value.slice(0, level)
      selectedOptions.value = selectedOptions.value.slice(0, level)

      // 添加新值
      selectedValues.value.push(option.value)
      selectedOptions.value.push(option)

      // 如果没有子选项或已经是最后一级，关闭面板
      if (!option.children || !option.children.length) {
        emit('update:modelValue', selectedValues.value)
        emit('change', selectedValues.value)
        closePanel()
      }
    }

    const togglePanel = () => {
      if (!props.disabled) {
        showPanel.value = !showPanel.value
      }
    }

    const closePanel = () => {
      showPanel.value = false
    }

    return {
      showPanel,
      cascadeOptions,
      displayValue,
      isSelected,
      selectOption,
      togglePanel,
      closePanel
    }
  }
}
</script>
