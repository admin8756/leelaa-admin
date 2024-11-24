<template>
  <div class="p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- 修真资源分配 -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-4">
          <h2 class="card-title">修真资源分配</h2>
          <ChartsView class="w-full h-80">
            <GridView />
            <TooltipView 
              className="custom-tooltip cultivation-tooltip"
              v-slot="{ params }"
            >
              <template v-if="params?.[0]">
                {{ params[0].seriesName }}: {{ params[0].value.toLocaleString() }} 个
              </template>
            </TooltipView>
            <LegendView />
            <XAxisView :data="resourceData.xAxis" />
            <YAxisView name="数量" />
            <BarView
              name="灵石"
              :data="resourceData.series[0].data"
              :itemStyle="{ color: '#4CAF50' }"
              :label="{ show: true, position: 'top' }"
            />
            <BarView
              name="丹药"
              :data="resourceData.series[1].data"
              :itemStyle="{ color: '#2196F3' }"
              :label="{ show: true, position: 'top' }"
            />
            <BarView
              name="法器"
              :data="resourceData.series[2].data"
              :itemStyle="{ color: '#9C27B0' }"
              :label="{ show: true, position: 'top' }"
            />
          </ChartsView>
        </div>
      </div>

      <!-- 宗门财务统计 -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-4">
          <h2 class="card-title">宗门财务统计</h2>
          <ChartsView class="w-full h-80">
            <GridView />
            <TooltipView 
              className="custom-tooltip finance-tooltip"
              backgroundColor="rgba(0, 0, 0, 0.7)"
              :textStyle="{ color: '#fff' }"
              v-slot="{ params }"
            >
              <template v-if="params?.[0]">
                {{ params[0].seriesName }}: {{ params[0].value.toLocaleString() }} 灵石
              </template>
            </TooltipView>
            <LegendView />
            <XAxisView :data="financeData.xAxis" />
            <YAxisView 
              name="收入" 
              :index="0"
              position="left"
              :formatter="(value) => (value / 10000).toFixed(1) + '万'"
            />
            <YAxisView 
              name="支出" 
              :index="1"
              position="right"
              :formatter="(value) => (value / 10000).toFixed(1) + '万'"
            />
            <LineView
              name="收入"
              :data="financeData.series[0].data"
              :itemStyle="{ color: '#4CAF50' }"
              :areaStyle="{ opacity: 0.1 }"
              :yAxisIndex="0"
            />
            <LineView
              name="支出"
              :data="financeData.series[1].data"
              :itemStyle="{ color: '#F44336' }"
              :areaStyle="{ opacity: 0.1 }"
              :yAxisIndex="1"
            />
          </ChartsView>
        </div>
      </div>

      <!-- 修炼进度跟踪 -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-4">
          <h2 class="card-title">修炼进度跟踪</h2>
          <ChartsView class="w-full h-80">
            <GridView />
            <TooltipView 
              className="custom-tooltip progress-tooltip"
              backgroundColor="rgba(255, 255, 255, 0.9)"
              :textStyle="{ color: '#333' }"
              extraCssText="box-shadow: 0 2px 8px rgba(0,0,0,0.15);"
              v-slot="{ params }"
            >
              <template v-if="params?.length">
                <template v-for="param in params" :key="param.seriesName">
                  {{ param.seriesName }}: {{ param.value }}%<br>
                </template>
              </template>
            </TooltipView>
            <LegendView />
            <XAxisView :data="progressData.xAxis" />
            <YAxisView 
              name="进度" 
              :formatter="(value) => value + '%'"
              :max="100"
            />
            <LineView
              name="功法修炼"
              :data="progressData.series[0].data"
              :itemStyle="{ color: '#FF9800' }"
              :showSymbol="true"
              :symbolSize="8"
              :emphasis="{
                scale: true,
                focus: 'series'
              }"
            />
            <LineView
              name="法器炼制"
              :data="progressData.series[1].data"
              :itemStyle="{ color: '#9C27B0' }"
              :showSymbol="true"
              :symbolSize="8"
              :emphasis="{
                scale: true,
                focus: 'series'
              }"
            />
          </ChartsView>
        </div>
      </div>

      <!-- 灵气浓度监测（双Y轴） -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-4">
          <h2 class="card-title">灵气浓度监测</h2>
          <ChartsView class="w-full h-80">
            <GridView />
            <TooltipView 
              className="custom-tooltip spirit-tooltip"
              backgroundColor="rgba(50, 50, 50, 0.9)"
              :textStyle="{ color: '#fff' }"
              extraCssText="border: 1px solid rgba(255,255,255,0.2);"
              v-slot="{ params }"
            >
              <template v-if="params?.length">
                <template v-for="param in params" :key="param.seriesName">
                  {{ param.seriesName }}: {{ param.value }}{{ param.seriesName === '主峰' ? '点' : '%' }}<br>
                </template>
              </template>
            </TooltipView>
            <LegendView />
            <XAxisView :data="spiritData.xAxis" />
            <YAxisView 
              name="浓度" 
              :index="0"
              position="left"
              :formatter="(value) => value + '点'"
            />
            <YAxisView 
              name="占比" 
              :index="1"
              position="right"
              :min="0"
              :max="100"
              :formatter="(value) => value + '%'"
            />
            <BarView
              name="主峰"
              :data="spiritData.series[0].data"
              :itemStyle="barGradientStyle"
              :label="{ show: true, position: 'top' }"
            />
            <LineView
              name="平均值"
              :data="spiritData.series[1].data"
              :itemStyle="{ color: '#FF5722' }"
              :emphasis="{ focus: 'series' }"
              :yAxisIndex="1"
              :showSymbol="true"
              :symbolSize="6"
              :lineStyle="{ width: 3 }"
            />
          </ChartsView>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import ChartsView from '@/components/leelaa-charts/ChartsView.vue'
import XAxisView from '@/components/leelaa-charts/XAxisView.vue'
import YAxisView from '@/components/leelaa-charts/YAxisView.vue'
import BarView from '@/components/leelaa-charts/BarView.vue'
import LineView from '@/components/leelaa-charts/LineView.vue'
import GridView from '@/components/leelaa-charts/GridView.vue'
import TooltipView from '@/components/leelaa-charts/TooltipView.vue'
import LegendView from '@/components/leelaa-charts/LegendView.vue'
import {
  resourceData,
  financeData,
  progressData,
  spiritData
} from '@/mock/charts'

const barGradientStyle = computed(() => ({
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0,
    color: '#2196F3'
  }, {
    offset: 1,
    color: '#81D4FA'
  }]
}))
</script>

<style>
.custom-tooltip {
  border-radius: 4px;
  padding: 10px;
  line-height: 1.5;
}

.cultivation-tooltip {
  background: linear-gradient(135deg, #4CAF50 0%, #2196F3 100%) !important;
  color: white !important;
}

.finance-tooltip {
  border-left: 4px solid #4CAF50;
}

.progress-tooltip {
  border-radius: 8px;
}

.spirit-tooltip {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
