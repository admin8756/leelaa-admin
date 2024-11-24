<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>

    <div
      class="border rounded-lg overflow-hidden"
      :class="[error ? 'border-error' : 'border-base-300']"
    >
      <!-- 工具栏 -->
      <div class="bg-base-200 border-b border-base-300 p-2 flex flex-wrap gap-2">
        <!-- 文本样式 -->
        <div class="join">
          <button
            class="btn btn-sm join-item"
            :class="{ 'btn-active': isBold }"
            @click="toggleBold"
            title="加粗"
          >
            <i class="fas fa-bold"></i>
          </button>
          <button
            class="btn btn-sm join-item"
            :class="{ 'btn-active': isItalic }"
            @click="toggleItalic"
            title="斜体"
          >
            <i class="fas fa-italic"></i>
          </button>
          <button
            class="btn btn-sm join-item"
            :class="{ 'btn-active': isUnderline }"
            @click="toggleUnderline"
            title="下划线"
          >
            <i class="fas fa-underline"></i>
          </button>
        </div>

        <!-- 对齐方式 -->
        <div class="join">
          <button
            class="btn btn-sm join-item"
            :class="{ 'btn-active': isAlignLeft }"
            @click="alignText('left')"
            title="左对齐"
          >
            <i class="fas fa-align-left"></i>
          </button>
          <button
            class="btn btn-sm join-item"
            :class="{ 'btn-active': isAlignCenter }"
            @click="alignText('center')"
            title="居中对齐"
          >
            <i class="fas fa-align-center"></i>
          </button>
          <button
            class="btn btn-sm join-item"
            :class="{ 'btn-active': isAlignRight }"
            @click="alignText('right')"
            title="右对齐"
          >
            <i class="fas fa-align-right"></i>
          </button>
        </div>

        <!-- 列表 -->
        <div class="join">
          <button
            class="btn btn-sm join-item"
            :class="{ 'btn-active': isOrderedList }"
            @click="toggleOrderedList"
            title="有序列表"
          >
            <i class="fas fa-list-ol"></i>
          </button>
          <button
            class="btn btn-sm join-item"
            :class="{ 'btn-active': isUnorderedList }"
            @click="toggleUnorderedList"
            title="无序列表"
          >
            <i class="fas fa-list-ul"></i>
          </button>
        </div>

        <!-- 链接 -->
        <button
          class="btn btn-sm"
          :class="{ 'btn-active': isLink }"
          @click="createLink"
          title="插入链接"
        >
          <i class="fas fa-link"></i>
        </button>

        <!-- 图片 -->
        <button
          class="btn btn-sm"
          @click="insertImage"
          title="插入图片"
        >
          <i class="fas fa-image"></i>
        </button>

        <!-- 清除格式 -->
        <button
          class="btn btn-sm"
          @click="clearFormat"
          title="清除格式"
        >
          <i class="fas fa-remove-format"></i>
        </button>
      </div>

      <!-- 编辑区域 -->
      <div
        ref="editor"
        class="p-4 min-h-[200px] focus:outline-none"
        contenteditable="true"
        :class="{ 'cursor-not-allowed opacity-50': disabled }"
        @input="onInput"
        @blur="onBlur"
        v-html="modelValue"
      ></div>
    </div>

    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'

export default {
  name: 'LeelaaFormEditor',

  props: {
    modelValue: {
      type: String,
      default: ''
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
    }
  },

  emits: ['update:modelValue', 'change', 'blur'],

  setup(props, { emit }) {
    const editor = ref(null)
    const isBold = ref(false)
    const isItalic = ref(false)
    const isUnderline = ref(false)
    const isAlignLeft = ref(false)
    const isAlignCenter = ref(false)
    const isAlignRight = ref(false)
    const isOrderedList = ref(false)
    const isUnorderedList = ref(false)
    const isLink = ref(false)

    // 监听内容变化
    watch(() => props.modelValue, (newValue) => {
      if (editor.value && editor.value.innerHTML !== newValue) {
        editor.value.innerHTML = newValue
      }
    })

    // 执行命令
    const execCommand = (command, value = null) => {
      if (props.disabled) return
      document.execCommand(command, false, value)
      editor.value.focus()
    }

    // 文本样式
    const toggleBold = () => {
      execCommand('bold')
      isBold.value = !isBold.value
    }

    const toggleItalic = () => {
      execCommand('italic')
      isItalic.value = !isItalic.value
    }

    const toggleUnderline = () => {
      execCommand('underline')
      isUnderline.value = !isUnderline.value
    }

    // 对齐方式
    const alignText = (align) => {
      execCommand(`justify${align}`)
      isAlignLeft.value = align === 'left'
      isAlignCenter.value = align === 'center'
      isAlignRight.value = align === 'right'
    }

    // 列表
    const toggleOrderedList = () => {
      execCommand('insertOrderedList')
      isOrderedList.value = !isOrderedList.value
    }

    const toggleUnorderedList = () => {
      execCommand('insertUnorderedList')
      isUnorderedList.value = !isUnorderedList.value
    }

    // 链接
    const createLink = () => {
      const url = window.prompt('请输入链接地址:', 'http://')
      if (url) {
        execCommand('createLink', url)
      }
    }

    // 图片
    const insertImage = () => {
      const url = window.prompt('请输入图片地址:', 'http://')
      if (url) {
        execCommand('insertImage', url)
      }
    }

    // 清除格式
    const clearFormat = () => {
      execCommand('removeFormat')
      resetStatus()
    }

    // 重置状态
    const resetStatus = () => {
      isBold.value = false
      isItalic.value = false
      isUnderline.value = false
      isAlignLeft.value = false
      isAlignCenter.value = false
      isAlignRight.value = false
      isOrderedList.value = false
      isUnorderedList.value = false
      isLink.value = false
    }

    // 内容变化
    const onInput = () => {
      const html = editor.value.innerHTML
      emit('update:modelValue', html)
      emit('change', html)
    }

    // 失去焦点
    const onBlur = () => {
      emit('blur', editor.value.innerHTML)
    }

    onMounted(() => {
      if (editor.value) {
        editor.value.innerHTML = props.modelValue
      }
    })

    return {
      editor,
      isBold,
      isItalic,
      isUnderline,
      isAlignLeft,
      isAlignCenter,
      isAlignRight,
      isOrderedList,
      isUnorderedList,
      isLink,
      toggleBold,
      toggleItalic,
      toggleUnderline,
      alignText,
      toggleOrderedList,
      toggleUnorderedList,
      createLink,
      insertImage,
      clearFormat,
      onInput,
      onBlur
    }
  }
}
</script>

<style>
[contenteditable] {
  outline: none;
}
</style>
