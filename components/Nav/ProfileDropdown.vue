<template>
  <div class="relative ml-3">
    <div>
      <button
        id="user-menu"
        type="button"
        class="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-200 lg:p-1 lg:rounded-md lg:hover:bg-gray-50"
        aria-expanded="false"
        aria-haspopup="true"
        @click.prevent="toggle"
      >
        <img class="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixqx=ewQE7Eu8DO&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
        <span class="hidden ml-3 text-sm font-medium text-gray-700 lg:block"><span class="sr-only">Open user menu for </span>{{ userName }} {{ userSurnames }}</span>
        <svg class="flex-shrink-0 hidden w-5 h-5 ml-1 text-gray-400 lg:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-show="isDropdownOpen" class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Tu perfil</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Ajustes</a>
        <button type="button" class="flex w-full px-4 py-2 text-sm text-gray-700 focus:outline-none hover:bg-gray-100" role="menuitem" @click="logout()">
          Cerrar sesión
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import * as _ from 'lodash'
export default {
  data () {
    return {
      isDropdownOpen: false
    }
  },
  computed: {
    userInfo () {
      return _.get(this.$store.state, ['auth', 'user', 'user_details'], null)
    },
    userName () {
      return _.get(this.userInfo, ['name'], '')
    },
    userSurnames () {
      return _.get(this.userInfo, ['surnames'], '')
    }
  },
  beforeMount () {
    window.addEventListener('click', this.close)
  },

  beforeDestroy () {
    window.removeEventListener('click', this.close)
  },
  methods: {
    async logout () {
      this.isDropdownOpen = false
      await this.$auth.logout()
    },
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
