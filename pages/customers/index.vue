<template>
  <div class="space-y-5 w-full h-full">
    <div v-if="isLoaded" class="flex flex-col space-y-6 w-full">
      <div class="flex flex-col justify-between items-start space-y-2 sm:space-y-0 sm:flex-row">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-gray-100">
          Clientes
        </h1>
        <BaseButton v-if="customers.data && customers.data.length > 0" to="/products/create">
          Nuevo producto
        </BaseButton>
      </div>
      <template v-if="isLoaded">
        <template v-if="alreadyHasData">
          <div class="flex-col bg-white rounded-lg border border-gray-300 shadow dark:bg-gray-800 dark:border-gray-700">
            <!--            Filtros-->
            <div class="flex justify-between items-center p-2">
              <button
                aria-expanded="true"
                aria-haspopup="true"
                class="flex justify-center items-center w-10 h-10 rounded-full hover:bg-gray-500/5 focus:outline-none text-primary-500 focus:bg-primary-500/10"
                type="button"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
              </button>
              <div class="flex gap-2 items-center w-full md:w-auto md:max-w-md">
                <!--              Buscador-->
                <div class="flex items-center w-full">
                  <label class="sr-only" for="searchProducts">Buscar</label>
                  <div class="relative group">
                    <span class="flex absolute inset-y-0 left-0 justify-center items-center w-9 h-9 text-gray-400 pointer-events-none group-focus-within:text-primary-500">
                      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>        </span>
                    <input id="searchProducts"
                           v-model="searchCustomer"
                           class="input-search"
                           name="searchProducts"
                           placeholder="Buscar"
                           type="search"
                           @input="debounceSearchOrFilterCustomer"
                    >
                  </div>
                </div>
                <!--              Filtros-->
                <TableFilters size="w-72">
                  <template #dropdown-body>
                    <div class="flex flex-col p-4 space-y-2">
                      <span class="text-sm font-medium dark:text-gray-100 text-gray-900">
                        Estado:
                      </span>
                      <div class="relative flex items-start cursor-pointer">
                        <div class="flex items-center h-5">
                          <input
                            id="customer_active"
                            v-model="stateCustomerFilters"
                            aria-describedby="customer_active-description"
                            class="cursor-pointer base-checkbox"
                            name="customer_active"
                            type="checkbox"
                            value="1"
                            @change="debounceSearchOrFilterCustomer"
                          >
                        </div>
                        <div class="ml-3 text-sm">
                          <label class="font-medium text-gray-700 dark:text-gray-300 cursor-pointer" for="customer_active">
                            Activo
                          </label>
                        </div>
                      </div>
                      <div class="relative flex items-start cursor-pointer">
                        <div class="flex items-center h-5">
                          <input
                            id="customer_inactive"
                            v-model="stateCustomerFilters"
                            aria-describedby="customer_inactive-description"
                            class="cursor-pointer base-checkbox"
                            name="customer_inactive"
                            type="checkbox"
                            value="0"
                            @change="debounceSearchOrFilterCustomer"
                          >
                        </div>
                        <div class="ml-3 text-sm">
                          <label class="font-medium text-gray-700 dark:text-gray-300 cursor-pointer" for="customer_inactive">
                            Inactivo
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col p-4 space-y-2">
                      <span class="text-sm font-medium dark:text-gray-100 text-gray-900">
                        Cuenta verificada:
                      </span>
                      <div class="relative flex items-start cursor-pointer">
                        <div class="flex items-center h-5">
                          <input
                            id="identification_verified_authorized"
                            v-model="identificationVerifiedFilters"
                            aria-describedby="identification_verified_authorized-description"
                            class="cursor-pointer base-checkbox"
                            name="identification_verified_authorized"
                            type="checkbox"
                            value="1"
                            @change="debounceSearchOrFilterCustomer"
                          >
                        </div>
                        <div class="ml-3 text-sm">
                          <label class="font-medium text-gray-700 dark:text-gray-300 cursor-pointer" for="identification_verified_authorized">
                            Autorizada
                          </label>
                        </div>
                      </div>
                      <div class="relative flex items-start cursor-pointer">
                        <div class="flex items-center h-5">
                          <input
                            id="identification_verified_unauthorized"
                            v-model="identificationVerifiedFilters"
                            aria-describedby="identification_verified_unauthorized-description"
                            class="cursor-pointer base-checkbox"
                            name="identification_verified_unauthorized"
                            type="checkbox"
                            value="0"
                            @change="debounceSearchOrFilterCustomer"
                          >
                        </div>
                        <div class="ml-3 text-sm">
                          <label class="font-medium text-gray-700 dark:text-gray-300 cursor-pointer" for="identification_verified_unauthorized">
                            No autorizada
                          </label>
                        </div>
                      </div>
                    </div>
                  </template>
                </TableFilters>
              </div>
            </div>
            <!--            Tabla-->
            <div class="flex flex-col w-full">
              <div class="block overflow-x-auto relative w-full border-t border-b border-gray-300 dark:border-gray-700">
                <BaseSpinnerTable v-if="isFetching" />
                <table v-if="customers.data.length > 0 " class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                  <thead>
                    <tr class="bg-gray-50">
                      <th class="px-4 py-2 dark:bg-gray-800">
                        <button type="button" class="flex items-center space-x-1 text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-300">
                          <span>
                            Cliente
                          </span>
                        </button>
                      </th>
                      <th class="px-4 py-2 dark:bg-gray-800">
                        <div class="flex items-center text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-300">
                          <span>
                            Correo
                          </span>
                        </div>
                      </th>
                      <th class="px-4 py-2 dark:bg-gray-800">
                        <div class="flex items-center text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-300">
                          <span>
                            Cuenta verificada
                          </span>
                        </div>
                      </th>
                      <th class="px-4 py-2 dark:bg-gray-800">
                        <div class="flex items-center text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-300">
                          <span>
                            Estado
                          </span>
                        </div>
                      </th>
                      <th class="px-4 py-2 dark:bg-gray-800">
                        <button type="button" class="flex items-center space-x-1 text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-300">
                          <span>
                            Registrado el
                          </span>
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    <tr v-for="(customer,index) in customers.data" :key="index" class="cursor-pointer" @click="redirectToEditCustomer(customer.user_id)">
                      <td class="px-4 py-3 whitespace-nowrap">
                        <nuxt-link :to="`/customers/${customer.user_id}`" class="text-gray-900 rounded-md dark:text-white hover:underline line-clamp-3 focus:outline-none focus:ring-primary-500/25 focus:ring-2">
                          {{ getFullName(customer) }}
                        </nuxt-link>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <span class="inline-flex justify-center items-center text-gray-900 dark:text-white">
                          {{ customer.email }}
                        </span>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="flex items-center">
                          <BadgeIdentificationVerified :details="customer.details" />
                        </div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="flex items-center">
                          <BadgeStatusUser :status="customer.details.status" />
                        </div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <span class="text-gray-900 dark:text-white">
                          {{ parseDate(customer.created_at) }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-else class="flex flex-col items-center justify-center h-64 py-8 space-y-4 text-center">
                  <svg class="flex-shrink-0 w-10 h-10 text-gray-400 sm:w-16 sm:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
                  </svg>
                  <div class="flex flex-col space-y-2">
                    <p class="text-lg sm:text-xl">
                      No se encontraron los clientes
                    </p>
                    <p class="text-sm text-gray-500">
                      Intenta cambiar los filtros o el término de búsqueda
                    </p>
                  </div>
                </div>
              </div>
              <BasePaginator
                v-if="customers.data.length > 0"
                v-model="customers.meta.current_page"
                :disabled="isFetching"
                :is-fetching="isFetching"
                :item-count="customers.data.length"
                :items-per-page.sync="customers.meta.per_page"
                :total-items="customers.meta.total"
                :total-pages="customers.meta.last_page"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="h-full overflow-hidden text-center bg-white rounded-lg shadow">
            <div class="flex flex-col p-8">
              <img alt="Inicio Clientes" class="h-auto mx-auto w-72" src="@/static/images/main-pages/main-customer-motion.svg">
              <p class="text-xl">
                Gestionar los detalles del cliente
              </p>
              <p class="max-w-xs mx-auto my-4 text-sm text-gray-500">
                Aquí es donde puede ver la información de los clientes, admitirlos y gestionar sus accesos.
              </p>
            </div>
          </div>
        </template>
      </template>
    </div>
    <SkeletonIndexPage v-else />
  </div>
</template>

<script>
import * as _ from 'lodash'
import * as dayjs from 'dayjs'
import 'dayjs/locale/es'

export default {
  name: 'CustomersIndex',
  layout: 'default',
  transition: 'tweakOpacity',
  data () {
    return {
      isLoaded: false,
      alreadyHasData: 0,
      isFetching: false,
      searchCustomer: '',
      stateCustomerFilters: [],
      identificationVerifiedFilters: [],
      customers: {},
      isSearchOrSelect: false
    }
  },
  fetchOnServer: false,
  async fetch () {
    await this.fetchCustomers()
    this.isLoaded = true
  },
  watch: {
    'customers.meta.current_page' () {
      if (this.isLoaded) {
        this.fetchCustomers()
      }
    },
    'customers.meta.per_page' (newValue, oldValue) {
      if (this.isLoaded) {
        if (Number(newValue) !== Number(oldValue)) {
          this.isSearchOrSelect = true
          this.fetchCustomers()
        }
      }
    }
  },
  methods: {
    async fetchCustomers () {
      try {
        this.isFetching = true
        this.customers = await this.$axios.$get('/customers', {
          params: {
            'filter[search]': this.searchCustomer || null,
            'filter[status]': this.stateCustomerFilters,
            'filter[identification_verified]': this.identificationVerifiedFilters,
            limit: this.customers.meta?.per_page ?? 10,
            page: this.isSearchOrSelect ? 1 : (this.customers.meta?.current_page ?? 1)
          }
        })
        this.alreadyHasData = this.alreadyHasData !== 0 ? this.alreadyHasData : this.customers.data.length
        this.isFetching = false
      } catch (e) {
        this.$notify(
          {
            group: 'top',
            type: 'error',
            title: '¡Error!',
            text: 'Ocurrió un error al obtener los clientes'
          },
          2000
        )
      } finally {
        this.isSearchOrSelect = false
      }
    },
    debounceSearchOrFilterCustomer: _.debounce(function () {
      this.isSearchOrSelect = true
      this.fetchCustomers()
    }, 300),
    getFullName (customer) {
      const name = _.get(customer, ['details', 'name'], '')
      const surnames = _.get(customer, ['details', 'surnames'], '')
      return `${name} ${surnames}`
    },
    parseDate (date) {
      return dayjs(date).locale('es').format('DD MMMM YYYY')
    },
    redirectToEditCustomer (id) {
      this.$router.push(`/customers/${id}`)
    }
  }
}
</script>
