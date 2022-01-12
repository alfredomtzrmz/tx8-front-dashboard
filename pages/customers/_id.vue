<template>
  <div class="max-w-5xl mx-auto space-y-5">
    <template v-if="showCustomer">
      <template v-if="isLoaded">
        <div class="flex">
          <div class="lg:space-x-4 flex flex-col lg:flex-row lg:items-center items-start text-gray-600 px-0.5 nuxt-link-active space-y-2 lg:space-y-0">
            <BaseButton variant="transparent" size="icon" to="/customers">
              <svg class="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </BaseButton>
            <span class="text-xl font-medium text-gray-900">
              {{ getFirstName }}
            </span>
          </div>
        </div>
        <form class="flex flex-col w-full space-y-6" novalidate>
          <div class="grid grid-cols-1 gap-6 md:grid-flow-col-dense md:grid-cols-3">
            <!-- left/up content -->
            <div class="space-y-6 md:col-start-1 md:col-span-2">
              <!-- Info -->
              <div class="py-5 space-y-2 bg-white rounded-md shadow">
                <div class="flex px-4 pb-4 space-x-3 border-b sm:px-5">
                  <div class="flex-shrink-0">
                    <span class="inline-block w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                      <svg class="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">
                      {{ getFullName }}
                    </p>
                    <p class="text-sm text-gray-500">
                      <time datetime="2020-12-09T11:43:00">Cliente desde hace 3 días</time>
                    </p>
                  </div>
                </div>
                <div class="grid gap-6 px-4 py-4 xs:grid-cols-3 sm:px-5">
                  <div class="flex flex-col items-center justify-start space-y-3 text-center">
                    <nuxt-link to="#" class="text-sm p-0.5 text-blue-600 underline rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                      Último pedido
                    </nuxt-link>
                    <span class="font-semibold text-gray-900">
                      hace 40 día(s)
                    </span>
                    <span class="text-sm text-gray-500">
                      Desde la aplicación móvil
                    </span>
                  </div>
                  <div class="flex flex-col items-center justify-start space-y-3 text-center ">
                    <span class="text-sm text-gray-500">
                      Total gastado hasta la fecha
                    </span>
                    <span class="font-semibold text-gray-900">
                      $864.00
                    </span>
                    <span class="text-sm text-gray-500">
                      2 pedidos
                    </span>
                  </div>
                  <div class="flex flex-col items-center justify-start space-y-3 text-center ">
                    <span class="text-sm text-gray-500">
                      Valor promedio de los pedidos
                    </span>
                    <span class="font-semibold text-gray-900">
                      $432.00
                    </span>
                  </div>
                </div>
              </div>
              <div class="py-5 space-y-6 bg-white rounded-md shadow ">
                <h2 class="px-4 text-base font-semibold text-gray-900 sm:px-5">
                  Último pedido realizado
                </h2>
                <div class="flex flex-col px-4 space-y-2 sm:px-5">
                  <div class="flex flex-col justify-between space-y-1 sm:space-y-0 sm:items-center sm:flex-row">
                    <div class="flex flex-col items-start space-y-1 xs:flex-row xs:items-center xs:space-x-2">
                      <nuxt-link to="#" class="-ml-0.5 text-sm font-medium text-blue-600 underline rounded p-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Pedido #1006
                      </nuxt-link>
                      <BadgeStatusLastOrder />
                    </div>
                    <span class="text-sm text-gray-500">
                      Hoy a las 18:04
                    </span>
                  </div>
                  <span class="text-sm font-medium text-gray-900">
                    $1,593.00
                  </span>
                  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div class="flex items-center w-full space-x-4">
                      <div class="flex flex-col items-center justify-center flex-shrink-0 w-16 h-16 p-1 text-center border border-gray-300 rounded-md">
                        <div class="flex items-center justify-center w-full h-full">
                          <img src="https://tx8-test.s3.us-west-1.amazonaws.com/products/2cd0658f-b09c-4ee4-9c1a-c0aeaf8832f3.png" alt="Product Name" class="object-cover object-center h-full">
                        </div>
                      </div>
                      <span class="text-sm text-gray-900 line-clamp-3">
                        Cheetos Naranjas
                      </span>
                    </div>
                    <div class="flex items-center w-full space-x-4">
                      <div class="flex flex-col items-center justify-center flex-shrink-0 w-16 h-16 p-1 text-center border border-gray-300 rounded-md">
                        <div class="flex items-center justify-center w-full h-full">
                          <img src="https://tx8-test.s3.us-west-1.amazonaws.com/products/2cd0658f-b09c-4ee4-9c1a-c0aeaf8832f3.png" alt="Product Name" class="object-cover object-center h-full">
                        </div>
                      </div>
                      <span class="text-sm text-gray-900 line-clamp-3">
                        Cheetos
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col items-end justify-center px-4 pt-4 space-y-3 border-t sm:px-5">
                  <nuxt-link to="#" class="text-sm text-blue-600 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded p-0.5">
                    Ver todos los pedidos
                  </nuxt-link>
                </div>
              </div>
            </div>
            <!-- right/down content -->
            <div class="flex flex-col space-y-6 md:col-start-3 md:col-span-1">
              <WidgetVerifyAccount :customer="customer" />
              <div class="flex flex-col px-4 py-5 space-y-6 bg-white rounded-md shadow sm:px-5">
                <div class="flex justify-between">
                  <h2 class="text-base font-semibold text-gray-900">
                    Datos del cliente
                  </h2>
                <!-- <button class="inline-flex items-center p-1 text-sm font-medium text-blue-600 bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-gray-50" type="button" @click="customerInfoModalIsOpen=true">
                  Ver más
                </button> -->
                </div>
                <div class="flex flex-col">
                  <dt class="text-sm font-medium text-gray-500">
                    Correo electrónico
                  </dt>
                  <dd class="flex items-center justify-between">
                    <span class="text-sm text-gray-900">
                      {{ customer.email }}
                    </span>
                    <button
                      v-clipboard:copy="getEmail"
                      v-clipboard:success="onCopyEmail"
                      v-clipboard:error="onErrorEmail"
                      v-tippy="{appendTo: 'parent', maxWidth:200, theme: 'light', placement:'bottom', animation : 'fade'}"
                      content="Copiar correo electrónico"
                      class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-gray-50" type="button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                    </button>
                  </dd>
                </div>
                <div class="flex flex-col space-y-1">
                  <dt class="text-sm font-medium text-gray-500">
                    Teléfono principal
                  </dt>
                  <dd class="text-sm text-gray-900">
                    4770934059
                  </dd>
                </div>
                <div class="flex flex-col space-y-1">
                  <dt class="text-sm font-medium text-gray-500">
                    Dirección predeterminada
                  </dt>
                  <dd class="flex flex-col mt-1 text-sm text-gray-900">
                    <p>
                      Calle Segovia #091
                    </p>
                    <p>
                      Paseo de los arcos, 38409
                    </p>
                    <p>
                      Irapuato
                    </p>
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </form>
      </template>
      <SkeletonDynamicPage v-else />
    </template>
    <template v-else>
      CLIENTE NO ENCONTRADO
    </template>
  </div>
</template>

<script>
import * as _ from 'lodash'

export default {
  name: 'CustomerDetails',
  layout: 'default',
  data () {
    return {
      isLoaded: false,
      customer: {},
      showCustomer: true
    }
  },
  async fetch () {
    await this.fetchCustomer()
    this.isLoaded = true
  },
  fetchOnServer: false,
  computed: {
    getDetails () {
      return _.get(this.customer, ['details'], {})
    },
    getFirstName () {
      return _.get(this.getDetails, ['name'], '')
    },
    getFullName () {
      const name = _.get(this.getDetails, ['name'], '')
      const surnames = _.get(this.getDetails, ['surnames'], '')
      return `${name} ${surnames}`
    },
    getEmail () {
      return _.get(this.customer, ['email'], '')
    }
  },
  methods: {
    async fetchCustomer () {
      try {
        const customerId = this.$route.params.id
        const { data } = await this.$axios.$get(`/customers/${customerId}`)
        this.customer = data
      } catch (e) {
        const { status } = e.response

        if (status === 404) {
          this.showCustomer = false
        } else {
          this.$notify(
            {
              group: 'top',
              type: 'error',
              title: '¡Error!',
              text: 'Ocurrió un error al obtener el cliente'
            },
            3000
          )
        }
      }
    },
    onCopyEmail () {
      this.$notify(
        {
          group: 'alert',
          type: 'success',
          title: '!Muy bien!',
          text: 'Correo copiado al portapapeles'
        },
        3000
      )
    },
    onErrorEmail () {
      this.$notify(
        {
          group: 'alert',
          type: 'success',
          title: 'Muy bien!',
          text: 'Error al copiar el correo'
        },
        3000
      )
    }
  }
}
</script>
