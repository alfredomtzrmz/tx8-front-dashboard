<template>
  <span class="inline-flex items-center justify-center text-gray-900 dark:text-white" :class="returnClassColor">
    {{ quantity }}
  </span>
</template>

<script>
export default {
  name: 'VariantsQuantity',
  props: {
    quantity: {
      type: Number,
      required: true
    }
  },
  computed: {
    returnClassColor () {
      const baseClasses = 'px-2.5 py-0.5 rounded-md'
      const dynamicColor = this.quantity <= 5 ? 'text-red-700 bg-red-500/10 dark:text-red-500' : this.quantity > 6 && this.quantity <= 10 ? 'text-amber-700 bg-amber-500/10 dark:text-amber-500' : 'text-gray-900 dark:text-white'
      return `${baseClasses} ${dynamicColor}`
    }
  }
}
</script>
