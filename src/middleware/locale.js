console.log('%c middleware: middleware/locale.js ', 'background: gray; color: white');
import store from '@/store'
import { loadMessages } from '@/plugins/i18n'

export default async (to, from, next) => {
    let currentLocale = store.getters['lang/locale'];
    await loadMessages(currentLocale)
    next()
}