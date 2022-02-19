<template>
  <div class="w-full h-full space-y-5">
    <template v-if="isLoaded">
      <div class="flex">
        <div class="lg:space-x-4 flex flex-col lg:flex-row lg:items-center items-start text-gray-600 px-0.5 space-y-2 lg:space-y-0">
          <base-button size="icon" to="/products" variant="transparent">
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
          </base-button>
          <span class="text-xl font-medium text-gray-900">
            {{ product.name }}
          </span>
        </div>
      </div>

      <form class="flex flex-col w-full space-y-6" enctype="multipart/form-data" novalidate @submit.prevent="storeProduct">
        <div class="grid grid-cols-1 gap-6 md:grid-flow-col-dense md:grid-cols-3">
          <!-- left/up content -->
          <div class="space-y-6 md:col-start-1 md:col-span-2">
            <!-- name  && description -->
            <div class="px-4 py-5 bg-white rounded-md shadow sm:px-5">
              <div class="grid grid-cols-6 gap-6">
                <div class="relative col-span-6">
                  <label class="base-label" for="product_name">Nombre<span class="font-bold">*</span></label>
                  <div class="relative mt-1">
                    <input id="product_name" v-model="product.name" :class="{'base-input--error': errors.name}" autocomplete="product_name" class="base-input" name="product_name" type="text">
                  </div>
                  <div v-if="errors.name" class="flex flex-col">
                    <span v-for="error in errors.name" :key="error.id" class="mt-1 text-sm text-red-500">
                      {{ error }}
                    </span>
                  </div>
                </div>
                <div class="col-span-6">
                  <label class="base-label" for="product_description">Descripción<span class="font-bold">*</span></label>
                  <div class="relative mt-1">
                    <textarea id="product_description" v-model="product.description" :class="{'base-input--error': errors.description}" class="mt-1 base-input" cols="30" name="product_description" rows="4" />
                  </div>
                  <div v-if="errors.description" class="flex flex-col">
                    <span v-for="error in errors.description" :key="error.id" class="mt-1 text-sm text-red-500">
                      {{ error }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Prices -->
            <div class="py-5 space-y-6 bg-white rounded-md shadow">
              <h2 class="px-4 text-base font-semibold text-gray-900 sm:px-5">
                Variantes <span v-if="!hasVariants">y precio</span>
              </h2>
              <div v-show="!enabledVariants" class="flex flex-col space-y-6">
                <div class="pb-6 border-b">
                  <div class="grid grid-cols-6 gap-6 px-4 sm:px-5">
                    <div class="col-span-6 sm:col-span-3">
                      <label class="base-label" for="price">Precio</label>
                      <div class="relative mt-1">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span class="text-gray-500 sm:text-sm">
                            $
                          </span>
                        </div>
                        <input id="price" v-model="product.price" v-maska="'#*.##'" :class="{'base-input--error': errors.price}" :maxlength="7" aria-describedby="price" class="pl-7 base-input" name="price" placeholder="0.00" type="text">
                      </div>
                      <div v-if="errors.price" class="flex flex-col">
                        <span v-for="error in errors.price" :key="error.id" class="mt-1 text-sm text-red-500">
                          {{ error }}
                        </span>
                      </div>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <div class="flex items-center space-x-2">
                        <label class="base-label" for="compare_at_price">Precio de comparación</label>
                        <button
                          v-tippy="{appendTo: 'parent', maxWidth:200, theme: 'light', placement:'bottom', animation : 'scale'}"
                          class="relative focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                          content="Para mostrar un precio rebajado, mueve el precio original del producto al precio de comparación. Introduce un valor menor para el precio" type="button"
                        >
                          <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" fill-rule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <div class="relative mt-1">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span class="text-gray-500 sm:text-sm">
                            $
                          </span>
                        </div>
                        <input id="compare_at_price" v-model="product.compare_at_price" v-maska="'#*.##'" :maxlength="7" aria-describedby="compare_at_price" class="pl-7 base-input" name="compare_at_price" placeholder="0.00" type="text">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-6 gap-6 px-4 pb-6 border-b sm:px-5">
                  <div class="col-span-6 sm:col-span-3">
                    <label class="base-label" for="inventory_cost">Costo por artículo</label>
                    <div class="relative mt-1 rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span class="text-gray-500 sm:text-sm">
                          $
                        </span>
                      </div>
                      <input id="inventory_cost" v-model="product.inventory_cost" v-maska="'#*.##'" :maxlength="7" aria-describedby="inventory_cost" class="pl-7 base-input" name="inventory_cost" placeholder="0.00" type="text">
                    </div>
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <div class="grid grid-cols-2">
                      <div class="col-span-1">
                        <label class="base-label" for="margin_price">Margen</label>
                        <span id="margin_price" class="text-sm">
                          {{ marginPrice }}
                        </span>
                      </div>
                      <div class="col-span-1">
                        <label class="base-label" for="gain_price">Ganancia</label>
                        <span id="gain_price" class="text-sm">
                          {{ gainPrice }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!hasVariants" class="grid grid-cols-6 gap-6 px-4 sm:px-5">
                <div class="col-span-6">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input id="variants" v-model="enabledVariants" class="cursor-pointer base-checkbox" name="variants" type="checkbox">
                    </div>
                    <div class="ml-3 text-sm">
                      <label class="font-medium text-gray-700 cursor-pointer" for="variants">
                        Este producto tiene múltiples presentaciones</label>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="enabledVariants" class="space-y-6 overflow-hidden">
                <div class="w-full overflow-x-auto border-b rounded">
                  <table class="w-full divide-y divide-gray-200 table-fixed">
                    <thead class="">
                      <tr>
                        <th class="w-40 px-4 py-4 sm:px-5" scope="col">
                          <div class="flex items-center text-xs text-left">
                            <span class="text-xs font-semibold tracking-wider text-left uppercase ">
                              Variante*
                            </span>
                          </div>
                        </th>
                        <th class="px-4 py-4 sm:px-5 w-36" scope="col">
                          <div class="flex items-center text-xs text-left">
                            <span class="text-xs font-semibold tracking-wider text-left uppercase ">
                              Precio*
                            </span>
                          </div>
                        </th>
                        <th class="w-32 px-4 py-4 sm:px-5" scope="col">
                          <div class="flex items-center text-xs text-left">
                            <span class="text-xs font-semibold tracking-wider text-left uppercase ">
                              Cantidad
                            </span>
                          </div>
                        </th>
                        <th class="relative w-40 px-4 py-4 xl:w-36 sm:px-5" scope="col">
                          <span class="sr-only">Acción</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(variant,index) in variantsArray" :key="index" class="even:bg-gray-50 hover:bg-gray-100">
                        <td class="flex items-center px-4 py-4 text-left truncate sm:px-5">
                          <div class="relative">
                            <input :id="`nomenclature_value-${index}`" v-model="variantsArray[index].nomenclature_value" v-maska="'#*.##'" :maxlength="7" :name="`nomenclature_value-${index}`" class="pl-2 pr-16 base-input" placeholder="0" type="text">
                            <div class="absolute inset-y-0 right-0 z-10 flex items-center">
                              <label :for="`nomenclature_value-${index}`" class="sr-only">Nomenclature</label>
                              <select :id="`nomenclature_value-${index}`" v-model="variantsArray[index].nomenclature_id" :name="`nomenclature_value-${index}`" class="rounded-md cursor-pointer pr-7 custom-select">
                                <template v-for="(nomenclature) in nomenclatures">
                                  <option v-if="nomenclature.show" :key="nomenclature.id" :value="nomenclature.id">
                                    {{ nomenclature.name }}
                                  </option>
                                </template>
                              </select>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-4 text-left truncate sm:px-5">
                          <div class="relative rounded-md">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <span class="text-gray-500 sm:text-sm">
                                $
                              </span>
                            </div>
                            <label class="sr-only" for="nomenclature_price">Precio</label>
                            <input id="nomenclature_price" v-model="variantsArray[index].price" v-maska="'#*.##'" :maxlength="7" aria-describedby="nomenclature_price" class="pl-7 base-input" name="nomenclature_price" placeholder="0.00" type="text">
                          </div>
                        </td>
                        <td class="px-4 py-4 text-left truncate sm:px-5">
                          <label :for="`nomenclature_quantity-${index}`" class="sr-only">{{ `Variante-${index}` }}</label>
                          <VariantQuantity :id="`nomenclature_quantity-${index}`" v-model="variant.stock" :index="index" />
                        </td>
                        <td class="px-4 py-4 text-left truncate sm:px-5">
                          <div class="flex items-center">
                            <span class="relative z-0 inline-flex rounded-md shadow-sm">
                              <button class="relative inline-flex items-center h-10 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md focus:z-10 hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50" type="button" @click="removeVariantFromArray(index)">
                                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                </svg>
                              </button>
                              <nuxt-link :to="`/products/${product.id}/variants/43424`" class="relative inline-flex items-center h-10 px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md focus:z-10 hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50" type="button">
                                Editar
                              </nuxt-link>
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="px-4 sm:px-5">
                  <base-button type="button" variant="white" @onClick="addNewVariant()">
                    Agregar variante
                  </base-button>
                </div>
              </div>
            </div>
            <!-- Product image -->
            <div class="px-4 py-5 space-y-6 bg-white rounded-md shadow sm:px-5">
              <div class="flex items-center space-x-2">
                <h2 class="text-base font-semibold text-gray-900">
                  Elementos multimedia
                </h2>
                <button
                  v-tippy="{appendTo: 'parent', maxWidth:200, theme: 'light', placement:'bottom', animation : 'scale'}"
                  class="relative focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                  content="Vas a cambiar la imagen a todas tus variantes, si deseas cambiar la imagen de una variante, edita la variante." type="button"
                >
                  <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" fill-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <div>
                <label class="base-label">Imagen del producto</label>
                <div :class="{'border-primary-500' : draggingProductPicture,'border-gray-300' : !draggingProductPicture,'border-red-500' : errors.thumbnail}" class="flex justify-center w-full px-6 pt-5 pb-6 mt-1 border-2 border-dashed rounded-md h-72 sm:h-80" @dragend="draggingProductPicture=false" @dragleave="draggingProductPicture=false" @drop="onDropProductThumbnail($event)" @dragover.prevent="draggingProductPicture=true">
                  <div class="flex flex-col items-center justify-center h-full space-y-1 text-center">
                    <template v-if="productThumbnailImage">
                      <div class="relative w-full h-full">
                        <div class="absolute flex items-center justify-center w-full h-full">
                          <LoadedImage :src="productThumbnailImage" alt="previewthumbnailProduct" classes="object-cover object-center h-full" />
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <svg aria-hidden="true" class="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                      </svg>
                    </template>
                    <div class="flex flex-col items-center justify-center space-y-2 text-sm text-gray-600">
                      <button v-if="productThumbnailImage" class="flex items-center justify-center w-20 text-sm text-red-400 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-gray-50" type="button" @click="removeProductThumbnail()">
                        Remover
                      </button>
                      <div class="flex">
                        <label class="relative font-medium bg-white rounded-md cursor-pointer text-primary-600 hover:text-primary-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500" for="thumbnailImageUpload">
                          <span>Sube una imagen</span>
                          <input id="thumbnailImageUpload" accept="image/*" class="sr-only" name="thumbnailImageUpload" type="file" @change="onChangeProductThumbnail($event)">
                        </label>
                        <p class="pl-1">
                          o arrastra y suelta
                        </p>
                      </div>
                      <p class="text-xs text-gray-500">
                        PNG, JPG, JPEG hasta 5MB
                      </p>
                    </div>
                  </div>
                </div>
                <div v-if="errors.thumbnail" class="flex flex-col">
                  <span v-for="error in errors.thumbnail" :key="error.id" class="mt-1 text-sm text-red-500">
                    {{ error }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- right/down content -->
          <div class="flex flex-col md:space-y-6 md:col-start-3 md:col-span-1">
            <div class="order-last px-4 py-5 mt-6 bg-white rounded-md shadow md:mt-0 md:order-first sm:px-5">
              <h2 class="text-base font-semibold text-gray-900">
                Estado del producto
              </h2>
              <!-- Product Status-->
              <div class="flex flex-col mt-4 space-y-2">
                <select id="status" v-model="product.status" class="base-input" name="status">
                  <option selected value="0">
                    Borrador
                  </option>
                  <option value="1">
                    Activo
                  </option>
                </select>
                <span class="text-sm text-gray-500">
                  {{ messageInSelectedStatus }}
                </span>
              </div>
            </div>
            <div class="grid grid-cols-6 gap-6 px-4 py-5 bg-white rounded-md shadow sm:px-5">
              <h2 class="text-base font-semibold text-gray-900">
                Organización
              </h2>
              <!-- Product Status-->
              <div class="flex flex-col col-span-6">
                <label class="base-label" for="product_category">Categoría</label>
                <v-select id="product_category" v-model="product.category_id" :class="{'vs__dropdown-toggle--error': errors.category_id}" :clearable="false" :options="categories" :reduce="category => category.id" :searchable="true" class="mt-1" label="name" placeholder="Selecciona una categoría">
                  <template #open-indicator="{ attributes }">
                    <span v-bind="attributes">
                      <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                      </svg>
                    </span>
                  </template>
                </v-select>
                <div v-if="errors.category_id" class="flex flex-col">
                  <span v-for="error in errors.category_id" :key="error.id" class="mt-1 text-sm text-red-500">
                    {{ error }}
                  </span>
                </div>
              </div>
              <template v-if="!enabledVariants">
                <!-- Product Stock-->
                <div class="flex flex-col col-span-6">
                  <label class="base-label" for="product_stock">Stock</label>
                  <VariantQuantity id="product_stock" v-model="product.stock" class="mt-1" name="product_stock" />
                </div>
                <!-- Product SKU-->
                <div class="flex flex-col col-span-6">
                  <label class="base-label" for="sku">SKU (código de artículo)</label>
                  <input id="sku" v-model="product.sku" v-maska="'X*'" :maxlength="15" aria-describedby="sku" class="mt-1 base-input" name="sku" type="text">
                </div>
                <!-- Product ISBN-->
                <div class="flex flex-col col-span-6">
                  <label class="base-label" for="barcode">Código de barras (ISBN, etc.)</label>
                  <input id="barcode" v-model="product.barcode" v-maska="'X*'" :maxlength="25" aria-describedby="barcode" class="mt-1 base-input" name="barcode" type="text">
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end py-3 space-x-3 border-t">
          <base-button :disabled="isLoadingEdit" class="w-32" to="/products" variant="white">
            Cancelar
          </base-button>
          <base-button :disabled="isLoadingEdit || !isFormComplete" :is-loading="isLoadingEdit" class="w-32" type="submit">
            Guardar
          </base-button>
        </div>
      </form>
    </template>
    <SkeletonDynamicPage v-else />
  </div>
</template>

<script>
import * as _ from 'lodash'

export default {
  name: 'EditProduct',
  data () {
    return {
      isLoaded: false,
      isLoadingEdit: false,
      enabledVariants: false,
      draggingProductPicture: false,
      errors: {},
      categories: [],
      nomenclatures: [],
      product: {},
      variantsArray: [],
      productThumbnailImage: null,
      productThumbnailImageError: '',
      messageInSelectedStatus: 'Este producto no estará disponible para su venta.',
      baseUrl: this.$config.baseImageUrl
    }
  },
  async fetch () {
    await this.fetchCategories()
    await this.fetchNomenclatures()
    await this.fetchProduct()
    this.isLoaded = true
  },
  fetchOnServer: false,
  computed: {
    marginPrice () {
      if (!this.product.price || !this.product.inventory_cost) {
        return '-'
      }
      const gain = (((this.product.price - this.product.inventory_cost) / this.product.price) * 100).toFixed(1)
      return `${gain}%`
    },
    gainPrice () {
      if (!this.product.price || !this.product.inventory_cost) {
        return '-'
      }
      const minus = (this.product.price - this.product.inventory_cost).toFixed(1)
      return `$${minus}`
    },
    variantsCompleted () {
      return this.variantsArray.some(v => v.nomenclature_value)
    },
    isFormComplete () {
      return !((!this.product.name || !this.product.description || !this.product.category_id) || !(this.enabledVariants ? this.variantsCompleted : true))
    },
    hasVariants () {
      return this.variantsArray.length >= 1
    }
  },
  watch: {
    enabledVariants (newValue) {
      if (newValue && this.variantsArray.length <= 0) {
        this.variantsArray = []
        const emptyVariant = {
          nomenclature_id: this.nomenclatures[0].id,
          nomenclature_value: null,
          price: null,
          stock: 0
        }
        this.variantsArray.push(emptyVariant)
      }
    },
    'product.status' (newValue) {
      this.messageInSelectedStatus = _.toNumber(newValue) === 0 ? 'Este producto no estará disponible para su venta.' : 'Este producto estará disponible para su venta.'
    }
  },
  methods: {
    async fetchProduct () {
      try {
        const productId = this.$route.params.productId
        const { data } = await this.$axios.$get(`/products/${productId}`)
        this.setProduct(data)
      } catch (e) {
        this.$notify(
          {
            group: 'top',
            type: 'error',
            title: '¡Error!',
            text: 'Ocurrió un error al obtener el producto'
          },
          3000
        )
      }
    },
    async fetchCategories () {
      try {
        const { data } = await this.$axios.$get('/categories')
        this.categories = data
      } catch (e) {
        this.$notify(
          {
            group: 'top',
            type: 'error',
            title: '¡Error!',
            text: 'Ocurrió un error al obtener las categorías'
          },
          3000
        )
      }
    },
    async fetchNomenclatures () {
      try {
        const { data } = await this.$axios.$get('/nomenclatures')
        this.nomenclatures = data
      } catch (e) {
        this.$notify(
          {
            group: 'top',
            type: 'error',
            title: '¡Error!',
            text: 'Ocurrió un error al obtener las nomenclaturas'
          },
          3000
        )
      }
    },
    setProduct (data) {
      this.enabledVariants = data.type === 'variant'
      this.variantsArray = data.type === 'variant' ? data.variants : []

      const thumbnailPath = _.get(_.first(data.variants), ['thumbnail_path'], null)
      this.productThumbnailImage = thumbnailPath ? `${this.baseUrl}/${thumbnailPath}?time=${Math.random()}` : null

      this.product.id = data.id
      this.product.name = data.name
      this.product.type = data.type
      this.product.description = data.description
      this.product.status = data.status
      this.product.category_id = data.category_id
      this.product.stock = data.variants[0].stock
      this.product.price = data.type === 'single' ? this.returnPrice(data.variants[0].price) : null
      this.product.compare_at_price = data.type === 'single' ? this.returnPrice(data.variants[0].compare_at_price) : null
      this.product.inventory_cost = data.type === 'single' ? this.returnPrice(data.variants[0].inventory_cost) : null
    },
    returnPrice (price) {
      return price ? _.toNumber(price).toFixed(2) : null
    },
    addNewVariant () {
      const emptyVariant = {
        nomenclature_id: this.nomenclatures[0].id,
        nomenclature_value: '',
        price: null,
        stock: 0
      }
      this.variantsArray.push(emptyVariant)
    },
    removeVariantFromArray (index) {
      if (this.variantsArray.length === 1) {
        this.enabledVariants = false
      }
      this.variantsArray.splice(index, 1)
    }
  }
}
</script>
