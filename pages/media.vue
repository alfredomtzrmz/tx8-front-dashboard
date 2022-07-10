<template>
  <div>
    <UploadMedia @uploadFinished="fetchAgain" />
    <EditMedia
      :media-file="selectedImage"
      @successEditMedia="fetchAgain"
    />
    <DeleteMedia
      :media-file="selectedImage"
      @successDeleteMedia="fetchAgain"
    />
    <div class="space-y-5 w-full">
      <div v-if="isLoaded" class="flex flex-col space-y-6 w-full">
        <div class="flex flex-col justify-between items-start space-y-2 sm:space-y-0 sm:flex-row">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-gray-100">
            Librería de medios
          </h1>
          <BaseButton
            v-if="images.data && images.data.length > 0"
            @onClick="openUploadModal()"
          >
            Agregar imágenes
          </BaseButton>
        </div>
        <template v-if="isLoaded">
          <template v-if="alreadyHasData">
            <div class="flex-col bg-white rounded-lg border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
              <!-- Filters -->
              <div class="flex justify-between items-center p-2 h-14">
                <div class="flex items-center gap-2">
                  <div class="ml-3">
                    <input
                      :checked="checked"
                      :indeterminate.prop="indeterminate"
                      aria-describedby="select_all_items-description"
                      class="cursor-pointer base-checkbox"
                      name="select_all_items"
                      type="checkbox"
                      @change="selectAll"
                    >
                  </div>
                  <button
                    v-if="selected.length >=1"
                    aria-expanded="true"
                    aria-haspopup="true"
                    class="flex justify-center items-center w-10 h-10 rounded-full hover:bg-gray-500/5 focus:outline-none text-primary-500 focus:bg-primary-500/10"
                    type="button"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    </svg>
                  </button>
                </div>
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
              <!-- Table-->
              <div class="flex flex-col w-full">
                <div class="block overflow-x-auto relative w-full border-t border-b border-gray-200 dark:border-gray-700">
                  <BaseSpinnerTable v-if="isFetching && images.data.length > 0" />
                  <table v-if="images.data.length >0 " class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr class="bg-gray-50">
                        <th class="px-4 py-3 dark:bg-gray-800">
                          <button type="button" class="flex items-center space-x-1 text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-300">
                            <span>
                              Medio
                            </span>
                          </button>
                        </th>
                        <th class="px-4 py-3 dark:bg-gray-800">
                          <div class="flex items-center text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-300">
                            <span>
                              Tamaño
                            </span>
                          </div>
                        </th>
                        <th class="px-4 py-3 dark:bg-gray-800">
                          <div class="flex items-center text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-300">
                            <span>
                              Fecha de subida
                            </span>
                          </div>
                        </th>
                        <th class="px-4 py-3 dark:bg-gray-800">
                          <div class="flex items-center text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-300">
                            <span>
                              Última actualización
                            </span>
                          </div>
                        </th>
                        <th class="px-4 py-3 dark:bg-gray-800">
                          <div class="flex items-center text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-300">
                            <span>
                              Acciones
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      <tr v-for="(image,index) in images.data" :key="index">
                        <td class="flex items-center px-4 py-3 whitespace-nowrap">
                          <div class="flex items-center space-x-4 w-full">
                            <div class="flex flex-col flex-shrink-0 justify-center items-center p-0.5 w-16 h-16 text-center rounded-md border border-gray-300 dark:border-gray-700">
                              <div class="flex justify-center items-center w-full h-full">
                                <LoadedImage v-if="returnThumbnail(image)" :alt="image.name" :src="returnThumbnail(image)" classes="object-cover object-center h-full" />
                                <svg v-else class="w-6 h-6 text-gray-600 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                </svg>
                              </div>
                            </div>
                            <span class="text-gray-900 rounded-md dark:text-white line-clamp-3">
                              {{ image.name }}
                            </span>
                          </div>
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap">
                          <span class="text-gray-900 dark:text-white">
                            {{ returnSize(image) }}
                          </span>
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap">
                          <span class="text-gray-900 dark:text-white">
                            {{ parseDate(image.created_at) }}
                          </span>
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap">
                          <span class="text-gray-900 dark:text-white">
                            {{ parseDate(image.updated_at) }}
                          </span>
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap">
                          <div class="flex gap-4">
                            <button
                              type="button"
                              class="inline-flex items-center p-1 border border-transparent rounded-full text-gray-700 bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-primary-500/25 focus:ring-2"
                              @click="openDeleteModal(image)"
                            >
                              <svg class="h-5 w-5 outline-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              class="inline-flex items-center p-1 border border-transparent rounded-full text-gray-700 bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-primary-500/25 focus:ring-2"
                              @click="openEditModal(image)"
                            >
                              <svg class="h-5 w-5 outline-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                          </div>
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
                        No se encontraron las imágenes
                      </p>
                      <p class="text-sm text-gray-500">
                        Intenta cambiar los filtros o el término de búsqueda
                      </p>
                    </div>
                  </div>
                </div>
                <!-- Paginator-->
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
                  <BaseButton @onClick="openUploadModal()">
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
import { mapActions } from 'vuex'
import * as _ from 'lodash'
import * as dayjs from 'dayjs'
import { niceBytes } from '~/helpers/formatBytes'
import 'dayjs/locale/es'

export default {
  name: 'Media',
  data () {
    return {
      baseUrl: this.$config.baseImageUrl,
      isModalUploadOpen: false,
      isModalEditOpen: false,
      isLoaded: false,
      alreadyHasData: 0,
      isFetching: false,
      searchImage: '',
      images: {},
      isSearchOrSelect: false,
      selectedImage: {},
      selectedImageName: '',
      isUpdating: false,
      selected: []
    }
  },
  fetchOnServer: false,
  async fetch () {
    await this.fetchMedia()
    this.isLoaded = true
  },
  computed: {
    indeterminate () {
      return this.selected.length > 0 && this.selected.length < this.images.data.length
    },
    checked () {
      return this.indeterminate || this.selected.length === this.images.data.length
    }
  },
  watch: {
    'images.meta.current_page' () {
      this.selected = []
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
    ...mapActions('modal', ['setOpenModal', 'setCloseModal']),
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
        this.$notify({ group: 'top', type: 'error', title: '¡Error!', text: 'Ocurrió un error al obtener los medios' }, 2000)
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
        this.alreadyHasData = this.images.data.length
      }
    },
    openDetailsModal (image) {
      this.selectedImageName = _.get(image, ['name'], 'Default')
      this.selectedImage = image
      this.setOpenModal('details-item-upload-modal')
    },
    closeDetailsModal () {
      this.setCloseModal('details-item-upload-modal')
    },
    returnThumbnail (image) {
      const thumbnail = _.get(image, ['path'], null)
      return thumbnail ? `${this.baseUrl}/${thumbnail}` : null
    },
    returnSize (image) {
      const size = _.get(image, ['size'], 0)
      return niceBytes(size)
    },
    parseDate (date) {
      return dayjs(date).locale('es').format('DD MMMM YYYY')
    },
    selectAll (event) {
      this.selected = event.target.checked ? this.images.data.map(i => i.id) : []
    },
    openUploadModal () {
      this.setOpenModal('upload-media-modal')
    },
    openEditModal (mediaFile) {
      this.selectedImage = mediaFile
      this.setOpenModal('edit-media-modal')
    },
    openDeleteModal (mediaFile) {
      this.selectedImage = mediaFile
      this.setOpenModal('delete-media-modal')
    }
  }
}
</script>
