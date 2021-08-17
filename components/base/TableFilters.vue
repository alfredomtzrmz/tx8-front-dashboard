<template>
  <div class="relative self-start inline-block text-left">
    <button
      id="filters-menu"
      type="button"
      aria-expanded="true"
      aria-haspopup="true"
      class="relative inline-flex items-center px-4 py-2 -ml-px font-medium text-gray-700 bg-white border border-gray-300 sm:text-sm justify-items-center rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus:ring-opacity-50"
      @click.prevent="toggle()"
    >
      {{ name }}
      <svg class="flex-shrink-0 w-6 h-6 ml-2 -mr-1 text-gray-500 sm:w-5 sm:h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="isDropdownOpen"
        :class="size"
        class="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div class="py-1" role="none" :class="{'overflow-y-auto max-h-64':scrollable}">
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
      default: 'w-36'
    },
    scrollable: {
      type: Boolean,
      default: false
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
