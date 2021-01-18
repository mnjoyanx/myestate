console.log('%c plugin: plugins/apollo.js ', 'background: orange; color: black');
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

console.log('before store import')
// import store from '@/store'
console.log('after store import')


// const token = store.getters['auth/token']

const httpLink = new HttpLink({
  uri: 'http://192.168.0.2:3000/graphql',
  headers: {
    // authorization: token ? `Bearer ${token}` : null
  }
})

  export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true
  })

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient
  })

  Vue.use(VueApollo)

  export default apolloProvider



