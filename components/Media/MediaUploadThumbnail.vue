<template>
  <li class="flex relative flex-col rounded-md border overflow-hidden border-gray-300 dark:border-gray-700">
    <div class="relative flex flex-col">
      <div v-if="isUploading" class="absolute rounded-t-md inset-0 z-10 bg-gray-800/90 dark:bg-gray-700/95 transition-opacity flex items-center justify-center" aria-hidden="true">
        <UploadProgressBar :percentage="uploadPercentage" />
      </div>
      <div class="top-1 sm:ml-auto p-1 flex gap-2">
        <button
          v-tippy="{appendTo: 'parent', maxWidth:200, animateFill: false, theme: 'dark', placement : 'bottom', delay: [400,0], animation : 'fade'}"
          content="Remover"
          class="bg-white w-6 h-6 rounded-md border p-0.5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:border-gray-600" @click="$emit('removeItem')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        <button
          v-tippy="{appendTo: 'parent', maxWidth:200, animateFill: false, theme: 'dark', placement : 'bottom', delay: [400,0], animation : 'fade'}"
          content="Editar"
          class="bg-white w-6 h-6 rounded-md border p-0.5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:border-gray-600" @click="$emit('openDetails')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>
      <div class="flex flex-col flex-shrink-0 justify-center items-center p-1 w-auto h-32 text-center relative">
        <div class="flex justify-center items-center w-full h-full">
          <LoadedImage v-if="thumbnail" :alt="getFileName" :src="thumbnail" classes="object-cover object-center h-full" />
          <svg v-else class="w-6 h-6 text-gray-600 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
        </div>
      </div>
    </div>
    <div class="flex items-center px-1 py-2 border-t border-gray-300 dark:border-gray-700">
      <span class="text-sm font-medium text-gray-900 line-clamp-1 dark:text-gray-100">
        {{ getFileName }}
      </span>
    </div>
  </li>
</template>

<script>
import * as _ from 'lodash'

export default {
  name: 'MediaUploadThumbnail',
  props: {
    index: {
      type: Number,
      required: true
    },
    mediaFile: {
      type: Object,
      required: true
    },
    triggerUpload: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      thumbnail: '',
      isUploading: false,
      uploadPercentage: 0
    }
  },
  computed: {
    getFileName () {
      return _.get(this.mediaFile, ['name'], 'defaultImage')
    },
    mutableTriggerUpload: {
      get () {
        return this.triggerUpload
      },
      set (value) {
        this.$emit('update:triggerUpload', value)
      }
    }
  },
  watch: {
    triggerUpload (value) {
      if (value) {
        this.saveImage()
      }
    }
  },
  mounted () {
    this.setThumbnailFile()
  },
  methods: {
    setThumbnailFile () {
      const reader = new FileReader()
      const vm = this
      reader.onload = function (e) {
        vm.thumbnail = e.target.result
      }
      const file = _.get(this.mediaFile, ['file'], '')
      reader.readAsDataURL(file)
    },
    setToSave () {
      const formData = new FormData()
      formData.append('name', _.get(this.mediaFile, ['name'], ''))
      formData.append('alt', _.get(this.mediaFile, ['alt'], ''))
      formData.append('image', _.get(this.mediaFile, ['file'], ''))
      return formData
    },
    async saveImage () {
      try {
        this.isUploading = true
        await this.$axios.$post('/images', this.setToSave(),
          {
            onUploadProgress: function (progressEvent) {
              this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
            }.bind(this)
          })
        this.$emit('fileUploaded', this.index)
      } catch (e) {

      } finally {
        this.mutableTriggerUpload = false
        this.isUploading = false
      }
    }
  }
}
</script>
