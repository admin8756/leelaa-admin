<template>
  <div v-if="modelValue" class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ title }}</h3>
      <p class="py-4">{{ message }}</p>
      <div class="modal-action">
        <button class="btn" @click="onCancel">取消</button>
        <button 
          class="btn btn-error" 
          :class="{ 'loading': loading }" 
          @click="onConfirm"
        >
          确认删除
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LeelaaConfirm',

  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '确认删除'
    },
    message: {
      type: String,
      default: '确定要删除这条记录吗？'
    }
  },

  emits: ['update:modelValue', 'confirm', 'cancel'],

  setup(props, { emit }) {
    const loading = ref(false)

    const onConfirm = async () => {
      loading.value = true
      try {
        await emit('confirm')
      } finally {
        loading.value = false
        emit('update:modelValue', false)
      }
    }

    const onCancel = () => {
      emit('update:modelValue', false)
      emit('cancel')
    }

    return {
      loading,
      onConfirm,
      onCancel
    }
  }
}
</script>
