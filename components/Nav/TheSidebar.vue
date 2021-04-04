<template>
  <div>
    <div class="flex h-screen overflow-hidden bg-white">
      <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
      <div class="md:hidden">
        <transition leave-active-class="transition duration-300 ease-in-out transform">
          <div>
            <div class="fixed inset-0 z-40 flex" role="dialog" aria-modal="true">
              <transition
                enter-active-class="transition-opacity duration-300 ease-linear"
                enter-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-300 ease-linear"
                leave-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div v-show="isSidebarOpen" class="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" />
              </transition>
              <transition
                enter-active-class="transition duration-300 ease-in-out transform"
                enter-class="-translate-x-full"
                enter-to-class="translate-x-0"
                leave-active-class="transition duration-300 ease-in-out transform"
                leave-class="translate-x-0"
                leave-to-class="-translate-x-full"
              >
                <div v-show="isSidebarOpen" class="relative flex flex-col flex-1 w-full max-w-xs bg-gray-800">
                  <div class="absolute top-0 right-0 pt-2 -mr-12">
                    <transition
                      enter-class="opacity-0"
                      enter-active-class="transition-opacity ease-in delay-200"
                      enter-to-class="opacity-100"
                    >
                      <button v-show="isSidebarOpen" class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span class="sr-only">Close sidebar</span>
                        <!-- Heroicon name: outline/x -->
                        <svg
                          class="w-6 h-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </transition>
                  </div>
                  <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
                    <div class="flex items-center flex-shrink-0 px-4">
                      <img class="w-auto h-8" src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg" alt="Workflow">
                    </div>
                    <div class="flex flex-col flex-grow mt-5">
                      <nav class="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
                        <nuxt-link to="#" class="sidebar-item sidebar-item--active group">
                          <svg class="w-6 h-6 mr-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          Dashboard
                        </nuxt-link>
                        <div class="space-y-1">
                          <button type="button" class="sidebar-item sidebar-item--w-icon group" aria-controls="sub-menu-1" aria-expanded="false" @click="isUsersOpen = !isUsersOpen">
                            <svg class="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Usuarios
                            <svg :class="{ 'rotate-90':isUsersOpen}" class="w-5 h-5 ml-auto text-gray-300 transition duration-100 transform group-hover:text-gray-400" viewBox="0 0 20 20" aria-hidden="true">
                              <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                            </svg>
                          </button>
                          <div v-if="isUsersOpen" class="space-y-1">
                            <nuxt-link to="#" class="sidebar-subitem group">
                              Resumen
                            </nuxt-link>

                            <nuxt-link to="#" class="sidebar-subitem group">
                              Administradores
                            </nuxt-link>

                            <nuxt-link to="#" class="sidebar-subitem group">
                              Repartidores
                            </nuxt-link>

                            <nuxt-link to="#" class="sidebar-subitem group">
                              Clientes
                            </nuxt-link>
                          </div>
                        </div>
                        <div class="space-y-1">
                          <button type="button" class="sidebar-item sidebar-item--w-icon group" aria-controls="sub-menu-1" aria-expanded="false" @click="isInventoryOpen = !isInventoryOpen">
                            <svg class="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Inventario
                            <svg :class="{ 'rotate-90':isInventoryOpen}" class="w-5 h-5 ml-auto text-gray-300 transition duration-100 transform group-hover:text-gray-400" viewBox="0 0 20 20" aria-hidden="true">
                              <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                            </svg>
                          </button>
                          <div v-if="isInventoryOpen" class="space-y-1">
                            <nuxt-link to="#" class="sidebar-subitem group">
                              Resumen
                            </nuxt-link>

                            <nuxt-link to="#" class="sidebar-subitem group">
                              Categorias
                            </nuxt-link>

                            <nuxt-link to="#" class="sidebar-subitem group">
                              Productos
                            </nuxt-link>

                            <nuxt-link to="#" class="sidebar-subitem group">
                              Paquetes
                            </nuxt-link>
                          </div>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </transition>

              <div class="flex-shrink-0 w-14">
                <!-- Force sidebar to shrink to fit close icon -->
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Static sidebar for desktop -->
      <div class="hidden md:flex md:flex-shrink-0">
        <div class="flex flex-col w-64">
          <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
            <div class="flex items-center flex-shrink-0 px-4">
              <img class="w-auto h-8" src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg" alt="Workflow">
            </div>
            <div class="flex flex-col flex-grow mt-5">
              <nav class="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
                <nuxt-link to="#" class="sidebar-item sidebar-item--active group">
                  <svg class="w-6 h-6 mr-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </nuxt-link>
                <div class="space-y-1">
                  <button type="button" class="sidebar-item sidebar-item--w-icon group" aria-controls="sub-menu-1" aria-expanded="false" @click="isUsersOpen = !isUsersOpen">
                    <svg class="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Usuarios
                    <svg :class="{ 'rotate-90':isUsersOpen}" class="w-5 h-5 ml-auto text-gray-300 transition duration-100 transform group-hover:text-gray-400" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                    </svg>
                  </button>
                  <div v-if="isUsersOpen" class="space-y-1">
                    <nuxt-link to="#" class="sidebar-subitem group">
                      Resumen
                    </nuxt-link>

                    <nuxt-link to="#" class="sidebar-subitem group">
                      Administradores
                    </nuxt-link>

                    <nuxt-link to="#" class="sidebar-subitem group">
                      Repartidores
                    </nuxt-link>

                    <nuxt-link to="#" class="sidebar-subitem group">
                      Clientes
                    </nuxt-link>
                  </div>
                </div>
                <div class="space-y-1">
                  <button type="button" class="sidebar-item sidebar-item--w-icon group" aria-controls="sub-menu-1" aria-expanded="false" @click="isInventoryOpen = !isInventoryOpen">
                    <svg class="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Inventario
                    <svg :class="{ 'rotate-90':isInventoryOpen}" class="w-5 h-5 ml-auto text-gray-300 transition duration-100 transform group-hover:text-gray-400" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                    </svg>
                  </button>
                  <div v-if="isInventoryOpen" class="space-y-1">
                    <nuxt-link to="#" class="sidebar-subitem group">
                      Resumen
                    </nuxt-link>

                    <nuxt-link to="#" class="sidebar-subitem group">
                      Categorias
                    </nuxt-link>

                    <nuxt-link to="#" class="sidebar-subitem group">
                      Productos
                    </nuxt-link>

                    <nuxt-link to="#" class="sidebar-subitem group">
                      Paquetes
                    </nuxt-link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheSidebar',
  data () {
    return {
      isUsersOpen: false,
      isInventoryOpen: false,
      isSidebarOpen: false
    }
  }
}
</script>
