import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router/index'
import { store } from './store/index'
import StaticLeftNavMenu from './components/Shared/StaticLeftNavMenu'
import dateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert'
import EditPostDialog from './views/Post/Edit/EditPostDetailsDialog'
import LikePostDialog from './views/Post/Likes/LikeDialog'

Vue.config.productionTip = false

Vue.component('StaticLeftNavMenu', StaticLeftNavMenu)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-post-details-dialog', EditPostDialog)
Vue.component('app-like-post-details-dialog', LikePostDialog)

Vue.filter('date', dateFilter)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDk2JmudhDN53yiWDnxCwq8GB2jTmQW5HI',
      authDomain: 'blog-3e751.firebaseapp.com',
      databaseURL: 'https://blog-3e751.firebaseio.com',
      projectId: 'blog-3e751',
      storageBucket: 'blog-3e751.appspot.com',
      messagingSenderId: '73029290221'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadPosts')
  }
}).$mount('#app')
