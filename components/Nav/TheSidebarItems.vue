<template>
  <div class="flex flex-col flex-grow mt-5">
    <nav class="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
      <nuxt-link to="/" class="sidebar-item group" :class="{'sidebar-item--active':$route.name==='index'}" @click.native="setSidebarOpen">
        <svg
          class="sidebar-item-icon"
          :class="{'sidebar-item-icon--active':$route.name==='index'}"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Dashboard
      </nuxt-link>
      <div class="space-y-1">
        <button
          type="button"
          :class="{'sidebar-item--active' : $route.path.startsWith('/users') || $route.path.startsWith('/admins') || $route.path.startsWith('/customers') || $route.path.startsWith('/deliverers') }"
          class="sidebar-item sidebar-item--w-indicator group"
          aria-controls="sub-menu-1"
          aria-expanded="false"
          @click="setUsersOpen"
        >
          <svg
            class="sidebar-item-icon"
            :class="{'sidebar-item-icon--active' : $route.path.startsWith('/users') ||
              $route.path.startsWith('/admins') || $route.path.startsWith('/customers') ||
              $route.path.startsWith('/deliverers') }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Usuarios
          <svg
            :class="{ 'rotate-90' : getIsUsersOpen,
                      'sidebar-item-indicator--active' : $route.path.startsWith('/users') ||
                        $route.path.startsWith('/admins') || $route.path.startsWith('/customers') ||
                        $route.path.startsWith('/deliverers')}"
            class="sidebar-item-indicator transition duration-100 transform"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
          </svg>
        </button>
        <div v-if="getIsUsersOpen" class="space-y-1">
          <nuxt-link
            to="/users"
            class="sidebar-subitem group"
            :class="{'sidebar-subitem--active' : $route.path.startsWith('/users') }"
            @click.native="setSidebarOpen"
          >
            Resumen
          </nuxt-link>

          <nuxt-link
            to="/admins"
            class="sidebar-subitem group"
            :class="{'sidebar-subitem--active' : $route.path.startsWith('/admins') }"
            @click.native="setSidebarOpen"
          >
            Administradores
          </nuxt-link>

          <nuxt-link
            to="/deliverers"
            class="sidebar-subitem group"
            :class="{'sidebar-subitem--active' : $route.path.startsWith('/deliverers') }"
            @click.native="setSidebarOpen"
          >
            Repartidores
          </nuxt-link>

          <nuxt-link
            to="/customers"
            class="sidebar-subitem group"
            :class="{'sidebar-subitem--active' : $route.path.startsWith('/customers') }"
            @click.native="setSidebarOpen"
          >
            Clientes
          </nuxt-link>
        </div>
      </div>
      <div class="space-y-1">
        <button
          type="button"
          :class="{'sidebar-item--active' : $route.path.startsWith('/inventory') ||
            $route.path.startsWith('/categories') ||
            $route.path.startsWith('/products') || $route.path.startsWith('/packages') }"
          class="sidebar-item sidebar-item--w-indicator group"
          aria-controls="sub-menu-1"
          aria-expanded="false"
          @click="setInventoryOpen"
        >
          <svg
            class="sidebar-item-icon"
            :class="{'sidebar-item-icon--active' : $route.path.startsWith('/inventory') ||
              $route.path.startsWith('/categories') ||
              $route.path.startsWith('/products') || $route.path.startsWith('/packages') }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Inventario
          <svg
            :class="{ 'rotate-90' : getIsInventoryOpen,
                      'sidebar-item-indicator--active' : $route.path.startsWith('/inventory') ||
                        $route.path.startsWith('/categories') || $route.path.startsWith('/products') ||
                        $route.path.startsWith('/packages')}"
            class="sidebar-item-indicator transition duration-100 transform"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
          </svg>
        </button>
        <div v-if="getIsInventoryOpen" class="space-y-1">
          <nuxt-link
            to="/inventory"
            class="sidebar-subitem group"
            :class="{'sidebar-subitem--active' : $route.path.startsWith('/inventory') }"
            @click.native="setSidebarOpen"
          >
            Resumen
          </nuxt-link>
          <nuxt-link
            to="/categories"
            class="sidebar-subitem group"
            :class="{'sidebar-subitem--active' : $route.path.startsWith('/categories') }"
            @click.native="setSidebarOpen"
          >
            Categorías
          </nuxt-link>
          <nuxt-link
            to="/products"
            class="sidebar-subitem group"
            :class="{'sidebar-subitem--active' : $route.path.startsWith('/products') }"
            @click.native="setSidebarOpen"
          >
            Productos
          </nuxt-link>
          <nuxt-link
            to="/packages"
            class="sidebar-subitem group"
            :class="{'sidebar-subitem--active' : $route.path.startsWith('/packages') }"
            @click.native="setSidebarOpen"
          >
            Paquetes
          </nuxt-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TheSidebarItems',
  computed: {
    ...mapGetters('sidebar', ['getIsUsersOpen', 'getIsInventoryOpen'])
  },
  methods: {
    ...mapActions('sidebar', ['setSidebarOpen', 'setUsersOpen', 'setInventoryOpen'])
  }
}
</script>
