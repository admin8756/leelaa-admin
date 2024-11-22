<template>
  <n-modal
    v-model:show="show"
    :mask-closable="true"
    preset="card"
    :style="{ width: '640px' }"
    :title="sect?.name"
    size="huge"
    :bordered="false"
    class="bg-white/80 backdrop-blur-sm dark:bg-dark/80"
  >
    <div class="flex flex-col gap-4">
      <!-- 基本信息 -->
      <div class="flex items-center gap-4">
        <div class="w-20 h-20 rounded-lg overflow-hidden">
          <img :src="sect?.avatar" alt="宗门图标" class="w-full h-full object-cover">
        </div>
        <div class="flex-1">
          <div class="text-lg font-bold">{{ sect?.name }}</div>
          <div class="text-sm text-gray-500 mt-1">{{ sect?.description }}</div>
          <div class="flex items-center gap-2 mt-2">
            <n-tag :bordered="false" size="small" :color="{ color: sect?.color + '20', textColor: sect?.color, borderColor: sect?.color }">
              {{ sect?.specialty }}
            </n-tag>
            <n-tag :bordered="false" size="small" type="info">
              门派规模：{{ sect?.size }}
            </n-tag>
          </div>
        </div>
      </div>

      <!-- 排名趋势 -->
      <div class="flex gap-4">
        <div class="flex-1 p-4 rounded-lg bg-white/60 dark:bg-dark-800/60">
          <div class="text-sm text-gray-500 mb-2">排名趋势</div>
          <div class="h-32">
            <trend-chart :data="sect?.rankHistory" :color="sect?.color" />
          </div>
        </div>
        <div class="flex-1 p-4 rounded-lg bg-white/60 dark:bg-dark-800/60">
          <div class="text-sm text-gray-500 mb-2">属性分布</div>
          <div class="h-32">
            <radar-chart
              :data="[sect?.power, sect?.influence, sect?.resources, sect?.cultivation, sect?.reputation]"
              :indicators="[
                { name: '实力', max: 100 },
                { name: '影响力', max: 100 },
                { name: '资源', max: 100 },
                { name: '修为', max: 100 },
                { name: '声望', max: 100 }
              ]"
              :color="sect?.color"
            />
          </div>
        </div>
      </div>

      <!-- 详细数据 -->
      <div class="grid grid-cols-2 gap-4">
        <div class="p-4 rounded-lg bg-white/60 dark:bg-dark-800/60">
          <div class="text-sm text-gray-500 mb-2">门派实力</div>
          <div class="text-2xl font-bold">{{ sect?.power }}</div>
          <div class="text-sm text-gray-500 mt-1">综合战力评估</div>
        </div>
        <div class="p-4 rounded-lg bg-white/60 dark:bg-dark-800/60">
          <div class="text-sm text-gray-500 mb-2">影响力</div>
          <div class="text-2xl font-bold">{{ sect?.influence }}</div>
          <div class="text-sm text-gray-500 mt-1">江湖地位评估</div>
        </div>
        <div class="p-4 rounded-lg bg-white/60 dark:bg-dark-800/60">
          <div class="text-sm text-gray-500 mb-2">资源储备</div>
          <div class="text-2xl font-bold">{{ sect?.resources }}</div>
          <div class="text-sm text-gray-500 mt-1">灵石、丹药等资源</div>
        </div>
        <div class="p-4 rounded-lg bg-white/60 dark:bg-dark-800/60">
          <div class="text-sm text-gray-500 mb-2">平均修为</div>
          <div class="text-2xl font-bold">{{ sect?.cultivation }}</div>
          <div class="text-sm text-gray-500 mt-1">门下弟子修为</div>
        </div>
      </div>

      <!-- 重要事件 -->
      <div class="p-4 rounded-lg bg-white/60 dark:bg-dark-800/60">
        <div class="text-sm text-gray-500 mb-2">最近动态</div>
        <n-timeline>
          <n-timeline-item
            v-for="(event, index) in sect?.events"
            :key="index"
            :type="event.type"
            :title="event.title"
            :content="event.content"
            :time="event.time"
          />
        </n-timeline>
      </div>
    </div>
  </n-modal>
</template>

<script setup>
import { ref } from 'vue'
import TrendChart from './charts/TrendChart.vue'
import RadarChart from './charts/RadarChart.vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  sect: {
    type: Object,
    required: true
  }
})

defineEmits(['update:show'])
</script>
