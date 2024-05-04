<script setup>
import { ref, onMounted } from "vue";
import { chat } from "@/api/index";
const msgList = ref([]);
const message = ref("");
const isSending = ref(false);
const baseMsg = (self, msg) => {
  return {
    type: "text",
    self: self,
    content: msg || "我强吗？",
    state: true,
    time: new Date().toLocaleString(),
    avatar: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    name: self ? "天道" : "我",
  };
};
onMounted(() => {
  msgList.value.push(baseMsg(false));
  msgList.value.push(baseMsg(true));
});

const sendMsg = (msg) => {
  msg = msg.trim();
  isSending.value = true;
  if (msg.length > 0) {
    msgList.value.push(baseMsg(false, msg));
    chat(msg)
      .then((res) => {
        msgList.value.push(baseMsg(true, res));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        isSending.value = false;
        message.value = "";
      });
  } else {
    alert("请输入内容");
  }
};
</script>
<template>
  <div class="flex min-h-[90vh]">
    <!-- 好友列表 -->
    <div class="friend flex-1 bg-white overflow-y-auto">
      <div class="flex p-3 border-b-2" v-for="(item, index) in msgList" :key="index">
        <div class="avatar">
          <div class="w-16 rounded">
            <img :src="item.avatar" />
          </div>
        </div>
        <div class="ml-2">
          <div class="content font-bold">{{ item.name }}</div>
          <div class="mt-2 text-sm text-gray-500 text-ellipsis">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
    <!-- 聊天窗口 -->
    <div class="chat-view p-3 relative" style="flex: 5">
      <div class="max-h-[90vh] overflow-y-auto pb-20">
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
          <div class="chat-bubble">
            {{ item.content }}
          </div>
          <div class="chat-footer opacity-50">
            {{ (item.state && "已送达") || "未读" }}
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-3 right-3 w-full">
        <div class="flex justify-between">
          <input
            type="text"
            class="w-full mr-3 p-3"
            :disabled="isSending"
            v-model="message"
            @keyup.enter="sendMsg(message)"
          />
          <button class="btn btn-primary" @click="sendMsg(message)">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>
