<template>
  <span class="inline-flex items-center py-0.5 rounded-full font-medium" :class="returnClasses">
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
      return this.status === 0 ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
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
