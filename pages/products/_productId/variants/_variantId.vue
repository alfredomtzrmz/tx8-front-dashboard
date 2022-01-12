<template>
  <div class="max-w-5xl mx-auto space-y-5">
    <template v-if="isLoaded">
      <div class="flex">
        <div class="lg:space-x-4 flex flex-col lg:flex-row lg:items-center items-start text-gray-600 px-0.5 space-y-2 lg:space-y-0">
          <base-button variant="transparent" size="icon" to="/products">
            <svg class="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </base-button>
          <span class="text-xl font-medium text-gray-900">
            750ML
          </span>
        </div>
      </div>
      <form enctype="multipart/form-data" class="flex flex-col w-full space-y-6" novalidate>
        <div class="grid grid-cols-1 gap-6 md:grid-flow-col-dense md:grid-cols-3">
          <!-- left/up content -->
          <div class="space-y-6 md:col-start-1 md:col-span-1">
            <!-- thumbnail and resume -->
            <div class="flex-col px-4 py-5 bg-white rounded-md shadow sm:px-5">
              <p class="font-medium text-gray-900 text">
                Whiskey Jack Daniel's Honey
              </p>
              <BadgeStatus :status="1" size="sm" class="my-1" />
              <p class="mb-1 text-sm text-gray-500">
                2 variantes
              </p>
              <nuxt-link to="#" class="text-sm p-0.5 text-blue-600 underline rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Volver al producto
              </nuxt-link>
            </div>
            <!-- variants -->
            <div class="order-last pt-5 mt-6 bg-white rounded-md shadow md:mt-0 md:order-first">
              <h2 class="px-4 text-base font-semibold text-gray-900 sm:px-5">
                Variantes
              </h2>
              <div class="flex flex-col mt-4 space-y-2 rounded-b-md">
                <div class="relative flex flex-col h-auto overflow-y-auto bg-white divide-y rounded-b-md max-h-72 ring-1 ring-black/5">
                  <div class="flex items-center gap-4 px-4 py-2 cursor-pointer hover:bg-gray-50">
                    <div class="flex flex-col items-center justify-center flex-shrink-0 p-0.5 text-center border border-gray-300 rounded-md w-11 h-11">
                      <div class="flex items-center justify-center w-full h-full">
                        <LoadedImage src="https://tx8-test.s3.us-west-1.amazonaws.com/products/f079c821-53d0-41ef-803d-dae655035577.png?time=0.7094298621387563" alt="Whiskey Jack Daniel's Honey" classes="object-cover object-center h-full" />
                      </div>
                    </div>
                    <span class="text-sm font-medium text-gray-500">
                      750ML
                    </span>
                  </div>
                  <div class="flex items-center gap-4 px-4 py-2 cursor-pointer hover:bg-gray-50">
                    <div class="flex flex-col items-center justify-center flex-shrink-0 p-0.5 text-center border border-gray-300 rounded-md w-11 h-11">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span class="text-sm font-medium text-gray-500">
                      750ML
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- right/down content -->
          <div class="flex flex-col md:space-y-6 md:col-start-2 md:col-span-2">
            <!-- options -->
            <div class="px-4 py-5 bg-white rounded-md shadow sm:px-5">
              Hola
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
      productThumbnailImage: null,
      productThumbnailImageError: '',
      baseUrl: this.$config.baseImageUrl
    }
  }
}
</script>
