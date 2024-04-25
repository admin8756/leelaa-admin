<script setup>
import { ref } from 'vue';
const leftMsg = ref([]);
const rightMsg = ref([]);
const message = ref('');
const sendMsg = (msg) => {
  if (msg.length > 0) {
    leftMsg.value.push(msg);
    message.value = '';
    // 使用原生请求
    fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: msg,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        rightMsg.value.push(res);
      }).catch(() => {
        alert('请求失败');
      });
  }else{
    alert('请输入内容');
  }
};
</script>
<template>
  <div class="chat chat-end">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img
          alt="Tailwind CSS chat bubble component"
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        />
      </div>
    </div>
    <div class="chat-header">
      我
      <time class="text-xs opacity-50">12:46</time>
    </div>
    <div class="chat-bubble">我强吗？</div>
    <div class="chat-footer opacity-50">Seen at 12:46</div>
  </div>
  <div class="chat chat-start">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img
          alt="Tailwind CSS chat bubble component"
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        />
      </div>
    </div>
    <div class="chat-header">
      天道
      <time class="text-xs opacity-50">12:45</time>
    </div>
    <div class="chat-bubble">你非常强！</div>
    <div class="chat-footer opacity-50">Delivered</div>
  </div>

  <div class="fixed bottom-0 left-0 right-0 w-full">
    <div class="flex justify-between">
      <input type="text" class="w-full" v-model="message" />
      <button class="btn btn-primary" @click="sendMsg(message)">Send</button>
    </div>
  </div>
</template>
