<template>
  <div class="mx-auto space-y-5 max-w-[100rem]">
    <div v-if="isLoaded" class="flex flex-col w-full space-y-6">
      <div class="flex items-start justify-between">
        <h1 class="text-xl font-semibold">
          Clientes
        </h1>
      </div>
      <div class="flex-col sm:space-y-6">
        <template v-if="isLoaded">
          <template v-if="alreadyHasData">
            <div class="flex-col px-4 py-6 space-y-6 bg-white rounded-lg shadow sm:px-6">
              <div class="flex w-full space-x-2">
                <div class="flex items-center w-full sm:max-w-xs lg:max-w-sm">
                  <label for="searchCustomers" class="sr-only">Buscar</label>
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      id="searchCustomers"
                      v-model="searchCustomer"
                      name="searchCustomers"
                      class="pl-10 pr-3 base-input focus:placeholder-gray-500"
                      placeholder="Filtrar cliente"
                      type="search"
                      @input="debounceSearchOrFilterCustomer"
                    >
                  </div>
                </div>
                <div class="relative z-10 inline-flex rounded-md shadow-sm">
                  <div class="z-10 hidden xs:block">
                    <label for="itemsCount" class="sr-only">Elementos a mostrar</label>
                    <select id="itemsCount" v-model="itemsPerPage" name="itemsCount" class="select-table rounded-l-md" @change="debounceSearchOrFilterCustomer">
                      <option v-for="(item,index) in itemsPerPageData" :key="index" :value="item">
                        {{ item }}
                      </option>
                    </select>
                  </div>
                  <TableFilters name="Estado" size="w-60">
                    <template #dropdown-body>
                      <div class="flex flex-col p-4 space-y-2">
                        <span class="text-sm font-medium text-gray-800">Estado:</span>
                        <div class="relative flex items-start cursor-pointer">
                          <div class="flex items-center h-5">
                            <input
                              id="customer_active"
                              v-model="stateCustomerFilters"
                              value="1"
                              aria-describedby="customer_active-description"
                              name="customer_active"
                              type="checkbox"
                              class="cursor-pointer base-checkbox"
                              @change="debounceSearchOrFilterCustomer"
                            >
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="customer_active" class="font-medium text-gray-600 cursor-pointer">Activo</label>
                          </div>
                        </div>
                        <div>
                          <div class="relative flex items-start cursor-pointer">
                            <div class="flex items-center h-5">
                              <input
                                id="customer_inactive"
                                v-model="stateCustomerFilters"
                                value="0"
                                aria-describedby="customer_inactive-description"
                                name="customer_inactive"
                                type="checkbox"
                                class="cursor-pointer base-checkbox"
                                @change="debounceSearchOrFilterCustomer"
                              >
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="customer_inactive" class="font-medium text-gray-600 cursor-pointer">Inactivo</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-col p-4 space-y-2">
                        <span class="text-sm font-medium text-gray-800">Cuenta verificada:</span>
                        <div class="relative flex items-start cursor-pointer">
                          <div class="flex items-center h-5">
                            <input
                              id="identification_verified_authorized"
                              v-model="identificationVerifiedFilters"
                              value="1"
                              aria-describedby="identification_verified_authorized-description"
                              name="identification_verified_authorized"
                              type="checkbox"
                              class="cursor-pointer base-checkbox"
                              @change="debounceSearchOrFilterCustomer"
                            >
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="identification_verified_authorized" class="font-medium text-gray-600 cursor-pointer">Autorizada</label>
                          </div>
                        </div>
                        <div>
                          <div class="relative flex items-start cursor-pointer">
                            <div class="flex items-center h-5">
                              <input
                                id="identification_verified_unauthorized"
                                v-model="identificationVerifiedFilters"
                                value="0"
                                aria-describedby="identification_verified_unauthorized-description"
                                name="identification_verified_unauthorized"
                                type="checkbox"
                                class="cursor-pointer base-checkbox"
                                @change="debounceSearchOrFilterCustomer"
                              >
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="identification_verified_unauthorized" class="font-medium text-gray-600 cursor-pointer">No autorizada</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </TableFilters>
                </div>
                <!-- <button class="relative inline-flex items-center px-4 py-2 -ml-px font-medium text-gray-700 bg-white border border-gray-300 rounded-md xs:hidden sm:text-sm justify-items-center hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus:ring-opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button> -->
              </div>
              <div class="flex flex-col w-full my-2 space-y-4">
                <div class="relative block w-full overflow-x-auto rounded rounded-t" :class="{'shadow': customers.data.length > 0}">
                  <template v-if="isFetching">
                    <div class="absolute inset-0 z-0 bg-white opacity-60" />
                    <div class="absolute inset-0 z-0 flex items-center justify-center">
                      <svg class="w-10 h-10 text-primary-500 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </div>
                  </template>
                  <table v-if="customers.data.length >0 " class="min-w-full divide-y divide-gray-50">
                    <thead class="border-b bg-gray-50">
                      <tr>
                        <th class="px-6 py-3">
                          <div class="flex items-center text-xs text-left">
                            <span class="font-medium tracking-wider text-gray-500 uppercase"> Cliente </span>
                          </div>
                        </th>
                        <th class="px-6 py-3">
                          <div class="flex items-center text-xs text-left">
                            <span class="font-medium tracking-wider text-gray-500 uppercase"> Cuenta verificada </span>
                          </div>
                        </th>
                        <th class="px-6 py-3">
                          <div class="flex items-center text-xs text-left">
                            <span class="font-medium tracking-wider text-gray-500 uppercase"> Estado </span>
                          </div>
                        </th>
                        <th class="px-6 py-3">
                          <div class="flex items-center text-xs text-left">
                            <span class="font-medium tracking-wider text-gray-500 uppercase"> Registrado el </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody v-if="customers.data.length > 0" class="bg-white divide-y divide-gray-200">
                      <tr v-for="(customer,index) in customers.data" :key="index" class="cursor-pointer hover:bg-gray-50" @click="redirectToEditCustomer(customer.user_id)">
                        <td class="px-6 py-4 text-left whitespace-nowrap">
                          <div class="flex items-center">
                            <span class="inline-block w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                              <svg class="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </span>
                            <div class="ml-4">
                              <nuxt-link :to="`/customers/${customer.user_id}`" class="text-sm font-medium text-gray-900 rounded-md hover:underline line-clamp-3 focus:outline-none focus:ring-primary-500 focus:ring-2 focus:ring-opacity-50">
                                {{ getFullName(customer) }}
                              </nuxt-link>
                              <div class="text-sm text-gray-500">
                                {{ customer.email }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 text-left whitespace-nowrap">
                          <div class="flex items-center">
                            <BadgeIdentificationVerified :details="customer.details" />
                          </div>
                        </td>
                        <td class="px-6 py-4 text-left whitespace-nowrap">
                          <div class="flex items-center">
                            <BadgeStatusUser :status="customer.details.status" />
                          </div>
                        </td>
                        <td class="px-6 py-4 text-sm text-left whitespace-nowrap">
                          <span class="inline-flex items-center justify-center">
                            {{ parseDate(customer.created_at) }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-else class="flex flex-col items-center justify-center h-64 py-8 space-y-4 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-10 h-10 text-gray-400 sm:w-16 sm:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                  :total-items="customers.meta.total"
                  :item-count="customers.data.length"
                  :items-per-page="customers.meta.per_page"
                  :total-pages="customers.meta.last_page"
                  :disabled="isFetching"
                />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="h-full overflow-hidden text-center bg-white rounded-lg shadow">
              <div class="flex flex-col p-8">
                <img src="@/static/images/main-pages/main-customer-motion.svg" alt="Inicio Clientes" class="h-auto mx-auto w-72">
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
      isFetching: true,
      searchCustomer: '',
      stateCustomerFilters: [],
      identificationVerifiedFilters: [],
      itemsPerPage: 10,
      itemsPerPageData: [10, 15, 25, 50, 100],
      customers: {
        meta: {
          current_page: 1
        }
      }
    }
  },
  fetchOnServer: false,
  async fetch () {
    await this.fetchCustomers()
    this.isLoaded = true
  },
  watch: {
    'customers.meta.current_page' () {
      this.fetchCustomers()
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
            limit: this.itemsPerPage,
            page: this.customers.meta.current_page
          }
        })
        this.alreadyHasData = this.alreadyHasData !== 0 ? this.alreadyHasData : this.customers.data.length
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
        this.isFetching = false
      }
    },
    debounceSearchOrFilterCustomer: _.debounce(function () {
      this.searchOrSelectCustomer()
    }, 300),
    searchOrSelectCustomer () {
      this.customers.meta.current_page = 1
      this.fetchCustomers()
    },
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
