<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div v-for="(stat, key) in stats" :key="key" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title capitalize">{{ key }}</h2>
        <div class="flex items-center justify-between">
          <p class="text-2xl font-bold">{{ stat.value }}</p>
          <div :class="[
            'badge',
            stat.trend > 0 ? 'badge-success' : stat.trend < 0 ? 'badge-error' : 'badge-ghost'
          ]">
            {{ stat.trend > 0 ? '+' : '' }}{{ (stat.trend * 100).toFixed(1) }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    required: true
  }
})
</script>
