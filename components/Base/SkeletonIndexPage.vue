<template>
  <div class="flex flex-col space-y-5 w-full">
    <div class="animate-pulse h-10 flex items-center">
      <div class="w-28 h-8 bg-gray-200 dark:bg-gray-800 rounded" />
    </div>
    <div class="flex-col bg-white rounded-lg border border-gray-300 shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="flex justify-center items-center p-2 h-14 md:justify-end">
        <div class="h-[2.375rem] bg-gray-100 dark:bg-gray-700 dark:border-gray-900/75 border rounded md:w-48 w-full" />
        <div class="ml-2 w-10 h-10 bg-gray-100 rounded border dark:bg-gray-700 dark:border-gray-900/75" />
      </div>
      <div class="flex items-center px-4 space-x-12 h-9 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 border-t border-b">
        <div class="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-md" />
        <div class="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-md" />
        <div class="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-md" />
      </div>
      <div class="flex flex-col w-full">
        <div class="flex items-center px-4 py-3 space-x-12">
          <div class="w-16 h-9 bg-gray-100 dark:bg-gray-700 dark:border-gray-900/75 rounded-md border shrink-0" />
          <div class="w-20 h-9 bg-gray-100 dark:bg-gray-700 dark:border-gray-900/75 rounded-md border shrink-0" />
          <div class="w-full h-9 bg-gray-100 dark:bg-gray-700 dark:border-gray-900/75 rounded-md border" />
        </div>
        <div class="flex justify-center items-center h-40">
          <svg class="w-12 h-12 text-primary-500 animate-spin-faster" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle class="opacity-0" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
            <path class="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" />
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
