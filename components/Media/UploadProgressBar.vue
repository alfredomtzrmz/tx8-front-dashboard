<template>
  <div class="relative w-full mx-4">
    <div class="flex mb-2 items-center justify-center">
      <div class="text-right">
        <span class="text-sm font-semibold inline-block text-primary-600">
          {{ percentage }}%
        </span>
      </div>
    </div>
    <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
      <div :style="{width: `${percentage}%`}" class="shadow-none flex flex-col transition-[width] duration-300 ease-in-out  text-center whitespace-nowrap text-white justify-center bg-primary-600" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadProgressBar',
  props: {
    percentage: {
      type: Number,
      default: 0
    }
  }
}
</script>
