<template>
  <div class="sticky top-0 z-20 flex items-center flex-shrink-0 px-4 bg-white dark:bg-gray-800 dark:border-gray-700 border-b h-16 sm:px-6 lg:px-8">
    <button class="inline-flex p-2 -mx-1.5 text-gray-500 rounded-md focus:outline-none lg:hidden hover:bg-gray-100" @click="setSidebarOpen">
      <span class="sr-only">Open sidebar</span>
      <svg aria-hidden="true" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6h16M4 12h8m-8 6h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
      </svg>
    </button>
    <div class="flex justify-between flex-1 ">
      <div class="flex items-center ml-auto">
        <AppDarkModeToggle />
        <button class="p-1 text-gray-500 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-200">
          <span class="sr-only">View notifications</span>
          <svg aria-hidden="true" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
        </button>
        <ProfileDropdown />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TheNavbar',
  methods: {
    ...mapActions('sidebar', ['setSidebarOpen'])
  }
}
</script>
