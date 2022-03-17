<template>
  <div class="space-y-5 w-full">
    <MediaUpload :is-modal-upload-open="isModalUploadOpen" @closeModalUpload="isModalUploadOpen = false" />
    <div class="flex flex-col space-y-6 w-full">
      <div class="flex flex-col justify-between items-start space-y-2 sm:space-y-0 sm:flex-row">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-gray-100">
          Librería de medios
        </h1>
        <BaseButton @onClick="isModalUploadOpen = true">
          Agregar imágenes
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Media',
  data () {
    return {
      isModalUploadOpen: false
    }
  }
}
</script>
