<template>
  <footer class="relative overflow-hidden min-h-[300px]">
    <!-- 剑气背景动画 -->
    <div class="absolute inset-0 pointer-events-none z-0">
      <svg 
        class="sword-qi absolute inset-0 w-full h-full opacity-50" 
        viewBox="0 0 1000 300" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="sword-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:currentColor;stop-opacity:0.2" />
            <stop offset="50%" style="stop-color:currentColor;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:currentColor;stop-opacity:0.2" />
          </linearGradient>
        </defs>
        <!-- 剑气轨迹1 -->
        <path 
          class="sword-path-1" 
          d="M-100,150 Q250,50 500,150 T1100,150" 
          stroke="url(#sword-gradient)" 
          stroke-width="3"
          fill="none"
        />
        <!-- 剑气轨迹2 -->
        <path 
          class="sword-path-2" 
          d="M-100,100 Q250,200 500,100 T1100,100" 
          stroke="url(#sword-gradient)" 
          stroke-width="2"
          fill="none"
        />
        <!-- 剑气轨迹3 -->
        <path 
          class="sword-path-3" 
          d="M-100,200 Q250,100 500,200 T1100,200" 
          stroke="url(#sword-gradient)" 
          stroke-width="2"
          fill="none"
        />
        <!-- 飘动的剑气粒子 -->
        <g class="sword-particles">
          <circle class="particle" r="2" fill="currentColor">
            <animateMotion 
              dur="3s" 
              repeatCount="indefinite" 
              path="M-100,150 Q250,50 500,150 T1100,150"
            />
          </circle>
          <circle class="particle" r="2" fill="currentColor">
            <animateMotion 
              dur="4s" 
              repeatCount="indefinite" 
              path="M-100,100 Q250,200 500,100 T1100,100"
            />
          </circle>
          <circle class="particle" r="2" fill="currentColor">
            <animateMotion 
              dur="5s" 
              repeatCount="indefinite" 
              path="M-100,200 Q250,100 500,200 T1100,200"
            />
          </circle>
        </g>
      </svg>
    </div>

    <!-- 原有的毛玻璃背景 -->
    <div class="absolute inset-0 bg-gradient-to-b from-base-300/30 to-base-300/60 backdrop-blur-xl z-10">
      <!-- 飘动的符文 -->
      <div class="floating-runes absolute inset-0 opacity-10">
        <Icon icon="ri:sword-fill" class="absolute text-4xl animate-float-slow left-1/4 top-1/4" />
        <Icon icon="ri:ancient-gate-fill" class="absolute text-3xl animate-float-delay left-2/3 top-1/3" />
        <Icon icon="ri:ancient-pavilion-fill" class="absolute text-4xl animate-float top-1/2 left-1/3" />
      </div>
    </div>

    <!-- 主要内容容器 -->
    <div class="relative z-20 max-w-screen-xl mx-auto py-8 px-6">
      <!-- 主要内容区 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 左侧：门派信息 -->
        <div class="flex flex-col items-center md:items-start space-y-4">
          <h3 class="text-xl font-bold tracking-wider text-base-content/90 hover:text-primary transition-colors duration-500 flex items-center">
            <Icon icon="ri:sword-fill" class="inline-block mr-2 animate-pulse" />
            <span class="font-extrabold">
              <span class="text-primary">LEELAA</span>
              <span class="ml-1 opacity-80">ADMIN</span>
            </span>
          </h3>
          <p class="text-sm text-base-content/70 font-wuxia text-center md:text-left leading-relaxed">
            承天地之造化，<br/>
            行万里之修行。<br/>
            愿与道友同携手，<br/>
            共创仙途无止境。
          </p>
        </div>

        <!-- 中间：修仙传送门 -->
        <div class="flex flex-col items-center md:items-start space-y-4">
          <h3 class="text-lg font-semibold text-base-content/80 flex items-center">
            <Icon icon="ri:ancient-gate-fill" class="mr-2" />
            修仙传送门
          </h3>
          <div class="flex flex-col space-y-2">
            <a 
              v-for="(link, index) in links" 
              :key="index"
              :href="link.url" 
              class="group flex items-center text-base-content/70 hover:text-primary transition-all duration-500 ease-out"
            >
              <Icon 
                :icon="link.icon" 
                class="mr-2 transform group-hover:rotate-12 transition-transform duration-300" 
              />
              <span class="relative">
                {{ link.text }}
                <span class="absolute inset-x-0 bottom-0 h-px transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-primary"></span>
              </span>
            </a>
          </div>
        </div>

        <!-- 右侧：修仙论道 -->
        <div class="flex flex-col items-center md:items-start space-y-4">
          <h3 class="text-lg font-semibold text-base-content/80 flex items-center">
            <Icon icon="ri:ancient-pavilion-fill" class="mr-2" />
            修仙论道
          </h3>
          <div class="join bg-base-200/50 backdrop-blur-sm border border-base-content/10 rounded-lg overflow-hidden">
            <input type="email" placeholder="留下传讯玉简" class="join-item input bg-transparent border-0 focus:outline-none" />
            <button class="join-item btn btn-primary hover:brightness-110 transition-all duration-300">
              <Icon icon="ri:send-plane-fill" class="mr-2" />
              传音入密
            </button>
          </div>
          <!-- 社交法阵 -->
          <div class="flex space-x-4 mt-4">
            <a 
              href="https://github.com/admin8756/leelaa-admin"
              target="_blank"
              class="btn btn-circle btn-ghost btn-sm group"
            >
              <Icon 
                icon="ri:github-fill"
                class="text-xl group-hover:animate-spin-slow transition-all duration-500" 
              />
            </a>
            <a 
              href="#"
              class="btn btn-circle btn-ghost btn-sm group"
            >
              <Icon 
                icon="ri:cloud-fill"
                class="text-xl group-hover:animate-spin-slow transition-all duration-500" 
              />
            </a>
            <a 
              href="#"
              class="btn btn-circle btn-ghost btn-sm group"
            >
              <Icon 
                icon="ri:compass-3-fill"
                class="text-xl group-hover:animate-spin-slow transition-all duration-500" 
              />
            </a>
          </div>
        </div>
      </div>

      <!-- 底部道韵 -->
      <div class="mt-8 pt-4 border-t border-base-content/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-sm text-base-content/60 tracking-wider">
          <Icon icon="ri:ancient-gate-line" class="inline-block mr-2" />
          {{ new Date().getFullYear() }} 
          <span class="font-bold">
            <span class="text-primary">LEELAA</span>
            <span class="opacity-80">ADMIN</span>
          </span>
          <span class="mx-1">v{{ version }}</span>
          <span class="hidden md:inline ml-2">| By {{ author }} </span>
        </div>
        <div class="flex gap-6 text-sm text-base-content/60">
          <a href="#" class="hover:text-primary transition-colors duration-300 flex items-center">
            <Icon icon="ri:book-2-fill" class="mr-1" />
            道法条约
          </a>
          <a href="#" class="hover:text-primary transition-colors duration-300 flex items-center">
            <Icon icon="ri:scroll-fill" class="mr-1" />
            修仙须知
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import pkg from '../../../package.json'

defineOptions({
  name: 'BaseFooter'
})

const { version, author } = pkg

const links = [
  { text: '修仙指南', url: '#', icon: 'ri:book-marked-fill' },
  { text: '道法心得', url: '#', icon: 'ri:fire-fill' },
  { text: '问道求索', url: '#', icon: 'ri:compass-discover-fill' },
  { text: '境界突破', url: '#', icon: 'ri:flight-takeoff-fill' }
]
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes float-delay {
  0%, 100% { transform: translateY(-10px); }
  50% { transform: translateY(10px); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(-5px); }
  50% { transform: translateY(15px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float-delay 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
}

.floating-runes {
  pointer-events: none;
  z-index: 11;
}

/* 添加一个仙侠风格的字体类 */
.font-wuxia {
  font-family: "楷体", "KaiTi", serif;
  letter-spacing: 0.1em;
}

/* 剑气动画效果 */
.sword-qi {
  filter: blur(1px);
  mix-blend-mode: plus-lighter;
}

.sword-path-1,
.sword-path-2,
.sword-path-3 {
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  animation: dash 6s ease-in-out infinite;
}

.sword-path-2 {
  animation-delay: -2s;
  opacity: 0.7;
}

.sword-path-3 {
  animation-delay: -4s;
  opacity: 0.5;
}

@keyframes dash {
  0% {
    stroke-dashoffset: 2000;
  }
  100% {
    stroke-dashoffset: -2000;
  }
}

.particle {
  opacity: 0.8;
  filter: blur(1px);
  animation: particleFade 3s ease-in-out infinite;
}

@keyframes particleFade {
  0%, 100% {
    opacity: 0.3;
    r: 1;
  }
  50% {
    opacity: 1;
    r: 3;
  }
}

/* 添加发光效果 */
.sword-qi path {
  filter: drop-shadow(0 0 5px currentColor);
}

/* 主内容区域确保在动画之上 */
.relative {
  z-index: 20;
}
</style>
