<template>
  <div class="flex flex-col w-full space-y-6">
    <div class="flex flex-col space-y-6 animate-pulse">
      <div class="h-8 bg-gray-200 rounded w-28" />
      <div class="w-20 h-2 bg-gray-200 rounded" />
    </div>
    <div class="grid grid-cols-1 gap-6 md:grid-flow-col-dense md:grid-cols-3">
      <div class="space-y-4 md:col-start-1 md:col-span-2">
        <div class="flex-col p-5 space-y-4 bg-white rounded-lg shadow">
          <div class="w-full h-2 bg-gray-200 rounded-md animate-pulse" />
          <div class="w-full h-2 bg-gray-200 rounded-md animate-pulse" />
          <div class="w-10/12 h-2 bg-gray-200 rounded-md animate-pulse" />
        </div>
        <div class="flex-col p-5 space-y-4 bg-white rounded-lg shadow">
          <div class="w-full h-2 bg-gray-200 rounded-md animate-pulse" />
          <div class="w-full h-2 bg-gray-200 rounded-md animate-pulse" />
          <div class="w-10/12 h-2 bg-gray-200 rounded-md animate-pulse" />
        </div>
        <div class="flex-col p-5 space-y-4 bg-white rounded-lg shadow">
          <div class="w-full h-2 bg-gray-200 rounded-md animate-pulse" />
          <div class="w-full h-2 bg-gray-200 rounded-md animate-pulse" />
          <div class="w-10/12 h-2 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>
      <div class="flex flex-col space-y-6 rounded-lg md:col-start-3 md:col-span-1">
        <div class="flex flex-col divide-y divide-gray-200">
          <div class="flex-col p-5 space-y-4 bg-white rounded-lg rounded-b-none shadow">
            <div class="w-full h-2 bg-gray-200 rounded-md animate-pulse" />
            <div class="w-10/12 h-2 bg-gray-200 rounded-md animate-pulse" />
          </div>
          <div class="flex-col p-5 space-y-4 bg-white rounded-lg rounded-t-none shadow">
            <div class="w-full h-2 bg-gray-200 rounded-md animate-pulse" />
            <div class="w-10/12 h-2 bg-gray-200 rounded-md animate-pulse" />
          </div>
        </div>
        <div class="flex flex-col divide-y divide-gray-200">
          <div class="flex-col p-5 space-y-4 bg-white rounded-lg rounded-b-none shadow">
            <div class="w-full h-2 bg-gray-200 rounded-md animate-pulse" />
            <div class="w-10/12 h-2 bg-gray-200 rounded-md animate-pulse" />
          </div>
          <div class="flex-col p-5 space-y-4 bg-white rounded-lg rounded-t-none shadow">
            <div class="w-full h-2 bg-gray-200 rounded-md animate-pulse" />
            <div class="w-10/12 h-2 bg-gray-200 rounded-md animate-pulse" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end py-4 border-t">
      <BaseButton disabled="disabled" variant="white">
        Guardar
      </BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonDynamicPage'
}
</script>
