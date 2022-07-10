<template>
  <BaseModal
    id="edit-media-modal"
    :title="`Detalles de ${getFileName}`"
    :keep-static="isLoading"
    size="sm"
    :close-button="false"
  >
    <template #modal-body>
      <div class="px-6 pb-6">
        <div class="flex flex-col space-y-6">
          <EditThumbnail :media-file="mediaFile" />
          <div class="flex flex-col space-y-6">
            <div class="w-full">
              <label for="file_name" class="base-label">Nombre</label>
              <div class="relative mt-1">
                <input id="file_name" v-model.trim="fileName" type="text" name="file_name" class="h-9 base-input">
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #modal-footer>
      <div class="flex justify-center dark:border-gray-700 xs:flex-row flex-col dark:bg-transparent items-center px-6 py-4 xs:gap-x-3 gap-y-3 bg-gray-50 border-t border-gray-300 rounded-b-lg sm:justify-end">
        <BaseButton
          variant="white"
          class="xs:w-24 w-full xs:order-first order-last"
          :disabled="isLoading"
          size="sm"
          @onClick="closeModal()"
        >
          Cancelar
        </BaseButton>
        <BaseButton
          class="xs:w-24 w-full"
          :is-loading="isLoading"
          :disabled="isLoading"
          size="sm"
          @onClick="editMedia()"
        >
          Actualizar
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>
<script>
import * as _ from 'lodash'
import { mapActions } from 'vuex'

export default {
  name: 'EditMedia',
  props: {
    mediaFile: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      fileName: '',
      isLoading: false
    }
  },
  computed: {
    getFileName () {
      return _.get(this.mediaFile, ['name'], 'defaultImage')
    }
  },
  watch: {
    mediaFile (newValue) {
      this.fileName = newValue.name
    }
  },
  methods: {
    ...mapActions('modal', ['setCloseModal']),
    closeModal () {
      this.setCloseModal('edit-media-modal')
    },
    async editMedia () {
      this.isLoading = true
      try {
        const { message } = await this.$axios.$put(`/images/${this.mediaFile.id}`, {
          name: this.fileName
        })
        this.$notify({ group: 'top', type: 'success', title: '¡Proceso exitoso!', text: message }, 2500)
        this.$emit('successEditMedia', true)
      } catch (e) {
        const { message } = e.response.data
        this.$notify({ group: 'top', type: 'error', title: '¡Error al procesar!', text: message }, 2500)
      } finally {
        this.isLoading = false
        this.closeModal()
      }
    }
  }
}
</script>
