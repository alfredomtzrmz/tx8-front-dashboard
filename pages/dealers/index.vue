<template>
  <div class="flex flex-col w-full space-y-6">
    <div class="flex justify-between">
      <h1 class="text-xl font-medium">
        Repartidores
      </h1>
    </div>
    <div class="h-full overflow-hidden text-center bg-white rounded-lg shadow">
      <div class="flex flex-col p-8">
        <img src="@/static/images/main-pages/main-dealer-motion.svg" alt="index repartidores" class="h-auto mx-auto w-60">
        <p class="text-xl">
          Gestionar los detalles del repartidor
        </p>
        <p class="max-w-xs mx-auto my-4 text-sm text-gray-500">
          Aquí es donde puede ver la información de los repartidores y gestionar su información.
        </p>
        <div class="mt-2 mb-6">
          <base-button to="/dealers/create">
            Agregar repartidor
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dealers',
  layout: 'default'
}
</script>
