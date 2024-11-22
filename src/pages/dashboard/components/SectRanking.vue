<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">宗门排名</h2>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>排名</th>
              <th>宗门</th>
              <th>综合评分</th>
              <th>变化</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ranking, index) in rankings" :key="index">
              <td>{{ ranking.rank }}</td>
              <td>{{ ranking.name }}</td>
              <td>{{ ranking.score }}</td>
              <td>
                <div :class="[
                  'badge',
                  ranking.change > 0 ? 'badge-success' :
                  ranking.change < 0 ? 'badge-error' : 'badge-ghost'
                ]">
                  {{ ranking.change > 0 ? '↑' :
                     ranking.change < 0 ? '↓' : '-' }}
                  {{ Math.abs(ranking.change) }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  rankings: {
    type: Array,
    required: true
  }
})
</script>
