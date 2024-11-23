<template>
  <div class="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
    <div class="card w-full max-w-2xl bg-base-200/50 backdrop-blur-sm shadow-lg">
      <div class="card-body items-center text-center">
        <!-- 图标 -->
        <div class="mb-4">
          <Icon icon="game-icons:meditation" class="text-primary text-6xl animate-bounce" />
        </div>
        
        <!-- 标题 -->
        <h2 class="card-title text-2xl mb-2">闭关修炼</h2>
        
        <!-- 描述 -->
        <p class="mb-6 opacity-80">
          道友正在闭关潜修，请勿打扰。灵气运转正常，境界稳步提升中。
        </p>
        
        <!-- 详细信息 -->
        <div class="w-full space-y-4 mb-8">
          <div class="stats stats-vertical w-full bg-base-100/50">
            <div class="stat">
              <div class="stat-title">修炼进度</div>
              <div class="stat-value text-primary">
                <progress class="progress progress-primary w-56" value="70" max="100"></progress>
              </div>
              <div class="stat-desc">预计还需3天</div>
            </div>
            
            <div class="stat">
              <div class="stat-title">灵气浓度</div>
              <div class="stat-value text-info">98%</div>
              <div class="stat-desc">状态：极佳</div>
            </div>
            
            <div class="stat">
              <div class="stat-title">丹药消耗</div>
              <div class="stat-value text-warning">5/10</div>
              <div class="stat-desc">储备充足</div>
            </div>
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="card-actions justify-center gap-4">
          <button class="btn btn-error" @click="$router.push('/results/fail')">
            <Icon icon="mdi:alert" class="text-xl" />
            强行出关
          </button>
          <button class="btn btn-primary" @click="$router.push('/')">
            <Icon icon="mdi:home" class="text-xl" />
            返回宗门
          </button>
        </div>

        <!-- 提示 -->
        <div class="mt-6 text-sm opacity-60">
          <Icon icon="mdi:information" class="inline-block mr-1" />
          强行出关可能导致走火入魔，请谨慎！
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>
