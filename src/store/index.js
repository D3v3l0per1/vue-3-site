import Vue from 'vue'
import Vuex from 'vuex'

import post from './post'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    post: post,
    user: user,
    shared: shared
  }
})