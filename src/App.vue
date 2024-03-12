<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>测了个试</h1>
    <div>
      <nav>
        <RouterLink to="/">主页</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
        <RouterLink to="/login">登录</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
