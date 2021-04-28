<template>
  <component
    :is="buttonType"
    class="base-button"
    :to="to"
    :class="getClasses"
    v-bind="$attrs"
    @click="$emit('onClick')"
  >
    <template v-if="isLoading">
      <svg class="w-6 h-6  stroke-current animate-spin" fill="none" viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </template>
    <template v-else>
      <slot>Button</slot>
    </template>
  </component>
</template>

<script>
const AVALIABLE_VARIANTS = ['primary', 'white']
const AVALIABLE_SIZES = ['sm', 'md', 'icon']
export default {
  name: 'BaseButton',
  inheritAttrs: false,
  props: {
    variant: {
      type: String,
      default: 'primary',
      required: false,
      validator (value) {
        return AVALIABLE_VARIANTS.includes(value)
      }
    },
    size: {
      type: String,
      required: false,
      default: 'sm',
      validator (value) {
        return AVALIABLE_SIZES.includes(value)
      }
    },
    to: {
      required: false,
      type: String,
      default: null
    },
    isLoading: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonType () {
      if (this.to) {
        return 'nuxt-link'
      } else {
        return 'button'
      }
    },
    variantClass () {
      return `base-button--${this.variant}`
    },
    sizeClass () {
      return `base-button--${this.size}`
    },
    getClasses () {
      return `${this.variantClass} ${this.sizeClass}`
    }
  }
}
</script>
