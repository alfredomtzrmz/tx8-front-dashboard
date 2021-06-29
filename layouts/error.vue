<template>
  <div class="flex flex-col items-center justify-center w-full space-y-4">
    <template v-if="errorStatusCode === 404">
      <img src="@/static/images/404-error-motion.svg" alt="Error 404 - Page not found" class="h-auto mx-auto sm:w-80">
      <div class="flex flex-col items-center">
        <h2 class="text-2xl font-bold text-center sm:text-4xl text-truegray-700">
          Página no encontrada.
        </h2>
        <p class="mt-5 text-lg font-normal text-center text-truegray-700">
          {{ errorMessage }}
        </p>
      </div>
      <base-button to="/">
        Regresar al inicio
      </base-button>
    </template>
    <template v-if="errorStatusCode === 500">
      <img src="https://cdn.geekstadium.com/website-resources/error-pages/error-500.svg" alt="Error 500 - System error" class="mx-auto">
      <div class="flex flex-col items-center">
        <h1 class="text-3xl font-bold sm:text-6xl text-truegray-700">
          500
        </h1>
        <h2 class="text-2xl font-bold text-center sm:text-5xl text-truegray-700">
          Error interno
        </h2>
        <p class="mt-5 text-lg font-normal text-center text-truegray-700">
          {{ errorMessage }}
        </p>
      </div>
      <base-button to="/">
        Regresar a home
      </base-button>
    </template>
    <template v-if="errorStatusCode === 403">
      <img src="https://cdn.geekstadium.com/website-resources/error-pages/error-403.svg" alt="Error 403 - Forbidden" class="mx-auto">
      <div class="flex flex-col items-center">
        <h1 class="text-3xl font-bold sm:text-6xl text-truegray-700">
          403
        </h1>
        <h2 class="text-2xl font-bold text-center sm:text-5xl text-truegray-700">
          Acceso no autorizado
        </h2>
        <p class="mt-5 text-lg font-normal text-center text-truegray-700">
          {{ errorMessage }}
        </p>
      </div>
      <base-button to="/">
        Regresar a home
      </base-button>
    </template>
  </div>
</template>

<script>
import * as _ from 'lodash'
const ERROR_MESSAGES = [
  {
    statusCode: 403,
    message: 'Lo sentimos, no tienes permisos para visualizar'
  },
  {
    statusCode: 404,
    message: 'La página que estás buscando no existe, verifica la URL e intenta de nuevo.'
  },
  {
    statusCode: 500,
    message: 'Hubo un error en el sistema, por favor inténtalo mas tarde'
  }
]
export default {
  name: 'Error',
  layout ($store) {
    return $store.$auth.$state.loggedIn ? 'LayoutPlatform' : 'LayoutAuth'
  },
  transition: 'tweakOpacity',
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  computed: {
    errorMessage () {
      if (this.error.message === '' || this.error.message.includes('statusCode') || this.error.message.includes('This page could not be found')) {
        const response = _.find(ERROR_MESSAGES, (e) => {
          return e.statusCode === this.error.statusCode
        })
        return _.get(response, 'message')
      } else {
        return this.error.message
      }
    },
    errorStatusCode () {
      return this.error.statusCode
    },
    isLoggedIn () {
      return this.$auth.loggedIn
    }
  }
}
</script>
