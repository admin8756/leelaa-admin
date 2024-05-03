<script setup>
import { ref, onMounted } from "vue";
import { chat } from "@/api/index";
const msgList = ref([]);
const message = ref("");

const baseMsg = (self, msg) => {
  return {
    type: "text",
    self: self,
    content: msg || "我强吗？",
    state: true,
    time: new Date().toLocaleString(),
    avatar: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    name: "我",
  };
};
onMounted(() => {
  msgList.value.push(baseMsg(true));
  msgList.value.push(baseMsg(false));
});

const sendMsg = (msg) => {
  msg = msg.trim();
  if (msg.length > 0) {
    msgList.value.push(baseMsg(true, msg));
    chat(msg)
      .then((res) => {
        msgList.value.push(baseMsg(false, res));
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
  <div class="flex min-h-[90vh]">
    <div class="friend flex-1 bg-white"></div>
    <div class="chat-view p-3 relative" style="flex: 5">
      <div
        class="chat"
        v-for="(item, index) in msgList"
        :class="item.self ? 'chat-start' : 'chat-end'"
        :key="index"
      >
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
        <div class="chat-footer opacity-50">{{ (item.state && "已送达") || "未读" }}</div>
      </div>
      <div class="absolute bottom-0 left-3 right-3 w-full">
        <div class="flex justify-between">
          <input type="text" class="w-full mr-3 p-3" v-model="message" />
          <button class="btn btn-primary" @click="sendMsg(message)">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>
