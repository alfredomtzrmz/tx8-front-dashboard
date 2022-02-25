<template>
  <div>
    <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium" :class="returnClassColor">
      {{ returnText }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'BadgeStatusUser',
  props: {
    status: {
      type: Number,
      required: true
    }
  },
  computed: {
    returnClassColor () {
      return this.status === 0 ? 'text-red-700 bg-red-500/10 dark:text-red-500' : 'bg-green-500/10 text-green-700 dark:text-green-500'
    },
    returnText () {
      return this.status === 0 ? 'Inactivo' : 'Activo'
    }
  }
}
</script>
