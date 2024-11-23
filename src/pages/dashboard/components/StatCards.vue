<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <LCard v-for="stat in stats" :key="stat.title" :no-padding="true">
      <div class="p-4">
        <div class="flex items-center gap-3">
          <div :class="`w-12 h-12 rounded-lg bg-${stat.color}/20 flex items-center justify-center`">
            <Icon :icon="stat.icon" :class="`text-2xl text-${stat.color}`" />
          </div>
          <div>
            <div class="text-sm opacity-70">{{ stat.title }}</div>
            <div class="text-2xl font-semibold">{{ stat.value }}</div>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-2">
          <div :class="`flex items-center gap-1 text-${stat.trend === 'up' ? 'success' : 'error'}`">
            <Icon :icon="stat.trend === 'up' ? 'mdi-trending-up' : 'mdi-trending-down'" class="text-lg" />
            <span>{{ stat.trendValue }}</span>
          </div>
          <span class="text-sm opacity-50">较上月</span>
        </div>
      </div>
    </LCard>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import LCard from '@/components/base/LCard/BaseCard.vue'

const stats = [
  {
    title: '门派数量',
    value: '108',
    icon: 'mdi-domain',
    color: 'primary',
    trend: 'up',
    trendValue: '2.1%'
  },
  {
    title: '修士总数',
    value: '12,361',
    icon: 'mdi-account-group',
    color: 'secondary',
    trend: 'up',
    trendValue: '5.4%'
  },
  {
    title: '灵石储备',
    value: '1,892,504',
    icon: 'mdi-diamond-stone',
    color: 'accent',
    trend: 'down',
    trendValue: '1.8%'
  },
  {
    title: '宝物数量',
    value: '3,157',
    icon: 'mdi-treasure-chest',
    color: 'warning',
    trend: 'up',
    trendValue: '3.2%'
  }
]
</script>
