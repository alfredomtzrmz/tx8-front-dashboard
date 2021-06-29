<template>
  <div class="max-w-5xl mx-auto space-y-5">
    <div class="flex">
      <div class="lg:space-x-4 flex flex-col lg:flex-row lg:items-center items-start text-gray-600 w-min px-0.5 nuxt-link-active space-y-2 lg:space-y-0">
        <base-button variant="transparent" size="icon" to="/admins">
          <svg class="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </base-button>
        <span class="text-xl font-medium text-gray-900">
          Administradores
        </span>
      </div>
    </div>

    <div class="block" aria-hidden="true">
      <div class="py-4">
        <div class="border-t border-gray-200" />
      </div>
    </div>

    <div class="mt-10 sm:mt-0">
      <div class="xl:grid xl:grid-cols-3">
        <div class="xl:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-base font-medium leading-6 text-gray-900">
              Información del administrador
            </h3>
          </div>
        </div>
        <div class="mt-5 xl:mt-0 xl:col-span-2">
          <form novalidate @submit.prevent="storeAdmin">
            <div class="overflow-hidden rounded-md shadow">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      id="name"
                      v-model="admin.name"
                      type="text"
                      name="name"
                      autocomplete="name"
                      class="mt-1 base-input"
                      :class="{'base-input--error': errors.name}"
                    >
                    <div v-if="errors.name" class="flex flex-col">
                      <span v-for="error in errors.name" :key="error.id" class="mt-1 text-xs text-red-500">
                        {{ error }}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label for="surnames" class="block text-sm font-medium text-gray-700">Apellido</label>
                    <input
                      id="surnames"
                      v-model="admin.surnames"
                      type="text"
                      name="surnames"
                      autocomplete="surnames"
                      class="mt-1 base-input"
                      :class="{'base-input--error': errors.surnames}"
                    >
                    <div v-if="errors.surnames" class="flex flex-col">
                      <span v-for="error in errors.surnames" :key="error.id" class="mt-1 text-xs text-red-500">
                        {{ error }}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      id="email"
                      v-model="admin.email"
                      type="email"
                      name="email"
                      autocomplete="email"
                      class="mt-1 base-input"
                      :class="{'base-input--error': errors.email}"
                    >
                    <div v-if="errors.email" class="flex flex-col">
                      <span v-for="error in errors.email" :key="error.id" class="mt-1 text-xs text-red-500">
                        {{ error }}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label for="phone" class="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input
                      id="phone"
                      v-model="admin.phone"
                      type="text"
                      name="phone"
                      autocomplete="phone"
                      class="mt-1 base-input"
                      :class="{'base-input--error': errors.phone}"
                    >
                    <div v-if="errors.phone" class="flex flex-col">
                      <span v-for="error in errors.phone" :key="error.id" class="mt-1 text-xs text-red-500">
                        {{ error }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-end px-4 py-3 space-x-3 text-right bg-gray-50 sm:px-6">
                <base-button :disabled="isLoadingStore" to="/admins" variant="white" class="w-32">
                  Cancelar
                </base-button>
                <base-button :disabled="isLoadingStore" type="submit" :is-loading="isLoadingStore" class="w-32">
                  Guardar
                </base-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminsCreate',
  data () {
    return {
      isLoadingStore: false,
      admin: {},
      errors: {}
    }
  },
  methods: {
    async storeAdmin () {
      this.isLoadingStore = true
      this.errors = {}
      try {
        await this.$axios.$post('/admins', this.admin)
        this.$notify({ group: 'top', type: 'success', title: '¡Guardado exitosamente!', text: 'El administrador ha sido creado' }, 3000)
        this.admin = {}
      } catch (e) {
        this.errors = e.response.status === 422 ? e.response.data.errors : {}
        const message = e.response.status === 422 ? 'Por favor, revisa los campos marcados' : 'Intentalo mas tarde'

        this.$notify({ group: 'top', type: 'error', title: '¡Error al guardar!', text: message }, 3000)
      } finally {
        this.isLoadingStore = false
      }
    }
  }
}
</script>
