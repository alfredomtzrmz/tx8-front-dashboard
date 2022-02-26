<template>
  <div class="p-2">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img alt="TX8 Logo" class="mx-auto w-auto h-20" src="/images/logo.svg">
    </div>
    <div class="px-4 py-8 space-y-8 mt-8 bg-white shadow sm:w-full sm:max-w-md sm:mx-auto rounded-2xl sm:px-10 border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
      <h2 class="font-bold tracking-tight text-center text-2xl text-gray-900 dark:text-gray-100">
        Inicia sesión en tu cuenta
      </h2>
      <form novalidate @submit.prevent="userLogin">
        <div class="space-y-6 flex flex-col mb-2">
          <div>
            <label
              class="block text-sm font-medium "
              :class="errors.email || errors.invalid ?'text-red-700':'text-gray-700 dark:text-gray-300'"
              for="email"
            >
              Email
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="login.email"
                :class="errors.email || errors.invalid ?'border-red-600 dark:border-red-600 dark:ring-red-600':'border-gray-300 dark:border-gray-600'"
                autocomplete="email"
                class="block w-full rounded-lg shadow-sm transition duration-75 focus:border-primary-600 focus:ring-1 focus:ring-inset focus:ring-primary-600 disabled:opacity-70 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                name="email"
                type="email"
                required="true"
              >
            </div>
            <div v-if="errors.email" class="flex flex-col">
              <span v-for="error in errors.email" :key="error.id" class="mt-1 text-sm text-red-600">
                {{ error }}
              </span>
            </div>
          </div>
          <div>
            <label
              class="block text-sm font-medium"
              :class="errors.password || errors.invalid ?'text-red-700':'text-gray-700 dark:text-gray-300'"
              for="password"
            >
              Contraseña
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="login.password"
                :class="errors.password || errors.invalid ?'border-red-600 dark:border-red-600 dark:ring-red-600':'border-gray-300 dark:border-gray-600'"
                autocomplete="current-password"
                class="block w-full rounded-lg shadow-sm transition duration-75 focus:border-primary-600 focus:ring-1 focus:ring-inset focus:ring-primary-600 disabled:opacity-70 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                name="password"
                type="password"
              >
            </div>
            <div v-if="errors.password" class="flex flex-col">
              <span v-for="error in errors.password" :key="error.id" class="mt-1 text-sm text-red-600">
                {{ error }}
              </span>
            </div>
          </div>
        </div>
        <span v-if="errors.invalid" class="text-sm text-red-600">
          {{ errors.invalid }}
        </span>
        <div class="flex flex-col space-y-6 mt-6">
          <div class="flex justify-between items-center">
            <a class="font-medium text-sm text-primary-600 hover:text-primary-500" href="#">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div class="flex justify-items-center items-center">
            <base-button :disabled="isLoading" :is-loading="isLoading" class="w-full" type="submit">
              Entrar
            </base-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  layout: 'auth',
  middleware: 'auth',
  auth: 'guest',
  data () {
    return {
      isLoading: false,
      login: {
        email: 'isidro.ram@gmail.com',
        password: 'password'
      },
      errors: {}
    }
  },
  methods: {
    async userLogin () {
      try {
        this.isLoading = true
        this.errors = {}
        await this.$auth.loginWith('laravelJWT', { data: this.login })
      } catch (e) {
        const { status } = e.response
        if (status) {
          if (status === 422) {
            this.errors = e.response.data.errors
          } else if (status === 401) {
            this.errors.invalid = e.response.data.message
          }
        }
      } finally {
        this.isLoading = false
      }
    }
  }

}
</script>
