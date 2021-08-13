<template>
  <div class="flex flex-col w-full space-y-6">
    <div class="flex justify-between">
      <h1 class="text-xl font-medium">
        Administradores
      </h1>
    </div>
    <div class="h-full overflow-hidden text-center bg-white rounded-lg shadow">
      <div class="flex flex-col p-8">
        <img src="@/static/images/main-pages/main-admin-motion.svg" alt="Index administradores" class="h-auto mx-auto w-60">

        <p class="text-xl">
          Agregar y gestionar los administradores
        </p>
        <p class="max-w-xs mx-auto my-4 text-sm text-gray-500">
          Aquí es donde puede ver la información de los administradores y gestionar sus accesos.
        </p>
        <div class="mt-2 mb-6">
          <base-button to="/admins/create">
            Agregar administrador
          </base-button>
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
