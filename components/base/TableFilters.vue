<template>
  <div class="relative self-start inline-block text-left">
    <button
      id="filters-menu"
      type="button"
      aria-expanded="true"
      aria-haspopup="true"
      class="relative z-10 inline-flex items-center px-4 py-2 -ml-px font-medium text-gray-700 bg-white border border-gray-300 sm:text-sm justify-items-center rounded-l-md xs:rounded-l-none rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus:ring-opacity-50"
      @click.prevent="toggle()"
    >
      <span class="hidden xs:block">
        Filtros
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-6 h-6 text-gray-500 xs:ml-2 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
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
        class="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg lg:left-0 lg:origin-top-left ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
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
