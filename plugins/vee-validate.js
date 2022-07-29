import {
  ValidationObserver,
  ValidationProvider,
  extend,
  setInteractionMode,
} from 'vee-validate'

import Vue from 'vue'
import * as rules from 'vee-validate/dist/rules'

const _rules = rules
Object.keys(_rules).forEach((rule) => {
  extend(rule, _rules[rule])
})

setInteractionMode('lazy')

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
