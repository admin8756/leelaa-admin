<template>
  <div class="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
    <div class="card w-full max-w-2xl bg-base-200/50 backdrop-blur-sm shadow-lg">
      <div class="card-body items-center text-center">
        <!-- 图标 -->
        <div class="mb-4">
          <Icon icon="game-icons:enlightenment" class="text-success text-6xl animate-pulse" />
        </div>
        
        <!-- 标题 -->
        <h2 class="card-title text-2xl mb-2 text-success">修炼成功</h2>
        
        <!-- 描述 -->
        <p class="mb-6 opacity-80">
          恭喜道友修为大进，成功突破瓶颈！灵力充盈，气息澎湃，已达新境界。
        </p>
        
        <!-- 详细信息 -->
        <div class="w-full space-y-4 mb-8">
          <div class="stats stats-vertical w-full bg-base-100/50">
            <div class="stat">
              <div class="stat-title">突破境界</div>
              <div class="stat-value text-success">筑基期</div>
              <div class="stat-desc">原境界：练气期</div>
            </div>
            
            <div class="stat">
              <div class="stat-title">灵力提升</div>
              <div class="stat-value text-primary">300%</div>
              <div class="stat-desc">远超预期</div>
            </div>
            
            <div class="stat">
              <div class="stat-title">宗门贡献</div>
              <div class="stat-value text-secondary">+1000</div>
              <div class="stat-desc">获得宗门嘉奖</div>
            </div>
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="card-actions justify-center gap-4">
          <button class="btn btn-primary" @click="$router.push('/')">
            <Icon icon="mdi:home" class="text-xl" />
            返回宗门
          </button>
          <button class="btn btn-outline" @click="$router.push('/charts/line')">
            <Icon icon="mdi:chart-line" class="text-xl" />
            查看修为
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>
