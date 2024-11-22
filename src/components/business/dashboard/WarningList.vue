<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">预警信息</h2>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>等级</th>
              <th>内容</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(warning, index) in warnings" :key="index">
              <td>
                <div :class="[
                  'badge',
                  warning.level === 'high' ? 'badge-error' :
                  warning.level === 'medium' ? 'badge-warning' : 'badge-info'
                ]">
                  {{ warning.level === 'high' ? '高' :
                     warning.level === 'medium' ? '中' : '低' }}
                </div>
              </td>
              <td>{{ warning.content }}</td>
              <td>{{ warning.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  warnings: {
    type: Array,
    required: true
  }
})
</script>
