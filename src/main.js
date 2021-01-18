console.log('%c file: main.js ', 'background: #222; color: #bada55');
import Vue from 'vue'
import App from './App.vue'

import 'bootstrap'

// import './assets/general.css'
// import 'bootstrap/dist/css/bootstrap.css'
// import VuePhoneNumberInput from 'vue-phone-number-input';
// import 'vue-phone-number-input/dist/vue-phone-number-input.css';

import 'babel-polyfill';

//plugins
import apolloProvider from '@/plugins/apollo'
import i18n from '@/plugins/i18n'

//vue dependencies
import store from '@/store'
import router from '@/router'

import '@/plugins/vuelidate'
import '@/plugins/yandexMap'

// Vue.component('vue-phone-number-input', VuePhoneNumberInput);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  apolloProvider,
  router,
  i18n
}).$mount('#app')
