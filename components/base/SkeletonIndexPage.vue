<template>
  <div class="flex flex-col w-full space-y-8">
    <div class="animate-pulse">
      <div class="h-8 bg-gray-200 rounded w-28" />
    </div>
    <div class="flex-col bg-white divide-y divide-gray-300 rounded-lg shadow">
      <div class="flex items-center px-4 py-3 space-x-6 animate-pulse">
        <div class="w-10 h-2 bg-gray-200 rounded-md" />
        <div class="w-16 h-2 bg-gray-200 rounded-md" />
      </div>
      <div class="flex flex-col w-full px-4 py-6">
        <div class="flex space-x-2">
          <div class="bg-gray-100 border border-gray-300 rounded h-9 w-36" />
          <div class="w-full bg-gray-100 border border-gray-300 rounded h-9" />
        </div>
        <div class="flex items-center justify-center h-40">
          <svg class="w-12 h-12 text-primary-500 animate-spin-faster" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-0" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonIndexPage'
}
</script>
