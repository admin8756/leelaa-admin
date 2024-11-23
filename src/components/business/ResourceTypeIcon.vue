<template>
  <span 
    class="inline-flex items-center"
    :title="resourceInfo.name"
  >
    <i :class="['fas', `fa-${resourceInfo.icon}`, iconClass]"></i>
    <span v-if="showName" class="ml-2">{{ resourceInfo.name }}</span>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { RESOURCE_TYPES } from '@enums'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => Object.keys(RESOURCE_TYPES).includes(value)
  },
  showName: {
    type: Boolean,
    default: false
  },
  iconClass: {
    type: String,
    default: ''
  }
})

const resourceInfo = computed(() => RESOURCE_TYPES[props.type])
</script>
