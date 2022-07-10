<template>
  <BaseModal
    id="delete-media-modal"
    :keep-static="isLoading"
    size="sm"
    :close-button="false"
  >
    <template #modal-body>
      <div class="sm:flex sm:items-start p-6">
        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <svg class="h-6 w-6 text-red-600" x-description="Heroicon name: outline/exclamation" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 id="modal-title" class="text-lg leading-6 font-medium text-gray-900">
            Eliminar elemento multimedia
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              ¿Estas seguro de eliminar el elemento <span class="font-semibold">{{ getFileName }}</span>?
              Se eliminará la imagen de todos los productos, esta acción no puede deshacerse.
            </p>
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
          variant="red"
          class="xs:w-24 w-full"
          :is-loading="isLoading"
          :disabled="isLoading"
          size="sm"
          @onClick="deleteMedia()"
        >
          Eliminar
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import * as _ from 'lodash'
import { mapActions } from 'vuex'

export default {
  name: 'DeleteMedia',
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
      this.setCloseModal('delete-media-modal')
    },
    async deleteMedia () {
      this.isLoading = true
      try {
        const { message } = await this.$axios.$delete(`/images/${this.mediaFile.id}`)
        this.$notify({ group: 'top', type: 'success', title: '¡Proceso exitoso!', text: message }, 2500)
        this.$emit('successDeleteMedia', true)
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
