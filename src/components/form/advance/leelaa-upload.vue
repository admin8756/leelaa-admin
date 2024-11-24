<template>
  <div class="form-control w-full">
    <!-- Label -->
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>

    <!-- Upload Area -->
    <div class="space-y-4">
      <!-- Preview Grid -->
      <div v-if="modelValue?.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div 
          v-for="(file, index) in modelValue" 
          :key="index"
          class="relative aspect-square rounded-lg overflow-hidden group"
        >
          <!-- Image Preview -->
          <img 
            :src="file" 
            class="w-full h-full object-cover"
            alt="上传预览"
          />
          
          <!-- Overlay -->
          <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <div class="absolute inset-0 flex items-center justify-center gap-2">
              <!-- Preview Button -->
              <button 
                type="button"
                class="btn btn-circle btn-sm btn-ghost text-white"
                @click="previewImage(file)"
              >
                <i class="fas fa-eye"></i>
              </button>
              
              <!-- Delete Button -->
              <button 
                type="button"
                class="btn btn-circle btn-sm btn-ghost text-white"
                @click="removeFile(index)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Upload Button -->
        <div 
          v-if="!maxFiles || modelValue.length < maxFiles"
          class="relative aspect-square rounded-lg border-2 border-dashed border-base-300 hover:border-primary transition-colors"
        >
          <input
            type="file"
            :accept="accept"
            :multiple="multiple"
            class="absolute inset-0 opacity-0 cursor-pointer"
            @change="handleFileChange"
          />
          <div class="absolute inset-0 flex flex-col items-center justify-center text-base-content/50">
            <i class="fas fa-plus text-2xl mb-2"></i>
            <span class="text-sm">点击或拖拽上传</span>
          </div>
        </div>
      </div>

      <!-- Initial Upload Button -->
      <div 
        v-else
        class="relative w-full aspect-video rounded-lg border-2 border-dashed border-base-300 hover:border-primary transition-colors"
      >
        <input
          type="file"
          :accept="accept"
          :multiple="multiple"
          class="absolute inset-0 opacity-0 cursor-pointer"
          @change="handleFileChange"
        />
        <div class="absolute inset-0 flex flex-col items-center justify-center text-base-content/50">
          <i class="fas fa-cloud-upload-alt text-4xl mb-2"></i>
          <span class="text-sm">点击或拖拽上传</span>
          <span v-if="accept" class="text-xs mt-1">支持的格式: {{ formatAccept }}</span>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>

    <!-- Preview Modal -->
    <dialog ref="previewModal" class="modal">
      <div class="modal-box max-w-3xl p-0">
        <img 
          v-if="previewUrl" 
          :src="previewUrl" 
          class="w-full h-auto"
          alt="预览图片"
        />
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>关闭</button>
      </form>
    </dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
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
  accept: {
    type: String,
    default: 'image/*'
  },
  multiple: {
    type: Boolean,
    default: true
  },
  maxFiles: {
    type: Number,
    default: 0
  },
  maxSize: {
    type: Number,
    default: 5 * 1024 * 1024 // 5MB
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

// Format accept string for display
const formatAccept = computed(() => {
  return props.accept
    .split(',')
    .map(type => type.trim())
    .map(type => {
      if (type === 'image/*') return '图片'
      if (type.startsWith('.')) return type.substring(1).toUpperCase()
      return type
    })
    .join('、')
})

// Preview modal
const previewModal = ref(null)
const previewUrl = ref('')

const previewImage = (url) => {
  previewUrl.value = url
  previewModal.value?.showModal()
}

// Remove file
const removeFile = (index) => {
  const newFiles = [...props.modelValue]
  newFiles.splice(index, 1)
  emit('update:modelValue', newFiles)
  emit('change', newFiles)
}

// Handle file change
const handleFileChange = async (event) => {
  const files = Array.from(event.target.files)
  if (!files.length) return

  // Validate file count
  if (props.maxFiles && files.length + props.modelValue.length > props.maxFiles) {
    alert(`最多只能上传 ${props.maxFiles} 个文件`)
    return
  }

  // Process files
  const promises = files.map(file => {
    // Validate file size
    if (file.size > props.maxSize) {
      alert(`文件 ${file.name} 超过最大限制 ${(props.maxSize / 1024 / 1024).toFixed(1)}MB`)
      return null
    }

    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.readAsDataURL(file)
    })
  })

  const results = await Promise.all(promises)
  const validResults = results.filter(Boolean)
  
  if (validResults.length) {
    const newFiles = [...props.modelValue, ...validResults]
    emit('update:modelValue', newFiles)
    emit('change', newFiles)
  }

  // Reset input
  event.target.value = ''
}
</script>

<style scoped>
.modal-box {
  max-height: 90vh;
}
</style>
