<script setup>
</script>

<template>
  <!-- 登录页 -->
  <router-view v-if="!$route.meta.requiresAuth" />
  <!-- 主页 -->
  <div v-else>
    <header>
      <nav>
          <router-link to="/" exact>首页</router-link>
          <router-link to="/about">关于</router-link>
          <router-link to="/login">登录</router-link>
        </nav>
    </header>
    <!-- <router-view /> -->
    <RouterView />
  </div>
</template>