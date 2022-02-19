<template>
  <div class="relative">
    <input v-model.number="count" v-maska="'#*'" :maxlength="4" v-bind="$attrs" type="text" class="pl-2 base-input" placeholder="0">
    <div class="absolute inset-y-0 right-0 z-10 flex flex-col items-center p-1">
      <button type="button" class="flex-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-80" @click="count++">
        <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <button :disabled="count<=0" type="button" class="flex-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed " @click="count--">
        <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VariantQuantity',
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    index: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    count: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>
