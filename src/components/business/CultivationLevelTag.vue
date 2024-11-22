<template>
  <span 
    class="px-2 py-1 rounded text-sm" 
    :style="{ backgroundColor: levelInfo.color + '20', color: levelInfo.color }"
    :title="levelInfo.description"
  >
    {{ levelInfo.name }}
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { CULTIVATION_LEVELS } from '../../enums/cultivation'

const props = defineProps({
  level: {
    type: String,
    required: true,
    validator: (value) => Object.keys(CULTIVATION_LEVELS).includes(value)
  }
})

const levelInfo = computed(() => CULTIVATION_LEVELS[props.level])
</script>
