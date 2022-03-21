<template>
  <div class="h-full">
    <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
    <div class="lg:hidden">
      <transition leave-active-class="transition duration-300 ease-in-out transform">
        <div v-show="getIsSidebarOpen" class="fixed inset-0 z-40 flex">
          <transition
            enter-active-class="transition-opacity duration-300 ease-linear"
            enter-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300 ease-linear"
            leave-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div v-show="getIsSidebarOpen" aria-hidden="true" class="fixed inset-0" @click="setSidebarOpen">
              <div class="absolute inset-0 bg-gray-600 opacity-75" />
            </div>
          </transition>
          <transition
            enter-active-class="transition duration-300 ease-in-out transform"
            enter-class="-translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition duration-300 ease-in-out transform"
            leave-class="translate-x-0"
            leave-to-class="-translate-x-full"
          >
            <div v-show="getIsSidebarOpen" class="relative flex flex-col flex-1 w-full max-w-xs bg-gray-800">
              <div class="absolute top-0 right-0 pt-2 -mr-12">
                <transition
                  enter-active-class="transition-opacity ease-in delay-200"
                  enter-class="opacity-0"
                  enter-to-class="opacity-100"
                >
                  <button v-show="getIsSidebarOpen" class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="setSidebarOpen">
                    <span class="sr-only">Close sidebar</span>
                    <svg
                      aria-hidden="true"
                      class="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    </svg>
                  </button>
                </transition>
              </div>
              <aside class="flex flex-col flex-grow overflow-y-auto bg-white border-r border-gray-200">
                <header class="border-b h-16 shrink-0 px-6 flex items-center dark:bg-gray-800 dark:border-gray-700">
                  <span class="text-xl font-bold tracking-tight dark:text-white">
                    TX8 Admin
                  </span>
                </header>
                <TheSidebarItemsMobile />
              </aside>
            </div>
          </transition>
          <div aria-hidden="true" class="flex-shrink-0 w-14">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </transition>
    </div>
    <!-- Static sidebar for desktop -->
    <aside class="fixed z-10 hidden h-full bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col border-r border-gray-200 w-72 lg:flex-1 lg:flex">
      <header class="border-b h-16 shrink-0 px-6 flex items-center dark:bg-gray-800 dark:border-gray-700">
        <span class="text-xl font-bold tracking-tight dark:text-white">
          TX8 Admin
        </span>
      </header>
      <TheSidebarItems />
    </aside>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TheSidebar',
  computed: {
    ...mapGetters('sidebar', ['getIsSidebarOpen'])
  },
  watch: {
    getIsSidebarOpen: {
      immediate: true,
      handler (getIsSidebarOpen) {
        if (process.client) {
          if (getIsSidebarOpen) {
            document.body.classList.add('overflow-y-hidden')
          } else {
            setTimeout(() => {
              document.body.classList.remove('overflow-y-hidden')
            }, 200)
          }
        }
      }
    }
  },
  methods: {
    ...mapActions('sidebar', ['setSidebarOpen'])
  }
}
</script>
