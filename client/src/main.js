import Vue from 'vue'
import layout from './layout'
import axios from 'axios'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import router from './router'
import colors from 'vuetify/lib/util/colors'
import ru from 'vuetify/es5/locale/ru';
import "vuetify/dist/vuetify.min.css"
import "@mdi/font/scss/materialdesignicons.scss"
import "moment-duration-format"
import {store} from "@/store.vuex";

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.router = router
Vue.config.productionTip = false

const http = axios.create({
  baseURL: '/api'
})
const token = localStorage.getItem('jwt')
if (token) {
  http.defaults.headers.common['Authorization'] = token
}
Vue.prototype.$http = http

new Vue({
  vuetify: new Vuetify({
    lang: {
      locales: {ru},
      current: 'ru'
    },
    theme: {
      dark: true,
      primary: colors.indigo.darken1,
      secondary: '#424242',
      accent: '#82B1FF',
      error: '#FF5252',
      info: '#ffcc107',
      success: '#4CAF50',
      warning: '#FFC107'
    },
  }),
  router,
  store,
  render: h => h(layout),
}).$mount('#app')
