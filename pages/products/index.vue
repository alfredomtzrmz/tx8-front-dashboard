<template>
  <div class="flex flex-col w-full space-y-6">
    <div class="flex justify-between">
      <h1 class="text-xl font-medium">
        Productos
      </h1>
    </div>
    <div class="h-full overflow-hidden text-center bg-white rounded-lg shadow">
      <div class="flex flex-col p-8">
        <img src="@/static/images/main-pages/main-product-motion.svg" alt="Index administradores" class="h-auto mx-auto w-72">

        <p class="text-xl">
          Agregar y gestionar tus productos
        </p>
        <p class="max-w-xs mx-auto my-4 text-sm text-gray-500">
          Aquí es donde agregarás productos y gestionarás tus precios. También puedes importar y exportar tu inventario de productos.
        </p>
        <div class="mt-2 mb-6">
          <base-button to="/products/create">
            Agregar producto
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
