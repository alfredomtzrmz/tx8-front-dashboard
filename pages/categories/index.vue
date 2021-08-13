<template>
  <div class="flex flex-col w-full space-y-6">
    <div class="flex justify-between">
      <h1 class="text-xl font-medium">
        Categorías
      </h1>
    </div>
    <div class="h-full overflow-hidden text-center bg-white rounded-lg shadow">
      <div class="flex flex-col p-8">
        <img src="@/static/images/main-pages/main-category-motion.svg" alt="Index clientes" class="h-auto mx-auto w-60">
        <p class="text-xl">
          Agrupa tus productos en categorías
        </p>
        <p class="max-w-xs mx-auto my-4 text-sm text-gray-500">
          Utiliza las categorías para organizar los productos en tu app.
        </p>
        <div class="mt-2 mb-6">
          <base-button to="/categories/create">
            Agregar categoría
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Categories',
  layout: 'default'
}
</script>
