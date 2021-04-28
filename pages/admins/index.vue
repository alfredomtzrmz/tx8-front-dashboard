<template>
  <div class="flex flex-col space-y-6">
    <div class="flex justify-between">
      <h1 class="text-xl font-medium">
        Administradores
      </h1>
    </div>
    <div class="h-full overflow-hidden text-center bg-white shadow sm:rounded-lg">
      <div class="flex flex-col px-4 py-5 sm:p-6">
        <img src="@/static/images/index-admin.svg" alt="Index Admin" class="h-auto mx-auto w-60">
        <p class="text-xl">
          Gestionar los detalles del administrador
        </p>
        <p class="max-w-xs mx-auto my-4 text-sm text-gray-400">
          Aquí es donde puede ver la información de los administradores y gestionar sus accesos.
        </p>
        <div class="mt-2 mb-6">
          <base-button>
            Agregar administrador
          </base-button>
          <base-button variant="white">
            Importar
          </base-button>
          <!-- <button type="button" class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Importar administradores
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admins',
  layout: 'default'
}
</script>
