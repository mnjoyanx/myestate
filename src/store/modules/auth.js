console.log('%c file: store/modules/auth.js ', 'background: #222; color: #bada55');
import Cookies from 'js-cookie'
import * as types from '../mutation-types'


// state
export const state = {
    user: null,
    token: Cookies.get('token') || null
  }


  // getters
export const getters = {
    user: state => state.user,
    token: state => state.token,
    check: state => state.user !== null
  }


  // mutations
export const mutations = {
    [types.SAVE_TOKEN] (state, data) {
      state.token = data.token
      Cookies.set('token', data.token, { expires: data.expires_in ? 365 : null })
    },
  
    [types.FETCH_USER_SUCCESS] (state, user) {    

      state.user = user
    },
  
    [types.FETCH_USER_FAILURE] (state) {
      state.token = null
      Cookies.remove('token')
    },
  
    [types.LOGOUT] (state) {
      state.user = null
      state.token = null
  
      Cookies.remove('token')
    },
  
    [types.UPDATE_USER] (state, { user }) {
      state.user = user
    }
  }


  // actions
export const actions = {
    saveToken ({ commit }, data) {
      commit(types.SAVE_TOKEN, data)
    },
  
    async fetchUser ({ commit }, data ) {
      try {
        commit(types.FETCH_USER_SUCCESS,  data.user)
      } catch (e) {
        commit(types.FETCH_USER_FAILURE)
      }
    },
  
    updateUser ({ commit }, payload) {
      commit(types.UPDATE_USER, payload)
    },
  
    // async logout ({ commit }) {
    //   try {
    //     await axios.post('/api/logout')
    //   } catch (e) { }
  
    //   commit(types.LOGOUT)
    // },
  
    // async fetchOauthUrl (ctx, { provider }) {
    //   const { data } = await axios.post(`/api/oauth/${provider}`)
  
    //   return data.url
    // }
  }