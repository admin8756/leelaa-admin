<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>

    <!-- 预览区域 -->
    <div class="relative">
      <!-- 预览图片 -->
      <div 
        v-if="modelValue"
        class="relative aspect-[4/3] rounded-lg overflow-hidden bg-base-200"
        :class="{ 'border-2 border-error': error }"
      >
        <img 
          :src="modelValue" 
          class="w-full h-full object-cover"
          alt="预览图片"
        />
        <!-- 删除按钮 -->
        <button
          type="button"
          class="btn btn-circle btn-sm btn-error absolute top-2 right-2"
          @click="clearImage"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- 打开相机按钮 -->
      <button
        v-else
        type="button"
        class="btn btn-outline w-full"
        @click="openCamera"
      >
        <i class="fas fa-camera mr-2"></i>
        打开相机
      </button>
    </div>

    <!-- Error Message -->
    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>

    <!-- Camera Modal -->
    <dialog ref="cameraModal" class="modal">
      <div class="modal-box max-w-3xl">
        <h3 class="font-bold text-lg mb-4">拍摄照片</h3>
        
        <!-- 相机预览 -->
        <div 
          class="relative aspect-[4/3] rounded-lg overflow-hidden bg-base-200"
          ref="previewBox"
        >
          <!-- 视频预览 -->
          <video 
            v-show="!image && isStreaming"
            ref="video"
            class="w-full h-full object-cover"
            autoplay
            playsinline
          ></video>

          <!-- 图片预览 -->
          <img
            v-if="image"
            :src="image"
            class="w-full h-full object-cover"
            alt="拍摄预览"
          />

          <!-- 切换摄像头按钮 -->
          <button
            v-if="hasMultipleCameras && isStreaming && !image"
            type="button"
            class="btn btn-circle btn-sm absolute top-2 right-2"
            @click="switchCamera"
          >
            <i class="fas fa-sync"></i>
          </button>
        </div>

        <!-- 操作按钮 -->
        <div class="modal-action">
          <form method="dialog" class="flex gap-2">
            <button 
              v-if="!image"
              type="button" 
              class="btn btn-primary"
              @click="capture"
            >
              <i class="fas fa-camera mr-2"></i>
              拍摄
            </button>
            <button 
              v-if="image"
              type="button" 
              class="btn"
              @click="retake"
            >
              <i class="fas fa-redo mr-2"></i>
              重拍
            </button>
            <button 
              v-if="image"
              type="button" 
              class="btn btn-primary"
              @click="confirm"
            >
              <i class="fas fa-check mr-2"></i>
              确认
            </button>
            <button class="btn">取消</button>
          </form>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>关闭</button>
      </form>
    </dialog>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
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
  facingMode: {
    type: String,
    default: 'user',
    validator: (value) => ['user', 'environment'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

// Refs
const video = ref(null)
const previewBox = ref(null)
const cameraModal = ref(null)
const stream = ref(null)
const image = ref(null)
const isStreaming = ref(false)
const hasMultipleCameras = ref(false)
const currentFacingMode = ref(props.facingMode)

// Methods
const openCamera = async () => {
  try {
    // Check for multiple cameras
    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoDevices = devices.filter(device => device.kind === 'videoinput')
    hasMultipleCameras.value = videoDevices.length > 1

    // Start camera
    await startCamera()
    
    // Show modal
    cameraModal.value?.showModal()
  } catch (error) {
    console.error('Failed to open camera:', error)
    alert('无法打开相机，请检查相机权限或稍后重试')
  }
}

const startCamera = async () => {
  try {
    if (stream.value) {
      stream.value.getTracks().forEach(track => track.stop())
    }

    stream.value = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: currentFacingMode.value
      },
      audio: false
    })

    if (video.value) {
      video.value.srcObject = stream.value
      isStreaming.value = true
    }
  } catch (error) {
    console.error('Failed to start camera:', error)
    throw error
  }
}

const switchCamera = async () => {
  currentFacingMode.value = currentFacingMode.value === 'user' ? 'environment' : 'user'
  await startCamera()
}

const capture = () => {
  if (!video.value || !previewBox.value) return

  const canvas = document.createElement('canvas')
  canvas.width = previewBox.value.clientWidth
  canvas.height = previewBox.value.clientHeight
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.drawImage(video.value, 0, 0, canvas.width, canvas.height)
  image.value = canvas.toDataURL('image/jpeg')
}

const retake = () => {
  image.value = null
}

const confirm = () => {
  if (image.value) {
    emit('update:modelValue', image.value)
    emit('change', image.value)
    closeCamera()
    cameraModal.value?.close()
  }
}

const clearImage = () => {
  emit('update:modelValue', '')
  emit('change', '')
}

const closeCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
    stream.value = null
  }
  isStreaming.value = false
  image.value = null
}

// Clean up
onUnmounted(() => {
  closeCamera()
})
</script>
