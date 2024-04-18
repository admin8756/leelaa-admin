<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box bg-opacity-50 backdrop-filter backdrop-blur-lg bg-white dark:bg-gray-800">
      <h3 class="font-bold text-lg">{{ title }}</h3>
      <p class="py-4" v-if="type === 'default'">{{ content }}</p>
      <p class="py-4" v-else-if="type === 'image'">
        <img :src="content" alt="图片" />
      </p>
      <p class="py-4" v-else-if="type === 'html'" v-html="content"></p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn" @click="closeCallback">关闭</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
defineProps({
  title: {
    type: String,
    default: '标题',
  },
  type: {
    // 可选值 default, image, html
    type: String,
    default: 'default',
  },
  content: {
    type: String,
    default: '内容',
  },
  closeCallback: {
    type: Function,
    default: null,
  },
});

const modal = ref(null);

const openModal = () => {
  setTimeout(() => {
    modal.value.showModal();
  }, 300);
};
onMounted(() => {
  openModal();
});
</script>
