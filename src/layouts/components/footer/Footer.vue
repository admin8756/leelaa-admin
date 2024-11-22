<template>
  <footer class="bg-base-200/50 backdrop-blur-sm">
    <div class="max-w-screen-xl mx-auto py-3 px-4">
      <div class="flex flex-col md:flex-row justify-between items-center gap-2">
        <!-- 版权信息 -->
        <div class="text-sm opacity-75">
          Copyright {{ new Date().getFullYear() }} - 仙侠管理后台
          <span class="hidden md:inline">| 由 Leelaa Admin 强力驱动</span>
        </div>
        
        <!-- 链接 -->
        <div class="flex gap-6 text-sm opacity-75">
          <a href="#" class="hover:text-primary transition-colors">关于我们</a>
          <a href="#" class="hover:text-primary transition-colors">使用文档</a>
          <a href="#" class="hover:text-primary transition-colors">问题反馈</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 如果需要添加交互逻辑可以在这里添加
</script>
