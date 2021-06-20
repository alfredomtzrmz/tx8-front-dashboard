<template>
  <div class="max-w-5xl mx-auto space-y-5">
    <div class="flex">
      <div class="lg:space-x-4 flex flex-col lg:flex-row lg:items-center items-start text-gray-600 w-min px-0.5 nuxt-link-active space-y-2 lg:space-y-0">
        <base-button variant="transparent" size="icon" to="/admins">
          <svg class="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </base-button>
        <span class="text-xl font-medium text-gray-900">
          Administradores
        </span>
      </div>
    </div>

    <div class="block" aria-hidden="true">
      <div class="py-4">
        <div class="border-t border-gray-200" />
      </div>
    </div>

    <div class="mt-10 sm:mt-0">
      <div class="xl:grid xl:grid-cols-3 xl:gap-6">
        <div class="xl:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-base font-medium leading-6 text-gray-900">
              Información del administrador
            </h3>
          </div>
        </div>
        <div class="mt-5 xl:mt-0 xl:col-span-2">
          <form action="#" method="POST">
            <div class="overflow-hidden rounded-md shadow">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="first_name" class="block text-sm font-medium text-gray-700">Nombre</label>
                    <input id="first_name" type="text" name="first_name" autocomplete="given-name" class="mt-1 base-input">
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="last_name" class="block text-sm font-medium text-gray-700">Apellido</label>
                    <input id="last_name" type="text" name="last_name" autocomplete="family-name" class="mt-1 base-input">
                  </div>

                  <div class="col-span-6 sm:col-span-4">
                    <label for="email_address" class="block text-sm font-medium text-gray-700">Email</label>
                    <input id="email_address" type="text" name="email_address" autocomplete="email" class="mt-1 base-input">
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                <base-button>
                  Guardar
                </base-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminsCreate'
}
</script>
