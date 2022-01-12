import Vue from 'vue'
import VueTippy, { TippyComponent } from 'vue-tippy'

Vue.use(VueTippy, {
  directive: 'tippy' // => v-tippy
})

Vue.component('Tippy', TippyComponent)
