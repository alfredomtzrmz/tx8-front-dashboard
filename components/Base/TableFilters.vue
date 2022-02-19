<template>
  <div class="relative self-start inline-block text-left">
    <button
      id="filters-menu"
      aria-expanded="true"
      aria-haspopup="true"
      class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-500/5 focus:outline-none text-primary-500 focus:bg-primary-500/10"
      type="button"
      @click.prevent="toggle()"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
      </svg>
    </button>
    <transition
      enter-active-class="duration-300 ease"
      enter-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="duration-300 ease"
      leave-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-show="isDropdownOpen"
        :class="size"
        aria-labelledby="options-menu"
        aria-orientation="vertical"
        class="absolute right-0 z-10 mt-2 origin-top-right bg-white dark:bg-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
      >
        <div role="none">
          <slot name="dropdown-body">
            <!--                        I'm the default body!-->
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TableFilters',
  props: {
    name: {
      type: String,
      default: 'Opciones'
    },
    size: {
      type: String,
      default: 'w-44'
    }
  },
  data () {
    return {
      isDropdownOpen: false
    }
  },
  beforeMount () {
    window.addEventListener('click', this.close)
  },
  beforeDestroy () {
    window.removeEventListener('click', this.close)
  },
  methods: {
    toggle () {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    close (e) {
      if (!this.$el.contains(e.target)) {
        this.isDropdownOpen = false
      }
    }
  }
}
</script>
