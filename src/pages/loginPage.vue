<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row w-full">
      <div class="text-center lg:text-left w-full">
        <h1 class="text-5xl font-bold">后台管理系统</h1>
        <p class="py-6">欢迎来使用后台管理系统</p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 max-w-sm">
        <form class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="email" placeholder="email" class="input input-bordered" required />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" class="input input-bordered" required />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" @click="login">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router/index.js';
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const login = () => {
  // 在这里编写登录逻辑，可以发送登录请求到后端验证用户名和密码
  console.log('用户名：', username.value);
  console.log('密码：', password.value);
  router.replace({name:'home'})
};
</script>

<style>
/* 在这里添加样式 */
</style>
