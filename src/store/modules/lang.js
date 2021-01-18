// import store from "@/store";

// import language from "vue-image-crop-upload/utils/language";

console.log('%c file: store/modules/lang.js ', 'background: black; color: white');

import Cookies from 'js-cookie'
import * as types from '../mutation-types'

import {apolloClient} from "@/plugins/apollo";
import {GET_LANGUAGES} from "@/requests/locale"

// let ab = {}
//
//
//
// let data = (async function() {
//     let a = await apolloClient.mutate({
//         mutation: GET_LANGUAGES,
//         variables() {
//             return {
//                 orderBy : [
//                     {field: "id",order: 'ASC'},
//                 ],
//             }
//         },
//     }).then(result => {
//         return result
//     })
//     console.log('%c let a ', 'background: purple; color: white');
//     console.log("azaza: ",a)
//     return a
// })().then(result => {
//     console.log('%c result ', 'background: purple; color: white');
//     console.log(result)
//     ab = result
//     return result
// })

// let myVal;
//
// const  myAsyncFunc = async (result) => {
//     console.log(result);
//     myVal = result;
// };
//
// apolloClient.mutate({
//     mutation: GET_LANGUAGES,
//     variables() {
//         return {
//             orderBy : [
//                 {field: "id",order: 'ASC'},
//             ],
//         }
//     },
// }).then(myAsyncFunc)


// console.log('%c let myVal ', 'background: purple; color: white');
// console.log('myVal: ', myVal)


// console.log('%c let data ', 'background: purple; color: white');
// console.log('typeof data: ',typeof data.then)
//
// console.log('data :',data)
//
// console.log('%c let ab outside', 'background: purple; color: white');
// console.log("let ab: ", ab)

// state
export const state = {
    // locale: Cookies.get('locale') || null,
    locale: 'en',
    locales: null
}

// getters
export const getters = {
    locale: state => state.locale,
    locales: state => state.locales
}

// mutations
export const mutations = {
    [types.SET_LOCALE] (state,  locale ) {
        console.log('mutation',locale)
        state.locale = locale
    },
    [types.GET_LANGUAGES] (state,  locales ) {
        console.log('%c mutation: GET_LANGUAGES ', 'background: aqua; color: black');
        console.log('mutation',locales[0])
        state.locales = locales
        state.locale  = locales[0].code
        Cookies.set('locale', locales[0].code, { expires: 365 })
    },
}


// actions
export const actions = {
    setLocale ({ commit },  locale ) {

        commit(types.SET_LOCALE, { locale })

        Cookies.set('locale', locale, { expires: 365 })
    },
    async getLanguages ({ commit }) {
        try {
            console.log('%c action: getLanguages ', 'background: aqua; color: black');
            const data = await apolloClient.mutate({
                mutation: GET_LANGUAGES,
                variables() {
                    return {
                        orderBy : [
                            {field: "id",order: 'ASC'},
                        ],
                    }
                },
            })
            console.log('action',data)
            commit(types.GET_LANGUAGES, data.data.languages )
        } catch (e) {
            console.error(e)
        }
    }
}
