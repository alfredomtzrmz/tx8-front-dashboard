<template>
  <span
    class="inline-flex items-center justify-center min-h-6 px-2 py-0.5 text-sm font-medium tracking-tight rounded-xl whitespace-normal"
    :class="returnClasses"
  >
    {{ returnText }}
  </span>
</template>

<script>
export default {
  name: 'BadgeStatus',
  props: {
    size: {
      type: String,
      default: 'normal'
    },
    status: {
      type: Number,
      required: true
    }
  },
  computed: {
    returnSizeClass () {
      return this.size === 'normal' ? 'px-3 text-sm' : 'text-xs px-2.5'
    },
    returnClassColor () {
      return this.status === 0 ? 'text-gray-700 bg-gray-500/10 dark:text-gray-300 dark:bg-gray-500/20' : 'bg-green-500/10 text-green-700 dark:text-green-500'
    },
    returnClasses () {
      return `${this.returnSizeClass} ${this.returnClassColor}`
    },
    returnText () {
      return this.status === 0 ? 'Borrador' : 'Activo'
    }
  }
}
</script>
