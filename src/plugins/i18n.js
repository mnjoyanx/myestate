console.log('%c plugin: plugins/i18n.js ', 'background: orange; color: black');
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'


Vue.use(VueI18n)


console.log('%c const i18n ', 'background: purple; color: white');
const i18n = new VueI18n({
    locale: 'hy',
    messages: {}
})


export async function loadMessages (currentLocale) {
    console.log(currentLocale)
    if (Object.keys(i18n.getLocaleMessage(currentLocale)).length === 0) {
        const messages = await import(`@/languages/${currentLocale}`)
        console.log('currentLocale.code: ',currentLocale)
        console.log('messages: ',messages)
        i18n.setLocaleMessage(currentLocale, messages)
    }

    if (i18n.locale !== currentLocale) {
        console.log('function loadMessages if(i18n.locale !== locale)')
        i18n.locale = currentLocale
    }
}

(async function () {
    console.log('function loadMessages async')
    await store.dispatch('lang/getLanguages')

    let currentLocale =  store.getters['lang/locale'];
    let locales       =  store.getters['lang/locales'];
    console.log("123 : ",locales)
    console.log('123', currentLocale)
    await loadMessages(currentLocale)
})()

export default i18n
