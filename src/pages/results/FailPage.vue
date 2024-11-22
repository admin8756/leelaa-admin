<template>
  <div class="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
    <div class="card w-full max-w-2xl bg-base-200/50 backdrop-blur-sm shadow-lg">
      <div class="card-body items-center text-center">
        <!-- 图标 -->
        <div class="mb-4">
          <Icon icon="game-icons:evil-moon" class="text-error text-6xl animate-pulse" />
        </div>
        
        <!-- 标题 -->
        <h2 class="card-title text-2xl mb-2 text-error">走火入魔</h2>
        
        <!-- 描述 -->
        <p class="mb-6 opacity-80">
          修炼一途，步步为营。此次遭遇心魔侵扰，需即刻停止修炼，静心调养。
        </p>
        
        <!-- 详细信息 -->
        <div class="w-full space-y-4 mb-8">
          <div class="stats stats-vertical w-full bg-base-100/50">
            <div class="stat">
              <div class="stat-title">心魔程度</div>
              <div class="stat-value text-error">75%</div>
              <div class="stat-desc">危险级别：极高</div>
            </div>
            
            <div class="stat">
              <div class="stat-title">建议修养时间</div>
              <div class="stat-value text-warning">3月</div>
              <div class="stat-desc">需要专人看护</div>
            </div>
            
            <div class="stat">
              <div class="stat-title">丹药建议</div>
              <div class="stat-value text-info">静心丹</div>
              <div class="stat-desc">每日三次</div>
            </div>
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="card-actions justify-center gap-4">
          <button class="btn btn-primary" @click="$router.push('/')">
            <Icon icon="mdi:home" class="text-xl" />
            返回宗门
          </button>
          <button class="btn btn-outline" @click="$router.push('/results/progress')">
            <Icon icon="mdi:meditation" class="text-xl" />
            开始调养
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>
