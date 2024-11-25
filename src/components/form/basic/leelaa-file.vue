<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>
    
    <input
      type="file"
      class="file-input file-input-bordered w-full"
      :class="[
        error ? 'file-input-error' : '',
        size && `file-input-${size}`,
        disabled ? 'file-input-disabled' : ''
      ]"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="onChange"
    />

    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>

    <!-- 预览区域 -->
    <div v-if="showPreview && previewUrls.length > 0" class="grid grid-cols-4 gap-4 mt-4">
      <div v-for="(url, index) in previewUrls" :key="index" class="relative">
        <img :src="url" class="w-full h-32 object-cover rounded-lg" />
        <button
          type="button"
          class="btn btn-circle btn-sm absolute -top-2 -right-2"
          @click="removeFile(index)"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'LeelaaFormFile',

  props: {
    modelValue: {
      type: [File, Array],
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
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
    showPreview: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: '',
      validator: (value) => ['lg', 'sm', 'xs', ''].includes(value)
    }
  },

  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    const previewUrls = ref([])

    // 生成预览URL
    const generatePreviewUrls = (files) => {
      if (!files) return []
      
      const fileArray = Array.isArray(files) ? files : [files]
      return fileArray.map(file => {
        if (file instanceof File && file.type.startsWith('image/')) {
          return URL.createObjectURL(file)
        }
        return null
      }).filter(Boolean)
    }

    // 监听文件变化
    watch(() => props.modelValue, (newFiles) => {
      previewUrls.value = generatePreviewUrls(newFiles)
    }, { immediate: true })

    // 处理文件变化
    const onChange = (event) => {
      const files = event.target.files
      if (!files.length) return

      const value = props.multiple ? Array.from(files) : files[0]
      emit('update:modelValue', value)
      emit('change', value)
    }

    // 移除文件
    const removeFile = (index) => {
      if (props.multiple) {
        const newFiles = [...props.modelValue]
        newFiles.splice(index, 1)
        emit('update:modelValue', newFiles)
      } else {
        emit('update:modelValue', null)
      }
    }

    return {
      previewUrls,
      onChange,
      removeFile
    }
  }
}
</script>
