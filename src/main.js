import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFire from 'vuefire'
import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/firebase-storage'
import 'firebase/firebase-database'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);
Vue.use(VueFire)

// Mark Down
var marked = require('marked')
marked.setOptions({breaks: true})
Vue.filter('marked_down', function (input) {
  if (input) {
    return marked(input)
  } else {
    return ''
  }
})

firebase.initializeApp({
  projectId: 'elecvue',
  databaseURL: 'https://elecvue.firebaseio.com',
  storageBucket: 'elecvue.appspot.com'
})

const firestoreSettings = { timestampsInSnapshots: true }
firebase.firestore().settings(firestoreSettings)

export const db = firebase.firestore()
export const realt_db = firebase.database()
export const storage = firebase.storage().ref()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

