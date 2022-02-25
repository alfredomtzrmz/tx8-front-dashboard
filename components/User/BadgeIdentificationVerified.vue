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
      let bgColor = 'text-red-700 bg-red-500/10 dark:text-red-500'
      let text = 'No autorizada'
      if (this.returnIdentificationVerified === 1) {
        bgColor = 'bg-green-500/10 text-green-700 dark:text-green-500'
        text = 'Autorizada'
      } else if (this.returnIdentification && this.returnIdentificationVerified === 0) {
        bgColor = 'text-amber-700 bg-amber-500/10 dark:text-amber-500'
        text = 'Sin verificar'
      }
      return { bgColor, text }
    }
  }
}
</script>
