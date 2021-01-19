// console.log('%c plugin: plugins/yandexMap.js ', 'background: orange; color: #bada55');
import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'


const settings = {
    apiKey: process.env.VUE_APP_YANDEX_API_KEY,
    lang: 'ru_RU',
    coordorder: 'latlong',
    version: '2.1'
  }
    
Vue.use(YmapPlugin, settings)