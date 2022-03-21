<template>
  <div>
    <MediaUpload :is-modal-upload-open.sync="isModalUploadOpen" @closeModalUpload="isModalUploadOpen = false" @uploadFinished="fetchAgain" />
    <div class="space-y-5 w-full">
      <div v-if="isLoaded" class="flex flex-col space-y-6 w-full">
        <div class="flex flex-col justify-between items-start space-y-2 sm:space-y-0 sm:flex-row">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-gray-100">
            Librería de medios
          </h1>
          <BaseButton v-if="images.data && images.data.length > 0" @onClick="isModalUploadOpen = true">
            Agregar imágenes
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
                    <label class="sr-only" for="searchProducts">
                      Buscar
                    </label>
                    <div class="relative group">
                      <span class="flex absolute inset-y-0 left-0 justify-center items-center w-9 h-9 text-gray-400 pointer-events-none group-focus-within:text-primary-500">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </span>
                      <input id="searchProducts"
                             v-model="searchImage"
                             class="input-search"
                             name="searchProducts"
                             placeholder="Buscar"
                             type="search"
                             @input="debounceSearchImages"
                      >
                    </div>
                  </div>
                  <!--              Filtros-->
                </div>
              </div>
              <!--            Tabla-->
              <div class="flex flex-col w-full">
                <div class="block overflow-x-auto relative w-full border-t border-b border-gray-300 dark:border-gray-700">
                  <BaseSpinnerTable v-if="isFetching && images.data.length > 0" />
                  <ul v-if="images.data.length >0 " role="list" class="p-4 grid gap-4 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
                    <MediaItemThumbnail v-for="(image) in images.data" :key="image.id" :image="image" />
                  </ul>
                  <div v-else class="flex flex-col justify-center items-center py-8 space-y-4 h-64 text-center">
                    <svg class="flex-shrink-0 w-10 h-10 text-gray-400 sm:w-16 sm:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
                    </svg>
                    <div class="flex flex-col space-y-2">
                      <p class="text-lg sm:text-xl">
                        No se encontraron las imágenes
                      </p>
                      <p class="text-sm text-gray-500">
                        Intenta cambiar los filtros o el término de búsqueda
                      </p>
                    </div>
                  </div>
                </div>
                <BasePaginator
                  v-if="images.data.length > 0"
                  v-model="images.meta.current_page"
                  :disabled="isFetching"
                  :is-fetching="isFetching"
                  :item-count="images.data.length"
                  :items-per-page.sync="images.meta.per_page"
                  :total-items="images.meta.total"
                  :total-pages="images.meta.last_page"
                />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="overflow-hidden h-full text-center bg-white rounded-lg shadow">
              <div class="flex flex-col p-8">
                <img alt="Inicio Media" class="mx-auto w-[15rem] h-auto" src="@/static/images/main-pages/main-media-motion.svg">
                <p class="text-xl">
                  Agregar imágenes y gestionar la librería de medios
                </p>
                <p class="mx-auto my-4 max-w-xs text-sm text-gray-500">
                  Aquí es donde gestionas las imágenes para tus productos.
                </p>
                <div class="mt-2 mb-6">
                  <BaseButton @onClick="isModalUploadOpen = true">
                    Agregar imágenes
                  </BaseButton>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
      <SkeletonIndexPage v-else />
    </div>
  </div>
</template>

<script>

import * as _ from 'lodash'

export default {
  name: 'Media',
  data () {
    return {
      isModalUploadOpen: false,
      isLoaded: false,
      alreadyHasData: 0,
      isFetching: false,
      searchImage: '',
      images: {},
      isSearchOrSelect: false
    }
  },
  fetchOnServer: false,
  async fetch () {
    await this.fetchMedia()
    this.isLoaded = true
  },
  watch: {
    'images.meta.current_page' () {
      if (this.isLoaded) {
        this.fetchMedia()
      }
    },
    'images.meta.per_page' (newValue, oldValue) {
      if (this.isLoaded) {
        if (Number(newValue) !== Number(oldValue)) {
          this.isSearchOrSelect = true
          this.fetchMedia()
        }
      }
    }
  },
  methods: {
    async fetchMedia () {
      try {
        this.isFetching = true
        this.images = await this.$axios.$get('/images', {
          params: {
            'filter[name]': this.searchImage || null,
            limit: this.images.meta?.per_page ?? 10,
            page: this.isSearchOrSelect ? 1 : (this.images.meta?.current_page ?? 1)
          }
        })
        this.alreadyHasData = this.alreadyHasData !== 0 ? this.alreadyHasData : this.images.data.length
        this.isFetching = false
      } catch (e) {
        this.$notify(
          {
            group: 'top',
            type: 'error',
            title: '¡Error!',
            text: 'Ocurrió un error al obtener los medios'
          }, 2000)
      } finally {
        this.isSearchOrSelect = false
      }
    },
    debounceSearchImages: _.debounce(function () {
      this.isSearchOrSelect = true
      this.fetchMedia()
    }, 300),
    async fetchAgain (payload) {
      if (payload) {
        await this.fetchMedia()
      }
    }
  }
}
</script>
