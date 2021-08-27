<template>
  <div>
    <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium" :class="returnClassColor">
      {{ returnText }}
    </span>
  </div>
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
      return this.type === 'single' ? 'bg-indigo-100 text-indigo-800' : 'bg-purple-100 text-purple-800'
    },
    returnText () {
      return this.type === 'single' ? 'Simple' : 'Variantes'
    }
  }
}
</script>
