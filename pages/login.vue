<template>
  <div class="">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img alt="Workflow" class="w-auto h-20 mx-auto" src="/images/logo.svg">

      <h2 class="mt-6 text-2xl font-extrabold text-center text-gray-900 sm:text-3xl">
        Inicia sesión en tu cuenta
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" novalidate @submit.prevent="userLogin">
          <div>
            <label class="block text-sm font-medium text-gray-700" for="email">
              Email
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="login.email"
                :class="{'base-input--error': errors.email || errors.invalid}"
                autocomplete="email"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                name="email"
                type="email"
              >
            </div>
            <div v-if="errors.email" class="flex flex-col">
              <span v-for="error in errors.email" :key="error.id" class="mt-1 text-xs text-red-500">
                {{ error }}
              </span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700" for="password">
              Contraseña
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="login.password"
                :class="{'base-input--error': errors.password || errors.invalid}"
                autocomplete="current-password"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                name="password"
                type="password"
              >
            </div>
            <div v-if="errors.password" class="flex flex-col">
              <span v-for="error in errors.password" :key="error.id" class="mt-1 text-xs text-red-500">
                {{ error }}
              </span>
            </div>
          </div>

          <span v-if="errors.invalid" class="mt-1 text-xs text-red-500">
            {{ errors.invalid }}
          </span>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a class="font-medium text-primary-600 hover:text-primary-500" href="#">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
          <div class="flex items-center justify-items-center">
            <base-button :disabled="isLoading" :is-loading="isLoading" class="w-full" type="submit">
              Entrar
            </base-button>
          </div>
        </form>
      </div>
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
