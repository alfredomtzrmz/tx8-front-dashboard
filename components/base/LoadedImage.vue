<template>
  <transition name="fade">
    <img
      v-show="loaded"
      :key="src"
      :src="src"
      :alt="alt"
      :class="classes"
      @load="onImageLoad"
    >
  </transition>
</template>
<script>
export default {
  name: 'LoadedImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    classes: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loaded: false
    }
  },
  watch: {
    src: {
      handler () {
        this.loaded = false
      },
      immediate: true
    }
  },
  methods: {
    onImageLoad () {
      this.loaded = true
    }
  }
}
</script>
<style scoped>
.fade-enter-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter-to{
  opacity: 1;
}
.fade-enter{
  opacity: 0;
}
</style>
