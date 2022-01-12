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
      return this.status === 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
    },
    returnText () {
      return this.status === 0 ? 'Inactivo' : 'Activo'
    }
  }
}
</script>
