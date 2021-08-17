<template>
  <div class="flex flex-col items-center justify-between px-4 py-3 bg-white lg:flex-row">
    <div class="flex">
      <p class="text-sm text-gray-700">
        Mostrando
        <span class="font-medium">{{ mutableItemCount }}</span>
        de
        <span class="font-medium">{{ mutableTotalItems }}</span>
        resultados
      </p>
    </div>
    <div class="flex justify-between flex-1 mt-4 sm:hidden sm:mt-0">
      <button type="button" :disabled="prevIsDisabled()" :class="{'disabled:opacity-50 disabled:cursor-not-allowed': prevIsDisabled()}" class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2" @click="goToPrevPage">
        Anterior
      </button>
      <button type="button" :disabled="nextIsDisabled()" :class="{'disabled:opacity-50 disabled:cursor-not-allowed': nextIsDisabled()}" class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2" @click="goToNextPage">
        Siguiente
      </button>
    </div>
    <nav class="relative z-0 hidden mt-4 -space-x-px sm:inline-flex lg:mt-0" aria-label="Pagination">
      <button type="button" :disabled="prevIsDisabled()" :class="{'disabled:opacity-50 disabled:cursor-not-allowed': prevIsDisabled()}" class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md focus:z-10 hover:bg-gray-100 focus:outline-none" @click="goToFirstPage">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
      <button type="button" :disabled="prevIsDisabled()" :class="{'disabled:opacity-50 disabled:cursor-not-allowed': prevIsDisabled()}" class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 focus:z-10 hover:bg-gray-100 focus:outline-none" @click="goToPrevPage">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <template v-for="(page) in pageButtons">
        <template v-if="page === 'less'">
          <span :key="page" class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 cursor-not-allowed focus:outline-none"> ... </span>
        </template>
        <template v-if="isNumberPage(page)">
          <button :key="page" type="button" :disabled="disabled" :class="isPageActive(page) ? 'text-white bg-primary-500 hover:bg-primary-600 border-primary-500' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100'" class="relative inline-flex items-center px-4 py-2 text-sm font-medium border focus:z-10 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed" @click="selectPage(page)">
            {{ page }}
          </button>
        </template>
        <template v-if="page === 'more'">
          <span :key="page" class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 cursor-not-allowed focus:outline-none"> ... </span>
        </template>
      </template>
      <button type="button" :disabled="nextIsDisabled()" :class="{'disabled:opacity-50 disabled:cursor-not-allowed': nextIsDisabled()}" class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 focus:z-10 hover:bg-gray-100 focus:outline-none" @click="goToNextPage">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <button type="button" :disabled="nextIsDisabled()" :class="{'disabled:opacity-50 disabled:cursor-not-allowed': nextIsDisabled()}" class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md focus:z-10 hover:bg-gray-100 focus:outline-none" @click="goToLastPage">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
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
      default: null
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
      default: 0
    },
    // Total de paginas disponibles
    totalPages: {
      type: [String, Number],
      default: 0
    },
    // Limite de botones a mostrar
    limit: {
      type: [String, Number],
      default: 5,
      validator: value => value >= 0
    }
  },
  computed: {
    mutableTotalItems () {
      return _.toNumber(this.totalItems)
    },
    mutableItemCount () {
      return _.toNumber(this.itemCount)
    },
    mutableItemsPerPage () {
      return _.toNumber(this.itemsPerPage)
    },
    mutableTotalPages () {
      return _.toNumber(this.totalPages)
    },
    mutableLimit () {
      return _.toNumber(this.limit)
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
      const from1 = Number(this.currentPage) - Math.round(this.mutableLimit / 2) + 1
      const from2 = (this.mutableTotalPages) + 1 - (this.mutableLimit)
      const from = Math.max(
        Math.min(from1, from2),
        1
      )

      const to = Math.min(from + this.mutableLimit - 1, this.mutableTotalPages)

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
  methods: {
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
