import Vue from 'vue'

import store from './store'
import router from './router'

import App from './App.vue'

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App />',
  store,
  router
}).$mount('#app')
