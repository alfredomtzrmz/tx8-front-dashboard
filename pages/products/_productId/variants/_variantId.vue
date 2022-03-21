<template>
  <div class="max-w-5xl mx-auto space-y-5">
    <template v-if="isLoaded">
      <div class="flex">
        <div class="lg:space-x-4 flex flex-col lg:flex-row lg:items-center items-start text-gray-600 px-0.5 space-y-2 lg:space-y-0">
          <base-button size="icon" to="/products" variant="transparent">
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
          </base-button>
          <span class="text-xl font-medium text-gray-900">
            750ML
          </span>
        </div>
      </div>
      <form class="flex flex-col w-full space-y-6" enctype="multipart/form-data" novalidate>
        <div class="grid grid-cols-1 gap-6 md:grid-flow-col-dense md:grid-cols-3">
          <!-- left/up content -->
          <div class="space-y-6 md:col-start-1 md:col-span-1">
            <!-- thumbnail and resume -->
            <div class="flex-col px-4 py-5 bg-white rounded-md shadow sm:px-5">
              <p class="text-gray-900 text">
                Whiskey Jack Daniel's Honey
              </p>
              <BadgeStatus :status="1" class="my-1" size="sm" />
              <p class="mb-1 text-sm text-gray-500">
                2 variantes
              </p>
              <nuxt-link class="text-sm p-0.5 text-blue-600 underline rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" to="#">
                Volver al producto
              </nuxt-link>
            </div>
            <!-- variants -->
            <div class="order-last pt-5 mt-6 bg-white rounded-md shadow md:mt-0 md:order-first">
              <h2 class="px-4 text-base font-semibold text-gray-900 sm:px-5">
                Variantes
              </h2>
              <div class="flex flex-col mt-4 space-y-2 rounded-b-md">
                <ul class="relative flex flex-col h-auto overflow-y-auto bg-white divide-y rounded-b-md max-h-72 ring-1 ring-black/5">
                  <li v-for="item in 5" :key="item.id">
                    <nuxt-link class="flex items-center gap-4 px-4 py-2 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset focus:ring-opacity-50" to="#">
                      <div class="flex flex-col items-center justify-center flex-shrink-0 p-0.5 text-center border border-gray-300 rounded-md w-11 h-11">
                        <div class="flex items-center justify-center w-full h-full">
                          <LoadedImage alt="Whiskey Jack Daniel's Honey" classes="object-cover object-center h-full" src="https://tx8-test.s3.us-west-1.amazonaws.com/products/f079c821-53d0-41ef-803d-dae655035577.png?time=0.7094298621387563" />
                        </div>
                        <!--                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">-->
                        <!--                          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />-->
                        <!--                        </svg>-->
                      </div>
                      <span class="text-sm text-gray-700">
                        750ML
                      </span>
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- right/down content -->
          <div class="flex flex-col md:space-y-6 md:col-start-2 md:col-span-2">
            <!-- options -->
            <div class="px-4 py-5 bg-white rounded-md shadow sm:px-5 space-y-6">
              <h2 class="text-base font-semibold text-gray-900">
                Opciones
              </h2>
              <div class="max-w-[10.5rem] w-full">
                <label class="base-label" for="nomenclature_value">
                  Valor y nomenclatura
                </label>
                <div class="relative mt-1">
                  <input id="nomenclature_value"
                         v-maska="'#*.##'"
                         :maxlength="7"
                         type="text"
                         name="nomenclature_value"
                         class="pl-2 pr-16 base-input"
                         placeholder="0"
                  >
                  <div class="absolute inset-y-0 right-0 z-10 flex items-center">
                    <label :for="`nomenclature_value-${2}`" class="sr-only">Nomenclature</label>
                    <select :id="`nomenclature_value-${2}`" :name="`nomenclature_value-${2}`" class="rounded-md cursor-pointer pr-7 custom-select">
                      <template v-for="(nomenclature) in nomenclatures">
                        <option v-if="nomenclature.show" :key="nomenclature.id" :value="nomenclature.id">
                          {{ nomenclature.name }}
                        </option>
                      </template>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </template>
    <SkeletonDynamicPage v-else />
  </div>
</template>

<script>
export default {
  name: 'EditVariant',
  data () {
    return {
      isLoaded: true,
      isLoadingEdit: false,
      errors: {},
      variant: {},
      nomenclatures: [],
      productThumbnailImage: null,
      productThumbnailImageError: '',
      baseUrl: this.$config.baseImageUrl
    }
  },
  fetchOnServer: false,
  async fetch () {
    await this.fetchNomenclatures()
  },
  methods: {
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
    }
  }
}
</script>
