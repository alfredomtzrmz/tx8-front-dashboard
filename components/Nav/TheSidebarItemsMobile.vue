<template>
  <nav aria-label="SidebarMobile" class="overflow-y-auto flex-1 py-6 space-y-1 h-0 bg-white dark:bg-gray-800">
    <ul class="space-y-6">
      <li class="px-6 sidebar-group">
        <ul class="-ml-3 space-y-1 text-sm">
          <li class="sidebar-item">
            <nuxt-link to="/" class="sidebar-item-link" :class="{'sidebar-item-link--active':$route.name==='index'}" @click.native="setSidebarOpen">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>
                Dashboard
              </span>
            </nuxt-link>
          </li>
        </ul>
      </li>
      <li class="px-6 pt-6 border-t sidebar-group dark:border-gray-700">
        <button class="flex justify-between items-center w-full" @click="setUsersOpen">
          <span class="text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300">
            Usuarios
          </span>
          <svg class="w-3 h-3 text-gray-600 transition dark:text-gray-300" :class="{ 'rotate-180' : getIsUsersOpen}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <CollapseTransition :duration="200">
          <ul v-show="getIsUsersOpen" class="mt-2 -ml-3 space-y-1 text-sm">
            <li class="sidebar-item">
              <nuxt-link to="/admins" class="sidebar-item-link" :class="{'sidebar-item-link--active' : $route.path.startsWith('/admins') }" @click.native="setSidebarOpen">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                <span>
                  Administradores
                </span>
              </nuxt-link>
            </li>
            <li class="sidebar-item">
              <nuxt-link to="/dealers" class="sidebar-item-link" :class="{'sidebar-item-link--active' : $route.path.startsWith('/dealers') }" @click.native="setSidebarOpen">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                <span>
                  Repartidores
                </span>
              </nuxt-link>
            </li>
            <li class="sidebar-item">
              <nuxt-link to="/customers" class="sidebar-item-link" :class="{'sidebar-item-link--active' : $route.path.startsWith('/customers') }" @click.native="setSidebarOpen">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>
                  Clientes
                </span>
              </nuxt-link>
            </li>
          </ul>
        </CollapseTransition>
      </li>
      <li class="px-6 pt-6 border-t sidebar-group dark:border-gray-700">
        <button class="flex justify-between items-center w-full" @click="setInventoryOpen">
          <span class="text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300">
            Inventario
          </span>
          <svg class="w-3 h-3 text-gray-600 transition dark:text-gray-300" :class="{ 'rotate-180' : getIsInventoryOpen}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <CollapseTransition :duration="200">
          <ul v-show="getIsInventoryOpen" class="mt-2 -ml-3 space-y-1 text-sm">
            <li class="sidebar-item">
              <nuxt-link to="/categories" class="sidebar-item-link" :class="{'sidebar-item-link--active' : $route.path.startsWith('/categories') }" @click.native="setSidebarOpen">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>
                  Categorías
                </span>
              </nuxt-link>
            </li>
            <li class="sidebar-item">
              <nuxt-link to="/products" class="sidebar-item-link" :class="{'sidebar-item-link--active' : $route.path.startsWith('/products') }" @click.native="setSidebarOpen">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>
                  Productos
                </span>
              </nuxt-link>
            </li>
          </ul>
        </CollapseTransition>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CollapseTransition from '@ivanv/vue-collapse-transition'

export default {
  name: 'TheSidebarItems',
  components: {
    CollapseTransition
  },
  computed: {
    ...mapGetters('sidebar', ['getIsUsersOpen', 'getIsInventoryOpen'])
  },
  methods: {
    ...mapActions('sidebar', ['setSidebarOpen', 'setUsersOpen', 'setInventoryOpen'])
  }
}
</script>
