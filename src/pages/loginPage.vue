<template>
  <div>
    <h1>登录页</h1>
    <form @submit.prevent="login">
      <label for="username">用户名：</label>
      <input type="text" id="username" v-model="username" required />
      <br />
      <label for="password">密码：</label>
      <input type="password" id="password" v-model="password" required />
      <br />
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const login = () => {
  // 在这里编写登录逻辑，可以发送登录请求到后端验证用户名和密码
  console.log('用户名：', username.value);
  console.log('密码：', password.value);
};
</script>

<style>
/* 在这里添加样式 */
</style>
