<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    :width="size" 
    :height="size" 
    :viewBox="viewBox"
    :class="[`stroke-${color}`, `fill-${fillColor}`, className]"
  >
    <template v-if="name === 'camera'">
      <circle cx="12" cy="12" r="10" stroke-width="2" fill="none"/>
      <circle cx="12" cy="12" r="3" stroke-width="2" fill="none"/>
    </template>

    <template v-else-if="name === 'close'">
      <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
    </template>

    <template v-else-if="name === 'plus'">
      <path d="M12 6v12M6 12h12" stroke-width="2" stroke-linecap="round"/>
    </template>

    <template v-else-if="name === 'trash'">
      <path d="M4 6h16M7 6V4a2 2 0 012-2h6a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6h14" stroke-width="2" fill="none"/>
      <path d="M10 11v6M14 11v6" stroke-width="2" stroke-linecap="round"/>
    </template>

    <template v-else-if="name === 'edit'">
      <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke-width="2" fill="none"/>
    </template>

    <template v-else-if="name === 'print'">
      <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" stroke-width="2" fill="none"/>
      <path d="M6 14h12v8H6v-8z" stroke-width="2" fill="none"/>
    </template>

    <template v-else-if="name === 'location'">
      <path d="M12 21s-8-4.5-8-11a8 8 0 1116 0c0 6.5-8 11-8 11z" stroke-width="2" fill="none"/>
      <circle cx="12" cy="10" r="3" stroke-width="2" fill="none"/>
    </template>

    <template v-else-if="name === 'warning'">
      <path d="M12 9v4M12 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round" fill="none"/>
    </template>
  </svg>
</template>

<script>
export default {
  name: 'LeelaaIcon',

  props: {
    name: {
      type: String,
      required: true,
      validator: (value) => [
        'camera',
        'close',
        'plus',
        'trash',
        'edit',
        'print',
        'location',
        'warning'
      ].includes(value)
    },
    size: {
      type: [Number, String],
      default: 24
    },
    color: {
      type: String,
      default: 'current'
    },
    fillColor: {
      type: String,
      default: 'none'
    },
    className: {
      type: String,
      default: ''
    }
  },

  computed: {
    viewBox() {
      return '0 0 24 24'
    }
  }
}
</script>
