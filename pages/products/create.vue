<template>
  <div class="max-w-5xl mx-auto space-y-5">
    <div class="flex">
      <div class="lg:space-x-4 flex flex-col lg:flex-row lg:items-center items-start text-gray-600 px-0.5 nuxt-link-active space-y-2 lg:space-y-0">
        <base-button variant="transparent" size="icon" to="/products">
          <svg class="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </base-button>
        <span class="text-xl font-medium text-gray-900">
          Agregar producto
        </span>
      </div>
    </div>
    <!-- Form -->
    <form enctype="multipart/form-data" class="flex flex-col w-full space-y-6" novalidate @submit.prevent="storeProduct">
      <div class="grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3">
        <!-- left/up content -->
        <div class="space-y-6 lg:col-start-1 lg:col-span-2">
          <!-- name  && description -->
          <div class="px-4 py-5 bg-white rounded-md shadow sm:px-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="relative col-span-6">
                <label for="product_name" class="base-label">Nombre<span class="font-bold">*</span></label>
                <div class="relative mt-1">
                  <input id="product_name" v-model="product.name" :class="{'base-input--error': errors.name}" type="text" name="product_name" autocomplete="product_name" class="base-input">
                </div>
                <div v-if="errors.name" class="flex flex-col">
                  <span v-for="error in errors.name" :key="error.id" class="mt-1 text-sm text-red-500">
                    {{ error }}
                  </span>
                </div>
              </div>
              <div class="col-span-6">
                <label for="product_description" class="base-label">Descripción<span class="font-bold">*</span></label>
                <div class="relative mt-1">
                  <textarea id="product_description" v-model="product.description" :class="{'base-input--error': errors.description}" name="product_description" class="mt-1 base-input" cols="30" rows="4" />
                </div>
                <div v-if="errors.description" class="flex flex-col">
                  <span v-for="error in errors.description" :key="error.id" class="mt-1 text-sm text-red-500">
                    {{ error }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- product image -->
          <div class="px-4 py-5 space-y-6 bg-white rounded-md shadow sm:px-6">
            <h2 class="text-base font-semibold text-gray-900">
              Elementos multimedia
            </h2>
            <div>
              <label class="base-label">Imagen del producto<span class="font-bold">*</span></label>
              <div class="flex justify-center w-full px-6 pt-5 pb-6 mt-1 border-2 border-dashed rounded-md h-72 sm:h-80" :class="{'border-primary-500' : draggingProductPicture,'border-gray-300' : !draggingProductPicture,'border-red-500' : errors.thumbnail}" @dragover.prevent="draggingProductPicture=true" @dragleave="draggingProductPicture=false" @dragend="draggingProductPicture=false" @drop="onDropProductThumbnail($event)">
                <div class="flex flex-col items-center justify-center h-full space-y-1 text-center">
                  <template v-if="productThumbnailImage">
                    <div class="relative w-full h-full">
                      <div class="absolute flex items-center justify-center w-full h-full">
                        <img :src="productThumbnailImage" class="object-cover object-center h-full" alt="previewthumbnailProduct">
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <svg class="w-24 h-24 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </template>
                  <div class="flex flex-col items-center justify-center space-y-2 text-sm text-gray-600">
                    <button v-if="productThumbnailImage" type="button" class="flex items-center justify-center w-20 text-sm text-red-400 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-gray-50" @click="removeProductThumbnail()">
                      Remover
                    </button>
                    <div class="flex">
                      <label for="thumbnailImageUpload" class="relative font-medium bg-white rounded-md cursor-pointer text-primary-600 hover:text-primary-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                        <span>Sube una imagen</span>
                        <input id="thumbnailImageUpload" accept="image/*" name="thumbnailImageUpload" type="file" class="sr-only" @change="onChangeProductThumbnail($event)">
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
          <!-- Prices -->
          <div class="py-5 space-y-6 bg-white rounded-md shadow">
            <h2 class="px-4 text-base font-semibold text-gray-900 sm:px-6">
              Variantes y precio
            </h2>
            <div v-show="!enabledVariants" class="flex flex-col space-y-6">
              <div class="pb-6 border-b">
                <div class="grid grid-cols-6 gap-6 px-4 sm:px-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="price" class="base-label">Precio</label>
                    <div class="relative mt-1">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span class="text-gray-500 sm:text-sm">
                          $
                        </span>
                      </div>
                      <input id="price" v-model="product.price" v-maska="'#*.##'" :maxlength="7" type="text" name="price" class="pl-7 base-input" :class="{'base-input--error': errors.price}" placeholder="0.00" aria-describedby="price">
                    </div>
                    <div v-if="errors.price" class="flex flex-col">
                      <span v-for="error in errors.price" :key="error.id" class="mt-1 text-sm text-red-500">
                        {{ error }}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label for="compare_at_price" class="base-label">Precio de comparación</label>
                    <div class="relative mt-1">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span class="text-gray-500 sm:text-sm">
                          $
                        </span>
                      </div>
                      <input id="compare_at_price" v-model="product.compare_at_price" v-maska="'#*.##'" :maxlength="7" type="text" name="compare_at_price" class="pl-7 base-input" placeholder="0.00" aria-describedby="compare_at_price">
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-6 gap-6 px-4 pb-6 border-b sm:px-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="inventory_cost" class="base-label">Costo por artículo</label>
                  <div class="relative mt-1 rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span class="text-gray-500 sm:text-sm">
                        $
                      </span>
                    </div>
                    <input id="inventory_cost" v-model="product.inventory_cost" v-maska="'#*.##'" :maxlength="7" type="text" name="inventory_cost" class="pl-7 base-input" placeholder="0.00" aria-describedby="inventory_cost">
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <div class="grid grid-cols-2">
                    <div class="col-span-1">
                      <label for="margin_price" class="base-label">Margen</label>
                      <span id="margin_price" class="text-sm">
                        {{ marginPrice }}
                      </span>
                    </div>
                    <div class="col-span-1">
                      <label for="gain_price" class="base-label">Ganancia</label>
                      <span id="gain_price" class="text-sm">
                        {{ gainPrice }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-6 gap-6 px-4 sm:px-6">
              <div class="col-span-6">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="variants" v-model="enabledVariants" name="variants" type="checkbox" class="cursor-pointer base-checkbox">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="variants" class="font-medium text-gray-700 cursor-pointer">
                      Este producto tiene múltiples presentaciones</label>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="enabledVariants" class="pt-5 space-y-6 overflow-hidden border-t ">
              <div class="flex items-center justify-between w-full px-4 sm:px-6">
                <span class="text-sm font-medium uppercase">
                  Vista previa
                </span>
              </div>
              <div class="w-full overflow-x-auto border-b rounded">
                <table class="w-full divide-y divide-gray-200 table-fixed">
                  <thead class="">
                    <tr>
                      <th scope="col" class="w-40 px-4 py-4 sm:px-6">
                        <div class="flex items-center text-xs text-left">
                          <span class="text-xs font-semibold tracking-wider text-left uppercase ">
                            Variante*
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="px-4 py-4 sm:px-6 w-36">
                        <div class="flex items-center text-xs text-left">
                          <span class="text-xs font-semibold tracking-wider text-left uppercase ">
                            Precio*
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="w-32 px-4 py-4 sm:px-6">
                        <div class="flex items-center text-xs text-left">
                          <span class="text-xs font-semibold tracking-wider text-left uppercase ">
                            Cantidad
                          </span>
                        </div>
                      </th>
                      <th scope="col" class="relative w-32 px-4 py-4 sm:px-6">
                        <span class="sr-only">Acción</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(variant,index) in variantsArray" :key="index" class="even:bg-gray-50 hover:bg-gray-100">
                      <td class="flex items-center px-4 py-4 text-left truncate sm:px-6">
                        <div class="relative">
                          <input :id="`nomenclature_value-${index}`" v-model="variantsArray[index].nomenclature_value" v-maska="'#*.##'" :maxlength="7" type="text" :name="`nomenclature_value-${index}`" class="pl-2 pr-16 base-input" placeholder="0">
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
                      <td class="px-4 py-4 text-left truncate sm:px-6">
                        <div class="relative rounded-md">
                          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span class="text-gray-500 sm:text-sm">
                              $
                            </span>
                          </div>
                          <label for="nomenclature_price" class="sr-only">Precio</label>
                          <input id="nomenclature_price" v-model="variantsArray[index].price" v-maska="'#*.##'" :maxlength="7" type="text" name="nomenclature_price" class="pl-7 base-input" placeholder="0.00" aria-describedby="nomenclature_price">
                        </div>
                      </td>
                      <td class="px-4 py-4 text-left truncate sm:px-6">
                        <label :for="`nomenclature_quantity-${index}`" class="sr-only">{{ `Variante-${index}` }}</label>
                        <VariantQuantity :id="`nomenclature_quantity-${index}`" v-model="variant.stock" :index="index" />
                      </td>
                      <td class="px-4 py-4 text-left truncate sm:px-6">
                        <div class="flex items-center">
                          <base-button variant="white" type="button" size="icon" @onClick="removeVariantFromArray(index)">
                            <svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </base-button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="px-4 sm:px-6">
                <base-button variant="white" type="button" @onClick="addNewVariant()">
                  Agregar variante
                </base-button>
              </div>
            </div>
          </div>
          <!-- Inventory -->
          <div class="py-5 space-y-6 bg-white rounded-md shadow">
            <h2 class="px-4 text-base font-semibold text-gray-900 sm:px-6">
              Inventario
            </h2>
            <div class="px-4 sm:px-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="sku" class="base-label">SKU (código de artículo)</label>
                  <input id="sku" v-model="product.sku" v-maska="'X*'" :maxlength="15" type="text" name="sku" class="mt-1 base-input" aria-describedby="sku">
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label for="barcode" class="base-label">Código de barras (ISBN, etc.)</label>
                  <input id="barcode" v-model="product.barcode" v-maska="'X*'" type="text" :maxlength="25" name="barcode" class="mt-1 base-input" aria-describedby="barcode">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- right/down content -->
        <div class="flex flex-col lg:space-y-6 lg:col-start-3 lg:col-span-1">
          <div class="order-last px-4 py-5 mt-6 bg-white rounded-md shadow lg:mt-0 lg:order-first sm:px-6">
            <h2 class="text-base font-semibold text-gray-900">
              Estado del producto
            </h2>
            <!-- Product Status-->
            <div class="flex flex-col mt-4 space-y-2">
              <select id="status" v-model="product.status" name="status" class="base-input">
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
          <div class="grid grid-cols-6 gap-6 px-4 py-5 bg-white rounded-md shadow sm:px-6">
            <h2 class="text-base font-semibold text-gray-900">
              Organización
            </h2>
            <!-- Product Status-->
            <div class="flex flex-col col-span-6">
              <label for="product_category" class="base-label">Categoría</label>
              <v-select id="product_category" v-model="product.category_id" :class="{'vs__dropdown-toggle--error': errors.category_id}" class="mt-1" placeholder="Selecciona una categoría" :clearable="false" label="name" :options="categories" :searchable="true" :reduce="category => category.id">
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes">
                    <svg class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
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
            <div v-show="!enabledVariants" class="flex flex-col col-span-6">
              <label for="product_stock" class="base-label">Stock</label>
              <VariantQuantity id="product_stock" v-model="product.stock" class="mt-1" name="product_stock" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end py-3 space-x-3 border-t">
        <base-button :disabled="isLoadingStore" to="/products" variant="white" class="w-32">
          Cancelar
        </base-button>
        <base-button :disabled="isLoadingStore || !isFormComplete" type="submit" :is-loading="isLoadingStore" class="w-32">
          Guardar
        </base-button>
      </div>
    </form>
  </div>
</template>

<script>
import * as _ from 'lodash'
const VALIDATE_EXTENSIONS = ['jpg', 'png', 'jpeg']
export default {
  name: 'ProductsCreate',
  data () {
    return {
      isLoaded: false,
      isLoadingStore: false,
      draggingProductPicture: false,
      enabledVariants: false,
      errors: {},
      categories: [],
      nomenclatures: [],
      product: {
        name: '',
        description: '',
        status: 0,
        price: null,
        compare_at_price: null,
        inventory_cost: null,
        category_id: '',
        thumbnail: '',
        stock: 0,
        sku: null,
        barcode: null
      },
      productThumbnailImage: null,
      productThumbnailImageError: '',
      variantsArray: [],
      messageInSelectedStatus:
        'Este producto no estará disponible para su venta.'
    }
  },
  async fetch () {
    await this.fetchCategories()
    await this.fetchNomenclatures()
    this.isLoaded = true
  },
  computed: {
    marginPrice () {
      if (!this.product.price || !this.product.inventory_cost) {
        return '-'
      }
      const gain = parseFloat(
        ((this.product.price - this.product.inventory_cost) /
          this.product.price) *
          100
      ).toFixed(1)
      return `${gain}%`
    },
    gainPrice () {
      if (!this.product.price || !this.product.inventory_cost) {
        return '-'
      }
      const minus = parseFloat(this.product.price - this.product.inventory_cost).toFixed(1)
      return `$${minus}`
    },
    variantsCompleted () {
      return this.variantsArray.some(v => v.nomenclature_value)
    },
    isFormComplete () {
      return !((!this.product.name || !this.product.description || !this.product.category_id || !this.product.thumbnail) || !(this.enabledVariants ? this.variantsCompleted : true))
    }
  },
  watch: {
    enabledVariants (newValue) {
      if (newValue) {
        this.variantsArray = []
        const emptyVariant = {
          nomenclature_id: this.nomenclatures[0].id,
          nomenclature_value: null,
          price: null,
          stock: 0
        }
        this.variantsArray.push(emptyVariant)
      } else if (!newValue) {
        this.variantsArray = []
      }
    },
    'product.status' (newValue) {
      if (newValue === 'activo') {
        this.messageInSelectedStatus =
          'Este producto estará disponible para su venta.'
      } else {
        this.messageInSelectedStatus =
          'Este producto no estará disponible para su venta.'
      }
    }
  },
  methods: {
    onDropProductThumbnail (event) {
      event.stopPropagation()
      event.preventDefault()
      const files = event.dataTransfer.files
      this.createFileProductImage(files[0])
      this.draggingProductPicture = false
    },
    onChangeProductThumbnail (event) {
      const files = event.target.files
      if (files[0]) {
        this.createFileProductImage(files[0])
      }
      event.target.value = ''
    },
    validateImage (file) {
      let errorMessage = ''
      let isValid = true
      if (file.type.match('image.*')) {
        const fileExtension = _.toLower(file.name.split('.').pop())
        const fileSize = file.size / 1024
        if (!VALIDATE_EXTENSIONS.includes(fileExtension)) {
          errorMessage = 'Selecciona un tipo de imagen válido (png, jpeg o jpg)'
          isValid = false
        } else if (fileSize >= 5120) {
          errorMessage = 'El tamaño máximo de carga es de 5MB'
          isValid = false
        }
      } else {
        errorMessage = 'Solo puedes subir imágenes'
        isValid = false
      }
      return { isValid, errorMessage }
    },
    createFileProductImage (file) {
      const { isValid, errorMessage } = this.validateImage(file)
      if (isValid) {
        const reader = new FileReader()
        const vm = this
        reader.onload = function (e) {
          vm.productThumbnailImage = e.target.result
        }
        reader.readAsDataURL(file)
        this.errors.thumbnail = null
        this.product.thumbnail = file
      } else {
        this.errors.thumbnail = [errorMessage]
      }
    },
    removeProductThumbnail () {
      this.productThumbnailImage = null
      this.errors.thumbnail = null
      this.product.thumbnail = null
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
    async storeProduct () {
      this.isLoadingStore = true

      try {
        // First store the thumbnail and retrieve the path
        const { data: thumbnailPath } = await this.$axios.$post('/products/thumbnail', this.storeThumbnail())
        const { variants, type } = this.getVariants(thumbnailPath)
        // later store the product and variants
        const tempProduct = {
          ...this.product,
          type,
          variants
        }
        const { data } = await this.$axios.$post('/products/', tempProduct)
        this.$notify({ group: 'top', type: 'success', title: '¡Guardado exitosamente!', text: 'El producto ha sido creado' }, 2000)
        setTimeout(() => {
          this.$router.push(`/products/${data.product.id}`)
        }, 500)
      } catch (e) {
        const status = e.response.status
        this.errors = status === 422 ? e.response.data.errors : {}
        const message = status === 422 ? 'Por favor, revisa los campos marcados' : 'Intentalo más tarde'
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 10)
        this.$notify({ group: 'top', type: 'error', title: '¡Error!', text: message }, 2000)
      } finally {
        this.isLoadingStore = false
      }
    },
    storeThumbnail () {
      this.errors = {}
      const formData = new FormData()
      formData.append('thumbnail', this.product.thumbnail ? this.product.thumbnail : null)
      formData.append('name', this.product.name)
      formData.append('description', this.product.description)
      formData.append('category_id', this.product.category_id)
      formData.append('price', this.product.price ? this.product.price : '')
      formData.append('status', this.product.status)
      return formData
    },
    getVariants (thumbnailPath) {
      // determinate if has variants or not
      const variantsLength = this.variantsArray.length
      let variants = []
      const type = variantsLength >= 1 ? 'variant' : 'single'

      if (variantsLength >= 1) {
        variants = JSON.parse(JSON.stringify(this.variantsArray))
        variants.forEach((v) => {
          v.thumbnail_path = thumbnailPath
        })
      } else {
        // create first variant as a default product
        const defaultNomenclature = _.find(this.nomenclatures, x => x.name === 'default')
        const singleVariant = {
          compare_at_price: this.product.compare_at_price,
          nomenclature_value: null,
          nomenclature_id: defaultNomenclature.id,
          inventory_cost: this.product.inventory_cost,
          price: this.product.price,
          stock: this.product.stock,
          thumbnail_path: thumbnailPath
        }
        variants.push(singleVariant)
      }
      return { variants, type }
    }
  }
}
</script>
