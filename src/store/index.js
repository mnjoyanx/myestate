console.log('%c file: store/index.js ', 'background: #222; color: #bada55');
import Vue from 'vue'
import Vuex from 'vuex'

console.log('vue.use Vuex')

Vue.use(Vuex)

// Load store modules dynamically.
const requireContext = require.context('./modules', false, /.*\.js$/)

const modules = requireContext.keys()
    .map(file =>
        [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
    )
    .reduce((modules, [name, module]) => {
        if (module.namespaced === undefined) {
            module.namespaced = true
        }

        return { ...modules, [name]: module }
    }, {})

console.log('file: store/index.js export default')
export default new Vuex.Store({
    modules
})