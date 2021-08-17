<template>
  <div class="flex flex-col w-full space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold">
        Productos
      </h1>
      <base-button v-if="products.data && products.data.length > 0" to="/products/create">
        Agregar producto
      </base-button>
    </div>
    <div class="flex-col sm:space-y-6">
      <template v-if="isLoaded">
        <template v-if="products.data.length >0">
          <div class="flex-col px-4 py-6 space-y-6 bg-white rounded-lg shadow sm:px-6">
            <div class="flex w-full space-x-2">
              <div class="flex items-center w-full sm:max-w-xs lg:max-w-sm">
                <label for="searchExperiences" class="sr-only">Buscar</label>
                <div class="relative w-full">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input id="searchExperiences"
                         name="searchExperiences"
                         class="pl-10 pr-3 base-input focus:placeholder-gray-500"
                         placeholder="Filtrar productos"
                         type="search"
                  >
                </div>
              </div>
              <div class="relative z-10 hidden rounded-md shadow-sm xs:inline-flex">
                <label for="itemsCount" class="sr-only">Elementos a mostrar</label>
                <select id="itemsCount" name="itemsCount" class="select-table rounded-l-md">
                  <option v-for="(item,index) in itemsPerPage" :key="index" :value="item">
                    {{ item }}
                  </option>
                </select>
                <TableFilters name="Estado">
                  <template #dropdown-body>
                    <div class="flex flex-col">
                      filters here
                    </div>
                  </template>
                </TableFilters>
              </div>
              <button class="relative inline-flex items-center px-4 py-2 -ml-px font-medium text-gray-700 bg-white border border-gray-300 rounded-md xs:hidden sm:text-sm justify-items-center hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus:ring-opacity-50">
                Filtros
              </button>
            </div>
            <div class="flex flex-col w-full my-2 space-y-4">
              <div class="relative block w-full overflow-x-auto rounded rounded-t shadow">
                <template v-if="isFetching">
                  <div class="absolute inset-0 z-50 bg-white opacity-60" />
                  <div class="absolute inset-0 z-50 flex items-center justify-center">
                    <svg class="w-10 h-10 text-primary-500 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                </template>
                <table class="w-full divide-y table-fixed divide-gray-50">
                  <thead class="border-b bg-gray-50">
                    <tr>
                      <th class="w-64 px-6 py-3">
                        <div class="flex items-center text-xs text-left">
                          <span class="font-medium tracking-wider text-gray-500 uppercase"> Producto </span>
                        </div>
                      </th>
                      <th class="px-6 py-3 w-36">
                        <div class="flex items-center text-xs text-left">
                          <span class="font-medium tracking-wider text-gray-500 uppercase"> Estado </span>
                        </div>
                      </th>
                      <th class="px-6 py-3 w-36">
                        <div class="flex items-center text-xs text-left">
                          <span class="font-medium tracking-wider text-gray-500 uppercase"> Inventario </span>
                        </div>
                      </th>
                      <th class="px-6 py-3 w-36">
                        <div class="flex items-center text-xs text-left">
                          <span class="font-medium tracking-wider text-gray-500 uppercase"> Tipo </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(product,index) in products.data" :key="index" class="cursor-pointer hover:bg-gray-50" @click="redirectToEditProduct(product.id)">
                      <td class="flex items-center px-6 py-4 text-left">
                        <div class="flex items-center w-full space-x-2">
                          <div class="flex flex-col items-center justify-center flex-shrink-0 w-16 h-16 p-1 text-center border border-gray-300 rounded-md">
                            <div class="relative w-full h-full">
                              <div class="absolute flex items-center justify-center w-full h-full">
                                <img :src="product.variants[0].thumbnail_path" :alt="product.name" class="object-cover object-center h-full">
                              </div>
                            </div>
                          </div>
                          <nuxt-link :to="`/products/${product.id}`" class="text-sm font-medium text-gray-900 hover:underline line-clamp-2 focus:outline-none focus:ring-primary-500 focus:ring-2 focus:rounded-md">
                            {{ product.name }}
                          </nuxt-link>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-left">
                        <div class="flex items-center">
                          <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            Borrador
                          </span>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-left">
                        <div class="flex items-center">
                          <span class="">
                            0
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <BasePaginator
                v-model="products.meta.current_page"
                :total-items="products.meta.total"
                :item-count="products.data.length"
                :items-per-page="products.meta.per_page"
                :total-pages="products.meta.last_page"
                :disabled="isFetching"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="h-full overflow-hidden text-center bg-white rounded-lg shadow">
            <div class="flex flex-col p-8">
              <img src="@/static/images/main-pages/main-product-motion.svg" alt="Inicio Productos" class="h-auto mx-auto w-72">
              <p class="text-xl">
                Agregar y gestionar tus productos
              </p>
              <p class="max-w-xs mx-auto my-4 text-sm text-gray-500">
                Aquí es donde agregarás productos y gestionarás tus precios. También puedes importar y exportar tu inventario de productos.
              </p>
              <div class="mt-2 mb-6">
                <base-button to="/products/create">
                  Agregar producto
                </base-button>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsIndex',
  layout: 'default',
  data () {
    return {
      isLoaded: false,
      isFetching: true,
      searchProduct: '',
      itemsPerPage: [5, 10, 15, 25, 50],
      products: {
        meta: {
          current_page: 1
        }
      }
    }
  },
  async fetch () {
    await this.fetchProducts()
    this.isLoaded = true
  },
  watch: {
    'products.meta.current_page' () {
      this.fetchProducts()
    }
  },
  methods: {
    async fetchProducts () {
      try {
        this.isFetching = true
        this.products = await this.$axios.$get('/products', {
          params: {
            limit: 2,
            page: this.products.meta.current_page
          }
        })
      } catch (e) {
        this.$notify(
          {
            group: 'top',
            type: 'error',
            title: '¡Error!',
            text: 'Ocurrió un error al obtener los productos'
          },
          2000
        )
      } finally {
        this.isFetching = false
      }
    },
    redirectToEditProduct (id) {
      this.$router.push(`products/${id}`)
    }
  }
}
</script>
