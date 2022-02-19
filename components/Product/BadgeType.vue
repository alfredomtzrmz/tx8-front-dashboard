<template>
  <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium" :class="returnClassColor">
    {{ returnText }}
  </span>
</template>

<script>
export default {
  name: 'BadgeType',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    returnClassColor () {
      return this.type === 'single' ? 'text-purple-700 bg-purple-500/10 dark:text-purple-300 dark:bg-purple-500/20' : 'text-blue-700 bg-blue-500/10 dark:text-blue-300 dark:bg-blue-500/20'
    },
    returnText () {
      return this.type === 'single' ? 'Simple' : 'Variantes'
    }
  }
}
</script>
