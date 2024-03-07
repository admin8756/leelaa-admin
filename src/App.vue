<script setup>

</script>

<template>
    <header>
      <nav>
          <RouterLink to="/" exact>首页</RouterLink>
          <RouterLink to="/about">关于</RouterLink>
          <RouterLink to="/login">登录</RouterLink>
        </nav>
    </header>
    <RouterView />
</template>