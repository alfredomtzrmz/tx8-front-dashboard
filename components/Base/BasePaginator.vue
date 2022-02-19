<template>
  <div class="px-4 py-2">
    <div class="grid grid-cols-1 gap-y-2 md:grid-cols-3 md:gap-y-0">
      <div class="flex justify-center items-center font-medium md:justify-start">
        <p class="text-sm text-gray-900 dark:text-white">
          <span class="">
            {{ startCountItems }}
          </span>
          al
          <span class="">
            {{ lastCountItems }}
          </span>
          de
          <span class="">
            {{ mutableTotalItems }}
          </span>
          resultados
        </p>
      </div>
      <div class="flex justify-center items-center space-x-2">
        <div class="flex justify-center items-center">
          <label class="sr-only" for="itemsCount">Elementos a mostrar</label>
          <select id="itemsCount" v-model="mutableItemsPerPage" class="rounded-md select-table" name="itemsCount">
            <option v-for="(item,index) in itemsPerPageData" :key="index" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <span class="hidden text-sm font-medium text-gray-900 md:block dark:text-white">
          por página
        </span>
      </div>
      <div class="flex justify-center items-center md:justify-end">
        <div class="py-3 rounded-lg border dark:border-gray-600">
          <ol class="flex items-center text-sm text-gray-500 divide-x divide-gray-300 dark:text-gray-400">
            <li>
              <button
                v-if="currentPage > 1"
                :disabled="isFetching"
                aria-label="Previous"
                class="relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md focus:outline-none filament-tables-pagination-item hover:bg-gray-500/5 focus:bg-primary-500/10 focus:ring-2 focus:ring-primary-500 dark:hover:bg-gray-400/5 transition text-primary-600"
                rel="prev"
                type="button"
                @click="goToPrevPage"
              >
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" fill-rule="evenodd" />
                </svg>
                <span />
              </button>
            </li>
            <template v-for="(page) in pageButtons">
              <template v-if="page === 'less'">
                <li :key="page">
                  <button
                    class="relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md focus:outline-none cursor-not-allowed opacity-75"
                    disabled
                    type="button"
                  >
                    <span>...</span>
                  </button>
                </li>
              </template>
              <template v-if="isNumberPage(page)">
                <li :key="page">
                  <button
                    :aria-label="`Go to page ${page}`"
                    :class="isPageActive(page) ? 'text-primary-600 focus:underline bg-primary-500/10 ring-2 ring-primary-500 cursor-not-allowed' : 'hover:bg-gray-500/5 focus:bg-primary-500/10 focus:ring-primary-500 focus:text-primary-600'"
                    :disabled="isFetching"
                    class="relative disabled:cursor-wait flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md focus:outline-none focus:ring-2 transition"
                    type="button"
                    @click="selectPage(page)"
                  >
                    <span>
                      {{ page }}
                    </span>
                  </button>
                </li>
              </template>
              <template v-if="page === 'more'">
                <li :key="page">
                  <button
                    class="relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md focus:outline-none cursor-not-allowed opacity-75"
                    disabled
                    type="button"
                  >
                    <span>...</span>
                  </button>
                </li>
              </template>
            </template>
            <li>
              <button
                v-if="currentPage < mutableTotalPages"
                :disabled="isFetching"
                aria-label="Next"
                class="relative flex disabled:cursor-wait items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md focus:outline-none hover:bg-gray-500/5 focus:bg-primary-500/10 focus:ring-2 focus:ring-primary-500 transition text-primary-600"
                rel="next"
                type="button"
                @click="goToNextPage"
              >
                <svg aria-hidden="true" class="w-5 h-5 rtl:rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" fill-rule="evenodd" />
                </svg>
                <span />
              </button>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'

export default {
  name: 'BasePaginator',
  props: {
    // Current page
    value: {
      type: [String, Number],
      default: 1
    },
    // Activar/desactivar paginador
    disabled: {
      type: Boolean,
      default: false
    },
    // Total de datos en la entidad
    totalItems: {
      type: [String, Number],
      default: 0,
      validator: value => value >= 0
    },
    // Total de datos por resultado
    itemCount: {
      type: [String, Number],
      default: 0
    },
    // Total de datos a mostrar por pagina
    itemsPerPage: {
      type: [String, Number],
      default: 5
    },
    // Total de paginas disponibles
    totalPages: {
      type: [String, Number],
      default: 0
    },
    // Limite de botones a mostrar
    buttonsLimit: {
      type: [String, Number],
      default: 5,
      validator: value => value >= 0
    },
    // desactiva temporalmente el paginador hasta que termine el fetch
    isFetching: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      startCountItems: 1,
      lastCountItems: 0,
      itemsPerPageData: [
        5,
        10,
        25,
        50
      ]
    }
  },
  computed: {
    mutableTotalItems () {
      return _.toNumber(this.totalItems)
    },
    mutableItemsPerPage: {
      get () {
        return _.toNumber(this.itemsPerPage)
      },
      set (value) {
        this.$emit('update:itemsPerPage', _.toNumber(value))
      }
    },
    mutableItemCount () {
      return _.toNumber(this.itemCount)
    },
    mutableTotalPages () {
      return _.toNumber(this.totalPages)
    },
    mutableButtonsLimit () {
      return _.toNumber(this.buttonsLimit)
    },
    currentPage: {
      get () {
        return _.toNumber(this.value)
      },
      set (currentPage) {
        this.$emit('input', _.toNumber(currentPage))
        this.$emit('change', _.toNumber(currentPage))
      }
    },
    pageButtons () {
      const from1 = Number(this.currentPage) - Math.round(this.mutableButtonsLimit / 2) + 1
      const from2 = (this.mutableTotalPages) + 1 - (this.mutableButtonsLimit)
      const from = Math.max(Math.min(from1, from2), 1)

      const to = Math.min(from + this.mutableButtonsLimit - 1, this.mutableTotalPages)

      return _.range(from, to + 1).map((page) => {
        if (page === from && from > 1) {
          return 'less'
        }

        if (page === to && to < this.mutableTotalPages) {
          return 'more'
        }
        return page
      })
    }
  },
  watch: {
    isFetching (value) {
      if (!value) {
        this.updateStartAndLastItemsCount()
      }
    }
  },
  beforeMount () {
    this.updateStartAndLastItemsCount()
  },
  methods: {
    updateStartAndLastItemsCount () {
      if (this.mutableTotalPages === 1) {
        this.startCountItems = 1
        this.lastCountItems = this.mutableTotalItems
      } else if (this.currentPage > 1) {
        this.startCountItems = ((this.currentPage - 1) * this.mutableItemsPerPage) + 1
        this.lastCountItems = (this.currentPage === this.mutableTotalPages) ? this.mutableTotalItems : this.currentPage * this.mutableItemsPerPage
      } else {
        this.startCountItems = 1
        this.lastCountItems = this.mutableItemsPerPage
      }
    },
    prevIsDisabled () {
      return this.disabled || this.currentPage === null || this.currentPage <= 1
    },
    nextIsDisabled () {
      return this.disabled || this.currentPage === null || this.currentPage >= this.mutableTotalPages
    },
    isNumberPage (page) {
      return (page !== 'less' && page !== 'more')
    },
    selectPage (page) {
      this.currentPage = page
    },
    goToPrevPage () {
      this.currentPage = this.currentPage === null
        ? 1
        : Math.max(this.currentPage - 1, 1)
    },
    goToNextPage () {
      this.currentPage = this.currentPage === null
        ? this.mutableTotalPages
        : Math.min(this.currentPage + 1, this.mutableTotalPages)
    },
    goToFirstPage () {
      this.selectPage(1)
    },
    goToLastPage () {
      this.selectPage(this.mutableTotalPages)
    },
    isPageActive (page) {
      return page === this.currentPage
    }
  }
}
</script>
