<template>
  <div>
    <BaseModal
      id="upload-media-modal"
      title="Agregar elementos multimedia"
      size="lg"
      :close-button="false"
    >
      <template #modal-body>
        <div class="px-6 pb-6">
          <div
            class="flex flex-col justify-center w-full sm:p-6 transition-colors duration-150 p-4 mt-1 space-y-4 sm:space-y-6 border-2 border-dashed rounded-md max-h-[80vh]"
            :class="[draggingFile && !isUploading ? 'border-primary-600' : 'border-gray-300 dark:border-gray-700']"
            @dragover="dragOverEvent($event)"
            @dragleave="draggingFile = false"
            @dragend="draggingFile = false"
            @drop="addFileToArray($event)"
          >
            <div v-if="getValidImagesArrayLength >= 1 && !isUploading" class="text-sm">
              <span class="font-medium text-gray-900 dark:text-gray-100">
                {{ getValidImagesArrayLength }} elementos listos para subir
              </span>
              <p class="text-gray-500 dark:text-gray-400">
                Administre las imágenes antes de cargarlas en la biblioteca de medios.
              </p>
            </div>
            <span v-if="isUploading" class="font-medium text-gray-900 dark:text-gray-100 text-sm">
              Subiendo {{ getValidImagesArrayLength }} elementos
            </span>
            <div v-if="getValidImagesArrayLength >= 1" class="overflow-y-auto">
              <ul role="list" class="grid gap-4 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
                <UploadItemMedia
                  v-for="(fileImage, index) in validImagesArray"
                  :key="fileImage.id"
                  :media-file="fileImage"
                  :trigger-upload.sync="triggerUploadFile"
                  :index="index"
                  @openDetails="openDetailsModal(fileImage)"
                  @removeItem="removeFileItem(index)"
                  @fileUploaded="setSavedImages(index)"
                />
              </ul>
            </div>
            <div class="flex flex-col justify-center items-center space-y-1 h-full text-center">
              <svg v-if="getValidImagesArrayLength <= 0 " class="mx-auto w-24 h-24 text-gray-400 dark:text-gray-300" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div v-if="!isUploading" class="flex flex-col justify-center items-center space-y-2 text-sm">
                <div class="flex flex-col sm:flex-row">
                  <label for="thumbnailImageUpload" class="relative font-medium bg-white rounded-md cursor-pointer dark:bg-transparent text-primary-600 hover:text-primary-700 dark:hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                    <span>
                      Elige una
                    </span>
                    <input id="thumbnailImageUpload" multiple accept="image/*" name="thumbnailImageUpload" type="file" class="sr-only" @change="onChangeProductThumbnail($event)">
                  </label>
                  <p class="hidden pl-1 text-gray-500 sm:block dark:text-gray-400">
                    o arrastra y suelta aquí
                  </p>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Solo PNG, JPG, JPEG hasta 5MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #modal-footer>
        <div class="flex justify-center dark:border-gray-700 dark:bg-transparent items-center px-6 py-4 space-x-3 bg-gray-50 border-t border-gray-300 rounded-b-lg xs:justify-end">
          <BaseButton
            variant="white"
            class="w-24"
            size="sm"
            :disabled="isUploading"
            @onClick="closeUploadModal()"
          >
            Cancelar
          </BaseButton>
          <BaseButton class="w-24" size="sm" :disabled="!getValidImagesArrayLength>=1 || isUploading" :is-loading="isUploading" @onClick="saveImages()">
            Guardar
          </BaseButton>
        </div>
      </template>
    </BaseModal>
    <BaseModal
      id="edit-upload-media-modal"
      :title="`Detalles de ${fileEdited.name}`"
      size="sm"
      :close-button="false"
    >
      <template #modal-body>
        <div class="px-6 pb-6">
          <div class="flex flex-col space-y-6">
            <EditThumbnail :media-file="selectedFileToEdit" />
            <div class="flex flex-col space-y-6">
              <div class="w-full">
                <label for="file_name" class="base-label">Nombre</label>
                <div class="relative mt-1">
                  <input id="file_name" v-model.trim="fileEdited.name" type="text" name="file_name" class="h-9 base-input">
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #modal-footer>
        <div class="flex justify-center dark:border-gray-700 dark:bg-transparent items-center px-6 py-4 space-x-3 bg-gray-50 border-t border-gray-300 rounded-b-lg xs:justify-end">
          <BaseButton variant="white" class="w-24" size="sm" @onClick="closeEditUploadMedia()">
            Cancelar
          </BaseButton>
          <BaseButton class="w-24" size="sm" @onClick="replaceEditedFile()">
            Guardar
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import * as _ from 'lodash'
import { uuid } from 'vue-uuid'
import { mapActions } from 'vuex'

const VALIDATE_EXTENSIONS = ['jpg', 'png', 'jpeg']

export default {
  name: 'UploadMedia',
  data () {
    return {
      validImagesArray: [],
      validImagesArrayLength: 0,
      noValidFilesArray: [],
      noValidImagesArray: [],
      indexesOfSavedImages: [],
      draggingFile: false,
      selectedFileToEdit: {},
      triggerUploadFile: false,
      fileEdited: {
        name: '',
        alt: ''
      },
      isUploading: false
    }
  },
  computed: {
    getValidImagesArrayLength () {
      return _.size(this.validImagesArray)
    }
  },
  watch: {
    isUploading (newValue) {
      if (newValue) {
        this.draggingFile = false
      }
    },
    indexesOfSavedImages (newValue) {
      const indexesOfSavedImagesLength = _.size(newValue)

      if (indexesOfSavedImagesLength >= 1) {
        if (_.size(newValue) === this.validImagesArrayLength) {
          this.closeUploadModal()
          this.$emit('uploadFinished', true)
        }
      }
    },
    isModalUploadOpen (newValue) {
      if (newValue) {
        this.isUploading = false
        this.validImagesArrayLength = 0
        this.indexesOfSavedImages = []
      }
    }
  },
  methods: {
    ...mapActions('modal', ['setOpenModal', 'setCloseModal']),
    dragOverEvent (event) {
      if (!this.isUploading) {
        this.draggingFile = true
        event.preventDefault()
      }
    },
    addFileToArray (event) {
      event.stopPropagation()
      event.preventDefault()
      const files = event.dataTransfer.files
      if (_.size(files) >= 1) {
        this.validFile(files)
      }
      this.draggingFile = false
    },
    onChangeProductThumbnail (event) {
      const files = event.target.files
      if (_.size(files) >= 1) {
        this.validFile(files)
      }
      event.target.value = ''
    },
    validFile (files) {
      const arrayFiles = Array.from(files)
      for (let i = 0; i < arrayFiles.length; i++) {
        const file = arrayFiles[i]

        if (file.type.match('image.*')) {
          const fileExtension = _.toLower(file.name.split('.').pop())
          if (VALIDATE_EXTENSIONS.includes(fileExtension)) {
            const fileSize = file.size / 1024
            if (fileSize <= 5120) {
              const newObjectFile = {
                id: uuid.v4(),
                name: this.getFileName(file),
                alt: '',
                file
              }
              this.validImagesArray.push(newObjectFile)
              this.validImagesArrayLength += 1
            } else {
              this.noValidImagesArray.push(file)
            }
          } else {
            this.noValidImagesArray.push(file)
          }
        } else {
          this.noValidFilesArray.push(file)
        }
      }
    },
    getFileName (file) {
      const nameWithExtension = _.get(file, ['name'], 'defaultImage').toLowerCase()
      return nameWithExtension.split('.').slice(0, -1).join('.')
    },
    closeUploadModal () {
      this.setCloseModal('upload-media-modal')
      this.validImagesArray = []
      this.noValidImagesArray = []
      this.noValidFilesArray = []
    },
    openDetailsModal (fileObject) {
      this.fileEdited.name = _.get(fileObject, ['name'], 'Default').toLowerCase()
      this.selectedFileToEdit = fileObject
      this.setOpenModal('edit-upload-media-modal')
    },
    removeFileItem (index) {
      this.validImagesArray.splice(index, 1)
    },
    replaceEditedFile () {
      const selectedFileToEditId = _.get(this.selectedFileToEdit, ['id'], '')
      this.validImagesArray.find(el => el.id === selectedFileToEditId).name = this.fileEdited.name
      this.validImagesArray.find(el => el.id === selectedFileToEditId).alt = this.fileEdited.alt

      this.fileEdited.name = ''
      this.fileEdited.alt = ''
      this.closeEditUploadMedia()
    },
    saveImages () {
      this.triggerUploadFile = true
      this.isUploading = true
    },
    setSavedImages (index) {
      this.validImagesArray.splice(index, 1)
      this.indexesOfSavedImages.push(index)
    },
    closeEditUploadMedia () {
      this.setCloseModal('edit-upload-media-modal')
    }
  }
}
</script>
