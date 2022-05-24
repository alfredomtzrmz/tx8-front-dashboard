export default {
  props: {
    value: {
      type: [String, Number, Boolean, Array, Object],
      required: true
    }
  },
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
