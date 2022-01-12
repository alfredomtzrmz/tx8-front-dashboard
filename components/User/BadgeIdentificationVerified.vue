<template>
  <div>
    <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium" :class="dynamicInfo.bgColor">
      {{ dynamicInfo.text }}
    </span>
  </div>
</template>

<script>
import * as _ from 'lodash'

export default {
  name: 'BadgeIdentificationVerified',
  props: {
    details: {
      type: Object,
      required: true
    }
  },
  computed: {
    returnIdentification () {
      return _.get(this.details, ['identification'], null)
    },
    returnIdentificationVerified () {
      return _.get(this.details, ['identification_verified'], 0)
    },
    dynamicInfo () {
      let bgColor = 'bg-red-100 text-red-800'
      let text = 'No autorizada'
      if (this.returnIdentificationVerified === 1) {
        bgColor = 'bg-green-100 text-green-800'
        text = 'Autorizada'
      } else if (this.returnIdentification && this.returnIdentificationVerified === 0) {
        bgColor = 'bg-yellow-100 text-yellow-800'
        text = 'Sin verificar'
      }
      return { bgColor, text }
    }
  }
}
</script>
