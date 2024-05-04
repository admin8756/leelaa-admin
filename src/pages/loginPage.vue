<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row w-full">
      <div class="text-center lg:text-left w-full">
        <h1 class="text-5xl font-bold">传统修仙后台管理系统</h1>
        <p class="py-6">欢迎来使用，拥抱开源。</p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 max-w-sm">
        <form class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">用户名</span>
            </label>
            <input
              placeholder="请输入用户名"
              v-model="username"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">密码</span>
            </label>
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
              class="input input-bordered"
              required
            />
            <label class="label flex-row-reverse">
              <a href="#" class="label-text-alt link link-hover">忘记密码?</a>
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" @click="loginFun">登录</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { login } from "@/api";
import router from "@/router/index.js";
import { ref } from "vue";

const username = ref("admin");
const password = ref("123456");

const loginFun = async () => {
  if (!username.value) {
    return alert("请输入用户名");
  }
  if (!password.value) {
    return alert("请输入密码");
  }
  const postData = {
    username: username.value,
    password: password.value,
  };
  const res = await login(postData);
  console.log(res);
  if (res.code !== 200) {
    return alert(res.message);
  } else {
    router.replace({ name: "home" });
  }
};
</script>

<style scoped>
/* 在这里添加样式 */
</style>
