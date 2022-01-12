<template>
  <div>
    <BaseModal :is-open="VerifiedAccountModalIsOpen" title="Verificar identificación del cliente" size="md" @close="closeVerifiedAccountModal">
      <template #modal-body>
        <div class="flex flex-col px-4 space-y-6">
          <div class="w-full h-full border-4 border-gray-200 border-dashed rounded-lg">
            <div class="block w-full overflow-hidden rounded-lg aspect-w-16 aspect-h-9">
              <LoadedImage :src="returnIdentification" :alt="getFirstName" classes="object-cover" />
            </div>
          </div>
          <div class="p-4 rounded-md bg-blue-50">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="w-5 h-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="flex-1 ml-3 md:flex md:justify-between">
                <p class="text-sm text-blue-700">
                  Cualquier decision sobre el cliente, eliminará la identificación del sistema y esta no podrá cambiarse.
                </p>
              </div>
            </div>
          </div>
          <div class="col-span-6">
            <fieldset>
              <legend class="sr-only">
                Choose
              </legend>
              <div class="space-y-5">
                <div class="relative flex items-start">
                  <div class="flex items-center h-5">
                    <input id="allow" v-model="verifiedAccount" aria-describedby="allow-description" name="verify-account" value="1" type="radio" class="base-radio">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="allow" class="font-medium text-gray-700 cursor-pointer">Permitir acceso</label>
                    <p id="allow-description" class="text-gray-500">
                      Marcar cuenta como verificada y <span class="font-semibold">permitir</span> acceso.
                    </p>
                  </div>
                </div>
                <div class="relative flex items-start">
                  <div class="flex items-center h-5">
                    <input id="denny" v-model="verifiedAccount" aria-describedby="denny-description" name="verify-account" value="0" type="radio" class="base-radio">
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="denny" class="font-medium text-gray-700 cursor-pointer">Denegar acceso</label>
                    <p id="denny-description" class="text-gray-500">
                      Marcar cuenta como verificada y <span class="font-semibold">denegar</span> acceso.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="flex items-center justify-end p-4 mt-6 space-x-3 text-right border-t rounded-b-lg sm:px-6">
          <base-button type="button" variant="white" class="w-32" @onClick="closeVerifiedAccountModal()">
            Cancelar
          </base-button>
          <base-button type="button" class="w-32" @onClick="verifyAccount()">
            Guardar
          </base-button>
        </div>
      </template>
    </BaseModal>
    <div class="flex flex-col space-y-6 md:col-start-3 md:col-span-1">
      <div class="flex flex-col px-4 py-5 space-y-6 bg-white rounded-md shadow sm:px-5">
        <div class="flex justify-between">
          <h2 class="text-base font-semibold text-gray-900">
            Cuenta verificada
          </h2>
          <button v-if="returnIdentification" class="inline-flex items-center p-1 text-sm font-medium text-blue-600 bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-gray-50" type="button" @click="VerifiedAccountModalIsOpen=true">
            Verificar
          </button>
        </div>
        <BadgeIdentificationVerified :details="returnCustomerDetails" />
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'

export default {
  name: 'WidgetVerifyAccount',
  props: {
    customer: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      customerData: this.customer,
      VerifiedAccountModalIsOpen: false,
      verifiedAccount: 1,
      isLoaded: false,
      baseUrl: this.$config.baseImageUrl
    }
  },
  computed: {
    getFirstName () {
      return _.get(this.customerData, ['details', 'name'], '')
    },
    returnIdentification () {
      const identification = _.get(this.customerData, ['details', 'identification'], null)
      return identification ? `${this.baseUrl}/${identification}?time=${Math.random()}` : null
    },
    returnCustomerDetails () {
      return _.get(this.customerData, ['details'], {})
    }

  },
  methods: {
    closeVerifiedAccountModal () {
      this.VerifiedAccountModalIsOpen = false
    },
    async verifyAccount () {
      this.isLoading = true
      try {
        const { data, message } = await this.$axios.$put(`/customers/verify-identification/${this.customerData.user_id}`, {
          authorize: _.toNumber(this.verifiedAccount)
        })
        this.customerData = data
        this.$notify({ group: 'top', type: 'success', title: '¡Proceso exitoso!', text: message }, 2500)
        this.VerifiedAccountModalIsOpen = false
      } catch (e) {
        const message = e.response.message
        this.$notify({ group: 'top', type: 'error', title: '¡Error al validar!', text: message }, 2500)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
