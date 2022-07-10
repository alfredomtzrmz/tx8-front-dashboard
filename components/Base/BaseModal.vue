<template>
  <transition leave-active-class="duration-100">
    <div v-show="toggleModal" :class="modalResponsiveClass" class="fixed inset-x-0 bottom-0 z-50 p-4">
      <transition
        enter-active-class="duration-100 ease-out"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-100 ease-in"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="toggleModal"
          ref="overlayModal"
          tabindex="-1"
          class="fixed inset-0 transition-opacity focus:outline-0 focus:ring-0 backdrop-blur-xs transition"
          :class="{ 'cursor-pointer': !keepStatic }"
          @click="!keepStatic ? close() : () => null"
          @keydown.esc="!keepStatic ? close() : () => null"
        >
          <div class="absolute inset-0 bg-gray-600/60 dark:bg-black/50 " />
        </div>
      </transition>
      <transition
        enter-active-class="duration-200 ease-out"
        enter-class="translate-y-4 opacity-0 xs:translate-y-0 xs:scale-95"
        enter-to-class="translate-y-0 opacity-100 sm:scale-100"
        leave-active-class="duration-100 ease-in"
        leave-class="translate-y-0 opacity-100 xs:scale-100"
        leave-to-class="translate-y-4 opacity-0 xs:translate-y-0 xs:scale-95"
      >
        <div
          v-if="toggleModal"
          :id="id"
          ref="modal"
          :class="modalSizeClass"
          class="flex flex-col transition-all transform bg-white dark:bg-gray-800 rounded-lg max-h-[95vh] min-h-56 w-full"
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
import { mapGetters, mapActions } from 'vuex'

const AVAILABLE_SIZES = ['sm', 'md', 'lg', 'xl']

export default {
  name: 'BaseModal',
  props: {
    id: {
      type: String,
      default: 'modal'
    },
    closeButton: {
      type: Boolean,
      default: true,
      required: false
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
      default: ''
    },
    keepStatic: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters('modal', ['getModals']),
    numberOfModals () {
      return this.getModals.length
    },
    indexCurrentModal () {
      return this.getModals.findIndex((modalId) => {
        return modalId === this.id
      })
    },
    toggleModal () {
      if (this.numberOfModals > 0) {
        if (this.getModals[this.indexCurrentModal]) {
          return this.getModals[this.indexCurrentModal]
        }
      }
      return false
    },
    modalSizeClass () {
      return this.size === 'sm' ? 'sm:max-w-md' : this.size === 'lg' ? 'md:max-w-3xl' : this.size === 'xl' ? 'md:max-w-6xl' : 'md:max-w-xl'
    },
    modalResponsiveClass () {
      return this.size === 'sm' ? 'xs:inset-0 xs:flex xs:items-center xs:justify-center' : 'inset-0 flex items-center justify-center'
    }
  },

  watch: {
    toggleModal (newValue, oldValue) {
      if (oldValue && !newValue) {
        this.$emit('closed')
      }
      if (!oldValue && newValue) {
        this.$emit('opened')
      }

      if (newValue) {
        if (!this.keepStatic) {
          setTimeout(() => {
            this.$refs.overlayModal?.focus()
          }, 200)
        }

        if (this.numberOfModals <= 1) {
          const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
          document.body.style.paddingRight = `${scrollbarWidth || 0}px`
          document.body.style.overflow = 'hidden'
        }
      } else if (this.numberOfModals < 1) {
        setTimeout(() => {
          document.body.removeAttribute('style')
        }, 300)
      }
    }
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'modal/BEFORE_CLOSE' && mutation.payload === this.id) {
        this.$emit('beforeClose')
      } else if (mutation.type === 'modal/BEFORE_OPEN' && mutation.payload === this.id) {
        this.$emit('beforeOpen')
      }
    })
  },
  unmounted () {
    setTimeout(() => {
      document.body.removeAttribute('style')
    }, 200)
    this.unsubscribe()
  },
  methods: {
    ...mapActions('modal', ['setCloseModal']),
    close () {
      this.setCloseModal(this.id)
    }
  }
}
</script>
