<script setup>
import { ref, onMounted } from "vue";
import { chat } from "@/api/index";
const leftMsg = ref([]);
const rightMsg = ref([]);
const message = ref("");

const baseMsg = {
  type: "text",
  content: "我强吗？",
  state: true,
  time: new Date().toLocaleString(),
  avatar: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  name: "我",
  id: 1,
};
onMounted(() => {
  leftMsg.value.push(baseMsg);
  rightMsg.value.push(baseMsg);
});

const sendMsg = (msg) => {
  msg = msg.trim();
  if (msg.length > 0) {
    leftMsg.value.push(msg);
    chat(msg)
      .then((res) => {
        rightMsg.value.push(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        message.value = "";
      });
  } else {
    alert("请输入内容");
  }
};
</script>
<template>
  <div class="flex">
    <div class="friend flex-1 bg-white"></div>
    <div class="chat-view p-3" style="flex: 5">
      <div class="chat chat-end" v-for="item in leftMsg" :key="item.id">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" :src="item.avatar" />
          </div>
        </div>
        <div class="chat-header">
          {{ item.name }}
          <time class="text-xs opacity-50">{{ item.time }}</time>
        </div>
        <div class="chat-bubble">{{ item.content }}</div>
        <div class="chat-footer opacity-50">{{ (item.state && "已读") || "未读" }}</div>
      </div>
      <div class="chat chat-start" v-for="item in rightMsg" :key="item.id">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" :src="item.avatar" />
          </div>
        </div>
        <div class="chat-header">
          {{ item.name }}
          <time class="text-xs opacity-50">{{ item.time }}</time>
        </div>
        <div class="chat-bubble">{{ item.content }}</div>
        <div class="chat-footer opacity-50">
          {{ (item.state && "已送达") || "发送中" }}
        </div>
      </div>

      <div class="fixed bottom-0 left-0 right-0 w-full">
        <div class="flex justify-between">
          <input type="text" class="w-full" v-model="message" />
          <button class="btn btn-primary" @click="sendMsg(message)">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>
