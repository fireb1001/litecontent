import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blog: {},
    blog_settings: {},
    navtrack: {showside: true}
  },
  mutations: {
    setBlog (state, blog) {
      state.blog = blog
    },
    togSide (state, bool) {
      state.navtrack.showside = bool
    },
    setBlogSettings (state, settings) {
      state.blog_settings = settings
    },
  },
  actions: {

  },
  getters: {
    storeBlog: state => {
      if(state.blog.name)
        return state.blog        
      else 
        return
    }
  }
})
