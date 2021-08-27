<template>
  <div>
    <div v-if="isLoaded" class="flex flex-col w-full space-y-6">
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
          <template v-if="alreadyHasData">
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
                           v-model="searchProduct"
                           name="searchExperiences"
                           class="pl-10 pr-3 base-input focus:placeholder-gray-500"
                           placeholder="Filtrar productos"
                           type="search"
                           @input="debounceSearchOrFilterProduct"
                    >
                  </div>
                </div>
                <div class="relative z-10 inline-flex rounded-md shadow-sm">
                  <div class="z-10 hidden xs:block">
                    <label for="itemsCount" class="sr-only">Elementos a mostrar</label>
                    <select id="itemsCount" v-model="itemsPerPage" name="itemsCount" class="select-table rounded-l-md" @change="debounceSearchOrFilterProduct">
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
                              id="product_active"
                              v-model="stateProductFilters"
                              value="1"
                              aria-describedby="product_active-description"
                              name="product_active"
                              type="checkbox"
                              class="base-checkbox"
                            >
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="product_active" class="font-medium text-gray-600 cursor-pointer">Activo</label>
                          </div>
                        </div>
                        <div>
                          <div class="relative flex items-start cursor-pointer">
                            <div class="flex items-center h-5">
                              <input
                                id="product_draft"
                                v-model="stateProductFilters"
                                value="0"
                                aria-describedby="product_draft-description"
                                name="product_draft"
                                type="checkbox"
                                class="base-checkbox"
                              >
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="product_draft" class="font-medium text-gray-600 cursor-pointer">Borrador</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-col px-4 pb-4 space-y-2">
                        <span class="text-sm font-medium text-gray-800">Tipo:</span>
                        <div class="relative flex items-start cursor-pointer">
                          <div class="flex items-center h-5">
                            <input
                              id="product_simple"
                              v-model="typeProductFilters"
                              value="single"
                              aria-describedby="product_simple-description"
                              name="product_simple"
                              type="checkbox"
                              class="base-checkbox"
                            >
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="product_simple" class="font-medium text-gray-600 cursor-pointer">Simple</label>
                          </div>
                        </div>
                        <div>
                          <div class="relative flex items-start cursor-pointer">
                            <div class="flex items-center h-5">
                              <input
                                id="product_variant"
                                v-model="typeProductFilters"
                                value="variant"
                                aria-describedby="product_variant-description"
                                name="product_variant"
                                type="checkbox"
                                class="base-checkbox"
                              >
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="product_variant" class="font-medium text-gray-600 cursor-pointer">Variantes</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex justify-between px-4 py-2 border-t">
                        <base-button variant="white" size="mini" :disabled="isFetching" @onClick="clearFilters">
                          <span>
                            Limpiar
                          </span>
                        </base-button>
                        <base-button variant="primary" size="mini" :disabled="isFetching || atLeastOneFilter" @onClick="debounceSearchOrFilterProduct()">
                          <span>
                            Aplicar
                          </span>
                        </base-button>
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
                <div class="relative block w-full overflow-x-auto rounded rounded-t" :class="{'shadow': products.data.length > 0}">
                  <template v-if="isFetching">
                    <div class="absolute inset-0 z-0 bg-white opacity-60" />
                    <div class="absolute inset-0 z-0 flex items-center justify-center">
                      <svg class="w-10 h-10 text-primary-500 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </div>
                  </template>
                  <table v-if="products.data.length >0 " class="w-full divide-y table-fixed divide-gray-50">
                    <thead class="border-b bg-gray-50">
                      <tr>
                        <th class="px-6 py-3 lg:w-64 w-72">
                          <div class="flex items-center text-xs text-left">
                            <span class="font-medium tracking-wider text-gray-500 uppercase"> Producto </span>
                          </div>
                        </th>
                        <th class="px-6 py-3 lg:w-24 w-28">
                          <div class="flex items-center text-xs text-left">
                            <span class="font-medium tracking-wider text-gray-500 uppercase"> Estado </span>
                          </div>
                        </th>
                        <th class="w-64 px-6 py-3 xl:w-36">
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
                    <tbody v-if="products.data.length > 0" class="bg-white divide-y divide-gray-200">
                      <tr v-for="(product,index) in products.data" :key="index" class="cursor-pointer hover:bg-gray-50" @click="redirectToEditProduct(product.id)">
                        <td class="flex items-center px-6 py-4 text-left whitespace-nowrap">
                          <div class="flex items-center w-full space-x-2">
                            <div class="flex flex-col items-center justify-center flex-shrink-0 w-16 h-16 p-1 text-center border border-gray-300 rounded-md">
                              <div class="flex items-center justify-center w-full h-full">
                                <img :src="product.variants[0].thumbnail_path" :alt="product.name" class="object-cover object-center h-full">
                              </div>
                            </div>
                            <nuxt-link :to="`/products/${product.id}`" class="text-sm font-medium text-gray-900 rounded-md hover:underline line-clamp-2 focus:outline-none focus:ring-primary-500 focus:ring-2">
                              {{ product.name }}
                            </nuxt-link>
                          </div>
                        </td>
                        <td class="px-6 py-4 text-left whitespace-nowrap">
                          <div class="flex items-center">
                            <BadgeStatus :status="product.status" />
                          </div>
                        </td>
                        <td class="px-6 py-4 text-sm text-left whitespace-nowrap">
                          <span class="inline-flex items-center justify-center p-1 rounded-sm bg-amber-200">
                            {{ returnVariantsQuantity(product.variants) }}
                          </span>
                          <span v-if="product.variants.length >1" class="">
                            en existencia para {{ product.variants.length }} variantes
                          </span>
                          <span v-else class="">
                            en existencia
                          </span>
                        </td>
                        <td class="px-6 py-4 text-sm text-left whitespace-nowrap">
                          <BadgeType :type="product.type" />
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
                        No se encontraron los productos
                      </p>
                      <p class="text-sm text-gray-500">
                        Intenta cambiar los filtros o el término de búsqueda
                      </p>
                    </div>
                  </div>
                </div>
                <BasePaginator
                  v-if="products.data.length > 0"
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
    <SkeletonIndexPage v-else />
  </div>
</template>

<script>
import * as _ from 'lodash'
export default {
  name: 'ProductsIndex',
  layout: 'default',
  data () {
    return {
      isLoaded: false,
      alreadyHasData: 0,
      isFetching: true,
      searchProduct: '',
      stateProductFilters: [],
      typeProductFilters: [],
      itemsPerPage: 10,
      itemsPerPageData: [10, 15, 25, 50, 100],
      products: {
        meta: {
          current_page: 1
        }
      }
    }
  },
  fetchOnServer: false,
  async fetch () {
    await this.fetchProducts()
    this.isLoaded = true
  },
  computed: {
    atLeastOneFilter () {
      return this.stateProductFilters.length <= 0 && this.typeProductFilters.length <= 0
    }
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
            'filter[name]': this.searchProduct || null,
            'filter[status]': this.stateProductFilters,
            'filter[type]': this.typeProductFilters,
            limit: this.itemsPerPage,
            page: this.products.meta.current_page
          }

        })
        this.alreadyHasData = this.alreadyHasData !== 0 ? this.alreadyHasData : this.products.data.length
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
      this.$router.push(`/products/${id}`)
    },
    returnVariantsQuantity (variants) {
      const totalCount = _.sumBy(variants, 'stock')
      return totalCount
    },
    returnProductType (product) {
      return product.type === 'single' ? 'Simple' : 'Variantes'
    },
    clearFilters () {
      if (this.stateProductFilters.length >= 1 || this.typeProductFilters.length >= 1) {
        this.debounceSearchOrFilterProduct()
      }
      this.stateProductFilters = []
      this.typeProductFilters = []
    },
    debounceSearchOrFilterProduct: _.debounce(function () {
      this.searchOrSelectProduct()
    }, 300),
    searchOrSelectProduct () {
      this.products.meta.current_page = 1
      this.fetchProducts()
    }
  }
}
</script>
