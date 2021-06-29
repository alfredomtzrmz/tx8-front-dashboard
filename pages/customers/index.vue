<template>
  <div class="flex flex-col w-full space-y-6">
    <div class="flex justify-between">
      <h1 class="text-xl font-medium">
        Clientes
      </h1>
    </div>
    <div class="h-full overflow-hidden text-center bg-white rounded-lg shadow">
      <div class="flex flex-col p-8">
        <img src="@/static/images/main-pages/main-customer-motion.svg" alt="Index clientes" class="h-auto mx-auto w-60">
        <p class="text-xl">
          Gestionar los detalles del cliente
        </p>
        <p class="max-w-xs mx-auto my-4 text-sm text-gray-500">
          Aquí es donde puede ver la información de los clientes y ver su historial de pedidos.
        </p>
        <div class="mt-2 mb-6">
          <base-button to="/customers/create">
            Agregar cliente
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Customers',
  layout: 'default',
  transition: 'tweakOpacity'
}
</script>
