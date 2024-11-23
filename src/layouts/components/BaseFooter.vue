<template>
  <footer class="backdrop-blur-xl bg-black/20 border-t border-white/5">
    <div class="max-w-screen-xl mx-auto py-4 px-6">
      <div class="flex flex-col md:flex-row justify-between items-center gap-3">
        <!-- 版权信息 -->
        <div class="text-base text-white/60 font-light tracking-wide">
          {{ new Date().getFullYear() }} 仙侠管理后台
          <span class="hidden md:inline ml-2">| 由 Leelaa Admin 强力驱动</span>
        </div>
        
        <!-- 链接 -->
        <div class="flex gap-8 text-base text-white/60 font-light">
          <a 
            v-for="(link, index) in links" 
            :key="index"
            :href="link.url" 
            class="hover:text-white transition-all duration-300 ease-out transform hover:translate-y-[-2px] hover:scale-105"
          >
            {{ link.text }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineOptions({
  name: 'BaseFooter'
})

const links = [
  { text: '关于我们', url: '#' },
  { text: '使用文档', url: '#' },
  { text: '问题反馈', url: '#' }
]
</script>
