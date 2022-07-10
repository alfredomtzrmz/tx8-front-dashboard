<template>
  <div class="flex relative flex-col rounded-md border border-gray-300 dark:border-gray-700">
    <div class="flex flex-col flex-shrink-0 justify-center items-center p-1 w-auto h-56 text-center">
      <div class="flex justify-center items-center w-full h-full">
        <LoadedImage v-if="fileThumbnail" :alt="getFileName" :src="fileThumbnail" classes="object-cover object-center h-full" />
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'

export default {
  name: 'EditThumbnail',
  props: {
    mediaFile: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      baseUrl: this.$config.baseImageUrl,
      fileThumbnail: ''
    }
  },
  computed: {
    getFileName () {
      return _.get(this.mediaFile, ['name'], 'defaultImage')
    }
  },
  mounted () {
    this.setThumbnailFile()
  },
  methods: {
    setThumbnailFile () {
      const file = _.get(this.mediaFile, ['file'], null)
      if (file) {
        const reader = new FileReader()
        const vm = this
        reader.onload = function (e) {
          vm.fileThumbnail = e.target.result
        }
        reader.readAsDataURL(file)
      } else {
        const thumbnail = _.get(this.mediaFile, ['path'], null)
        this.fileThumbnail = thumbnail ? `${this.baseUrl}/${thumbnail}` : ''
      }
    }
  }
}
</script>
