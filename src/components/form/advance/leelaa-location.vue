<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>

    <div class="space-y-4">
      <!-- Location Info -->
      <div class="grid grid-cols-2 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">经度</span>
          </label>
          <input
            type="number"
            v-model="longitude"
            class="input input-bordered w-full"
            :class="{ 'input-error': error }"
            placeholder="经度"
            step="0.000001"
            @input="updateLocation"
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">纬度</span>
          </label>
          <input
            type="number"
            v-model="latitude"
            class="input input-bordered w-full"
            :class="{ 'input-error': error }"
            placeholder="纬度"
            step="0.000001"
            @input="updateLocation"
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-2">
        <button type="button" class="btn btn-sm" @click="getCurrentLocation">
          <i class="fas fa-location-arrow"></i>
          定位当前位置
        </button>
      </div>
    </div>

    <!-- Error Message -->
    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ longitude: null, latitude: null })
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
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

// Refs
const longitude = ref(props.modelValue?.longitude)
const latitude = ref(props.modelValue?.latitude)

// Watch for external value changes
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    longitude.value = newVal.longitude
    latitude.value = newVal.latitude
  }
}, { deep: true })

// Update location
const updateLocation = () => {
  if (longitude.value && latitude.value) {
    const location = {
      longitude: Number(longitude.value),
      latitude: Number(latitude.value)
    }
    emit('update:modelValue', location)
    emit('change', location)
  }
}

// Get current location
const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert('您的浏览器不支持地理定位')
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      longitude.value = Number(position.coords.longitude.toFixed(6))
      latitude.value = Number(position.coords.latitude.toFixed(6))
      updateLocation()
    },
    (error) => {
      console.error('获取位置失败:', error)
      alert('获取位置失败，请手动输入或稍后重试')
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  )
}
</script>
