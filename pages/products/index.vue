<template>
  <div class="space-y-5 w-full">
    <div v-if="isLoaded" class="flex flex-col space-y-6 w-full">
      <div class="flex flex-col justify-between items-start space-y-2 sm:space-y-0 sm:flex-row">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-gray-100">
          Productos
        </h1>
        <BaseButton v-if="products.data && products.data.length > 0" to="/products/create">
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
                           v-model="searchProduct"
                           class="input-search"
                           name="searchProducts"
                           placeholder="Buscar"
                           type="search"
                           @input="debounceSearchProducts"
                    >
                  </div>
                </div>
                <!--              Filtros-->
                <TableFilters size="w-72">
                  <template #dropdown-body>
                    <div class="flex flex-col p-4 space-y-2">
                      <span class="text-sm font-medium dark:text-gray-100 text-gray-900">Estado:</span>
                      <div class="flex relative items-start cursor-pointer">
                        <div class="flex items-center h-5">
                          <input
                            id="product_active"
                            v-model="stateProductFilters"
                            aria-describedby="product_active-description"
                            class="cursor-pointer base-checkbox"
                            name="product_active"
                            type="checkbox"
                            value="1"
                            @change="debounceSearchProducts"
                          >
                        </div>
                        <div class="ml-3 text-sm">
                          <label class="font-medium text-gray-700 dark:text-gray-300 cursor-pointer" for="product_active">
                            Activo
                          </label>
                        </div>
                      </div>
                      <div class="flex relative items-start cursor-pointer">
                        <div class="flex items-center h-5">
                          <input
                            id="product_draft"
                            v-model="stateProductFilters"
                            aria-describedby="product_draft-description"
                            class="cursor-pointer base-checkbox"
                            name="product_draft"
                            type="checkbox"
                            value="0"
                            @change="debounceSearchProducts"
                          >
                        </div>
                        <div class="ml-3 text-sm">
                          <label class="font-medium text-gray-700 dark:text-gray-300 cursor-pointer" for="product_draft">
                            Borrador
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col p-4 space-y-2">
                      <span class="text-sm font-medium dark:text-gray-100 text-gray-900">Tipo:</span>
                      <div class="flex relative items-start cursor-pointer">
                        <div class="flex items-center h-5">
                          <input
                            id="product_simple"
                            v-model="typeProductFilters"
                            aria-describedby="product_simple-description"
                            class="cursor-pointer base-checkbox"
                            name="product_simple"
                            type="checkbox"
                            value="single"
                            @change="debounceSearchProducts"
                          >
                        </div>
                        <div class="ml-3 text-sm">
                          <label class="font-medium text-gray-700 dark:text-gray-300 cursor-pointer" for="product_simple">
                            Simple
                          </label>
                        </div>
                      </div>
                      <div class="flex relative items-start cursor-pointer">
                        <div class="flex items-center h-5">
                          <input
                            id="product_variant"
                            v-model="typeProductFilters"
                            aria-describedby="product_variant-description"
                            class="cursor-pointer base-checkbox"
                            name="product_variant"
                            type="checkbox"
                            value="variant"
                            @change="debounceSearchProducts"
                          >
                        </div>
                        <div class="ml-3 text-sm">
                          <label class="font-medium text-gray-700 dark:text-gray-300 cursor-pointer" for="product_variant">
                            Variantes
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
                <BaseSpinnerTable v-if="isFetching && products.data.length > 0" />
                <table v-if="products.data.length >0 " class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                  <thead>
                    <tr class="bg-gray-50">
                      <th class="px-4 py-2 dark:bg-gray-800">
                        <button type="button" class="flex items-center space-x-1 text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-300">
                          <span>
                            Producto
                          </span>
                        </button>
                      </th>
                      <th class="px-4 py-2 dark:bg-gray-800">
                        <div class="flex items-center text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-300">
                          <span>
                            Estado
                          </span>
                        </div>
                      </th>
                      <th class="px-4 py-2 dark:bg-gray-800">
                        <div class="flex items-center text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-300">
                          <span>
                            Inventario
                          </span>
                        </div>
                      </th>
                      <th class="px-4 py-2 dark:bg-gray-800">
                        <div class="flex items-center text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-300">
                          <span>
                            Tipo
                          </span>
                        </div>
                      </th>
                      <th class="px-4 py-2 dark:bg-gray-800">
                        <button type="button" class="flex items-center space-x-1 text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-300">
                          <span>
                            Creado el
                          </span>
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    <tr v-for="(product,index) in products.data" :key="index" class="cursor-pointer" @click="redirectToEditProduct(product.id)">
                      <td class="flex items-center px-4 py-3 whitespace-nowrap">
                        <div class="flex items-center space-x-4 w-full">
                          <div class="flex flex-col flex-shrink-0 justify-center items-center p-1 w-14 h-14 text-center rounded-md border border-gray-300 dark:border-gray-700">
                            <div class="flex justify-center items-center w-full h-full">
                              <LoadedImage v-if="returnProductThumbnail(product.variants)" :alt="product.name" :src="returnProductThumbnail(product.variants)" classes="object-cover object-center h-full" />
                              <svg v-else class="w-6 h-6 text-gray-600 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                              </svg>
                            </div>
                          </div>
                          <nuxt-link :to="`/products/${product.id}`" class="text-gray-900 rounded-md dark:text-white hover:underline line-clamp-3 focus:outline-none focus:ring-primary-500/25 focus:ring-2">
                            {{ product.name }}
                          </nuxt-link>
                        </div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="flex items-center">
                          <BadgeStatus :status="product.status" />
                        </div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <VariantsQuantity :quantity="returnVariantsQuantity(product.variants)" />
                        <span v-if="product.variants.length >1" class="text-gray-900 dark:text-white">
                          en existencia para {{ product.variants.length }} variantes
                        </span>
                        <span v-else class="text-gray-900 dark:text-white">
                          en existencia
                        </span>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <BadgeType :type="product.type" />
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <span class="text-gray-900 dark:text-white">
                          {{ parseDate(product.created_at) }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-else class="flex flex-col justify-center items-center py-8 space-y-4 h-64 text-center">
                  <svg class="flex-shrink-0 w-10 h-10 text-gray-400 sm:w-16 sm:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
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
                :disabled="isFetching"
                :is-fetching="isFetching"
                :item-count="products.data.length"
                :items-per-page.sync="products.meta.per_page"
                :total-items="products.meta.total"
                :total-pages="products.meta.last_page"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="overflow-hidden h-full text-center bg-white rounded-lg shadow">
            <div class="flex flex-col p-8">
              <img alt="Inicio Productos" class="mx-auto w-72 h-auto" src="@/static/images/main-pages/main-product-motion.svg">
              <p class="text-xl">
                Agregar y gestionar tus productos
              </p>
              <p class="mx-auto my-4 max-w-xs text-sm text-gray-500">
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
    <SkeletonIndexPage v-else />
  </div>
</template>

<script>
import * as _ from 'lodash'
import * as dayjs from 'dayjs'
import 'dayjs/locale/es'

export default {
  name: 'ProductsIndex',
  layout: 'default',
  data () {
    return {
      isLoaded: false,
      alreadyHasData: 0,
      isFetching: false,
      searchProduct: '',
      stateProductFilters: [],
      typeProductFilters: [],
      baseUrl: this.$config.baseImageUrl,
      products: {},
      isSearchOrSelect: false
    }
  },
  fetchOnServer: false,
  async fetch () {
    await this.fetchProducts()
    this.isLoaded = true
  },
  watch: {
    'products.meta.current_page' () {
      if (this.isLoaded) {
        this.fetchProducts()
      }
    },
    'products.meta.per_page' (newValue, oldValue) {
      if (this.isLoaded) {
        if (Number(newValue) !== Number(oldValue)) {
          this.isSearchOrSelect = true
          this.fetchProducts()
        }
      }
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
            limit: this.products.meta?.per_page ?? 10,
            page: this.isSearchOrSelect ? 1 : (this.products.meta?.current_page ?? 1)
          }
        })
        this.alreadyHasData = this.alreadyHasData !== 0 ? this.alreadyHasData : this.products.data.length
        this.isFetching = false
      } catch (e) {
        this.$notify(
          {
            group: 'top',
            type: 'error',
            title: '¡Error!',
            text: 'Ocurrió un error al obtener los productos'
          }, 2000)
      } finally {
        this.isSearchOrSelect = false
      }
    },
    returnProductThumbnail (variants) {
      const thumbnailPath = _.get(_.first(variants), ['thumbnail_path'], null)
      return thumbnailPath ? `${this.baseUrl}/${thumbnailPath}?time=${Math.random()}` : null
    },
    redirectToEditProduct (id) {
      this.$router.push(`/products/${id}`)
    },
    returnVariantsQuantity (variants) {
      return _.sumBy(variants, 'stock')
    },
    returnProductType (product) {
      return product.type === 'single' ? 'Simple' : 'Variantes'
    },
    debounceSearchProducts: _.debounce(function () {
      this.isSearchOrSelect = true
      this.fetchProducts()
    }, 300),
    parseDate (date) {
      return dayjs(date).locale('es').format('DD MMMM YYYY')
    }
  }
}
</script>
