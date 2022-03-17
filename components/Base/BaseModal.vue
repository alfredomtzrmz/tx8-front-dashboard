<template>
  <transition leave-active-class="duration-100">
    <div v-show="isOpen" :class="modalResponsiveClass" class="fixed inset-x-0 bottom-0 z-50 p-4">
      <transition
        enter-active-class="duration-100 ease-out"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-100 ease-in"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-show="isOpen" class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-600/60 dark:bg-black/50" />
        </div>
      </transition>
      <transition
        enter-active-class="duration-200 ease-out"
        enter-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        enter-to-class="translate-y-0 opacity-100 sm:scale-100"
        leave-active-class="duration-100 ease-in"
        leave-class="translate-y-0 opacity-100 sm:scale-100"
        leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
      >
        <div
          v-if="isOpen"
          :class="modalSizeClass"
          class="flex flex-col transition-all transform bg-white dark:bg-gray-800 rounded-lg max-h-[95vh] min-h-56 shadow-full sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <header v-if="closeButton || title" class="flex items-center justify-between p-4">
              <h4 v-if="title" class="text-gray-900 dark:text-gray-100 sm:text-lg line-clamp-1">
                {{ title }}
              </h4>
              <button v-if="closeButton" class="inline-flex items-center justify-center w-8 h-8 ml-auto text-gray-400 rounded-full group focus:outline-none focus:ring-primary-500/25 focus:ring-2 hover:bg-gray-50 dark:hover:bg-gray-700" aria-label="close" type="button" @click="$emit('close')">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400 group-hover:text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
          </div>
          <section class="flex-1 overflow-y-auto modal-body">
            <slot name="modal-body">
              <!--                        I'm the default body!-->
            </slot>
          </section>
          <footer>
            <slot name="modal-footer">
              <!--                        I'm the default footer!-->
            </slot>
          </footer>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
const AVAILABLE_SIZES = ['sm', 'md', 'lg', 'xl']
export default {
  /* eslint-disable vue/require-default-prop */
  name: 'BaseModal',
  props: {
    closeButton: {
      type: Boolean,
      default: true,
      required: false
    },
    isOpen: {
      type: Boolean,
      default: false,
      required: true
    },
    size: {
      type: String,
      required: false,
      default: 'md',
      validator (value) {
        return AVAILABLE_SIZES.includes(value)
      }
    },
    title: {
      type: String,
      required: false
    },
    manipulateData: {
      type: Object,
      default () {
        return {}
      },
      required: false
    }
  },
  computed: {
    modalSizeClass () {
      return this.size === 'sm' ? 'sm:max-w-md' : this.size === 'lg' ? 'md:max-w-3xl' : this.size === 'xl' ? 'md:max-w-6xl' : 'md:max-w-xl'
    },
    modalResponsiveClass () {
      return this.size === 'sm' ? 'sm:inset-0 sm:flex sm:items-center sm:justify-center' : 'md:inset-0 md:flex md:items-center md:justify-center'
    }
  },
  watch: {
    isOpen: {
      immediate: true,
      handler (isOpen) {
        if (process.client) {
          if (isOpen) {
            document.body.classList.add('overflow-y-hidden')
          } else {
            setTimeout(() => {
              document.body.classList.remove('overflow-y-hidden')
            }, 200)
          }
        }
      }
    }
  }
}
</script>
